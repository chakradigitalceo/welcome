
import { motion } from 'framer-motion';
import { MapPin, Sprout, Handshake } from 'lucide-react';

const HowItWorksSection = () => {
    const steps = [
        {
            id: 1,
            title: "Registro Satelital",
            desc: "Olvídate del papeleo físico. Georreferenciamos tu cultivo desde el celular para validar tu potencial productivo en minutos.",
            icon: <MapPin className="w-8 h-8 text-white" />,
            color: "bg-emerald-500"
        },
        {
            id: 2,
            title: "Crédito Inteligente",
            desc: "El capital se adapta a tu ciclo. Recibe insumos y servicios justo cuando tu planta los necesita, sin intereses que te ahoguen.",
            icon: <Sprout className="w-8 h-8 text-white" />,
            color: "bg-chakra-blue"
        },
        {
            id: 3,
            title: "Comercialización Directa",
            desc: "Cerramos el círculo. Conectamos tu cosecha con compradores industriales, liquidamos el crédito y transferimos tu ganancia.",
            icon: <Handshake className="w-8 h-8 text-white" />,
            color: "bg-orange-500"
        }
    ];

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[55%] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -z-0"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                        Tecnología avanzada por dentro. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-chakra-leaf">Simplicidad total por fuera.</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        La ingeniería financiera más compleja, simplificada en una experiencia de 3 pasos para el productor.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className={`w-20 h-20 rounded-2xl ${step.color} shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center mb-8 relative z-10 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                {step.icon}
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xl">
                                    {step.id}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                            <p className="text-gray-400 leading-relaxed px-4">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-20 text-center">
                <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-semibold transition-all backdrop-blur-sm">
                    Empezar mi registro
                </button>
            </div>

        </section>
    );
};

export default HowItWorksSection;
