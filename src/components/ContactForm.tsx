import { useState, FormEvent, RefObject } from 'react';
import { Send, CheckCircle2, Phone, Mail, Award, MapPin } from 'lucide-react';

interface ContactFormProps {
  formRef?: RefObject<HTMLDivElement | null>;
}

export default function ContactForm({ formRef }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    size: '1-50',
    hasOculus: 'no-recomendar',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) return;

    setIsSubmitting(true);

    // Simulate submission delivery network latency
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section
      ref={formRef}
      id="contacto"
      className="py-16 bg-slate-900 border-t border-b border-slate-800 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Informative column (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-orange-500 font-bold text-xs uppercase tracking-wider block">
                Contáctanos
              </span>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                Hablemos de tu Capacitación VR
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed text-slate-400">
                Lleva la prevención de riesgos de tu organización al siguiente nivel. Co-diseñamos el plan de licenciamiento más adecuado para capacitar a todo tu personal según el DS594.
              </p>
            </div>

            {/* Contact cards list */}
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-center gap-3.5 bg-slate-950 p-4 rounded-xl border border-slate-850">
                <div className="bg-orange-500/10 p-2 rounded text-orange-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-500 font-bold block mb-0.5">Correo Corporativo</p>
                  <a href="mailto:paula.fritz@virtualizar.cl" className="text-white hover:text-orange-400 font-semibold underline">
                    paula.fritz@virtualizar.cl
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-slate-950 p-4 rounded-xl border border-slate-850">
                <div className="bg-orange-500/10 p-2 rounded text-orange-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-500 font-bold block mb-0.5">Asesoría Inmediata</p>
                  <p className="text-white font-semibold">Virtualizar VR Soporte</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-slate-950 p-4 rounded-xl border border-slate-850">
                <div className="bg-orange-500/10 p-2 rounded text-orange-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-500 font-bold block mb-0.5">Ubicación</p>
                  <p className="text-white font-semibold">Santiago de Chile • Realidad Virtual</p>
                </div>
              </div>
            </div>

            {/* Quality trust list */}
            <div className="pt-6 border-t border-slate-850">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Empresas que confían en Virtualizar:</span>
              <div className="flex gap-4 items-center justify-start mt-3 opacity-50 grayscale hover:grayscale-0 transition duration-300">
                <span className="font-bold text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">ACHS</span>
                <span className="font-bold text-xs bg-slate-805 text-slate-400 px-2 py-1 rounded">MUTUAL</span>
                <span className="font-bold text-xs bg-slate-805 text-slate-400 px-2 py-1 rounded">DUOC UC</span>
              </div>
            </div>
          </div>

          {/* Form column (Cols 6-12) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-6 sm:p-8 rounded-2xl relative shadow-2xl overflow-hidden self-stretch flex items-center">
            {submitted ? (
              <div className="w-full text-center py-12 space-y-4 animate-scaleUp">
                <div className="text-emerald-500 flex justify-center">
                  <CheckCircle2 className="w-16 h-16 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">¡Mensaje Enviado con Éxito!</h4>
                  <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                    Hemos recibido correctamente tus requerimientos. Un ingeniero preventivo de Virtualizar se pondrá en contacto al correo <strong className="text-white">{formData.email}</strong> en menos de 24 horas hábiles.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 text-xs px-4 py-2 rounded-lg transition mt-4"
                >
                  Enviar otro Mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-4 text-xs">
                <h4 className="text-sm font-extrabold text-white uppercase tracking-widest mb-1 pl-1">
                  Planificación de Capacitación
                </h4>
                <p className="text-slate-500 mb-4 pl-1 block">Rellena el formulario con tus datos corporativos de contacto:</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 font-semibold mb-1 block pl-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Paula Fritz"
                      className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 p-3 rounded-lg text-slate-100 focus:outline-none placeholder-slate-600 text-left"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold mb-1 block pl-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="paula.fritz@virtualizar.cl"
                      className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 p-3 rounded-lg text-slate-100 focus:outline-none placeholder-slate-600 text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 font-semibold mb-1 block pl-1">Empresa / OTEC</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Virtualizar Chile"
                      className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 p-3 rounded-lg text-slate-100 focus:outline-none placeholder-slate-600 text-left"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold mb-1 block pl-1">Cargo / Rol</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Ej. Prevencionista / Gerente OTEC"
                      className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 p-3 rounded-lg text-slate-100 focus:outline-none placeholder-slate-600 text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 font-semibold mb-1 block pl-1">Personal a Capacitar</label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 p-3 rounded-lg text-slate-300 focus:outline-none"
                    >
                      <option value="1-50">1 a 50 Colaboradores</option>
                      <option value="50-150">50 a 150 Colaboradores</option>
                      <option value="150-300">150 a 300 Colaboradores</option>
                      <option value="300-mas">Más de 300 / Nivel Holding</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold mb-1 block pl-1">Visores Meta Quest propios</label>
                    <select
                      value={formData.hasOculus}
                      onChange={(e) => setFormData({ ...formData, hasOculus: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 p-3 rounded-lg text-slate-300 focus:outline-none"
                    >
                      <option value="si">Sí, contamos con visores propios</option>
                      <option value="no-recomendar">No, requerimos arriendo junto a la software</option>
                      <option value="asesoria">Deseamos comprar marcas recomendadas por Virtualizar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold mb-1 block pl-1">Requerimientos o Mensaje adicional</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe si requieres soporte SENCE o capacitar en una faena minera / bodega específica..."
                    className="w-full bg-slate-900 border border-slate-850 focus:border-orange-500 p-3 rounded-lg text-slate-100 focus:outline-none placeholder-slate-600 min-h-[80px] text-left"
                  />
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3 px-6 rounded-xl transition shadow flex items-center justify-center gap-1.5 cursor-pointer ml-auto"
                  >
                    {isSubmitting ? (
                      <span>Enviando...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Solicitar Diagnóstico Técnico</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
