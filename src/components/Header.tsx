import React from 'react';
import { Sun, Phone, Menu, X, ChevronDown } from 'lucide-react';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    return (
        <header className="w-full bg-white py-4 px-6 md:px-12 shadow-sm sticky top-0 z-[100]">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 relative z-50 hover:opacity-80 transition-opacity">
                    <Sun className="w-8 h-8 text-orange-600 animate-pulse" />
                    <span className="text-2xl font-bold text-orange-600 tracking-tight">Takel.se</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 font-medium text-orange-600">
                    <a href="/#installationer" className="hover:text-orange-800 transition-colors">Nöjda kunder</a>
                    <a href="/#om-oss" className="hover:text-orange-800 transition-colors">Om oss</a>
                    <a href="/#paket" className="hover:text-orange-800 transition-colors">Paket</a>
                    <a href="/laddbox-stockholm" className="hover:text-orange-800 transition-colors">Laddbox</a>
                    <div className="relative" onMouseLeave={() => setIsDropdownOpen(false)}>
                        <button 
                            className="flex items-center gap-1 hover:text-orange-800 transition-colors focus:outline-none h-16"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                        >
                            Kunskapsbank <ChevronDown className="w-4 h-4" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 w-64 pt-2 z-50">
                                <div className="bg-white shadow-xl rounded-lg border border-orange-100 py-2 flex flex-col">
                                    <a href="/faq" className="px-4 py-2 hover:bg-orange-50 hover:text-orange-800 text-sm font-semibold border-b border-orange-50 pb-3 mb-1">Vanliga Frågor (FAQ)</a>
                                    <a href="/vad-kostar-solceller-stockholm" className="px-4 py-2 hover:bg-orange-50 hover:text-orange-800 text-sm font-semibold">Vad kostar solceller 2026?</a>
                                    <a href="/growatt-batteri" className="px-4 py-2 hover:bg-orange-50 hover:text-orange-800 text-sm">Growatt Smarta Batterier</a>
                                    <a href="/growatt-smart-styrning" className="px-4 py-2 hover:bg-orange-50 hover:text-orange-800 text-sm">AI Smart Styrning</a>
                                    <a href="/stodtjanster" className="px-4 py-2 hover:bg-orange-50 hover:text-orange-800 text-sm">Stödtjänster & Grönt Avdrag</a>
                                    <a href="/growatt-support" className="px-4 py-2 hover:bg-orange-50 hover:text-orange-800 text-sm">Support & Wi-Fi</a>
                                </div>
                            </div>
                        )}
                    </div>
                    <a href="/#kontakt" className="hover:text-orange-800 transition-colors">Kontakt</a>
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
                    aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"}
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4 duration-200">
                        <nav className="flex flex-col items-center gap-6 text-xl font-medium text-orange-600 overflow-y-auto max-h-screen py-8">
                            <a href="/#installationer" onClick={() => setIsMenuOpen(false)}>Nöjda kunder</a>
                            <a href="/#om-oss" onClick={() => setIsMenuOpen(false)}>Om oss</a>
                            <a href="/#paket" onClick={() => setIsMenuOpen(false)}>Paket</a>
                            <a href="/laddbox-stockholm" onClick={() => setIsMenuOpen(false)}>Laddbox</a>
                            
                            <div className="flex flex-col items-center gap-3 mt-4 mb-4 border-y border-orange-100 py-4 w-full">
                                <span className="font-bold text-gray-400 text-sm uppercase tracking-wider">Kunskapsbank</span>
                                <a href="/faq" className="text-lg hover:text-orange-800 font-semibold border-b border-orange-100 pb-2 mb-1 w-full text-center" onClick={() => setIsMenuOpen(false)}>Vanliga Frågor (FAQ)</a>
                                <a href="/vad-kostar-solceller-stockholm" className="text-lg hover:text-orange-800 font-semibold" onClick={() => setIsMenuOpen(false)}>Vad kostar solceller 2026?</a>
                                <a href="/growatt-batteri" className="text-lg hover:text-orange-800" onClick={() => setIsMenuOpen(false)}>Smarta Batterier</a>
                                <a href="/growatt-smart-styrning" className="text-lg hover:text-orange-800" onClick={() => setIsMenuOpen(false)}>AI Smart Styrning</a>
                                <a href="/stodtjanster" className="text-lg hover:text-orange-800" onClick={() => setIsMenuOpen(false)}>Stödtjänster & Avdrag</a>
                                <a href="/growatt-support" className="text-lg hover:text-orange-800" onClick={() => setIsMenuOpen(false)}>Support & Wi-Fi</a>
                            </div>

                            <a href="/#kontakt" onClick={() => setIsMenuOpen(false)}>Kontakt</a>
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
