import { motion } from 'framer-motion';
import { Satellite, ShieldCheck, Cpu, BarChart3, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const TechnologyPage = () => {
    return (
        <div className="bg-zinc-950 min-h-screen text-white font-sans">
            <SEO
                title="Tecnología de Monitoreo Satelital y Riesgo | Chakra AgTech"
                description="Descubre cómo Chakra utiliza satélites e inteligencia artificial para eliminar el riesgo agrícola y conectar productores con capital global."
                keywords="tecnología agrícola, monitoreo satelital, agtech peru, inteligencia artificial agro, blockchain agricultura, trazabilidad digital, riesgo agrícola"
                themeColor="#00261B"
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 backdrop-blur-md mb-6">
                            <Cpu className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm font-semibold tracking-wide text-emerald-500 uppercase">Cerebro Satelital Chakra</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
                            Tecnología que da <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">seguridad al campo.</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            No usamos hipotecas porque usamos datos. Monitoreamos cada hectárea desde el espacio para asegurar el éxito de cada campaña.
                        </p>
                    </motion.div>
                </div>

                {/* Background visual detail */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px]"></div>
                </div>
            </section>

            {/* 3 Pillars of Security */}
            <section className="py-24 border-t border-white/5 bg-black/30">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Satellite className="w-10 h-10 text-emerald-400" />,
                                title: "Visión Satelital",
                                desc: "No necesitamos estar físicamente en la parcela. Nuestros satélites miden humedad, clorofila y vigor de la planta cada 24 horas."
                            },
                            {
                                icon: <BarChart3 className="w-10 h-10 text-cyan-400" />,
                                title: "Riesgo Predictivo",
                                desc: "Algoritmos de IA analizan 10 años de historial climático y rendimientos locales para predecir la cosecha con 94% de precisión."
                            },
                            {
                                icon: <ShieldCheck className="w-10 h-10 text-blue-400" />,
                                title: "Trazabilidad Total",
                                desc: "Cada dólar invertido y cada kilo producido tiene un respaldo digital inalterable. Transparencia total para todos."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* High Level Process */}
            <section className="py-24 bg-zinc-950 relative">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Un proceso simple, un respaldo robusto</h2>
                        <p className="text-gray-400">Cómo convertimos datos en financiamiento seguro.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                label: "01. Escaneo de Parcela",
                                text: "Identificamos el lote vía GPS y analizamos su historial productivo de la última década."
                            },
                            {
                                label: "02. Firma Digital Chakra",
                                text: "Proceso 100% digital sin papeles. La garantía es tu reputación y tu cultivo monitoreado."
                            },
                            {
                                label: "03. Monitoreo de Campaña",
                                text: "Alertas tempranas de plagas o sequía enviadas directamente al móvil del productor."
                            },
                            {
                                label: "04. Cierre Logístico",
                                text: "Validación de entrega de cosecha mediante satélite para liquidar retornos automáticamente."
                            }
                        ].map((step, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/[0.07] transition-colors flex items-center gap-6">
                                <span className="text-emerald-500 font-bold text-xl min-w-[40px]">{i + 1}</span>
                                <div>
                                    <h4 className="font-bold text-lg text-white mb-1">{step.label}</h4>
                                    <p className="text-gray-400 text-sm">{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security Proof */}
            <section className="py-24 bg-black border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-br from-zinc-900 to-black rounded-[40px] p-12 border border-white/10 overflow-hidden relative">
                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-6">Tu inversión está blindada por tecnología</h2>
                                <ul className="space-y-4">
                                    {[
                                        "Seguimiento satelital diario",
                                        "Mecanismo de pago off-taker directo",
                                        "Seguros agrícolas paramétricos integrados",
                                        "Validación mediante Blockchain"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">94%</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-widest">Precisión</div>
                                </div>
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
                                    <div className="text-xs text-gray-400 uppercase tracking-widest">Digital</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TechnologyPage;
