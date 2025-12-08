import { useState } from 'react';
import { Zap, Award, Star, Sun, X } from 'lucide-react';

export const Features = () => {
    const [selectedFeature, setSelectedFeature] = useState<any>(null);

    const features = [
        {
            id: 'installation',
            icon: Zap,
            title: "Supersnabb installation",
            desc: "Installation på 1-2 dagar",
            modalContent: {
                title: "Supersnabb installation",
                text: "Vi förstår att du vill komma igång med din egen elproduktion så fort som möjligt. Därför har vi optimerat våra processer för att kunna erbjuda installation inom 1-2 dagar från start till mål för de flesta villor. Våra team är effektiva, noggranna och ser till att allt fungerar perfekt innan de lämnar."
            }
        },
        {
            id: 'certified',
            icon: Award,
            title: "Certifierade installatörer",
            desc: "Alla våra installatörer är certifierade och arbetat länge i branschen",
            modalContent: {
                title: "Certifierade installatörer",
                text: "Trygghet är A och O när det gäller elinstallationer. Alla våra installatörer är certifierade och har lång erfarenhet i branschen. Vi följer alla branschregler och säkerhetsföreskrifter för att garantera en säker och hållbar anläggning som du kan lita på i många år framöver."
            }
        },
        {
            id: 'google',
            icon: Star,
            title: "5.0 på Google",
            desc: "Våra kunder älskar oss! Läs våra recensioner.",
            modalContent: {
                title: "5.0 på Google",
                text: "Vi är otroligt stolta över våra fina kundomdömen. Vi strävar alltid efter att överträffa förväntningarna, från första kontakten till färdig installation och support. Nöjda kunder är vårt bästa kvitto på att vi gör rätt."
            }
        },
        {
            id: 'equipment',
            icon: Sun,
            title: "Premium utrustning",
            desc: "Vi använder endast paneler, växelriktare och batterier med långa garantitider",
            modalContent: {
                title: "Premium utrustning",
                text: "Kvalitet lönar sig i längden. Vi samarbetar enbart med marknadens ledande tillverkare av solpaneler, växelriktare och batterier. Det innebär att du får produkter med hög verkningsgrad, lång livslängd och marknadsledande garantitider för din trygghet."
            }
        }
    ];

    const reviews = [
        {
            name: "Anders P.",
            text: "Superproffsigt bemötande och snabb installation. Installatörerna var effektiva och lämnade snyggt efter sig. Rekommenderas varmt!",
            stars: 5
        },
        {
            name: "Maria L.",
            text: "Väldigt nöjd med Takel. Kändes tryggt hela vägen från första kontakten till färdig anläggning. Fick bra hjälp att välja rätt batteristorlek.",
            stars: 5
        },
        {
            name: "Johan K.",
            text: "Rekommenderas varmt! Bra pris och trevlig personal. Känns tryggt med en lokal leverantör som verkligen bryr sig om sina kunder.",
            stars: 5
        }
    ];

    return (
        <section className="py-20 bg-background" id="om-oss">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Välj Takel:</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl border border-orange-100 hover:border-orange-300 transition-colors flex flex-col items-start cursor-pointer hover:shadow-md group"
                            onClick={() => setSelectedFeature(feature)}
                        >
                            <div className={`w-10 h-10 mb-4 ${feature.id === 'google' ? 'text-yellow-500' : 'text-orange-500'}`}>
                                <feature.icon className="w-full h-full" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-orange-800">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">
                                {feature.id === 'google'
                                    ? <span className="underline decoration-dotted group-hover:text-orange-600 transition-colors">Klicka för att se vad våra kunder säger</span>
                                    : feature.desc
                                }
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedFeature && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedFeature(null)}
                >
                    <div
                        className={`bg-white rounded-2xl w-full p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 ${selectedFeature.id === 'google' ? 'max-w-2xl' : 'max-w-lg'}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedFeature(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {selectedFeature.id === 'google' ? (
                            // Google Reviews Modal Layout
                            <div>
                                <div className="text-center mb-8">
                                    <div className="flex justify-center gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <Star key={i} className="w-8 h-8 text-yellow-500 fill-current" />
                                        ))}
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">Våra kunder älskar oss!</h2>
                                    <p className="text-gray-500">5.0 av 5 baserat på Google Reviews</p>
                                </div>

                                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                            <div className="flex gap-1 mb-2">
                                                {[...Array(review.stars)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                                ))}
                                            </div>
                                            <p className="text-gray-700 italic mb-3">"{review.text}"</p>
                                            <p className="text-sm font-bold text-gray-900">- {review.name}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 text-center">
                                    <a
                                        href="https://www.google.com/maps/place/Takel+AB/@59.448484,18.130287,17z/data=!4m8!3m7!1s0x46a8a9d7e04f927d:0xa2a4af7e0feeaa8e!8m2!3d59.448484!4d18.130287!9m1!1b1!16s%2Fg%2F11sjvvb7k3?entry=ttu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:underline"
                                    >
                                        Läs fler recensioner på Google <Star className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ) : (
                            // Standard Modal Layout
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 mb-6 text-orange-500 bg-orange-50 p-4 rounded-full">
                                    <selectedFeature.icon className="w-full h-full" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-gray-900">{selectedFeature.modalContent.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {selectedFeature.modalContent.text}
                                </p>

                                <button
                                    onClick={() => setSelectedFeature(null)}
                                    className="mt-8 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                                >
                                    Stäng
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};
