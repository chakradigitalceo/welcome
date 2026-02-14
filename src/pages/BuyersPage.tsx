import { motion } from 'framer-motion';
import { ArrowRight, Package, Clock, ShieldCheck, Truck, BarChart3, Leaf } from 'lucide-react';

const BuyersPage = () => {
    return (
        <div className="bg-zinc-950 min-h-screen text-white font-sans">

            {/* Hero Section */}
            <section className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white flex items-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/95 to-zinc-950/60 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200"
                        alt="Agricultura Industrial"
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
                            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 backdrop-blur-md mb-8">
                                <Package className="w-4 h-4 text-purple-500" />
                                <span className="text-sm font-semibold tracking-wide text-purple-500">Compra Directa del Productor</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
                                Asegura tu abastecimiento <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-violet-500">antes de la siembra.</span>
                            </h1>

                            <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-12">
                                Contratos forward con productores financiados por Chakra. <br className="hidden lg:block" />
                                Calidad garantizada, trazabilidad satelital, entrega puntual.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#registro-comprador" className="group px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-purple-600/30 hover:scale-105">
                                    Solicitar Abastecimiento
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            <div className="mt-16 flex flex-wrap items-center gap-8 text-sm font-medium text-gray-400 border-t border-white/10 pt-8">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-purple-500" />
                                    <span>Calidad certificada</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-purple-500" />
                                    <span>Entrega puntual</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Leaf className="w-5 h-5 text-purple-500" />
                                    <span>Trazabilidad total</span>
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
                            Comprar cosecha es fácil. <br />
                            <span className="text-gray-500">Asegurar abastecimiento, no.</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            El 70% de agroexportadoras sufre desabastecimiento por incumplimiento de productores.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Incertidumbre de Volumen", desc: "No sabes cuánto te van a entregar hasta el día de la cosecha." },
                            { title: "Calidad Inconsistente", desc: "Cada lote es una sorpresa. Sin estándares ni trazabilidad." },
                            { title: "Intermediarios Caros", desc: "Pagas sobreprecio a acopiadores que no agregan valor real." }
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
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-purple-600 uppercase bg-purple-100 rounded-full border border-purple-200">
                            Nuestra Propuesta
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
                            Contratos forward con <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">productores monitoreados.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Leaf className="w-8 h-8 text-purple-600" />,
                                title: "Contratos Pre-Siembra",
                                desc: "Acuerda precio, volumen y calidad ANTES de sembrar. El productor recibe financiamiento Chakra para cumplir."
                            },
                            {
                                icon: <Package className="w-8 h-8 text-emerald-600" />,
                                title: "Monitoreo Satelital 24/7",
                                desc: "Ve en tiempo real el estado del cultivo. NDVI, humedad, proyección de rendimiento actualizada diariamente."
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
                                title: "Calidad Certificada",
                                desc: "Protocolos de cultivo supervisados. Certificaciones orgánicas, GlobalGAP, o tu estándar específico."
                            },
                            {
                                icon: <Truck className="w-8 h-8 text-orange-600" />,
                                title: "Logística Integrada",
                                desc: "Coordinamos cosecha, empaque y transporte. Tú solo recibes el producto en tu planta."
                            },
                            {
                                icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
                                title: "Trazabilidad Blockchain",
                                desc: "Cada lote rastreado desde la semilla. Historial completo para auditorías y certificaciones."
                            },
                            {
                                icon: <Clock className="w-8 h-8 text-green-600" />,
                                title: "Entrega Garantizada",
                                desc: "Seguro paramétrico cubre clima extremo. Si el productor no cumple, Chakra te indemniza."
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

            {/* How It Works */}
            <section className="py-24 bg-zinc-950 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Cómo Funciona el Proceso
                        </h2>
                        <p className="text-xl text-gray-400">
                            De la negociación a la entrega en 4 pasos simples.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Defines tu Necesidad",
                                desc: "Nos dices qué cultivo, qué volumen, qué calidad y cuándo lo necesitas. Nosotros buscamos productores en nuestra red."
                            },
                            {
                                step: "02",
                                title: "Contrato Forward",
                                desc: "Firmas contrato con el productor. Chakra lo financia para que siembre según tus especificaciones."
                            },
                            {
                                step: "03",
                                title: "Monitoreo en Vivo",
                                desc: "Accedes a dashboard satelital. Ves el progreso del cultivo, alertas climáticas y proyección de cosecha."
                            },
                            {
                                step: "04",
                                title: "Entrega Certificada",
                                desc: "Cosecha, empaque y transporte coordinados. Recibes el producto con certificado de calidad y trazabilidad."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative bg-white/5 border border-white/10 p-8 rounded-3xl"
                            >
                                <div className="text-6xl font-bold text-purple-500/20 absolute top-4 right-4">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed relative z-10">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="py-24 bg-gradient-to-br from-purple-600 to-violet-700 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-white">Resultados Comprobados</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { value: "1,240", label: "Toneladas Entregadas" },
                            { value: "98.5%", label: "Tasa de Cumplimiento" },
                            { value: "15", label: "Agroexportadoras Activas" },
                            { value: "-22%", label: "Reducción de Costos" }
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
                                <div className="text-purple-100 font-medium">{metric.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-zinc-950">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-16 text-center">
                        Compradores que Confían en Nosotros
                    </h2>
                    <div className="space-y-8">
                        {[
                            {
                                name: "Luis Ramírez",
                                role: "Director de Abastecimiento",
                                company: "AgroExport del Perú S.A.",
                                text: "Antes perdíamos el 30% de contratos por incumplimiento. Con Chakra, tenemos 98% de cumplimiento y visibilidad total del cultivo desde el día 1."
                            },
                            {
                                name: "Patricia Sánchez",
                                role: "Gerente de Compras",
                                company: "Mercado Mayorista Central",
                                text: "La trazabilidad satelital nos permite certificar origen y calidad. Nuestros clientes retail ahora pagan premium por esa garantía."
                            }
                        ].map((t, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                                <p className="text-xl text-gray-300 italic mb-6">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600"></div>
                                    <div>
                                        <div className="font-bold text-white">{t.name}</div>
                                        <div className="text-sm text-purple-400">{t.role}</div>
                                        <div className="text-xs text-gray-500">{t.company}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
                            Ideal Para
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Agroexportadoras",
                                desc: "Contratos de exportación con volúmenes garantizados"
                            },
                            {
                                title: "Industria Alimentaria",
                                desc: "Materia prima con estándares de calidad certificados"
                            },
                            {
                                title: "Retail / Supermercados",
                                desc: "Abastecimiento directo con trazabilidad completa"
                            },
                            {
                                title: "Mercados Mayoristas",
                                desc: "Volúmenes predecibles para planificación de inventario"
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl text-center">
                                <h3 className="text-lg font-bold text-zinc-900 mb-3">{item.title}</h3>
                                <p className="text-sm text-zinc-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="registro-comprador" className="py-24 bg-gradient-to-br from-zinc-950 to-black border-t border-white/5">
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Asegura tu Abastecimiento Hoy
                    </h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Cuéntanos qué necesitas y te conectamos con productores certificados.
                    </p>

                    <form className="space-y-6">
                        <input
                            type="text"
                            placeholder="Nombre de la empresa"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <input
                            type="text"
                            placeholder="Nombre del contacto"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <input
                            type="email"
                            placeholder="Email corporativo"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <input
                            type="text"
                            placeholder="Tipo de cultivo que necesitas"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <input
                            type="text"
                            placeholder="Volumen mensual aproximado (toneladas)"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <button className="w-full px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-purple-600/30 hover:scale-105">
                            Solicitar Información
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-500">
                        Un especialista en abastecimiento te contactará en menos de 24 horas.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default BuyersPage;
