import { Star } from 'lucide-react';
import { Testimonials } from './Testimonials';

interface HeroProps {
    onOpenQuote: () => void;
    onOpenCalculator: () => void;
}

export const Hero = ({ onOpenQuote, onOpenCalculator }: HeroProps) => {
    return (
        <section className="relative bg-background pt-20 pb-32 px-6 md:px-12 overflow-hidden text-center">
            <div className="max-w-4xl mx-auto relative z-10">
                {/* Trust Badge */}
                <div className="flex flex-col items-center gap-2 mb-8">
                    <div className="flex flex-col items-center gap-1 bg-orange-100 text-orange-800 px-8 py-3 rounded-2xl font-medium text-sm md:text-base">
                        <div className="inline-flex items-center gap-2">
                            <Star className="w-4 h-4 fill-current" />
                            Över 100 nöjda kunder i Stockholm
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                        <Testimonials />
                    </div>
                </div>

                {/* Headlines */}
                <h1 className="text-5xl md:text-7xl font-bold text-text leading-tight mb-6">
                    Släpp in solens kraft i <span>ditt hem!</span>
                </h1>

                <div className="space-y-4 mb-10">
                    <p className="text-2xl md:text-3xl font-bold text-orange-600">
                        Spara 10 000-30 000 kr/år <span className="text-gray-600 font-normal">på din elräkning</span>
                    </p>
                    <p className="text-gray-500 text-lg">
                        Plus upp till 50% skattereduktion i <a href="https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik.4.676f4884175c97df4192860.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-600">Grönt Teknikavdrag*</a>
                    </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-start justify-center gap-4">
                    <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={onOpenQuote}
                            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold py-4 px-8 rounded-lg shadow-lg transition-transform hover:-translate-y-1"
                        >
                            Boka kostnadsfritt hembesök
                        </button>
                        <span className="text-xs text-gray-400">Vi kommer ut och ger råd. Inget köptvång.</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={onOpenCalculator}
                            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold py-4 px-8 rounded-lg shadow-lg transition-transform hover:-translate-y-1"
                        >
                            Beräkna min besparing
                        </button>
                        {/* Spacer to align with the subtitle on the left button if needed, or just keep buttons aligned at top */}
                        <span className="text-xs text-transparent select-none">Spacer</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
