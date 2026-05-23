import { Shield, Users, Sun, HeartHandshake } from 'lucide-react';

export const AboutUs = () => {
    return (
        <section className="py-24 bg-orange-50" id="om-oss">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Bild/Visuals */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-orange-200 rounded-3xl transform -rotate-3 scale-105 opacity-50"></div>
                        <img 
                            src="/images/Takel_Solceller_Gadolinitvagen_Overblick_Med_Pool-600x600-1.webp" 
                            alt="Takel Solceller Installation" 
                            className="relative rounded-3xl shadow-xl w-full object-cover aspect-[4/3]"
                            loading="lazy"
                        />
                        <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Shield className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">Lokal expertis</p>
                                    <p className="text-gray-900 font-bold">Tryggt & Nära</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Textinnehåll */}
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 text-orange-600 font-bold mb-4 bg-orange-100/50 px-4 py-2 rounded-full">
                                <Sun className="w-4 h-4" />
                                Vilka är Takel?
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                                Den lokala solcellsexperten du faktiskt <span className="text-orange-600">kan lita på</span>.
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Vi startade Takel med en enkel övertygelse: Att investera i solenergi ska vara tryggt, personligt och helt fritt från krångel. Som ett lokalt förankrat företag i Vaxholm och Storstockholm har vi sett hur branschen ibland tappar bort kunden bland långa telefonköer och otydliga offerter. Det ville vi ändra på.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 mt-1">
                                    <Users className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Ett dedikerat team</h3>
                                    <p className="text-gray-600">När du anlitar oss får du alltid en personlig kontaktperson. Inga mellanhänder, bara raka och ärliga svar från första hembesök till färdig anläggning.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0 mt-1">
                                    <HeartHandshake className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Kvalitet i varje detalj</h3>
                                    <p className="text-gray-600">Vi installerar det vi själva skulle vilja ha på våra egna tak. Med fokus på premiummärken som Growatt säkerställer vi prestanda som håller över tid – uppbackat av branschens starkaste garantier.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <p className="text-gray-700 italic font-medium border-l-4 border-orange-500 pl-4">
                                "Vårt mål är inte att vara störst i Sverige, utan att vara bäst i Stockholm. Det är därför vi har 5.0 i snittbetyg på Google."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
