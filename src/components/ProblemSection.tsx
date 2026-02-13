
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Scale } from 'lucide-react';

const ProblemSection = () => {
    return (
        <section className="py-24 bg-chakra-bg relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                        La agricultura es un negocio de <br />
                        <span className="text-red-400">altísimo riesgo financiero.</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        El sistema tradicional no entiende el campo. Esto crea un ciclo de deuda informal y baja productividad.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <AlertTriangle className="w-8 h-8 text-red-400" />,
                            title: "Riesgo No Calculado",
                            desc: "Bancos rechazan el 85% de solicitudes por falta de garantías urbanas."
                        },
                        {
                            icon: <TrendingDown className="w-8 h-8 text-orange-400" />,
                            title: "Intereses Abusivos",
                            desc: "El crédito informal (chulco) cobra hasta 10% mensual, comiendo la utilidad."
                        },
                        {
                            icon: <Scale className="w-8 h-8 text-gray-300" />,
                            title: "Mercado Injusto",
                            desc: "Sin liquidez, el agricultor malvende su cosecha al primer intermediario."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all hover:-translate-y-1"
                        >
                            <div className="bg-black/40 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
