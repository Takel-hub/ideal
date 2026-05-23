import { Sun, Mail, Phone, MapPin, Facebook, Instagram, Star } from 'lucide-react';

interface FooterProps {
    onOpenPrivacy?: () => void;
}

export const Footer = ({ onOpenPrivacy }: FooterProps) => {
    return (
        <footer className="bg-[#1A1A1A] text-white py-16 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-800 pb-12">
                {/* Brand / GEO Entity */}
                <div className="space-y-4 col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2">
                        <Sun className="w-6 h-6 text-orange-500" />
                        <span className="text-xl font-bold">Takel.se</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        <strong>Takel AB</strong> är en certifierad solcellsinstallatör baserad i Vaxholm. Vi specialiserar oss på kompletta solcellsanläggningar, Growatt-batterier och smarta elbilsladdare för villaägare i hela Storstockholm.
                    </p>
                </div>

                {/* Contact / NAP (Name, Address, Phone) */}
                <div className="space-y-4">
                    <h2 className="font-bold text-lg">Kontakt</h2>
                    <div className="space-y-3 text-sm text-gray-400">
                        <a href="tel:0708704233" className="flex items-center gap-3 hover:text-orange-500 transition-colors">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span>070-870 42 33</span>
                        </a>
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <a href="mailto:hej@takel.se" className="hover:text-orange-500 transition-colors">hej@takel.se</a>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                            <span itemScope itemType="http://schema.org/PostalAddress">
                                <strong>Takel AB</strong><br/>
                                <span itemProp="streetAddress">Timmermansvägen 1B</span><br/>
                                <span itemProp="postalCode">185 34</span> <span itemProp="addressLocality">Vaxholm</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Lokalt */}
                <div className="space-y-4">
                    <h2 className="font-bold text-lg">Lokalt</h2>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="/solceller/vaxholm" className="hover:text-orange-500 transition-colors">Solceller i Vaxholm</a></li>
                        <li><a href="/solceller/taby" className="hover:text-orange-500 transition-colors">Solceller i Täby</a></li>
                        <li><a href="/solceller/jarfalla" className="hover:text-orange-500 transition-colors">Solceller i Järfälla</a></li>
                        <li><a href="/solceller/huddinge" className="hover:text-orange-500 transition-colors">Solceller i Huddinge</a></li>
                    </ul>
                </div>

                {/* Sociala Medier */}
                <div className="space-y-4">
                    <h2 className="font-bold text-lg">Följ oss</h2>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/profile.php?id=100089265523459" target="_blank" rel="noopener noreferrer" aria-label="Besök vår Facebook-sida" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all shadow-sm">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="https://www.instagram.com/takel.se/" target="_blank" rel="noopener noreferrer" aria-label="Besök vår Instagram-sida" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#E4405F] hover:text-white transition-all shadow-sm">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="https://www.google.com/search?sa=X&sca_esv=1683bac0e7c4926b&authuser=0&hl=sv&gl=se&sxsrf=ANbL-n637JDcUM1iKVC8BUNV_106-UOMkQ:1779477508482&q=Takel+AB+Recensioner&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDQ3tDSzMDWwMDOyNLI0NDK3MNrAyPiKUSQkMTs1R8HRSSEoNTk1rzgzPy-1aBErVmEAeqJZbEkAAAA&rldimm=11719685086292912782&tbm=lcl&ved=2ahUKEwicqJ2mzs2UAxXEFRAIHQcHDGoQ9fQKegQIYxAG&biw=2367&bih=1313&dpr=2#lkt=LocalPoiReviews" target="_blank" rel="noopener noreferrer" aria-label="Läs våra Google Recensioner" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-all shadow-sm" title="Google Recensioner">
                            <Star className="w-5 h-5 fill-current" />
                        </a>
                    </div>
                </div>

                {/* Legal */}
                <div className="space-y-4">
                    <h2 className="font-bold text-lg">Juridik</h2>
                    <button 
                        onClick={() => onOpenPrivacy?.()} 
                        className="text-sm text-gray-400 hover:text-orange-500 transition-colors block"
                    >
                        Integritetspolicy
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 text-center text-gray-600 text-xs">
                © 2024 Takel.se. Alla rättigheter förbehållna.
            </div>
        </footer>
    );
};
