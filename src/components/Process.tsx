import { useState } from 'react';
import { Home, FileText, Wrench, Sun, Star, Zap, Award, X } from 'lucide-react';

const popupContent = {
    premium: {
        title: "Premium utrustning",
        text: "Kvalitet lönar sig i längden. Vi samarbetar enbart med marknadens ledande tillverkare av solpaneler, växelriktare och batterier. Det innebär att du får produkter med hög verkningsgrad, lång livslängd och marknadsledande garantitider för din trygghet."
    },
    certified: {
        title: "Certifierade installatörer",
        text: "Trygghet är A och O därför är alla våra installatörer certifierade och har lång erfarenhet i branschen. Vi följer alla branschregler och säkerhetsföreskrifter för att garantera en säker och hållbar anläggning som du kan lita på i många år framöver."
    },
    fast: {
        title: "Supersnabb installation",
        text: "Vi förstår att du vill komma igång med din egen elproduktion så fort som möjligt. Därför har vi optimerat våra processer för att kunna erbjuda installation inom 1-2 dagar från start till mål för de flesta villor. Våra team är effektiva, noggranna och ser till att allt fungerar perfekt innan de lämnar."
    },
    google: {
        title: "5.0 på Google",
        text: "",
        content: (
            <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                    Vi är otroligt stolta över våra fina kundomdömen. Vi strävar alltid efter att överträffa förväntningarna, från första kontakten till färdig installation och support.
                </p>
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex gap-1 text-yellow-500 mb-2">
                            <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                        </div>
                        <p className="italic text-gray-700 text-sm">"Superproffsigt bemötande och snabb installation. Installatörerna var effektiva och lämnade snyggt efter sig. Rekommenderas varmt!"</p>
                        <p className="font-bold text-gray-900 text-sm mt-2">- Anders P.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex gap-1 text-yellow-500 mb-2">
                            <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                        </div>
                        <p className="italic text-gray-700 text-sm">"Väldigt nöjd med Takel. Kändes tryggt hela vägen från första kontakten till färdig anläggning. Fick bra hjälp att välja rätt batteristorlek."</p>
                        <p className="font-bold text-gray-900 text-sm mt-2">- Maria L.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex gap-1 text-yellow-500 mb-2">
                            <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                        </div>
                        <p className="italic text-gray-700 text-sm">"Rekommenderas varmt! Bra pris och trevlig personal. Känns tryggt med en lokal leverantör som verkligen bryr sig om sina kunder."</p>
                        <p className="font-bold text-gray-900 text-sm mt-2">- Johan K.</p>
                    </div>
                </div>
                <div className="pt-2 text-center">
                    <a href="https://www.google.com/maps/search/Takel+AB" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 underline underline-offset-4">
                        Läs alla recensioner på Google <Star className="w-4 h-4 fill-current" />
                    </a>
                </div>
            </div>
        )
    }
};

export const Process = () => {
    const [activePopup, setActivePopup] = useState<keyof typeof popupContent | null>(null);

    return (
        <section className="py-24 bg-white" id="process">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Vägen till solenergi är <span className="text-orange-600">busenkel</span></h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Att skaffa solceller ska inte vara krångligt. Med Takel som lokal partner i Stockholm får du en trygg och blixtsnabb helhetslösning.
                    </p>
                </div>

                <div className="relative">
                    {/* Linje i bakgrunden (desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-gray-100 rounded-full" />

                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                        {/* Steg 1 */}
                        <div className="flex flex-col items-center text-center relative group">
                            <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-6 border-4 border-white shadow-lg relative group-hover:scale-110 transition-transform duration-300">
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-md">1</div>
                                <Home className="w-10 h-10 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Kostnadsfritt hembesök</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">Vi kommer hem till dig och undersöker dina förutsättningar, mäter taket och pratar igenom dina önskemål utan något köptvång.</p>
                        </div>

                        {/* Steg 2 */}
                        <div className="flex flex-col items-center text-center relative group">
                            <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-6 border-4 border-white shadow-lg relative group-hover:scale-110 transition-transform duration-300">
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-md">2</div>
                                <FileText className="w-10 h-10 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Skräddarsydd offert</h3>
                            <p className="text-gray-600 leading-relaxed text-sm mb-3">Inom kort får du ett detaljerat förslag med fast pris och beräknad besparing.</p>
                            <button 
                                onClick={() => setActivePopup('premium')}
                                className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-full transition-colors border border-orange-200"
                            >
                                <Sun className="w-3 h-3" /> Premium utrustning
                            </button>
                        </div>

                        {/* Steg 3 */}
                        <div className="flex flex-col items-center text-center relative group">
                            <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-6 border-4 border-white shadow-lg relative group-hover:scale-110 transition-transform duration-300">
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-md">3</div>
                                <Wrench className="w-10 h-10 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Installation</h3>
                            <p className="text-gray-600 leading-relaxed text-sm mb-3">När du säger ja så kör vi! Vi tar hand om hela installationen.</p>
                            <div className="flex flex-col gap-2">
                                <button 
                                    onClick={() => setActivePopup('certified')}
                                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors border border-blue-200"
                                >
                                    <Award className="w-3 h-3" /> Certifierade installatörer
                                </button>
                                <button 
                                    onClick={() => setActivePopup('fast')}
                                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-green-600 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-full transition-colors border border-green-200"
                                >
                                    <Zap className="w-3 h-3" /> Supersnabb installation
                                </button>
                            </div>
                        </div>

                        {/* Steg 4 */}
                        <div className="flex flex-col items-center text-center relative group">
                            <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-6 border-4 border-white shadow-lg relative group-hover:scale-110 transition-transform duration-300">
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-md">4</div>
                                <Sun className="w-10 h-10 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Njut av grön el</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">Anläggningen är driftsatt. Du sänker din elkostnad från dag ett och ökar värdet på ditt hus.</p>
                        </div>

                        {/* Steg 5 */}
                        <div className="flex flex-col items-center text-center relative group">
                            <div className="w-24 h-24 rounded-full bg-yellow-50 flex items-center justify-center mb-6 border-4 border-white shadow-lg relative group-hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => setActivePopup('google')}>
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-sm shadow-md">5</div>
                                <Star className="w-10 h-10 text-yellow-500 fill-current" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">5.0 på Google</h3>
                            <button 
                                onClick={() => setActivePopup('google')}
                                className="text-gray-600 text-sm underline decoration-dotted hover:text-orange-600 transition-colors"
                            >
                                Klicka för att se vad våra kunder säger
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal/Popup */}
            {activePopup && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4" onClick={() => setActivePopup(null)}>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <div 
                        className="bg-white rounded-2xl p-8 max-w-lg w-full relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setActivePopup(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{(popupContent[activePopup] as any).title}</h3>
                        {(popupContent[activePopup] as any).content ? (
                            (popupContent[activePopup] as any).content
                        ) : (
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {(popupContent[activePopup] as any).text}
                            </p>
                        )}
                        <button 
                            onClick={() => setActivePopup(null)}
                            className="mt-8 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg transition-colors"
                        >
                            Stäng
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};
