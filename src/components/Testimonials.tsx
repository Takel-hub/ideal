import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        name: "Dag & Eva",
        location: "Viksjö",
        text: "Takel har installerat hos andra i vårt område och är både trevliga och proffsiga så att välja Takel var lätt för oss. Att på endast två veckor hade allt installerat och klart var mycket imponerande. Dessutom var det billigare än vi trodde!",
        image: "https://takel.se/wp-content/uploads/2024/09/Takel_Solceller_Mandolinvagen_1_Skrattande_Dag__Eva-1.jpeg"
    },
    {
        name: "Tony & Katrin",
        location: "Vaxholm",
        text: "Vi valde Takel för att de är lokala och det visade sig vara helt rätt beslut eftersom vi får service som är både personlig, trevlig och snabb."
    },
    {
        name: "Jonas & Lotta",
        location: "Täby",
        text: "Takel gick verkligen in för att erbjuda den bästa lösningen till oss. En lösning som tog vara på vårt taks hela kapacitet. Produkterna och materialvalet var i toppklass och med långa garantier."
    },
    {
        name: "Niclas & Marianne",
        location: "Vaxholm",
        text: "Personlig service är viktigt och med Takel kände vi oss som prioritet nummer ett hela vägen, det var enkelt att hålla en nära dialog och Takel förstod exakt vad vi önskade och kunde anpassa lösningen därefter, berättar Marianne."
    },
    {
        name: "Gareth",
        location: "Åkersberga",
        text: "They are a local company, which has its benefits in terms of making the customer feel important. After the installation I continued to receive great customer service and after care."
    },
    {
        name: "Hans & Ulla",
        location: "Järfälla",
        text: "Imponerad hur snabba ni är, från installerat till elektrikern var där och fick allt inkopplat. En av våra grannar fick vänta i flera månader och vi var inställda på att det ska ta så lång tid. Även er service efteråt är imponerande! Rekommenderar starkt!",
        image: "https://takel.se/wp-content/uploads/2024/09/Takel-Solceller-Avstyckningsvagen-Jarfalla-Hans.jpeg"
    },
    {
        name: "Olof",
        location: "Åkersberga",
        text: "Vi valde Takel för att de är en mindre, lokal aktör som också har ett trevligt bemötande och svarar enkelt på våra funderingar. Hos stora företag kan det ta veckor innan man ens får svar på enkla frågor efter påskriven offert."
    },
    {
        name: "Martin",
        location: "Huddinge",
        text: "Takel levererar klockren kundupplevelse och vi har inte kunnat hitta någon bättre. Utöver kundupplevelsen var ni otroligt snabba att leverera och installera. Även efteråt har er service varit i toppklass!",
        image: "https://takel.se/wp-content/uploads/2024/11/Takel-Hemma-hos-Martin.jpeg"
    }
];

export const Testimonials = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-orange-600 font-semibold hover:text-orange-700 underline underline-offset-4"
            >
                Läs mer
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            {testimonials[currentIndex].image ? (
                                <img
                                    src={testimonials[currentIndex].image}
                                    alt={testimonials[currentIndex].name}
                                    className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-orange-100 shadow-sm"
                                />
                            ) : (
                                <Quote className="w-12 h-12 text-orange-200 mb-6" />
                            )}

                            <div className="min-h-[150px] flex items-center justify-center">
                                <p className="text-xl md:text-2xl text-gray-700 font-light italic leading-relaxed">
                                    "{testimonials[currentIndex].text}"
                                </p>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-lg font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                                <p className="text-orange-600">{testimonials[currentIndex].location}</p>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={prev}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <div className="flex gap-2 items-center">
                                    {testimonials.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-orange-500' : 'bg-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={next}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
