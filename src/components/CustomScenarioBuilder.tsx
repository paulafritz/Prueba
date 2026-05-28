import { useState } from 'react';
import { Scenario } from '../types';
import { Sparkles, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';

interface CustomScenarioBuilderProps {
  onScenarioGenerated: (newScenario: Scenario) => void;
}

export default function CustomScenarioBuilder({ onScenarioGenerated }: CustomScenarioBuilderProps) {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successScenario, setSuccessScenario] = useState<Scenario | null>(null);

  const predefinedPrompts = [
    'Laboratorio clínico con matraces de reactivos químicos inflamables y enchufes.',
    'Bodega de reciclaje cargada de fardos de cartón compactado.',
    'Taller mecánico automotriz con cubos de aceite hidráulico y restos de combustible.',
    'Sala de carga de baterías para grúas horquillas eléctricas.'
  ];

  const handleGenerate = async (textToSubmit: string = description) => {
    if (!textToSubmit.trim()) {
      setErrorMsg('Por favor describe tu espacio o ambiente de riesgo primero.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setSuccessScenario(null);

    try {
      const response = await fetch('/api/generate-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: textToSubmit })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'No se pudo generar el escenario.');
      }

      setSuccessScenario(data.scenario);
      // Give feedback
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error de conexión con el servidor de inteligencia artificial.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadIntoSimulator = () => {
    if (successScenario) {
      onScenarioGenerated(successScenario);
      // Clear states
      setSuccessScenario(null);
      setDescription('');
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto my-12 relative overflow-hidden">
      {/* Decorative backing circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/15 p-2 rounded-xl text-emerald-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div className="text-left">
          <h4 className="text-xl font-extrabold text-white">Generador AI de Escenarios a Medida</h4>
          <p className="text-xs text-slate-400">Especialmente diseñado para asesorías de prevención de riesgos corporativas.</p>
        </div>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-6 text-left">
        ¿Tienes un riesgo específico que no está en la lista? Describe el área y los materiales involucrados en tu empresa. Nuestra <strong className="text-emerald-400 text-semibold">Inteligencia Artificial Gemini</strong> estructurará un escenario de capacitación real con sus parámetros de fuego, agente extintor aplicable según la norma chilena y los peligros colaterales asociados.
      </p>

      {/* Main interaction layout */}
      {!successScenario ? (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ejemplo: Sala de costura con fardos de telas, hilos y máquinas textiles con motores eléctricos monofásicos..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[100px] text-left"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                <p className="text-xs font-bold text-slate-300 tracking-wide uppercase">Generando Escenario Preventivo...</p>
              </div>
            )}
          </div>

          {/* Prompt Suggestions */}
          <div className="text-left">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sugerencias rápidas para probar:</p>
            <div className="flex flex-wrap gap-2">
              {predefinedPrompts.map((pText, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDescription(pText);
                    handleGenerate(pText);
                  }}
                  disabled={isLoading}
                  className="bg-slate-900 hover:bg-slate-850 hover:border-slate-700 border border-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg transition text-left"
                >
                  {pText}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-900/40 rounded-xl text-xs text-red-300 text-left">
              ⚠️ {errorMsg}
            </div>
          )}

          <div className="pt-2 text-right">
            <button
              onClick={() => handleGenerate()}
              disabled={isLoading || !description.trim()}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition shadow-lg inline-flex items-center gap-2 text-sm cursor-pointer"
            >
              Consultar con Gemini AI
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Display Generated Result */
        <div className="border border-emerald-950 bg-emerald-950/10 p-5 sm:p-6 rounded-xl text-left space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded uppercase tracking-widest">
                ¡Escenario AI Creado con Éxito!
              </span>
              <h5 className="text-base font-extrabold text-white mt-1">
                {successScenario.title} • <span className="text-emerald-400">{successScenario.subtitle}</span>
              </h5>
            </div>
            <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1 rounded font-bold text-slate-300">
              Clase {successScenario.fireClass}
            </span>
          </div>

          <div className="space-y-3">
            <p className="text-slate-300 text-sm leading-relaxed">
              {successScenario.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-850">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">Agente Extintor Correcto:</span>
                <span className="text-emerald-400 font-extrabold text-sm">{successScenario.recommendedExtinguisher}</span>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-850">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">Dificultad Recomendada:</span>
                <span className="text-emerald-400 font-bold">{successScenario.difficulty}</span>
              </div>
            </div>

            <div className="bg-red-950/20 border border-red-900/20 p-3 rounded-lg text-xs">
              <strong className="text-red-400 uppercase tracking-wide block mb-1">⚠️ Error Típico Detectado:</strong>
              <p className="text-red-200 mt-0.5 leading-relaxed">{successScenario.commonMistake}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-emerald-900/30">
            <button
              onClick={() => setSuccessScenario(null)}
              className="text-slate-400 hover:text-white text-xs px-4 py-2"
            >
              Generar un Escenario Distinto
            </button>
            <button
              onClick={handleLoadIntoSimulator}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold py-3 px-6 rounded-xl transition shadow flex items-center gap-2 text-xs"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              Cargar y Jugar este Escenario AI Ahora
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
