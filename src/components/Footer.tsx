import { Flame } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-900 pb-8 mb-8">
          
          {/* Logo Brand column */}
          <div className="flex items-center gap-2.5">
            <div className="bg-orange-600 p-2 rounded-lg text-white">
              <Flame className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-base tracking-tight text-white leading-none">
                VIRTUALIZAR
              </span>
              <span className="text-[9px] text-orange-500 font-bold tracking-widest uppercase leading-none mt-1">
                Extintores VR Chile
              </span>
            </div>
          </div>

          {/* Links list */}
          <div className="flex flex-wrap justify-center gap-6 text-slate-500 font-medium text-xs">
            <a href="#inicio" className="hover:text-slate-300 transition">Inicio</a>
            <a href="#escenarios" className="hover:text-slate-300 transition">Escenarios VR</a>
            <a href="#extintores" className="hover:text-slate-300 transition">Normativas</a>
            <a href="#simulador" className="hover:text-slate-300 transition">Entrenamiento Web</a>
            <a href="#contacto" className="hover:text-slate-300 transition">Contacto</a>
          </div>

        </div>

        {/* Disclaimer Safety Note & Legal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-[11px] text-slate-500 leading-relaxed">
          <div className="space-y-2">
            <p className="font-bold text-slate-400 uppercase tracking-widest">Aviso de Responsabilidad Legal Chilena</p>
            <p>
              Este simulador web e interactivo corresponde a una representación demostrativa en dos dimensiones para fines lúdicos y de captación básica en el canal web de la empresa. No reemplaza bajo ninguna circunstancia los planes formales específicos de control de incendios correspondientes dictados por las autoridades, ni la capacitación teórica/práctica oficial obligatoria dirigida por personal técnico e ingenieros certificados.
            </p>
          </div>
          
          <div className="space-y-4 md:text-right">
            <div className="space-y-1">
              <p>Desarrollado para: <strong className="text-slate-300 font-semibold">Virtualizar.cl</strong></p>
              <p>Santiago, Chile – Todos los derechos reservados © {new Date().getFullYear()}.</p>
              <p>Contacto de Seguridad: <a href="mailto:paula.fritz@virtualizar.cl" className="hover:text-orange-400 underline">paula.fritz@virtualizar.cl</a></p>
            </div>
            
            <p className="text-[10px] text-slate-650 font-mono">
              COMPLIANCE CERTIFICATION METRICS DS594 / DS44 – CHILEAN WORKPLACE SECURITY STANDARDS SENCE
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
