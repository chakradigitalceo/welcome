
import { motion } from 'framer-motion';

const MetricsSection = () => {
    return (
        <section className="bg-gradient-to-r from-chakra-leaf to-emerald-700 py-16 relative overflow-hidden">

            {/* Decorative lines */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20"></div>

            <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">

                {[
                    { val: "+90", label: "Hectáreas Financiadas" },
                    { val: "95%", label: "Tasa de Repago" },
                    { val: "$0", label: "Efectivo en Campo" },
                    { val: "100%", label: "Trazabilidad Digital" }
                ].map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl lg:text-6xl font-bold text-white mb-2 drop-shadow-md">
                            {m.val}
                        </div>
                        <div className="text-sm font-semibold text-green-100 uppercase tracking-widest border-t border-white/20 pt-4 inline-block px-4">
                            {m.label}
                        </div>
                    </motion.div>
                ))}

            </div>
        </section>
    );
};

export default MetricsSection;
