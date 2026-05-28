import { Flame, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/hero_vr_training_1779931269725.png';

interface HeroProps {
  onNavigateToSimulator: () => void;
  onOpenContact: () => void;
}

export default function Hero({ onNavigateToSimulator, onOpenContact }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen bg-slate-950 text-white pt-24 pb-16 flex items-center overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Column (Columns 1-7) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              Tecnología de Inmersión Certificable
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Capacita en <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Uso de Extintores</span> con Realidad Virtual.
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              Cumple con el <strong className="text-white font-semibold">Decreto Supremo 594</strong> de manera 100% segura, interactiva y costo-eficiente. Olvídate de los riesgos del fuego real y el desperdicio de recargas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-go-simulator"
                onClick={onNavigateToSimulator}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-orange-950/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Probar Simulador Web
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-request-quote"
                onClick={onOpenContact}
                className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-850 text-slate-100 font-bold px-8 py-4 rounded-xl border border-slate-800 hover:border-slate-700 transition shadow-inner"
              >
                Cotizar Licencias VR
              </button>
            </div>

            {/* Micro Badges of Compliance */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-slate-900">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-500/10 p-1.5 rounded text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400">Normativa Legal</p>
                  <p className="text-sm font-bold text-slate-200">Cumplimiento DS 594</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-emerald-500/10 p-1.5 rounded text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400">Capacitación</p>
                  <p className="text-sm font-bold text-slate-200">Sello OTEC Certificable</p>
                </div>
              </div>

              <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                <div className="bg-orange-500/10 p-1.5 rounded text-orange-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400">Cero Residuos</p>
                  <p className="text-sm font-bold text-slate-200">100% Ecológico</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase (Columns 8-12) */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 p-2 glow-orange">
              <img
                src={heroImage}
                alt="Personal de prevención entrenando en Realidad Virtual con visor Meta Quest 3"
                className="w-full h-auto rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Dynamic Interactive overlay tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 flex items-center justify-between text-left">
                <div>
                  <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">Simulador Oficial</p>
                  <p className="text-sm font-extrabold text-white">Meta Quest App Store</p>
                </div>
                <span className="bg-emerald-500 text-slate-950 font-bold text-[11px] px-2.5 py-1 rounded">
                  Disponible
                </span>
              </div>
            </div>

            {/* Back decorative blobs */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-600/30 rounded-full blur-2xl -z-10 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
