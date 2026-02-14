
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LeadFormSection = () => {
    const [selectedTab, setSelectedTab] = useState<'agricultor' | 'inversionista' | 'aliado'>('agricultor');

    const tabs = [
        { id: 'agricultor', label: 'Soy Productor' },
        { id: 'inversionista', label: 'Quiero Invertir' },
        { id: 'aliado', label: 'Aliado Comercial' }
    ];

    return (
        <section id="registro" className="py-24 bg-gradient-to-br from-zinc-950 to-black relative overflow-hidden border-t border-white/5">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-chakra-leaf/5 mix-blend-overlay pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">Empieza con Chakra</h2>
                    <p className="text-gray-400">Selecciona tu perfil y accede a la nueva era del financiamiento agrícola.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
                    {/* Floating accents */}
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-chakra-leaf rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-chakra-blue rounded-full blur-3xl opacity-20"></div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-10">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id as any)}
                                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${selectedTab === tab.id
                                    ? 'bg-chakra-leaf border-chakra-leaf text-white shadow-lg shadow-green-900/30 font-bold'
                                    : 'bg-transparent border-white/10 text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode='wait'>
                        <motion.form
                            key={selectedTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 gap-6 relative z-10"
                        >
                            <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                                    {selectedTab === 'aliado' ? 'Nombre de la Empresa' : 'Nombre Completo'}
                                </label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all placeholder:text-gray-600" placeholder={selectedTab === 'aliado' ? 'Ej. AgroTienda El Triunfo' : 'Ej. Juan Pérez'} />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Email Corporativo</label>
                                <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all placeholder:text-gray-600" placeholder="nombre@email.com" />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">WhatsApp</label>
                                <input type="tel" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all placeholder:text-gray-600" placeholder="+51 99..." />
                            </div>

                            {selectedTab === 'agricultor' && (
                                <>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Hectáreas (Estimado)</label>
                                        <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all placeholder:text-gray-600" placeholder="Ej. 10 - 500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Cultivo Principal</label>
                                        <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all appearance-none cursor-pointer">
                                            <option className="bg-zinc-900">Maíz</option>
                                            <option className="bg-zinc-900">Arroz</option>
                                            <option className="bg-zinc-900">Soya</option>
                                            <option className="bg-zinc-900">Cacao</option>
                                            <option className="bg-zinc-900">Otro</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {selectedTab === 'inversionista' && (
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Perfil de Inversión</label>
                                    <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all cursor-pointer">
                                        <option className="bg-zinc-900">Ticket Individual ($5k - $50k)</option>
                                        <option className="bg-zinc-900">High Net Worth ($50k - $250k)</option>
                                        <option className="bg-zinc-900">Institucional (+$250k)</option>
                                    </select>
                                </div>
                            )}

                            {selectedTab === 'aliado' && (
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Tipo de Aliado</label>
                                    <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all cursor-pointer">
                                        <option className="bg-zinc-900">Tienda de Insumos / Retail</option>
                                        <option className="bg-zinc-900">Agroindustria / Molino</option>
                                        <option className="bg-zinc-900">Cooperativa / Asociación</option>
                                        <option className="bg-zinc-900">Tecnología / Partners</option>
                                    </select>
                                </div>
                            )}

                            <div className="md:col-span-2 mt-6">
                                <button className="w-full bg-gradient-to-r from-chakra-leaf to-emerald-600 hover:from-chakra-leaf hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-green-900/30 transform hover:-translate-y-0.5">
                                    {selectedTab === 'inversionista' ? 'Solicitar Deck & Reunión' : 'Iniciar Registro'}
                                </button>
                                <p className="text-[10px] text-gray-500 text-center mt-4">
                                    Tus datos están protegidos bajo estándares bancarios. No compartimos información con terceros.
                                </p>
                            </div>

                        </motion.form>
                    </AnimatePresence>

                </div>
            </div>
        </section>
    );
};

export default LeadFormSection;
