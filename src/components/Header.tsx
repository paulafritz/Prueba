import { useState, useEffect } from 'react';
import { Flame, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenContact: () => void;
  onNavigateToSimulator: () => void;
}

export default function Header({ onOpenContact, onNavigateToSimulator }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Escenarios VR', href: '#escenarios' },
    { label: 'Extintores & Ley', href: '#extintores' },
    { label: 'Simulador Web', href: '#simulador' },
    { label: 'Preguntas Frecuentes', href: '#preguntas' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md py-3 shadow-lg border-b border-slate-800'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <div className="bg-orange-600 p-2 rounded-lg text-white group-hover:bg-orange-500 transition-colors">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white leading-none">
                VIRTUALIZAR
              </span>
              <span className="text-[10px] text-orange-500 font-bold tracking-widest uppercase leading-none mt-1">
                Extintores VR
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-orange-500 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="cta-try-demo"
              onClick={onNavigateToSimulator}
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg border border-slate-700 transition"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Probar Simulador
            </button>
            <button
              id="cta-header-contact"
              onClick={onOpenContact}
              className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition shadow-md hover:shadow-orange-950/50"
            >
              Solicitar Demo VR
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 absolute top-full left-0 right-0 shadow-2xl">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 pb-2 px-3 border-t border-slate-800 space-y-2">
              <button
                id="cta-mobile-try"
                onClick={() => {
                  setIsOpen(false);
                  onNavigateToSimulator();
                }}
                className="w-full text-center bg-slate-800 text-slate-200 border border-slate-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-705 transition block"
              >
                Probar Simulador Web
              </button>
              <button
                id="cta-mobile-contact"
                onClick={() => {
                  setIsOpen(false);
                  onOpenContact();
                }}
                className="w-full text-center bg-orange-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-orange-500 transition block"
              >
                Solicitar Demo Corporativo
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
