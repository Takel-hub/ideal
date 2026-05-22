import { Sun, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
    onOpenPrivacy?: () => void;
}

export const Footer = ({ onOpenPrivacy }: FooterProps) => {
    return (
        <footer className="bg-[#1A1A1A] text-white py-16 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
                {/* Brand */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Sun className="w-6 h-6 text-orange-500" />
                        <span className="text-xl font-bold">Takel.se</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        Sveriges mest energiska solcellsföretag. Vi gör solenergi enkelt och lönsamt.
                    </p>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                    <h4 className="font-bold text-lg">Kontakt</h4>
                    <div className="space-y-3 text-sm text-gray-400">
                        <a href="tel:0708704233" className="flex items-center gap-3 hover:text-orange-500 transition-colors">
                            <Phone className="w-4 h-4" />
                            <span>070-870 42 33</span>
                        </a>
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4" />
                            <a href="mailto:hej@takel.se" className="hover:text-orange-500 transition-colors">hej@takel.se</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4" />
                            <span>Stockholm, Sverige</span>
                        </div>
                    </div>
                </div>

                {/* Lokalt */}
                <div className="space-y-4">
                    <h4 className="font-bold text-lg">Lokalt</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="/solceller/vaxholm" className="hover:text-orange-500 transition-colors">Solceller i Vaxholm</a></li>
                        <li><a href="/solceller/taby" className="hover:text-orange-500 transition-colors">Solceller i Täby</a></li>
                        <li><a href="/solceller/jarfalla" className="hover:text-orange-500 transition-colors">Solceller i Järfälla</a></li>
                        <li><a href="/solceller/huddinge" className="hover:text-orange-500 transition-colors">Solceller i Huddinge</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="space-y-4">
                    <h4 className="font-bold text-lg">Juridik</h4>
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
