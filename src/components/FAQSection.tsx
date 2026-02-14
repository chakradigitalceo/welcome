
import { motion } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const questions = [
        {
            q: "¿Chakra es un banco?",
            a: "No. Somos una tecnología financiera que conecta capital institucional con oportunidades productivas. No captamos ahorros, estructuramos inversión."
        },
        {
            q: "¿Necesito hipotecar mi tierra?",
            a: "No. Tu garantía es tu cultivo y tu historial satelital. Nuestro modelo de riesgo se basa en la productividad futura, no en activos físicos pasados."
        },
        {
            q: "¿Qué cultivos financian?",
            a: "Actualmente nos enfocamos en maíz, arroz y soya por su alta demanda industrial y ciclos predecibles. Estamos expandiendo a frutales de exportación."
        },
        {
            q: "¿Cómo aseguran el retorno al inversionista?",
            a: "Diversificación geográfica, monitoreo satelital diario y seguros climáticos paramétricos. Además, el pago viene directo del comprador industrial (off-taker)."
        },
        {
            q: "¿Cuánto tarda el proceso?",
            a: "El registro toma 5 minutos. La evaluación satelital automática toma 24-48 horas. Una vez aprobado, el desembolso es inmediato según el ciclo del cultivo."
        }
    ];

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 max-w-3xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-chakra-leaf uppercase bg-chakra-leaf/10 rounded-full border border-chakra-leaf/20">
                        Dudas Comunes
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                        Resolvemos tus inquietudes
                    </h2>
                    <p className="text-gray-400">
                        Transparencia total desde el primer clic.
                    </p>
                </div>

                <div className="space-y-4">
                    {questions.map((item, i) => (
                        <div key={i} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-all hover:bg-white/10">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-semibold text-lg transition-colors ${openIndex === i ? 'text-chakra-leaf' : 'text-white'}`}>
                                    {item.q}
                                </span>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-chakra-leaf' : ''}`} />
                            </button>

                            <motion.div
                                initial={false}
                                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                                    {item.a}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center p-8 bg-chakra-blue/10 rounded-2xl border border-chakra-blue/20">
                    <p className="text-white mb-4 font-medium">¿Tienes otra pregunta?</p>
                    <a href="https://wa.me/51973001933" target="_blank" className="inline-flex items-center gap-2 text-chakra-leaf hover:text-emerald-400 font-bold transition-colors">
                        Escríbenos al WhatsApp <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
