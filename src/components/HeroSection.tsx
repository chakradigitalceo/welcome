
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, TrendingUp, Satellite } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/95 to-zinc-950/60 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                <img
                    src="https://i.pinimg.com/736x/34/ad/3b/34ad3b6d17199bb76e8380ffe8154766.jpg"
                    className="w-full h-full object-cover opacity-40"
                />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20 py-32">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-chakra-leaf/10 border border-chakra-leaf/20 rounded-full px-4 py-2 backdrop-blur-md mb-8">
                            <Satellite className="w-4 h-4 text-chakra-leaf" />
                            <span className="text-sm font-semibold tracking-wide text-chakra-leaf">Tecnología Satelital + Crédito Inteligente</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
                            Financia tu cultivo <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chakra-leaf to-emerald-400">sin hipotecar tu tierra.</span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-12">
                            Aprobación en 48 horas con monitoreo satelital. <br className="hidden lg:block" />
                            Tu experiencia y tu cultivo son tu garantía.
                        </p>

                        {/* Single Clear CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#registro" className="group px-10 py-5 bg-chakra-leaf hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-chakra-leaf/30 hover:scale-105">
                                Solicitar Crédito Ahora
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-16 flex flex-wrap items-center gap-8 text-sm font-medium text-gray-400 border-t border-white/10 pt-8">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-chakra-leaf" />
                                <span>Sin garantías físicas</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-chakra-leaf" />
                                <span>Aprobación en 48h</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Satellite className="w-5 h-5 text-chakra-leaf" />
                                <span>100% Digital</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-chakra-leaf rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
