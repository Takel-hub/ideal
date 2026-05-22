import { useParams } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Process } from '../components/Process';
import { ContactForm } from '../components/ContactForm';
import { Installations } from '../components/Installations';
import { Testimonials } from '../components/Testimonials';
import { Packages } from '../components/Packages';

interface LocalLandingPageProps {
    onOpenQuote: () => void;
    onOpenCalculator: () => void;
    onQuoteSuccess: (data: any) => void;
    onSelectPackage?: (pkg: string) => void;
}

export const LocalLandingPage = ({ onOpenQuote, onOpenCalculator, onQuoteSuccess, onSelectPackage }: LocalLandingPageProps) => {
    const { ort } = useParams<{ ort: string }>();
    
    // Formatera ortsnamnet (t.ex. "taby" -> "Täby")
    const formatOrt = (ort?: string) => {
        if (!ort) return 'Stockholm';
        const map: Record<string, string> = {
            'taby': 'Täby',
            'jarfalla': 'Järfälla',
            'vaxholm': 'Vaxholm',
            'huddinge': 'Huddinge',
            'nacka': 'Nacka',
            'sollentuna': 'Sollentuna',
            'danderyd': 'Danderyd',
            'lidingo': 'Lidingö'
        };
        const lowerOrt = ort.toLowerCase();
        if (map[lowerOrt]) return map[lowerOrt];
        return ort.charAt(0).toUpperCase() + ort.slice(1);
    };

    const cityName = formatOrt(ort);

    return (
        <main>
            {/* Lokaliserad Hero */}
            <section className="relative bg-background pt-20 pb-32 px-6 md:px-12 overflow-hidden text-center">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="flex flex-col items-center gap-2 mb-8">
                        <div className="flex flex-col items-center gap-1 bg-orange-100 text-orange-800 px-8 py-3 rounded-2xl font-medium text-sm md:text-base">
                            <div className="inline-flex items-center gap-2">
                                <Star className="w-4 h-4 fill-current" />
                                Din lokala solcellspartner i {cityName}
                                <Star className="w-4 h-4 fill-current" />
                            </div>
                            <Testimonials cityFilter={cityName} />
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-text leading-tight mb-6">
                        Solceller i <span>{cityName}</span> – Sänk din elräkning idag!
                    </h1>

                    <div className="space-y-4 mb-10">
                        <p className="text-2xl md:text-3xl font-bold text-orange-600">
                            Spara 10 000-30 000 kr/år <span className="text-gray-600 font-normal">med solenergi</span>
                        </p>
                        <p className="text-gray-500 text-lg">
                            Säkra ditt Gröna Teknikavdrag för 2026. Få upp till 50% skattereduktion direkt på fakturan.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start justify-center gap-4">
                        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                            <button
                                onClick={onOpenCalculator}
                                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold py-4 px-8 rounded-lg shadow-lg transition-transform hover:-translate-y-1"
                            >
                                Beräkna din besparing på 30 sekunder
                            </button>
                            <span className="text-xs text-gray-400">Helt kostnadsfritt och utan förbindelser.</span>
                        </div>

                        <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                            <button
                                onClick={onOpenQuote}
                                className="w-full sm:w-auto bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 text-lg font-bold py-4 px-8 rounded-lg shadow-lg transition-transform hover:-translate-y-1"
                            >
                                Boka hembesök
                            </button>
                            <span className="text-xs text-transparent select-none">Spacer</span>
                        </div>
                    </div>
                </div>
            </section>

            <Process />
            
            <Installations cityFilter={cityName} />

            {/* Enkel Sektion som bygger lokalt förtroende */}
            <section className="py-20 bg-orange-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Vi installerar snabbt i {cityName}</h2>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        Som villaägare i {cityName} har du perfekta förutsättningar för att sänka din elkostnad. Vi har redan hjälpt många av dina grannar i området att bli oberoende elproducenter. Eftersom vi är baserade lokalt kan vi erbjuda snabba hembesök och installation oftast inom 2 veckor.
                    </p>
                    <button 
                        onClick={onOpenQuote}
                        className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 underline underline-offset-4"
                    >
                        Boka ett gratis hembesök i {cityName} <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            <Process />
            <Installations />
            <Packages onSelectPackage={onSelectPackage} />
            <ContactForm onSuccess={onQuoteSuccess} />
        </main>
    );
};
