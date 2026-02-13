
import { motion } from 'framer-motion';
import { Store, Truck, ShoppingBag } from 'lucide-react';

const PartnerSection = () => {
    return (
        <section className="py-24 bg-chakra-dark relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-orange-400 uppercase bg-orange-900/10 rounded-full border border-orange-900/20">
                        Ecosistema Comercial
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white leading-tight">
                        Haz crecer tu Agroservicio. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Ventas aseguradas sin riesgo de cobro.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Conviértete en un Punto Chakra. Canalizamos el crédito de nuestros agricultores directamente a tu tienda.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Store className="w-10 h-10 text-orange-400" />,
                            title: "Más Clientes Aprobados",
                            desc: "Agricultores llegan con cupo listo para usar. Tú vendes, nosotros pagamos.",
                            bg: "bg-orange-500/5 hover:bg-orange-500/10"
                        },
                        {
                            icon: <Truck className="w-10 h-10 text-chakra-leaf" />,
                            title: "Logística Optimizada",
                            desc: "Coordina entregas masivas y reduce costos de transporte.",
                            bg: "bg-chakra-leaf/5 hover:bg-chakra-leaf/10"
                        },
                        {
                            icon: <ShoppingBag className="w-10 h-10 text-chakra-blue" />,
                            title: "Pago Garantizado",
                            desc: "Olvídate de perseguir deudas. El pago se realiza directo a tu cuenta.",
                            bg: "bg-chakra-blue/5 hover:bg-chakra-blue/10"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`${item.bg} p-8 rounded-3xl border border-white/5 transition-colors group cursor-pointer`}
                        >
                            <div className="bg-white/5 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform shadow-lg">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-900/20">
                        Quiero ser Aliado Comercial
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PartnerSection;
