import { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    if (openIdx === index) {
      setOpenIdx(null);
    } else {
      setOpenIdx(index);
    }
  };

  return (
    <section
      id="preguntas"
      className="py-16 bg-slate-950 text-slate-100 border-t border-slate-850"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-wider block">
            Esclarece tus Dudas
          </span>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            Preguntas Frecuentes de Empresas & OTEC
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
            ¿Tienes dudas sobre cómo programar tu primera inducción corporativa o cómo opera nuestra licencia? Revisa las dudas típicas del ecosistema preventivo.
          </p>
        </div>

        {/* Collapsible Accordion Group */}
        <div className="space-y-3.5 text-left">
          {FAQS.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className="bg-slate-900 border border-slate-850 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-slate-100 hover:text-white hover:bg-slate-850 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                
                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-slate-950/40 animate-slideDown">
                    <p className="bg-slate-950/30 p-3.5 rounded-lg border border-slate-950">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
