import { useState } from 'react';
import { Star, X } from 'lucide-react';

export const Stats = () => {
    const [showReviews, setShowReviews] = useState(false);

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
        <section className="py-12 bg-background">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Card 1 Removed - was 30 years warranty */}

                    {/* Card 2 - Google Reviews */}
                    <div
                        className="bg-white p-10 rounded-2xl shadow-sm border border-orange-100 text-center hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => setShowReviews(true)}
                    >
                        <div className="w-16 h-16 mx-auto mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                            <Star className="w-full h-full fill-current" strokeWidth={1} />
                        </div>
                        <h3 className="text-3xl font-bold text-orange-600 mb-2">5.0 på Google</h3>
                        <p className="text-gray-600 group-hover:text-orange-600 transition-colors underline decoration-dotted">
                            Klicka för att se vad våra kunder säger
                        </p>
                    </div>
                </div>
            </div>

            {/* Reviews Modal */}
            {showReviews && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowReviews(false)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl p-8" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setShowReviews(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center mb-8">
                            <div className="flex justify-center gap-1 mb-2">
                                {[1, 2, 3, 4].map(i => (
                                    <Star key={i} className="w-8 h-8 text-yellow-500 fill-current" />
                                ))}
                                <div className="relative">
                                    <Star className="w-8 h-8 text-yellow-500 fill-current" />
                                    {/* Mask for 4.9 effect if needed, but full stars look cleaner for "4.9" */}
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Våra kunder älskar oss!</h2>
                            <p className="text-gray-500">5.0 av 5 baserat på Google Reviews</p>
                        </div>

                        <div className="space-y-6">
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
                </div>
            )}
        </section>
    );
};
