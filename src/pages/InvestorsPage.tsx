import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, BarChart3, Satellite, PieChart, DollarSign } from 'lucide-react';
import SEO from '../components/SEO';
import { useState } from 'react';
import Toast from '../components/Toast';

const InvestorsPage = () => {

    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        monto: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const logData = {
            fecha: new Date().toLocaleString(),
            perfil: 'Inversionista (Landing)',
            nombre_completo: formData.nombre,
            email: formData.email,
            monto_usd: formData.monto, // CAMPO ESPECÍFICO
        };

        try {
            const response = await fetch('https://sheetdb.io/api/v1/g4hc3d01zv32n', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [logData] })
            });

            if (response.ok) {
                setShowToast(true);
                setFormData({ nombre: '', email: '', monto: '' });
            }
        } catch (error) {
            console.error("Error log:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-950 min-h-screen text-white font-sans">
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                message="Deck Informativo Enviado"
                description="Gracias por tu interés. Hemos recibido tu solicitud y te contactaremos pronto."
            />
            <SEO
                title="Inversión Agrícola con Datos Satelitales | Retornos 6-11% TIR | Chakra"
                description="Invierte en agricultura con datos, no con fe. Portafolios diversificados monitoreados 24/7 por satélite. Retornos de 6-11% anual con impacto social medible. Inversión en agro peruano."
                keywords="inversión agrícola, invertir en agricultura, inversión agro, agtech inversión, inversión impacto social, inversión sostenible, retorno inversión agrícola, fondos agrícolas, inversión cultivos, tecnología agrícola inversión, monitoreo satelital inversión, diversificación portafolio, inversión alternativa, inversión real assets, agricultura de precisión inversión, agribusiness inversión, venture capital agro, private equity agricultura"
                themeColor="#2234BC"
            />
            {/* Hero Section */}
            <section className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white flex items-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/95 to-zinc-950/60 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                    <img
                        src="https://i.pinimg.com/736x/fb/7e/23/fb7e23f6806d67758728d82d5d4c9ffc.jpg"
                        alt="Inversión Agrícola"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-20 py-32">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center space-x-2 bg-chakra-blue/25 border border-chakra-blue/50 rounded-full px-4 py-2 backdrop-blur-md mb-8">
                                <PieChart className="w-4 h-4 text-blue-500" />
                                <span className="text-sm font-semibold tracking-wide text-blue-500">Inversión de Impacto + Retorno Predecible</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
                                Invierte en agricultura <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-chakra-blue to-blue-400">con datos, no con fe.</span>
                            </h1>

                            <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-12">
                                Portafolios diversificados, monitoreados 24/7 por satélite. <br className="hidden lg:block" />
                                Retornos de 6-11% anual con impacto social medible.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#registro-inversor" className="group px-10 py-5 bg-chakra-blue hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-chakra-blue/30 hover:scale-105">
                                    Ver Oportunidades
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            <div className="mt-16 flex flex-wrap items-center gap-8 text-sm font-medium text-gray-400 border-t border-white/10 pt-8">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-chakra-blue" />
                                    <span>Garantía satelital</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-chakra-blue" />
                                    <span>6-11% TIR</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-chakra-blue" />
                                    <span>Diversificación geográfica</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-24 bg-zinc-950 px-6 relative overflow-hidden border-b border-white/10">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            El agro es rentable. <br />
                            <span className="text-gray-500">Los vehículos tradicionales, no.</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Fondos agrícolas tradicionales tienen opacidad, baja liquidez y retornos impredecibles.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Opacidad Total", desc: "No sabes qué cultivos financias ni su estado real." },
                            { title: "Liquidez Nula", desc: "Tu capital queda atrapado por años sin salida." },
                            { title: "Riesgo Concentrado", desc: "Un mal año climático destruye todo el portafolio." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-chakra-blue uppercase bg-blue-100 rounded-full border border-blue-200">
                            Nuestra Propuesta
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
                            Tecnología que convierte <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chakra-blue to-blue-600">riesgo en datos.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Satellite className="w-8 h-8 text-chakra-blue" />,
                                title: "Monitoreo Satelital 24/7",
                                desc: "Cada hectárea es rastreada diariamente. NDVI, humedad, crecimiento en tiempo real."
                            },
                            {
                                icon: <PieChart className="w-8 h-8 text-emerald-600" />,
                                title: "Diversificación Automática",
                                desc: "Tu inversión se distribuye en 50+ cultivos en 5 regiones. Riesgo descorrelacionado."
                            },
                            {
                                icon: <DollarSign className="w-8 h-8 text-blue-600" />,
                                title: "Pago Directo del Off-Taker",
                                desc: "El comprador industrial paga directamente. Sin intermediarios, sin riesgo de cobro."
                            },
                            {
                                icon: <Shield className="w-8 h-8 text-purple-600" />,
                                title: "Seguro Paramétrico",
                                desc: "Clima extremo activa pagos automáticos. Tu capital está protegido."
                            },
                            {
                                icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
                                title: "Dashboard en Vivo",
                                desc: "Ve cada cultivo, su salud, proyección de cosecha y retorno esperado."
                            },
                            {
                                icon: <TrendingUp className="w-8 h-8 text-green-600" />,
                                title: "Liquidez Secundaria",
                                desc: "Vende tu posición en el mercado secundario antes de la cosecha."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-zinc-50 border border-zinc-200 p-8 rounded-3xl hover:shadow-xl hover:shadow-zinc-200/50 transition-all hover:-translate-y-1"
                            >
                                <div className="mb-6">{item.icon}</div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-3">{item.title}</h3>
                                <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="py-24 bg-gradient-to-br from-chakra-blue to-blue-900 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-white">Resultados que Hablan</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { value: "US$8.2M", label: "Activos Bajo Gestión" },
                            { value: "15.4%", label: "TIR Promedio 2024" },
                            { value: "2,840", label: "Hectáreas Monitoreadas" },
                            { value: "0%", label: "Defaults Históricos" }
                        ].map((metric, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl"
                            >
                                <div className="text-5xl font-bold mb-2 text-white">{metric.value}</div>
                                <div className="text-blue-200 font-medium">{metric.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-zinc-950">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-16 text-center">
                        Inversionistas que Confían
                    </h2>
                    <div className="space-y-8">
                        {[
                            {
                                name: "Carlos Mendoza",
                                role: "Family Office",
                                text: "Buscábamos descorrelación del mercado tradicional. Chakra nos dio acceso a un activo real con visibilidad que ni los REITs tienen."
                            },
                            {
                                name: "Ana Gutiérrez",
                                role: "Fondo de Impacto",
                                text: "Finalmente podemos medir el impacto social en tiempo real. Cada dólar invertido se traduce en hectáreas productivas y familias beneficiadas."
                            }
                        ].map((t, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                                <p className="text-xl text-gray-300 italic mb-6">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-chakra-blue to-blue-600"></div>
                                    <div>
                                        <div className="font-bold text-white">{t.name}</div>
                                        <div className="text-sm text-chakra-blue">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="registro-inversor" className="py-24 bg-gradient-to-br from-zinc-950 to-black border-t border-white/5">
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Empieza a Invertir en Agricultura Real
                    </h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Mínimo de inversión: US$50,000. Plazo: 6-12 meses.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name='nombre'
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre completo"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-chakra-blue transition-colors"
                        />
                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email corporativo"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-chakra-blue transition-colors"
                        />
                        <input
                            type="text"
                            name='monto'
                            value={formData.monto}
                            onChange={handleChange}
                            placeholder="Monto a invertir (USD)"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-chakra-blue transition-colors"
                        />
                        <button type='submit' disabled={loading} className="w-full px-10 py-5 bg-chakra-blue hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-chakra-blue/30 hover:scale-105">
                            {loading ? 'Procesando...' : 'Solicitar Información'}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-500">
                        Un asesor se contactará contigo en menos de 24 horas.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default InvestorsPage;
