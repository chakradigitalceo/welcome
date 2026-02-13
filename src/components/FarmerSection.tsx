
import { motion } from 'framer-motion';
import { Sprout, CheckCircle2 } from 'lucide-react';

const FarmerSection = () => {
    return (
        <section className="py-24 bg-chakra-bg relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-chakra-leaf/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Visual/Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="order-2 lg:order-1 relative"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-white/10">
                        {/* Image from Unsplash - Smiling farmer */}
                        <img
                            src="https://i.pinimg.com/736x/51/f0/4b/51f04b5a3cbc7cbfd2c054b230a4f50e.jpg"
                            alt="Agricultor sonriendo"
                            className="object-cover w-full h-[600px] hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-chakra-bg via-transparent to-transparent opacity-90"></div>

                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg">Carlos Ruíz</div>
                                    <div className="text-chakra-leaf text-sm font-medium">Asociación de Productores</div>
                                </div>
                            </div>
                            <p className="text-gray-200 italic text-sm border-l-2 border-chakra-leaf pl-4">
                                "Chakra entendió mis tiempos de cosecha. El crédito llegó justo para la siembra, sin papeles eternos."
                            </p>
                        </div>
                    </div>

                    {/* Checkmark badge */}
                    <div className="absolute -top-6 -right-6 bg-chakra-leaf text-white p-4 rounded-xl shadow-lg shadow-green-900/40 animate-bounce cursor-pointer hover:bg-green-500 transition-colors">
                        <div className="font-bold text-2xl">100%</div>
                        <div className="text-xs uppercase tracking-wider">Aprobado</div>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2 lg:pl-12"
                >
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-chakra-leaf uppercase bg-green-900/20 rounded-full border border-green-900/30">
                        Para Productores
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                        Tu trabajo es tu garantía. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-chakra-leaf to-emerald-300">Crédito a tu medida.</span>
                    </h2>

                    <p className="text-gray-400 mb-8 text-lg">
                        Olvídate de las garantías hipotecarias. Usamos tecnología satelital para validar tu cultivo y darte el capital que mereces.
                    </p>

                    <div className="space-y-6 mb-10">
                        <div className="flex gap-4 group">
                            <div className="bg-white/5 p-3 rounded-xl h-min group-hover:bg-chakra-leaf transition-colors">
                                <Sprout className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">Cero Trámites Innecesarios</h4>
                                <p className="text-gray-400 text-sm">Registro digital en 5 minutos. Sin viajes a la ciudad.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 group">
                            <div className="bg-white/5 p-3 rounded-xl h-min group-hover:bg-chakra-leaf transition-colors">
                                <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">Historial que Crece</h4>
                                <p className="text-gray-400 text-sm">Empieza pequeño, crece rápido. Aumentamos tu cupo campaña tras campaña.</p>
                            </div>
                        </div>
                    </div>

                    <button className="w-full sm:w-auto px-8 py-4 bg-white text-chakra-bg hover:bg-gray-100 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                        Solicitar Evaluación
                    </button>
                </motion.div>

            </div>
        </section>
    );
};

export default FarmerSection;
