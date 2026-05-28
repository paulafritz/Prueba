import { EXTINGUISHERS } from '../data';
import { ShieldCheck, HelpCircle, AlertTriangle, Info } from 'lucide-react';

export default function ReferenceSection() {
  const fireClasses = [
    {
      class: 'A',
      title: 'Fuego Clase A: Combustibles Sólidos',
      desc: 'Materiales sólidos orgánicos combustibles comunes como maderas, papeles, cartones, textiles y gomas plásticas.',
      symbol: '▲',
      color: 'bg-sky-500 text-slate-950',
      extinguishersList: 'PQS, Agua Presurizada, Acetato de Potasio.'
    },
    {
      class: 'B',
      title: 'Fuego Clase B: Líquidos Inflamables',
      desc: 'Gases y líquidos inflamables o combustibles (gasolinas, parafinas, aceites lubricantes industriales, solventes).',
      symbol: '■',
      color: 'bg-lime-500 text-slate-950',
      extinguishersList: 'Polvo Químico Seco (PQS), Dióxido de Carbono (CO2), Espuma.'
    },
    {
      class: 'C',
      title: 'Fuego Clase C: Equipos Eléctricos Energizados',
      desc: 'Motores, herramientas eléctricas, tableros de fusibles, computadores de oficina conectados que conducen potencial eléctrico.',
      symbol: '●',
      color: 'bg-red-500 text-slate-950',
      extinguishersList: 'Dióxido de Carbono (CO2), Polvo Químico Seco (PQS de alta pureza).'
    },
    {
      class: 'K',
      title: 'Fuego Clase K: Grasas y Aceites de Cocina',
      desc: 'Fuegos específicos que involucran freidoras con base de aceites vegetales o grasas animales en cocinas industriales.',
      symbol: '★',
      color: 'bg-amber-500 text-slate-950',
      extinguishersList: 'Acetato de Potasio líquido.'
    }
  ];

  return (
    <section
      id="extintores"
      className="py-16 bg-slate-950 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4 text-left">
            <span className="text-orange-500 font-bold text-xs uppercase tracking-wider block">
              Marco Regulatorio Chileno
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Clasificación del Fuego & Normativas DS594 / DS44
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              El Ministerio de Salud de Chile exige que todas las empresas garanticen que sus instalaciones cuentan con extintores revisados y rotulados (DS44), administrados por personal técnico debidamente instruido y calificado para la primera intervención de contención (DS594 Art 47 y 48).
            </p>
          </div>
          
          <div className="lg:col-span-6">
            <div className="bg-slate-900 border border-slate-850 p-6 rounded-2xl flex gap-4 text-left">
              <div className="bg-orange-500/10 p-3 rounded-xl text-orange-400 self-start shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Responsabilidad Patronal Directa</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Las multas fiscales impuestas por la Inspección del Trabajo o la Seremi de Salud derivadas de la omisión en simulacros de evacuación o acreditación en uso de extintores oscilan significativamente, pudiendo detener las operaciones industriales de forma inmediata.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Column 1: Fire categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 text-left">
          {fireClasses.map((cl, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-850 hover:border-slate-800 p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-sm ${cl.color}`}>
                    {cl.class}
                  </span>
                  <span className="text-slate-600 text-lg">{cl.symbol}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-2 leading-tight">{cl.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{cl.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-950 mt-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Agente Adecuado</span>
                <span className="text-xs font-semibold text-slate-300">{cl.extinguishersList}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Section Column 2: Extinguisher Devices guidelines */}
        <div className="space-y-4 text-left">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 pl-1">
            Manual de Extintores de Seguridad Disponibles
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXTINGUISHERS.map((ext) => (
              <div
                key={ext.id}
                className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-slate-300">{ext.name}</span>
                    <span className="text-[8px] bg-slate-800 px-2 py-0.5 rounded text-orange-400 border border-slate-700 font-bold">
                      {ext.id}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {ext.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block">Pasos de uso:</span>
                    {ext.instructions.map((inst, i) => (
                      <div key={i} className="flex gap-2 text-[11px] text-slate-400 leading-tight">
                        <span className="text-slate-500 font-bold">{i + 1}</span>
                        <span>{inst}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-950 mt-4 bg-red-950/10 p-3 rounded-lg border border-red-900/10">
                  <p className="text-[10px] text-red-400 leading-normal font-medium">
                    {ext.safetyWarning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
