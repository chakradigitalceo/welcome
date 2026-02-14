
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Perfil } from '../types/perfil';
import Toast from './Toast';

const LeadFormSection = () => {
    const [selectedTab] = useState<Perfil>('agricultor');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        whatsapp: '',
        hectareas: '',
        cultivo: 'Maíz',
        inversion: 'Ticket Individual ($5k - $50k)',
        tipo_aliado: 'Tienda de Insumos / Retail'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Preparamos el objeto para el Log
        const logData = {
            fecha: new Date().toLocaleString(),
            perfil: selectedTab,
            nombre_contacto: formData.nombre,
            email: formData.email,
            whatsapp: formData.whatsapp,
            hectareas: selectedTab === 'agricultor' ? formData.hectareas : '',
            cultivo: selectedTab === 'agricultor' ? formData.cultivo : '',
            inversion: selectedTab === 'inversionista' ? formData.inversion : '',
            tipo_aliado: selectedTab === 'aliado' ? formData.tipo_aliado : ''
        };

        try {
            // Reemplaza con tu API URL de SheetDB
            const response = await fetch('https://sheetdb.io/api/v1/g4hc3d01zv32n', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [logData] })
            });

            if (response.ok) {
                setShowToast(true);
                // Limpiar form
                setFormData({ nombre: '', email: '', whatsapp: '', hectareas: '', cultivo: 'Maíz', inversion: 'Ticket Individual ($5k - $50k)', tipo_aliado: 'Tienda de Insumos / Retail' });
            }
        } catch (error) {
            console.error("Error guardando el lead:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="registro" className="py-24 bg-gradient-to-br from-zinc-950 to-black relative overflow-hidden border-t border-white/5">
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                message="¡Registro exitoso!"
                description="Nos pondremos en contacto contigo en breve para continuar el proceso."
            />
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

                    {/* <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-10">
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
                    </div> */}

                    <AnimatePresence mode='wait'>
                        <motion.form
                            key={selectedTab}
                            onSubmit={handleSubmit}
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
                                <input required name="nombre" value={formData.nombre} onChange={handleChange} type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all placeholder:text-gray-600" placeholder={selectedTab === 'aliado' ? 'Ej. AgroTienda El Triunfo' : 'Ej. Juan Pérez'} />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Email Personal</label>
                                <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all placeholder:text-gray-600" placeholder="nombre@email.com" />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">WhatsApp</label>
                                <input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all placeholder:text-gray-600" placeholder="+51 99..." />
                            </div>

                            {selectedTab === 'agricultor' && (
                                <>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Hectáreas (Estimado)</label>
                                        <input name="hectareas" value={formData.hectareas} onChange={handleChange} type="number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all placeholder:text-gray-600" placeholder="Ej. 10 - 500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Cultivo Principal</label>
                                        <select name="cultivo" value={formData.cultivo} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all appearance-none cursor-pointer">
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
                                    <select name="inversion" value={formData.inversion} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all cursor-pointer">
                                        <option className="bg-zinc-900">Ticket Individual ($5k - $50k)</option>
                                        <option className="bg-zinc-900">High Net Worth ($50k - $250k)</option>
                                        <option className="bg-zinc-900">Institucional (+$250k)</option>
                                    </select>
                                </div>
                            )}

                            {selectedTab === 'aliado' && (
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Tipo de Aliado</label>
                                    <select name="aliado" value={formData.tipo_aliado} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-chakra-leaf focus:border-transparent outline-none transition-all cursor-pointer">
                                        <option className="bg-zinc-900">Tienda de Insumos / Retail</option>
                                        <option className="bg-zinc-900">Agroindustria / Molino</option>
                                        <option className="bg-zinc-900">Cooperativa / Asociación</option>
                                        <option className="bg-zinc-900">Tecnología / Partners</option>
                                    </select>
                                </div>
                            )}

                            <div className="md:col-span-2 mt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-chakra-leaf to-emerald-600 hover:from-chakra-leaf hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-green-900/30 transform hover:-translate-y-0.5">
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
