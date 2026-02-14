
import { motion } from 'framer-motion';
import { ScanEye, Wallet, Store, ArrowRight, CheckCircle2 } from 'lucide-react';

const SolutionSection = () => {
    return (
        <section className="py-24 bg-zinc-50 relative overflow-hidden text-zinc-900">

            {/* Subtle textured background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left Side: Editorial Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-chakra-leaf uppercase bg-green-100 rounded-full border border-green-200">
                        Nuestra Fórmula
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-zinc-900 leading-tight tracking-tight">
                        Infraestructura <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-chakra-leaf to-emerald-600">Financiera Real.</span>
                    </h2>
                    <p className="text-zinc-600 text-lg mb-8 leading-relaxed max-w-md">
                        Combinamos tecnología satelital y capital estructurado para crear un ecosistema donde todos ganan. Sin fricción.
                    </p>

                    <div className="space-y-4">
                        {[
                            "Aprobación basada en datos, no en papeles.",
                            "Desembolsos inteligentes por hitos de cultivo.",
                            "Venta asegurada con compradores industriales."
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-6 h-6 rounded-full bg-chakra-leaf/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-chakra-leaf" />
                                </div>
                                <span className="font-medium text-zinc-700">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <button className="mt-10 px-8 py-4 bg-zinc-900 text-white rounded-full font-semibold hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-xl shadow-zinc-900/10 group">
                        Conocer más
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>

                {/* Right Side: Bento Grid Cards */}
                <div className="grid gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 hover:border-emerald-100 hover:shadow-emerald-500/10 transition-all duration-500 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700 origin-top-right">
                            <ScanEye className="w-32 h-32 text-chakra-leaf" />
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 text-emerald-600">
                            <ScanEye className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">Visibilidad Total</h3>
                        <p className="text-zinc-500 leading-relaxed">
                            Monitoreo satelital constante (NDVI/EVI). Vemos lo que pasa en el campo antes que nadie.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 hover:border-blue-100 hover:shadow-blue-500/10 transition-all duration-500 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-chakra-blue group-hover:rotate-6 transition-transform">
                                <Wallet className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 mb-2">Liquidez</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                Crédito revolvente automático.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-zinc-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group text-white relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-chakra-leaf/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white group-hover:-translate-y-1 transition-transform">
                                <Store className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Comercio</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
                                Conexión directa al mercado.
                            </p>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SolutionSection;
