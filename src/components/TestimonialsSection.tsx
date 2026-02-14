
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-chakra-dark to-black relative">

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        Historias de Crecimiento Real
                    </h2>
                    <p className="text-gray-400 mt-4">
                        Miles de hectáreas sembradas, cientos de familias impactadas.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            role: "Productor de Arroz",
                            name: "Hernesto Benavides",
                            text: "Antes pasaba meses rogando por crédito. Con Chakra, mi historial satelital habló por mí. Aprobado en 48 horas.",
                            loc: "Lambayeque, Perú"
                        },
                        {
                            role: "Propietario de Agroservicio",
                            name: "Ing. Mariela V.",
                            text: "Mis ventas subieron un 40% porque los clientes ahora tienen cupo aprobado por Chakra. Cero riesgo de cartera vencida.",
                            loc: "Chiclayo, Lambayeque"
                        },
                        {
                            role: "Inversionista Institucional",
                            name: "Carlos A.",
                            text: "Buscábamos descorrelación y seguridad. Chakra nos dio visibilidad total del portafolio con datos que los bancos no tienen.",
                            loc: "Lima, Perú"
                        }
                    ].map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-white/5 border border-white/5 p-8 rounded-3xl relative hover:bg-white/10 transition-colors"
                        >
                            <Quote className="w-10 h-10 text-chakra-leaf mb-6 opacity-40" />
                            <p className="text-lg text-gray-300 italic mb-8 leading-relaxed">"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600"></div>
                                <div>
                                    <div className="font-bold text-white">{t.name}</div>
                                    <div className="text-xs text-chakra-leaf font-bold uppercase tracking-wider">{t.role}</div>
                                    <div className="text-[10px] text-gray-500 mt-0.5">{t.loc}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
