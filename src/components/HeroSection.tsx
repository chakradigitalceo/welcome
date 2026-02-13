
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, TrendingUp, ShieldCheck, Play } from 'lucide-react';
import useBreakpoint from '../hooks/useBreakpoint';

const slides = [
    {
        id: 2,
        title: "El momento de decidir es ahora",
        subtitle: "Monitoreamos tu cultivo, financiamos por etapas y organizamos tu cosecha.",
        accent: "text-chakra-leaf",
        image: "https://i.pinimg.com/736x/7e/d5/4d/7ed54dbdd4d5bdbcf1fa670b8faf521e.jpg", // Agricultor moderno
        imageMobile: "https://i.pinimg.com/736x/46/69/b2/4669b2f23e69f1efa540cd8a3b87d702.jpg",
        cta: "Solicitar evaluación"

    },
    {
        id: 1,
        title: "Financiamos Producción, No Promesas",
        subtitle: "Convertimos hectáreas en capital estructurado y medible.",
        accent: "text-chakra-blue",
        image: "https://i.pinimg.com/736x/fb/7e/23/fb7e23f6806d67758728d82d5d4c9ffc.jpg", // Agricultor moderno
        imageMobile: "https://i.pinimg.com/736x/fe/24/f9/fe24f9eb0be6d24ff273c7871307c72e.jpg",
        cta: "Oportunidad de inversión"
    },
    {
        id: 3,
        title: "El crédito agrícola que entiende tu campo",
        subtitle: "Sin hipotecas. Sin trámites interminables. Aprobación rápida con tecnología satelital.",
        accent: "text-emerald-400",
        image: "https://i.pinimg.com/736x/9b/71/52/9b7152a927c79b61b7332a7e0273f2c4.jpg", // Agricultor moderno
        imageMobile: "https://i.pinimg.com/736x/58/80/cb/5880cb44a42ca45d5f1e34bf43d131fb.jpg",
        cta: "Quiero financiamiento"
    }
];

const HeroSection = () => {
    const [current, setCurrent] = useState(0);
    const { isMobile } = useBreakpoint();

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        const timer = setInterval(nextSlide, 9000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-chakra-bg text-chakra-white">
            {/* Background Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0.5, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-chakra-bg via-chakra-bg/80 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-chakra-bg via-transparent to-transparent z-10" />
                    <img
                        src={slides[current].image}
                        alt="Background"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-center">

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        key={`text-${current}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {!isMobile &&
                            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
                                <span className={`w-2 h-2 rounded-full animate-pulse ${current === 0 ? 'bg-chakra-leaf' : current === 1 ? 'bg-chakra-blue' : 'bg-emerald-400'}`}></span>
                                <span className="text-sm font-medium tracking-wide">Ecosistema Fintech</span>
                            </div>
                        }
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            {slides[current].title.split(" ").map((word, i) => (
                                <span key={i} className={i % 3 === 0 ? "text-white" : ""}> {word}</span>
                            ))}
                        </h1>

                        <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                            {slides[current].subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="group px-8 py-4 bg-chakra-leaf/90 hover:bg-green-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/40 hover:scale-105">
                                {slides[current].cta}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                                <Play className="w-4 h-4 fill-current" /> Ver Demo
                            </button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="pt-8 flex items-center gap-8 text-sm font-medium text-gray-400 border-t border-white/10 mt-8">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-chakra-leaf" />
                                <span>Seguro & Transparente</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-chakra-blue" />
                                <span>Crecimiento Real</span>
                            </div>
                        </div>

                    </motion.div>

                    {/* Right Side Visual (Mockup / Floating Cards) */}
                    <div className="hidden lg:block relative h-[500px]">
                        {/* Abstract Floating Elements based on slide */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`visual-${current}`}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                {current === 0 && ( /* Dashboard style */
                                    <div className="relative w-full max-w-md bg-chakra-bg/90 border border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-xs font-mono text-gray-400">SAT-VIEW LINK-01</span>
                                            <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /><div className="w-2 h-2 rounded-full bg-yellow-500" /><div className="w-2 h-2 rounded-full bg-green-500" /></div>
                                        </div>
                                        <div className="h-40 bg-zinc-800 rounded mb-4 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549419163-952b610c37c2?q=80&w=2692&auto=format&fit=crop')] bg-cover opacity-50 mix-blend-overlay"></div>
                                            <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-[10px] text-green-400 border border-green-500/30 rounded">NDVI: 0.85 (Optimo)</div>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <div>
                                                <div className="text-gray-500 text-xs">Rendimiento Est.</div>
                                                <div className="font-bold text-white text-lg">4.2 Ton/Ha</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500 text-xs">Riesgo</div>
                                                <div className="font-bold text-chakra-leaf text-lg">Bajo (A+)</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {current === 2 && ( /* Farmer Mobile App */
                                    <div className="bg-white rounded-[2rem] p-4 w-64 shadow-[0_0_50px_rgba(34,197,94,0.3)] border-4 border-gray-200 rotate-3">
                                        <div className="bg-gray-100 rounded-xl h-96 overflow-hidden relative flex flex-col">
                                            <div className="bg-chakra-leaf h-32 p-4 text-white">
                                                <div className="text-xs opacity-80">Hola, Roberto</div>
                                                <div className="font-bold text-xl mt-1">Tu Crédito</div>
                                                <div className="text-3xl font-bold mt-2">$15,000</div>
                                            </div>
                                            <div className="p-4 space-y-3">
                                                <div className="h-12 bg-white rounded shadow-sm flex items-center px-3 gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100"></div>
                                                    <div className="w-20 h-2 bg-gray-200 rounded"></div>
                                                </div>
                                                <div className="h-12 bg-white rounded shadow-sm flex items-center px-3 gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-green-100"></div>
                                                    <div className="w-24 h-2 bg-gray-200 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="mt-auto p-4">
                                                <div className="w-full h-10 bg-chakra-blue rounded-lg"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {current === 1 && ( /* Investor Graph */
                                    <div className="w-full max-w-md p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl shadow-2xl">
                                        <div className="flex items-end gap-2 h-40 mb-4 px-20">
                                            <motion.div initial={{ height: 0 }} animate={{ height: '30%' }} className="w-8 bg-gray-700 rounded-t" />
                                            <motion.div initial={{ height: 0 }} animate={{ height: '50%' }} className="w-8 bg-gray-600 rounded-t" />
                                            <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} className="w-8 bg-gray-500 rounded-t" />
                                            <motion.div initial={{ height: 0 }} animate={{ height: '70%' }} className="w-8 bg-chakra-leaf rounded-t shadow-[0_0_15px_rgba(69,190,85,0.5)]" />
                                            <motion.div initial={{ height: 0 }} animate={{ height: '90%' }} className="w-8 bg-emerald-400 rounded-t shadow-[0_0_20px_rgba(52,211,153,0.6)]" />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-white mb-1">+18.5%</div>
                                            <div className="text-sm text-gray-500">Retorno Anual Promedio</div>
                                        </div>
                                    </div>
                                )}

                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                {/* Slider Controls */}
                <div className="absolute bottom-10 left-0 right-0 z-30 container mx-auto px-6 flex justify-between items-end">
                    <div className="flex gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-chakra-leaf' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                            />
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button onClick={prevSlide} className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors backdrop-blur-sm group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button onClick={nextSlide} className="p-3 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors backdrop-blur-sm group">
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroSection;
