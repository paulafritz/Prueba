import { Scenario } from '../types';
import { SCENARIOS } from '../data';
import { Dumbbell, ShieldAlert, BadgeCheck, Zap, Thermometer, Wind } from 'lucide-react';

interface ScenariosSectionProps {
  onSelectAndPlay: (scenarioId: string) => void;
}

export default function ScenariosSection({ onSelectAndPlay }: ScenariosSectionProps) {
  
  const getFireClassBadgeColor = (fireClass: string) => {
    switch (fireClass) {
      case 'A': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      case 'B': return 'bg-lime-500/20 text-lime-400 border-lime-500/30';
      case 'C': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'K': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Principiante': return 'bg-emerald-500/10 text-emerald-400';
      case 'Intermedio': return 'bg-amber-500/10 text-amber-400';
      case 'Avanzado': return 'bg-rose-500/10 text-rose-400';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <section
      id="escenarios"
      className="py-20 bg-slate-900 border-t border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold tracking-widest text-orange-500 uppercase">
            Inmersión Total
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Escenarios de Entrenamiento del Simulador VR
          </h3>
          <p className="text-slate-400 text-lg">
            Recreación técnica de incendios reales específicos que enfrentan diariamente las industrias en Chile. Aprende haciendo con situaciones altamente detalladas.
          </p>
        </div>

        {/* Grid of Bento Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              className={`rounded-2xl border border-slate-850 bg-slate-950 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all group overflow-hidden relative`}
            >
              {/* Top ambient colored lighting representing fire heat */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-600 via-red-600 to-amber-500" />

              <div>
                {/* Header block inside Card */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-900 px-2.5 py-1 rounded">
                    {scenario.industry}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getFireClassBadgeColor(scenario.fireClass)}`}>
                      Clase {scenario.fireClass}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${getDifficultyBadgeColor(scenario.difficulty)}`}>
                      {scenario.difficulty}
                    </span>
                  </div>
                </div>

                {/* Main titles */}
                <h4 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-orange-400 transition-colors">
                  {scenario.title}
                </h4>
                <p className="text-sm text-orange-500 font-semibold mb-3">
                  {scenario.subtitle}
                </p>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {scenario.description}
                </p>

                {/* Technical stats boxes */}
                <div className="grid grid-cols-3 gap-3 mb-6 bg-slate-900/50 p-3 rounded-xl border border-slate-900">
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-0.5">Fuego</span>
                    <span className="text-xs font-bold text-slate-300">{scenario.fireName.split(' ')[1]}</span>
                  </div>
                  <div className="text-center border-l border-r border-slate-800">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-0.5">Mínimo</span>
                    <span className="text-xs font-semibold text-slate-300 flex items-center justify-center gap-0.5">
                      <Zap className="w-3.5 h-3.5 text-orange-400" />
                      {scenario.recommendedExtinguisher}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-0.5">Humo</span>
                    <span className="text-xs font-bold text-slate-300 flex items-center justify-center gap-0.5">
                      <Wind className="w-3.5 h-3.5 text-blue-400" />
                      {scenario.smokeLevel}
                    </span>
                  </div>
                </div>

                {/* Quick details */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Detalles Técnicos</p>
                  {scenario.details.map((detail, index) => (
                    <div key={index} className="flex gap-2 text-xs text-slate-300">
                      <span className="text-orange-500">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Common Danger Box */}
                <div className="bg-red-950/20 border border-red-900/30 p-3.5 rounded-xl mb-6 flex gap-3">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-red-400 uppercase tracking-wide">Error Común y Mortal</h5>
                    <p className="text-xs text-red-200 mt-1 leading-relaxed">
                      {scenario.commonMistake}
                    </p>
                  </div>
                </div>

                {/* Safety Protocol Steps */}
                <div className="space-y-2.5 mb-8">
                  <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                    <BadgeCheck className="w-4 h-4" />
                    Protocolo de Actuación Seguro (DS594)
                  </h5>
                  <ol className="space-y-1.5 list-decimal list-inside text-xs text-slate-400">
                    {scenario.safetyProtocol.map((step, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span className="text-slate-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-2">
                <button
                  id={`play-scenario-${scenario.id}`}
                  onClick={() => onSelectAndPlay(scenario.id)}
                  className="w-full text-center bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-xl transition shadow hover:shadow-orange-950/40 cursor-pointer flex items-center justify-center gap-2 text-sm"
                >
                  <Dumbbell className="w-4 h-4 text-orange-200 animate-pulse" />
                  Probar este Escenario en Web
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
