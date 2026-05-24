import { Instagram, Facebook, ArrowRight } from 'lucide-react';

const socialPosts = [
    {
        id: 1,
        platform: 'instagram',
        image: '/images/Takel_Solceller_Gadolinitvagen_Overblick_Med_Pool-600x600-1.webp',
        link: 'https://www.instagram.com/takel.se/',
        alt: 'Premiuminstallation av helsvarta solpaneler (All Black) på exklusiv villa med pool i Vaxholm, utförd av certifierade installatörer från Takel AB.'
    },
    {
        id: 2,
        platform: 'facebook',
        image: '/images/Takel-Solceller-Avstyckningsvagen-Jarfalla-Hans.webp',
        link: 'https://www.facebook.com/profile.php?id=100089265523459',
        alt: 'Diskret och stilren montering av solceller på papptak i Järfälla. Kunden Hans visar stolt upp den rena installationen med dold kabeldragning från Takel AB.'
    },
    {
        id: 3,
        platform: 'instagram',
        image: '/images/Takel_Solceller_Dalstigen_Resaro_Niclas_Marianne-600x600-1.webp',
        link: 'https://www.instagram.com/takel.se/',
        alt: 'Niclas och Marianne, nöjda solcellskunder på Resarö. Takel AB levererade en nyckelfärdig installation med marknadens starkaste garantier.'
    },
    {
        id: 4,
        platform: 'instagram',
        image: '/images/Takel_Solceller_Mandolinvagen_1_Skrattande_Dag__Eva-1-768x512.webp',
        link: 'https://www.instagram.com/takel.se/',
        alt: 'Dag och Eva i Järfälla njuter av sin nya solcellsanläggning och Growatt-batterilager. Trygg och snabb installation som sänker deras elkostnader.'
    },
    {
        id: 5,
        platform: 'facebook',
        image: '/images/Takel-Hemma-hos-Martin-768x788.webp',
        link: 'https://www.facebook.com/profile.php?id=100089265523459',
        alt: 'Personligt hembesök för solcellsrådgivning hos Martin i Huddinge. Takel går noga igenom taket för att skräddarsy en optimal lösning för batteri och laddbox.'
    },
    {
        id: 6,
        platform: 'instagram',
        image: '/images/Takel_Solceller_Vasterskogsvagen_Tak3-600x600-1.webp',
        link: 'https://www.instagram.com/takel.se/',
        alt: 'Helsvarta premium-solceller på villa i Vaxholm. Estetiskt tilltalande design där de svarta panelerna smälter perfekt ihop med husets tak.'
    }
];

export const SocialCarousel = () => {
    return (
        <section className="py-20 bg-white overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hemma hos våra kunder</h2>
                    <p className="text-gray-600 max-w-2xl text-lg">
                        Över 100 villaägare i Stockholm har redan valt oss. Se hur snyggt det blir i verkligheten och följ våra senaste installationer.
                    </p>
                </div>
                <div className="flex gap-6">
                    <a href="https://www.instagram.com/takel.se/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors group">
                        <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Instagram</span>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100089265523459" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-[#1877F2] font-medium transition-colors group">
                        <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span className="hidden sm:inline">Facebook</span>
                    </a>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full max-w-[100vw]">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                
                {/* Horizontal scrolling track */}
                <div className="flex gap-4 px-6 md:px-12 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {socialPosts.map((post) => (
                        <a 
                            key={post.id} 
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visa inlägg från ${post.platform}`}
                            className="relative flex-none w-[280px] md:w-[320px] aspect-square rounded-2xl overflow-hidden group snap-center shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <img 
                                src={post.image} 
                                alt={post.alt} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    {post.platform === 'instagram' ? (
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 shadow-lg">
                                            <Instagram className="w-8 h-8" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 bg-[#1877F2]/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 shadow-lg">
                                            <Facebook className="w-8 h-8" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </a>
                    ))}
                    
                    {/* View More Card */}
                    <a 
                        href="https://www.instagram.com/takel.se/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex-none w-[280px] md:w-[320px] aspect-square rounded-2xl bg-orange-50 hover:bg-orange-100 flex flex-col items-center justify-center group snap-center transition-colors border border-orange-100"
                    >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-orange-600 group-hover:scale-110 transition-transform">
                            <ArrowRight className="w-10 h-10" />
                        </div>
                        <span className="font-bold text-gray-900 text-lg">Se fler bilder</span>
                        <span className="text-gray-500 mt-1">på vår Instagram</span>
                    </a>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </section>
    );
};
