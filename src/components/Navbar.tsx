
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Inversionistas', href: '#inversionistas' },
        { name: 'Productores', href: '#agricultores' },
        { name: 'Aliados', href: '#aliados' },
        { name: 'Tecnología', href: '#tecnologia' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-chakra-bg/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 font-bold text-2xl text-white tracking-tighter">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-chakra-leaf to-green-700 flex items-center justify-center text-white shadow-lg shadow-green-900/50">
                        C
                    </div>
                    Chakra
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-chakra-leaf transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="text-sm font-medium text-white hover:text-chakra-leaf transition-colors">
                        Ingresar
                    </button>
                    <button className="bg-chakra-white text-chakra-bg px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-transparent hover:border-chakra-leaf/20">
                        Empezar Ahora
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white bg-white/10 p-2 rounded-lg"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-chakra-bg/95 border-b border-white/10 backdrop-blur-xl overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {links.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-300 hover:text-white border-b border-white/5 pb-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button className="w-full bg-chakra-leaf text-white py-3 rounded-lg font-bold shadow-lg shadow-green-900/20 mt-4">
                                Crear Cuenta
                            </button>
                            <button className="w-full text-gray-400 py-3 text-sm">
                                Ya tengo cuenta
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
