import { Scenario, Extinguisher } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'oficina',
    title: 'Oficina Administrativa',
    subtitle: 'Cortocircuito en Computador',
    description: 'Un recalentamiento en los enchufes detrás de una estación de trabajo inicia un incendio eléctrico Clase C. El humo denso comienza a llenar la oficina comprometiendo la visibilidad.',
    fireClass: 'C',
    fireName: 'Fuego Clase C (Equipos Eléctricos Energizados)',
    recommendedExtinguisher: 'CO2',
    difficulty: 'Principiante',
    bgPattern: 'bg-gradient-to-br from-slate-900 to-indigo-950',
    details: [
      'Dispositivos involucrados: Computador de escritorio, cables de alimentación, alfombra de oficina.',
      'Riesgos adicionales: Electrocución si se utiliza agua o un agente conductor.',
      'Gas liberado: Humo tóxico por plástico quemado (PVC).'
    ],
    commonMistake: 'Utilizar extintor de agua o espuma, lo que generaría un peligro eléctrico fatal (electrocución).',
    industry: 'Corporativa / Servicios',
    smokeLevel: 'Medio',
    safetyProtocol: [
      'Evaluar visualmente la fuente y cortar el suministro eléctrico general si es posible.',
      'Seleccionar un Extintor de Dióxido de Carbono (CO2) para proteger los componentes intactos.',
      'Mantener una distancia mínima de 1.5 metros para evitar proyección de aire frío en el rostro.'
    ]
  },
  {
    id: 'bodega',
    title: 'Bodega Logística',
    subtitle: 'Inflamación de Embalajes y Pallets',
    description: 'Colisiones o fricción cerca de la zona de almacenamiento provocan fuego en pallets de madera secos y cajas de cartón. Se propaga rápidamente debido al combustible sólido Clase A.',
    fireClass: 'A',
    fireName: 'Fuego Clase A (Sólidos Combustibles - Papel, Madera, Cartón)',
    recommendedExtinguisher: 'PQS',
    difficulty: 'Intermedio',
    bgPattern: 'bg-gradient-to-br from-slate-900 to-amber-950',
    details: [
      'Materiales: Pallets de pino, embalajes plásticos, cajas de cartón corrugado apiladas.',
      'Riesgos de propagación: Colapso de estanterías industriales cargadas de material.',
      'Monitoreo ambiental: Rápido aumento del calor por radiación técnica.'
    ],
    commonMistake: 'No dispersar las brasas tras la descarga, permitiendo una reignición lenta interna en las pilas de cartón.',
    industry: 'Logística / Supply Chain',
    smokeLevel: 'Alto',
    safetyProtocol: [
      'Asegurar una zona de evacuación libre a la espalda del operador antes de actuar.',
      'Seleccionar un Extintor de Polvo Químico Seco (PQS) de amplio espectro multipropósito (A-B-C).',
      'Dirigir el chorro en forma de abanico cubriendo la base total antes del colapso estructural.'
    ]
  },
  {
    id: 'cocina',
    title: 'Cocina & Casino',
    subtitle: 'Fuego por Aceite de Cocina',
    description: 'La freidora industrial supera el punto de inflamación de los aceites vegetales (Fuego Clase K). El intento de extinguirlo de manera errónea puede causar una explosión de vapor.',
    fireClass: 'K',
    fireName: 'Fuego Clase K (Grasas y Aceites de Cocina)',
    recommendedExtinguisher: 'ClaseK',
    difficulty: 'Avanzado',
    bgPattern: 'bg-gradient-to-br from-slate-900 to-rose-950',
    details: [
      'Componentes: Freidora de acero inoxidable, 15 litros de aceite de freír saturado a más de 360°C.',
      'Comportamiento extremo: El fuego se alimenta del oxígeno directamente sobre la tina de cocción.',
      'Peligro mortal: Salpicaduras de aceite hirviendo sobre el rostro o cuerpo.'
    ],
    commonMistake: 'Arrojar agua directamente, provocando una violenta expansión del vapor (Boil-over) que lanzará aceite encendido por toda la sala.',
    industry: 'Gastronomía / Hotelería',
    smokeLevel: 'Medio',
    safetyProtocol: [
      'Apagar los quemadores de gas o desenchufar la freidora inmediatamente.',
      'Utilizar un extintor de Acetato de Potasio líquido que saponifica el aceite formando una capa aislante de espuma.',
      'Descargar suavemente desde la distancia para no proyectar o salpicar el aceite fuera de la freidora.'
    ]
  },
  {
    id: 'servidores',
    title: 'Data Center y Sala TI',
    subtitle: 'Tablero Eléctrico de Comunicación',
    description: 'Falla dieléctrica en los servidores centrales de la compañía. El fuego surge en los switches troncales de comunicación amenazando con la pérdida total de los sistemas informáticos.',
    fireClass: 'C',
    fireName: 'Fuego Clase C (Electrónicos Críticos Dieléctricos)',
    recommendedExtinguisher: 'CO2',
    difficulty: 'Avanzado',
    bgPattern: 'bg-gradient-to-br from-slate-900 to-teal-950',
    details: [
      'Equipos: Servidores de rack de alta densidad, switches de red, sistemas de alimentación ininterrumpida (UPS).',
      'Criterio de preservación: Evitar el daño colateral por agentes corrosivos (como el polvo PQS).',
      'Efecto del frío: Choque térmico localizado.'
    ],
    commonMistake: 'Usar extintor PQS de polvo químico, ya que aunque apaga el fuego, el polvo corrosivo inutilizará todos los servidores limpios restantes de la sala.',
    industry: 'Tecnología / Telecomunicaciones',
    smokeLevel: 'Bajo',
    safetyProtocol: [
      'Cerrar el sistema de ventilación de precisión externo para evitar el flujo continuo de oxígeno.',
      'Elegir un Extintor de Dióxido de Carbono (CO2) que actúa por sofocación enfriando sin dejar residuos destructivos.',
      'Sellar el acceso de la sala tras apagar el brote para concentrar el gas extintor.'
    ]
  }
];

export const EXTINGUISHERS: Extinguisher[] = [
  {
    id: 'PQS',
    name: 'Polvo Químico Seco (PQS)',
    type: 'PQS',
    badgeColor: 'bg-red-500 text-white',
    effectiveFor: ['A', 'B', 'C'],
    description: 'El extintor más común en entornos industriales. Apaga interrumpiendo la reacción química del triángulo del fuego. Deja un residuo de polvo fino multipropósito.',
    colorClass: 'border-red-600 focus:ring-red-500 text-red-600',
    instructions: [
      'Efectivo para fuegos de madera, cartón (A), líquidos combustibles (B) y cortocircuitos eléctricos comunes (C).',
      'Genera una densa nube que reduce la visibilidad momentáneamente.',
      'Su limpieza posterior es compleja debido a que es un polvo fino de fosfato monoamónico.'
    ],
    safetyWarning: '¡Cuidado! No recomendado para salas de servidores delicadas ya que el polvo es corrosivo para circuitos microscópicos.'
  },
  {
    id: 'CO2',
    name: 'Dióxido de Carbono (CO2)',
    type: 'CO2',
    badgeColor: 'bg-blue-600 text-white',
    effectiveFor: ['B', 'C'],
    description: 'Agente limpio gaseoso que desplaza el oxígeno del ambiente y reduce radicalmente la temperatura local mediante un frío extremo de salida (-79°C).',
    colorClass: 'border-blue-600 focus:ring-blue-500 text-blue-600',
    instructions: [
      'Ideal para fuego Clase C (eléctricos sofisticados) y Clase B (líquidos).',
      'No deja residuo alguno, lo que permite reanudar operaciones de computadores rápidamente.',
      'Debe sujetarse estrictamente de la empuñadura aislante y manguera para evitar quemaduras por frío severo.'
    ],
    safetyWarning: '¡Cuidado! Evitar sujetar la corneta del extintor con la mano descubierta y ventilar la sala tras su uso debido a la sofocación de oxígeno.'
  },
  {
    id: 'Agua',
    name: 'Agua Presurizada (H2O)',
    type: 'Agua',
    badgeColor: 'bg-cyan-500 text-white',
    effectiveFor: ['A'],
    description: 'Extintor a base de agua purificada que enfría profundamente penetrando los materiales orgánicos sólidos. Excelente capacidad de remojo.',
    colorClass: 'border-cyan-500 focus:ring-cyan-400 text-cyan-500',
    instructions: [
      'Efectivo exclusivamente para fuegos Clase A (maderas machihembradas, fardos, matorrales, carbón).',
      'Penetra las capas térmicas e impide que las brasas internas vuelvan a reaccionar.'
    ],
    safetyWarning: '⚠️ ¡PELIGRO EXTREMO! Prohibido su uso en tableros eléctricos energizados (descarga eléctrica mortal) o fuegos de grasa y combustible (explosión física violentísima).'
  },
  {
    id: 'ClaseK',
    name: 'Acetato de Potasio (Clase K)',
    type: 'ClaseK',
    badgeColor: 'bg-amber-500 text-black font-semibold',
    effectiveFor: ['K', 'A'],
    description: 'Agente líquido alcalino que se esparce en forma de niebla fina. Reacciona con las grasas hirviendo creando una gruesa capa jabonosa no inflamable (saponificación).',
    colorClass: 'border-yellow-500 focus:ring-yellow-400 text-yellow-600',
    instructions: [
      'Desarrollado específicamente de acuerdo al DS594 para cocinas comerciales, casinos e industrias alimentarias.',
      'Corta la alimentación de aire inmediatamente enfriando la grasa licuada.'
    ],
    safetyWarning: 'Aplicar suavemente sin presionar la lanza de descarga directamente al fondo del aceite para evitar salpicaduras térmicas críticas.'
  }
];

export const GENERAL_STATS = [
  { id: 'stat-1', value: '100%', label: 'Cero Accidentes de Entrenamiento', desc: 'Sin fuego real, humo tóxico ni gases peligrosos.' },
  { id: 'stat-2', value: '95%', label: 'Reducción de Costos Operativos', desc: 'Ahorro total en recargas de extintores reales e insumos de capacitación.' },
  { id: 'stat-3', value: '4x', label: 'Mayor Retención del Aprendizaje', desc: 'La memoria muscular de VR supera con creces los métodos teóricos en aula.' },
  { id: 'stat-4', value: '100%', label: 'Cumplimiento DS594', desc: 'Cumple a cabalidad con la exigencia legal chilena del entrenamiento contra incendios.' }
];

export const FAQS = [
  {
    question: '¿Cómo cumple este simulador VR con las normativas DS594 y DS44 en Chile?',
    answer: 'El Decreto Supremo 594 establece la obligación patronal de adiestrar a todo el personal en el correcto uso de extintores en caso de siniestro. El Simulador VR de Virtualizar recrea paso a paso los protocolos técnicos que exige la ley (inspección de manómetro, chequeo de precinto, distanciamiento, direccionamiento de boquilla a la base y barrido lateral), otorgando registros medibles que acreditan y certifican que los empleados aprobaron con conocimientos prácticos reales.'
  },
  {
    question: '¿Qué visores de Realidad Virtual son compatibles?',
    answer: 'El simulador está totalmente optimizado para visores móviles de última generación de la línea Meta Quest (Meta Quest 2, Meta Quest 3, Meta Quest Pro). No requiere estar conectado a computadores costosos ni cables incómodos, facilitando entrenamientos autónomos de pie en un área mínima de 2x2 metros.'
  },
  {
    question: '¿El simulador entrega reportes de evaluación o notas?',
    answer: 'Sí. A diferencia del entrenamiento tradicional con fuego real donde no se puede medir la técnica con exactitud, el simulador VR de Virtualizar registra métricas clave en tiempo real: tipo de extintor seleccionado, orden cronológico de la maniobra PASA (P: Jalar pasador, A: Apuntar a la base, S: Presionar palanca, A: Barrido en abanico), tiempo de reacción, distancia de seguridad y porcentaje de fuego sofocado. Al final, entrega una calificación (del 1 al 7 o de 0% a 100%) y genera el estado de aprobado para la certificación de la empresa u OTEC.'
  },
  {
    question: '¿Se requiere internet o infraestructura especial para usar el simulador?',
    answer: 'No. El software se ejecuta directamente en los visores Meta Quest como aplicación autónoma, por lo que puede utilizarse en cualquier sala de reuniones corporativa, bodega, u oficina sin necesidad de conexión a internet persistente ni instalaciones de gas u otras medidas de seguridad complejas que frenan las capacitaciones tradicionales.'
  }
];
