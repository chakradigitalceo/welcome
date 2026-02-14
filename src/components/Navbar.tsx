
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logoxchakra.png';
import { routeColors } from '../types/routes';
import useBreakpoint from '../hooks/useBreakpoint';


const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const shouldShowBg = scrolled || mobileMenuOpen;
    const { isMobile } = useBreakpoint()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Productores', href: '/' },
        { name: 'Inversionistas', href: '/inversionistas' },
        { name: 'Aliados', href: '/aliados' },
        { name: 'Compradores', href: '/compradores' },
    ];

    const activeBg = isMobile
        ? (routeColors[location.pathname] || 'bg-chakra-bg')
        : 'bg-chakra-dark/55';

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${shouldShowBg ? activeBg + ' backdrop-blur-md border-b border-white/10 py-3 shadow-lg' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between gap-12">
                {/* Logo */}
                <Link to="/" className="w-full flex items-center gap-2 font-bold text-2xl text-white tracking-tighter hover:opacity-80 transition-opacity">
                    <img src={logo} alt="Logo" className="h-12" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map(link => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`text-sm font-medium transition-colors relative group ${location.pathname === link.href ? 'text-white' : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-chakra-leaf transition-all ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></span>
                        </Link>
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
                        className="md:hidden bg-chakra-bg/0 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {links.map(link => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-lg font-medium text-white hover:text-white border-b border-white/5 pb-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <a href="#registro" className="w-full bg-chakra-leaf/85 text-white py-3 rounded-lg font-bold shadow-lg shadow-green-900/20 mt-4 text-center block">
                                Crear Cuenta
                            </a>
                            <button className="w-full text-gray-100 py-3 text-sm">
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
