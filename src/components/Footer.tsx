import logo from '../assets/logoxchakra.png';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/5 py-12 text-gray-500 text-sm relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-chakra-blue via-chakra-leaf to-amber-400"></div>

            <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4 text-white font-bold text-xl">
                        <img src={logo} alt="Logo" className="h-12" />
                    </div>
                    <p className="leading-relaxed mb-6 text-gray-400">
                        Impulsando el agro con capital inteligente y datos satelitales.
                    </p>
                    <div className="flex gap-4">
                        {/* Socials placeholder */}
                        <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-chakra-leaf hover:text-white transition-colors flex items-center justify-center cursor-pointer border border-white/10">X</div>
                        <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-chakra-blue hover:text-white transition-colors flex items-center justify-center cursor-pointer border border-white/10">in</div>
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">Plataforma</h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-chakra-leaf transition-colors">Para Inversionistas</a></li>
                        <li><a href="#" className="hover:text-chakra-leaf transition-colors">Para Agricultores</a></li>
                        <li><a href="#" className="hover:text-chakra-leaf transition-colors">Red de Aliados</a></li>
                        <li><a href="#" className="hover:text-chakra-leaf transition-colors">Tecnología</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">Legal</h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:text-chakra-leaf transition-colors">Términos de Uso</a></li>
                        <li><a href="#" className="hover:text-chakra-leaf transition-colors">Política de Privacidad</a></li>
                        <li><a href="#" className="hover:text-chakra-leaf transition-colors">Divulgación de Riesgos</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">Contacto</h4>
                    <p className="mb-2 hover:text-white transition-colors cursor-pointer">soporte@chakra.fin</p>
                    <p className="mb-4 hover:text-white transition-colors cursor-pointer">+51 973001933</p>
                    <p className="mt-2 text-xs opacity-60">Av. Huascar, La Libertad, Perú</p>
                </div>
            </div>
            <div className="text-center mt-12 pt-8 border-t border-white/5 text-xs opacity-40">
                &copy; {new Date().getFullYear()} Chakra Financial Technologies Inc. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
