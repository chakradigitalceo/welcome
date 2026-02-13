
import { motion } from 'framer-motion';
import { Satellite, Code2, Database, ShieldCheck } from 'lucide-react';

const TechSection = () => {
    return (
        <section className="py-24 bg-chakra-bg relative overflow-hidden flex flex-col items-center justify-center">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
                        Financiamos datos, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-chakra-leaf to-emerald-300">no promesas.</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Nuestra tecnología propietaria elimina la subjetividad. Transformamos la incertidumbre del clima en riesgo medible.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {[
                        {
                            icon: <Satellite className="w-6 h-6 text-emerald-400" />,
                            title: "Imágenes Multiespectrales",
                            desc: "Monitoreo satelital diario para detectar estrés hídrico y plagas."
                        },
                        {
                            icon: <Code2 className="w-6 h-6 text-chakra-blue" />,
                            title: "Algoritmos Predictivos",
                            desc: "Machine Learning entrenado con 10 años de data climática."
                        },
                        {
                            icon: <Database className="w-6 h-6 text-orange-400" />,
                            title: "Big Data Agrícola",
                            desc: "Base de datos de suelos y rendimientos por zona."
                        },
                        {
                            icon: <ShieldCheck className="w-6 h-6 text-gray-300" />,
                            title: "Smart Contracts",
                            desc: "Ejecución automática de desembolsos y cobros."
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group hover:border-white/20"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-black/40 p-2 rounded-lg border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-white text-sm leading-tight">{item.title}</h4>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechSection;
