
import { motion } from 'framer-motion';
import { Store, Truck, ShoppingBag, ArrowUpRight } from 'lucide-react';

const PartnerSection = () => {
    return (
        <section className="py-24 bg-zinc-50 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-orange-600 uppercase bg-orange-100 rounded-full border border-orange-200">
                        Red de Aliados
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-zinc-900 leading-tight">
                        Potencia tu Agroservicio. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Vende más, cobra seguro.</span>
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Conviértete en un Punto Chakra. Canalizamos el crédito de nuestros agricultores directamente a tu tienda para la compra de insumos.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Store className="w-8 h-8 text-orange-600" />,
                            title: "Tráfico de Clientes",
                            desc: "Te enviamos agricultores con cupo de crédito aprobado, listos para comprar sus insumos contigo.",
                            bg: "bg-white hover:border-orange-200",
                            shadow: "shadow-lg shadow-orange-900/5"
                        },
                        {
                            icon: <ShoppingBag className="w-8 h-8 text-emerald-600" />,
                            title: "Cero Riesgo de Cobro",
                            desc: "No fías. Chakra te paga directamente a tu cuenta bancaria contra entrega del producto.",
                            bg: "bg-white hover:border-emerald-200",
                            shadow: "shadow-lg shadow-emerald-900/5"
                        },
                        {
                            icon: <Truck className="w-8 h-8 text-blue-600" />,
                            title: "Logística Integrada",
                            desc: "Coordina entregas masivas y optimiza tu inventario con nuestra previsión de demanda.",
                            bg: "bg-white hover:border-blue-200",
                            shadow: "shadow-lg shadow-blue-900/5"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`${item.bg} p-8 rounded-3xl border border-zinc-100 transition-all group cursor-pointer hover:-translate-y-1 ${item.shadow}`}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-black transition-colors">{item.title}</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm">
                                {item.desc}
                            </p>
                            <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 group-hover:text-zinc-900">
                                Ver beneficios <ArrowUpRight className="w-3 h-3 ml-1" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-2 mx-auto">
                        Inscribir mi Comercio
                        <ArrowUpRight className="w-5 h-5" />
                    </button>
                    <p className="mt-4 text-xs text-zinc-400">
                        Unirse a la red de aliados es gratuito y toma menos de 48 horas.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;
