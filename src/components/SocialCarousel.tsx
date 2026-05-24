import { Instagram, Facebook, ArrowRight } from 'lucide-react';

const socialPosts = [
    {
        id: 1,
        platform: 'instagram',
        image: 'https://images.unsplash.com/photo-1509391366360-12ce1bb8283a?auto=format&fit=crop&w=600&q=80',
        link: 'https://www.instagram.com/takel.se/',
        alt: 'Snygg svart solcellsinstallation på villatak'
    },
    {
        id: 2,
        platform: 'facebook',
        image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80',
        link: 'https://www.facebook.com/profile.php?id=100089265523459',
        alt: 'Nöjd kund i Täby med nya solceller'
    },
    {
        id: 3,
        platform: 'instagram',
        image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80',
        link: 'https://www.instagram.com/takel.se/',
        alt: 'Growatt batterilager installation i garage'
    },
    {
        id: 4,
        platform: 'instagram',
        image: 'https://images.unsplash.com/photo-1548611716-3cefb46ad88e?auto=format&fit=crop&w=600&q=80',
        link: 'https://www.instagram.com/takel.se/',
        alt: 'Elektriker som drar kablar snyggt och dolt'
    },
    {
        id: 5,
        platform: 'facebook',
        image: 'https://images.unsplash.com/photo-1664319409540-3b8c4c782782?auto=format&fit=crop&w=600&q=80',
        link: 'https://www.facebook.com/profile.php?id=100089265523459',
        alt: 'Laddbox installation på garageuppfart'
    },
    {
        id: 6,
        platform: 'instagram',
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80',
        link: 'https://www.instagram.com/takel.se/',
        alt: 'Solpaneler i solnedgång'
    }
];

export const SocialCarousel = () => {
    return (
        <section className="py-20 bg-white overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Följ med upp på taket</h2>
                    <p className="text-gray-600 max-w-2xl text-lg">
                        Se våra senaste installationer och följ vår vardag. Vi är stolta över varenda panel vi lägger.
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
