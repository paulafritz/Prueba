import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Lazy Gemini initialization to avoid startup failure if key is missing
  let ai: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured. Please add it via Settings > Secrets.');
      }
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return ai;
  }

  // API Endpoint: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Endpoint: Dynamic Scenario Generator powered by Gemini 3.5
  app.post('/api/generate-scenario', async (req, res) => {
    try {
      const { description } = req.body;
      if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'La descripción del escenario es requerida.' });
      }

      const client = getGeminiClient();
      
      const systemInstruction = 
        'Eres un Ingeniero Prevencionista de Riesgos chileno experto en seguridad contra incendios según la ordenanza DS594 y DS44. ' +
        'Tu tarea es proponer un escenario de entrenamiento de simulador de extintores en Realidad Virtual detallado en español basándote en la solicitud del usuario.';

      const userPrompt = 
        `Crea un escenario de simulación detallado de acuerdo al siguiente espacio o descripción de riesgo: "${description}". ` +
        `Establece el tipo de fuego recomendado que mejor se adapte (Clase A para sólidos, Clase B para líquidos combustibles/combustibles fósiles, Clase C para sistemas eléctricos/electrónicos, Clase K para aceites vegetales y grasas de cocina). ` +
        `Asigna el agente extintor correspondiente: 'PQS' para polvos multipropósito, 'CO2' para agentes limpios eléctricos, 'Agua' exclusivamente para sólidos de clase A terrestres, o 'ClaseK' para freidoras/cocinas comerciales. ` +
        `Define las descripciones detalladas de los peligros y protocolos y un error instructivo común en español chile.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'Nombre corto del lugar o área (ej. Taller de Soldadura, Oficina de Impresoras)'
              },
              subtitle: {
                type: Type.STRING,
                description: 'Breve explicación de la falla o siniestro (ej. Chispa sobre trapos con grasa)'
              },
              description: {
                type: Type.STRING,
                description: 'Narrativa inmersiva de cómo surge la llama y compromete el entorno'
              },
              fireClass: {
                type: Type.STRING,
                description: 'Debe ser estrictamente uno de los siguientes caracteres: "A", "B", "C", "K"'
              },
              fireName: {
                type: Type.STRING,
                description: 'Explicación del tipo de fuego (ej. Fuego Clase B (Líquidos Inflamables))'
              },
              recommendedExtinguisher: {
                type: Type.STRING,
                description: 'Debe ser estrictamente una de las siguientes opciones: "PQS", "CO2", "Agua", "ClaseK"'
              },
              difficulty: {
                type: Type.STRING,
                description: 'Opción de dificultad: "Principiante", "Intermedio", o "Avanzado"'
              },
              details: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Lista de 3 detalles técnicos sobre el material combustible y las condiciones locales.'
              },
              commonMistake: {
                type: Type.STRING,
                description: 'Un error típico y peligroso al intentar extinguir este fuego en la vida real.'
              },
              industry: {
                type: Type.STRING,
                description: 'Categoría industrial general de este escenario (ej. Metalurgia, Comercio, Salud)'
              },
              smokeLevel: {
                type: Type.STRING,
                description: 'Nivel cualitativo de humo: "Bajo", "Medio", o "Alto"'
              },
              safetyProtocol: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Lista con exactamente 3 instrucciones específicas de seguridad para extinguir este percance.'
              }
            },
            required: [
              'title',
              'subtitle',
              'description',
              'fireClass',
              'fireName',
              'recommendedExtinguisher',
              'difficulty',
              'details',
              'commonMistake',
              'industry',
              'smokeLevel',
              'safetyProtocol'
            ]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('La respuesta de Gemini falló o vino vacía.');
      }

      const parsedScenario = JSON.parse(responseText.trim());
      // Assign a unique temporary ID so we can identify it on the client
      parsedScenario.id = `custom-${Date.now()}`;
      parsedScenario.bgPattern = 'bg-gradient-to-br from-slate-900 to-emerald-950';

      return res.json({ success: true, scenario: parsedScenario });
    } catch (error: any) {
      console.error('Error in /api/generate-scenario:', error.message);
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Error interno del servidor al procesar con Gemini.' 
      });
    }
  });

  // Vite integration for development vs static asset serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Virtualizar Server] Listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
