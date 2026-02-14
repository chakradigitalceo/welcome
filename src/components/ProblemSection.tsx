import { motion } from 'framer-motion';
import { XCircle, AlertOctagon, TrendingDown } from 'lucide-react';

const ProblemSection = () => {
    return (
        <section className="py-24 bg-zinc-950 px-6 relative overflow-hidden border-b border-white/5">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-red-400 uppercase bg-red-400/10 rounded-full border border-red-400/20">
                            <AlertOctagon className="w-3 h-3" />
                            Realidad Actual
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-[1.1]">
                            El campo produce. <br />
                            <span className="text-gray-500">El banco pone las trabas.</span>
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8">
                            Eres un productor de alto rendimiento, pero el sistema financiero te trata como un riesgo incalculable.
                        </p>

                        <div className="space-y-6">
                            {[
                                { title: "Crédito a destiempo", desc: "El dinero llega cuando la siembra ya pasó." },
                                { title: "Garantías imposibles", desc: "Te piden hipotecar la casa para sembrar una hectárea." },
                                { title: "Sin historial real", desc: "Tu experiencia de años no cuenta para el banco." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1">
                                        <XCircle className="w-6 h-6 text-red-500/50" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">{item.title}</h4>
                                        <p className="text-gray-500 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:w-1/2 relative"
                    >
                        {/* Dramatic "Old Way" Card */}
                        <div className="relative z-10 bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
                            <div className="absolute -top-6 -right-6 bg-red-500 text-white w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold shadow-lg shadow-red-900/40 rotate-12 z-20">
                                <span className="text-xs opacity-80">Tasa</span>
                                <span className="text-xl">38%</span>
                            </div>

                            <div className="space-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="h-4 bg-zinc-800 rounded w-1/3 mb-8"></div>
                                <div className="space-y-3">
                                    <div className="h-2 bg-zinc-800 rounded w-full"></div>
                                    <div className="h-2 bg-zinc-800 rounded w-5/6"></div>
                                    <div className="h-2 bg-zinc-800 rounded w-4/6"></div>
                                </div>
                                <div className="p-4 bg-black/30 rounded-xl border border-white/5 mt-8">
                                    <div className="flex items-center gap-3 text-red-400">
                                        <TrendingDown className="w-6 h-6" />
                                        <span className="font-mono text-sm">SOLICITUD RECHAZADA</span>
                                    </div>
                                </div>
                            </div>

                            {/* Overlay message */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-zinc-950/80 backdrop-blur-sm border border-white/10 px-6 py-4 rounded-xl shadow-2xl">
                                    <span className="text-gray-300 font-medium">El modelo tradicional <span className="text-white font-bold">está roto.</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Background decorative elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-500/5 blur-3xl rounded-full -z-0"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
