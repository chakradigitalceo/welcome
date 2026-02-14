import { motion } from 'framer-motion';
import { ArrowRight, Store, TrendingUp, Users, ShoppingBag, Truck, DollarSign, BarChart } from 'lucide-react';
import SEO from '../components/SEO';
import { useState } from 'react';
import Toast from '../components/Toast';

const PartnersPage = () => {

    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [formData, setFormData] = useState({
        comercio: '',
        propietario: '',
        email: '',
        whatsapp: '',
        ubicacion: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Homologación de datos para el Excel único
        const logData = {
            fecha: new Date().toLocaleString(),
            perfil: 'Aliado Comercial',
            nombre_empresa: formData.comercio,    // Se mapea a la columna de empresa
            nombre_contacto: formData.propietario, // Se mapea a la columna de contacto
            email: formData.email,
            whatsapp: formData.whatsapp,
            ubicacion: formData.ubicacion         // NUEVO CAMPO
        };

        try {
            const response = await fetch('https://sheetdb.io/api/v1/g4hc3d01zv32n', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [logData] })
            });

            if (response.ok) {
                setShowToast(true);
                setFormData({ comercio: '', propietario: '', email: '', whatsapp: '', ubicacion: '' });
            }
        } catch (error) {
            console.error("Error al registrar aliado:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-950 min-h-screen text-white font-sans">
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                message="¡Inscripción Exitosa!"
                description="Un ejecutivo comercial te contactará en las próximas 24 horas para validar tu comercio."
            />
            <SEO
                title="Red de Aliados Comerciales Agrícolas | Tiendas de Fertilizantes | Chakra"
                description="Convierte tu agroservicio en un punto de crédito Chakra. Tráfico garantizado, pago inmediato, cero riesgo de cartera vencida. Ideal para tiendas de fertilizantes, semillas e insumos agrícolas."
                keywords="tiendas agrícolas, agroservicios, tiendas fertilizantes, venta fertilizantes, venta semillas, insumos agrícolas, distribuidores agrícolas, comercio agrícola, red de aliados agrícolas, punto de venta agrícola, crédito para agroservicios, financiamiento tiendas agrícolas, cartera vencida agricultura, pago garantizado, tráfico clientes agrícolas"
                themeColor="#f97316"
            />
            {/* Hero Section */}
            <section className="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white flex items-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/95 to-zinc-950/60 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200"
                        alt="Agroservicio"
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
                            <div className="inline-flex items-center space-x-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 backdrop-blur-md mb-8">
                                <Store className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-semibold tracking-wide text-orange-500">Red de Aliados Comerciales</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
                                Convierte tu agroservicio en <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">un punto de crédito.</span>
                            </h1>

                            <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-12">
                                Te enviamos clientes con cupo aprobado. Tú vendes, nosotros te pagamos. <br className="hidden lg:block" />
                                Cero riesgo de cartera vencida.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#registro-aliado" className="group px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-orange-500/30 hover:scale-105">
                                    Inscribir mi Comercio
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            <div className="mt-16 flex flex-wrap items-center gap-8 text-sm font-medium text-gray-400 border-t border-white/10 pt-8">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-orange-500" />
                                    <span>Tráfico garantizado</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-orange-500" />
                                    <span>Pago inmediato</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-orange-500" />
                                    <span>Sin riesgo</span>
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
                            Vender insumos es rentable. <br />
                            <span className="text-gray-500">Cobrarlos, no.</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            El 60% de los agroservicios tiene problemas de cartera vencida por crédito directo.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Cartera Vencida", desc: "Fías a tus clientes y muchos no pagan a tiempo." },
                            { title: "Capital Atrapado", desc: "Tu dinero está en deudas, no en inventario nuevo." },
                            { title: "Clientes Limitados", desc: "Solo vendes a quien ya conoces y confías." }
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
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-orange-600 uppercase bg-orange-100 rounded-full border border-orange-200">
                            Cómo Funciona
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-6">
                            Conviértete en un <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Punto Chakra.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Users className="w-8 h-8 text-orange-600" />,
                                title: "Tráfico de Clientes",
                                desc: "Te enviamos agricultores con cupo de crédito pre-aprobado, listos para comprar."
                            },
                            {
                                icon: <DollarSign className="w-8 h-8 text-emerald-600" />,
                                title: "Pago Garantizado",
                                desc: "Chakra te paga directamente a tu cuenta bancaria contra entrega del producto."
                            },
                            {
                                icon: <ShoppingBag className="w-8 h-8 text-blue-600" />,
                                title: "Cero Riesgo de Cobro",
                                desc: "No fías. El agricultor usa su línea Chakra, tú recibes el pago inmediato."
                            },
                            {
                                icon: <Truck className="w-8 h-8 text-purple-600" />,
                                title: "Logística Integrada",
                                desc: "Coordina entregas masivas y optimiza tu inventario con nuestra previsión de demanda."
                            },
                            {
                                icon: <BarChart className="w-8 h-8 text-indigo-600" />,
                                title: "Dashboard de Ventas",
                                desc: "Ve en tiempo real cuántos clientes Chakra están cerca de tu tienda."
                            },
                            {
                                icon: <TrendingUp className="w-8 h-8 text-green-600" />,
                                title: "Crecimiento Predecible",
                                desc: "Sabemos cuándo siembran tus clientes. Te avisamos antes de la demanda."
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
            <section className="py-24 bg-gradient-to-br from-orange-600 to-amber-600 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-white">Resultados de Nuestros Aliados</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { value: "127", label: "Comercios Activos" },
                            { value: "+40%", label: "Incremento en Ventas" },
                            { value: "0%", label: "Cartera Vencida" },
                            { value: "48h", label: "Tiempo de Pago" }
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
                                <div className="text-orange-100 font-medium">{metric.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-zinc-950">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-16 text-center">
                        Aliados que Crecen con Nosotros
                    </h2>
                    <div className="space-y-8">
                        {[
                            {
                                name: "Ing. Mariela Vásquez",
                                role: "Propietaria, AgroInsumos del Norte",
                                location: "Chiclayo, Lambayeque",
                                text: "Mis ventas subieron un 40% porque los clientes ahora tienen cupo aprobado por Chakra. Y lo mejor: cero riesgo de cartera vencida."
                            },
                            {
                                name: "Roberto Campos",
                                role: "Gerente, Semillas y Fertilizantes La Cosecha",
                                location: "Trujillo, La Libertad",
                                text: "Antes perdía noches pensando en quién me iba a pagar. Ahora Chakra me deposita en 48 horas. Es otro nivel de tranquilidad."
                            }
                        ].map((t, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                                <p className="text-xl text-gray-300 italic mb-6">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500"></div>
                                    <div>
                                        <div className="font-bold text-white">{t.name}</div>
                                        <div className="text-sm text-orange-500">{t.role}</div>
                                        <div className="text-xs text-gray-500">{t.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="registro-aliado" className="py-24 bg-gradient-to-br from-zinc-950 to-black border-t border-white/5">
                <div className="container mx-auto px-6 max-w-2xl text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Únete a la Red de Aliados Chakra
                    </h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Inscripción gratuita. Aprobación en menos de 48 horas.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name='comercio'
                            value={formData.comercio}
                            onChange={handleChange}
                            placeholder="Nombre del comercio"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        <input
                            type="text"
                            name='propietario'
                            value={formData.propietario}
                            onChange={handleChange}
                            placeholder="Nombre del propietario"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        <input
                            type="email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        <input
                            type="tel"
                            name='whatsapp'
                            value={formData.whatsapp}
                            onChange={handleChange}
                            placeholder="Teléfono / WhatsApp"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        <input
                            type="text"
                            name='ubicacion'
                            value={formData.ubicacion}
                            onChange={handleChange}
                            placeholder="Ubicación (ciudad, región)"
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        <button type='submit' disabled={loading} className="w-full px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-orange-500/30 hover:scale-105">
                            {loading ? 'Procesando...' : 'Inscribir mi Comercio'}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-500">
                        Un ejecutivo comercial te contactará en menos de 24 horas para validar tu comercio.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default PartnersPage;
