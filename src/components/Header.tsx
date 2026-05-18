import React from 'react';
import { Sun, Phone, Menu, X } from 'lucide-react';




export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="w-full bg-white py-4 px-6 md:px-12 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2 relative z-50">
                    <Sun className="w-8 h-8 text-orange-600 animate-pulse" />
                    <span className="text-2xl font-bold text-orange-600 tracking-tight">Takel.se</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 font-medium text-orange-600">
                    <a href="#installationer" className="hover:text-orange-800 transition-colors">Nöjda kunder</a>
                    <a href="#om-oss" className="hover:text-orange-800 transition-colors">Om oss</a>
                    <a href="#paket" className="hover:text-orange-800 transition-colors">Paket</a>
                    <a href="#kontakt" className="hover:text-orange-800 transition-colors">Kontakt</a>
                </nav>

                {/* Desktop CTA & Phone */}
                <div className="hidden md:flex items-center gap-4">
                    <a href="tel:0708704233" className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-800 transition-colors">
                        <Phone className="w-5 h-5 text-orange-600" />
                        <span className="text-lg">070-870 42 33</span>
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden relative z-50 p-2 text-orange-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4 duration-200">
                        <nav className="flex flex-col items-center gap-8 text-xl font-medium text-orange-600">
                            <a href="#installationer" onClick={() => setIsMenuOpen(false)}>Nöjda kunder</a>
                            <a href="#om-oss" onClick={() => setIsMenuOpen(false)}>Om oss</a>
                            <a href="#paket" onClick={() => setIsMenuOpen(false)}>Paket</a>
                            <a href="#kontakt" onClick={() => setIsMenuOpen(false)}>Kontakt</a>
                            <a href="tel:0708704233" className="flex items-center gap-2 mt-4 font-semibold">
                                <Phone className="w-5 h-5 text-orange-600" />
                                070-870 42 33
                            </a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
