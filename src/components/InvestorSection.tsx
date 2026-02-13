
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

const InvestorSection = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-chakra-bg to-black relative">
            <div className="absolute inset-0 bg-chakra-blue/5 pointer-events-none"></div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-2 gap-16 items-center z-10 relative">

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-chakra-blue uppercase bg-blue-900/10 rounded-full border border-blue-900/30">
                        Inversionistas
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                        La inversión más segura <br />
                        es la que todos necesitamos: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-chakra-blue to-cyan-400">Comida.</span>
                    </h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Invierte en portafolios de crédito agrícola diversificados, respaldados por garantías reales y monitoreados por satélite.
                    </p>

                    <ul className="space-y-4 mb-10">
                        {["Retorno anual objetivo: 15% - 22%", "Diversificación automática entre cultivos y zonas", "Liquidez trimestral disponible"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-300">
                                <CheckCircle2 className="w-5 h-5 text-chakra-blue" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-chakra-blue hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40">
                            Empezar a Invertir
                            <ArrowUpRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-20">
                        <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                            <div>
                                <div className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Valor del Portafolio</div>
                                <div className="text-4xl font-bold text-white">$1,260,090</div>
                            </div>
                            <div className="text-right">
                                <div className="text-emerald-400 font-bold flex items-center justify-end gap-1 text-lg">
                                    +8.4% <ArrowUpRight className="w-4 h-4" />
                                </div>
                                <div className="text-xs text-gray-500">Últimos 30 días</div>
                            </div>
                        </div>

                        {/* Chart Placeholder */}
                        <div className="h-48 flex items-end gap-2 mb-6">
                            {[40, 65, 55, 80, 70, 95, 85].map((h, i) => (
                                <div key={i} className="flex-1 bg-gradient-to-t from-chakra-blue/20 to-chakra-blue rounded-t-lg transition-all hover:opacity-80" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                <div className="text-gray-400 text-xs mb-1">Activos Bajo Gestión</div>
                                <div className="text-white font-bold">96 Hectáreas</div>
                            </div>
                            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                <div className="text-gray-400 text-xs mb-1">Cumplimiento Pagos</div>
                                <div className="text-white font-bold">98.2%</div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative card underneath */}
                    <div className="absolute top-4 -right-4 bg-chakra-leaf/20 w-full h-full rounded-3xl -z-10 blur-xl"></div>
                </motion.div>

            </div>
        </section>
    );
};

export default InvestorSection;
