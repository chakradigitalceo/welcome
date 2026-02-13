
import { motion } from 'framer-motion';
import { ScanEye, Wallet, Store, ArrowRight } from 'lucide-react';

const SolutionSection = () => {
    return (
        <section className="py-24 bg-chakra-bg relative overflow-hidden">

            {/* Background Blob */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-chakra-leaf/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-3 text-center mb-12">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-chakra-leaf uppercase bg-green-900/10 rounded-full border border-green-900/30">
                        Propuesta de Valor
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                        La infraestructura que el <br />agro estaba esperando.
                    </h2>
                </div>

                {[
                    {
                        icon: <ScanEye className="w-10 h-10 text-emerald-400" />,
                        title: "Ojos en el Cielo",
                        desc: "Análisis satelital (NDVI/EVI) para medir salud del cultivo y predecir toneladas.",
                        color: "group-hover:text-emerald-400"
                    },
                    {
                        icon: <Wallet className="w-10 h-10 text-chakra-blue" />,
                        title: "Billetera Digital",
                        desc: "Crédito desembolsado por hitos productivos directamente a proveedores.",
                        color: "group-hover:text-chakra-blue"
                    },
                    {
                        icon: <Store className="w-10 h-10 text-orange-400" />,
                        title: "Red Comercial",
                        desc: "Unimos agricultores con compradores industriales para asegurar la venta.",
                        color: "group-hover:text-orange-400"
                    }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ margin: "-100px", once: true }}
                        className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all hover:-translate-y-2 group cursor-pointer relative overflow-hidden"
                    >
                        <div className="bg-black/40 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                            {item.icon}
                        </div>
                        <h3 className={`text-2xl font-bold text-white mb-4 transition-colors ${item.color}`}>{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-lg mb-8">
                            {item.desc}
                        </p>
                        <div className="flex items-center text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                            Ver más <ArrowRight className="w-4 h-4 ml-2" />
                        </div>

                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </motion.div>
                ))}

            </div>
        </section>
    );
};

export default SolutionSection;
