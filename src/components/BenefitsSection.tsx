import { GENERAL_STATS } from '../data';
import { Sparkles, ShieldCheck, Dumbbell, Award, Landmark, Leaf } from 'lucide-react';

export default function BenefitsSection() {
  const benefitGrid = [
    {
      icon: <Dumbbell className="w-5 h-5 text-orange-400" />,
      title: 'Memoria Muscular Activa',
      desc: 'El cerebro asimila los movimientos corporales físicos reales al manipular la boquilla, retirar la chaveta e inclinar el peso en Realidad Virtual, logrando un 4x más de retención práctica que un video pasivo.'
    },
    {
      icon: <Landmark className="w-5 h-5 text-orange-400" />,
      title: 'Crédito Tributario SENCE',
      desc: 'La estructura de nuestro simulador cumple debidamente con SENCE, lo que permite que las OTEC asociadas descuenten el arrastre total de horas de capacitación usando la franquicia tributaria chilena.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-orange-400" />,
      title: 'Sin Insumos ni Recargas',
      desc: 'Capacita a 300 trabajadores en un solo día sin vaciar un solo cilindro químico. Ahorra el 95% de la reposición física y costos logísticos de traslado de extintores para fuego real.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: 'Seguridad Operacional Absoluta',
      desc: 'Sin fuegos controlados inestables, quemaduras térmicas ni riesgo por inhalación de humo tóxico. El entrenamiento se realiza de forma totalmente segura en cualquier sala climatizada.'
    },
    {
      icon: <Award className="w-5 h-5 text-orange-400" />,
      title: 'Certificación de Logros Sólida',
      desc: 'El software entrega un diagnóstico exacto con las notas matemáticas de cada alumno, el pasaje de tiempo, la efectividad de extinguido y el orden cronológico del protocolo PASA.'
    },
    {
      icon: <Leaf className="w-5 h-5 text-orange-400" />,
      title: 'Eco-Friendly, Huella de Carbono Cero',
      desc: 'Respeta el medio ambiente. Evita verter polvos químicos contaminantes a la atmósfera chilena o gastar miles de litros de agua dulce industrial.'
    }
  ];

  return (
    <section
      id="beneficios"
      className="py-16 bg-slate-900 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-wider block">
            ¿Por qué Realidad Virtual?
          </span>
          <h3 className="text-4xl font-extrabold text-white tracking-tight">
            Ventajas Tecnológicas y Económicas del Simulador VR
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Revoluciona el departamento de Prevención de Riesgos de tu empresa eliminando las limitaciones logísticas del entrenamiento de extintores convencional.
          </p>
        </div>

        {/* Quantitative Grid Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
          {GENERAL_STATS.map((st) => (
            <div
              key={st.id}
              className="bg-slate-950 border border-slate-850 p-6 rounded-2xl relative overflow-hidden"
            >
              {/* Back glowing shape */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/5 rounded-bl-full pointer-events-none" />
              
              <p className="text-4xl font-black text-orange-500 tracking-tight leading-none mb-2">
                {st.value}
              </p>
              <h5 className="text-xs font-extrabold text-slate-200 tracking-tight mb-1.5 uppercase">
                {st.label}
              </h5>
              <p className="text-xs text-slate-500 leading-normal">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Core perks list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {benefitGrid.map((perk, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-850 hover:border-slate-800 p-6 rounded-2xl flex flex-col gap-4 transition duration-200"
            >
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl self-start">
                {perk.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-1.5">
                  {perk.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
