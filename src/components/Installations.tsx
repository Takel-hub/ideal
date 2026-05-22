import { useState } from 'react';
import { ArrowRight, MapPin, X } from 'lucide-react';

const installations = [
    {
        title: "Hemma hos Martin",
        location: "Huddinge",
        date: "2024",
        excerpt: "Jag stannar till och köper med mig några nybakade bullar på min väg till Martin som valde Takel förra året och installerade både solceller och batterier.",
        fullText: `Jag stannar till och köper med mig några nybakade bullar på min väg till Martin som valde Takel förra året och installerade både solceller och batterier.
        
        Solen skiner när jag kommer dit och han tar på sig en snygg kavaj när jag frågar om det är okej att ta någon bild framför huset. Självklart, säger han och tillägger, men solcellerna syns inte? Det är fördelen många gånger, svarar jag, eftersom tanken är att de ska ligga på taket i 30-40 år eller ännu längre så det blir lättare att helt enkelt glömma bort dom och bara njuta av effekten från solcellerna.
        
        Efter att jag tagit några bilder bjuder han på kaffe och jag tar fram de nybakade bullarna och de smakar som de ska, gott! Vi är båda norrlänningar så gofika är vi vana vid.
        
        Jag frågar vad som fick dem att välja solceller och Martin svarar: Redan när vi såg huset första gången tyckte vi att det var ett perfekt läge för att skaffa solceller och det var en av många anledningar till att vi slog till och flyttade hit. Vi har under flera år haft fast elpris tills helt nyligen och vi visste att vi inte skulle kunna få så bra pris igen. När sedan elpriserna började gå upp bestämde vi oss för att sätta planen i verket och skaffa solceller. Lagom i tid hörde ni av er till oss och kom med ett mycket bra förslag. Att ni även var snabba och hade kort leveranstider gjorde också ert förslag intressant.
        
        Jag undrar om det var något annat som var viktigt?  Det är kanske den bästa investering vi gjort! Säger Martin. Hur menar du, frågar jag. Från första dagen solcellerna började producera sänkte vi vår elräkning och kommer att göra det så länge vi bor kvar. Sedan är det en klockren investering i huset! Säger Martin och fortsätter: Redan när vi flyttade in hade vi en plan på hur vi ska energieffektivisera huset. Vi visste att taket behövde renoveras och vi passade på att tilläggsisolera samtidigt. Sedan var det självklart att installera solceller, så nu kan de ligga där och producera hur många år som helst (känns det som), berättar Martin och lägger till:  Efter att du berättade om batterier så är jag glad att jag lyssnade och skaffade batterier för att även kunna lagra den el vi producerar och använda själv andra tider på dygnet och få känslan att vara lite självförsörjande. Den känslan är speciell!
        
        Vad var det som gjorde att ni valde Takel? Klockren kundupplevelse, säger Martin direkt och fortsätter, jag har svårt att se hur vi kunnat hitta någon bättre. Jag nästan rodnar lite men tackar för den feedbacken och berättar att det är en av Takels uppdrag: Kundnöjdhet. Ni har många fördelar jämfört med konkurrenter utöver den klockrena kundupplevelsen var ni otroligt snabba, både med att leverera och installera. Alla vi har kommit i kontakt med från Takel har varit väldigt proffsiga och trevliga. Även efteråt har er service varit i toppklass! Vi läser och hör om andra som mejlar utan svar, ringer och hamnar i telefonkö eller inte kommer fram men hos er kommer vi alltid fram och får snabba svar både på mejl och telefon. Allt detta och mer gör att jag rekommenderar er till alla som är nyfikna på solceller.`,
        image: "/images/Takel-Hemma-hos-Martin-768x788.webp"
    },
    {
        title: "Avstyckningsvägen",
        location: "Järfälla",
        date: "2024",
        excerpt: "Vi besöker Hans och Ulla på Avstyckningsvägen. De hade funderat framförallt på att skaffa batterier för att säkra sin energiframtid.",
        fullText: `Vi besöker Hans och Ulla på Avstyckningsvägen i Järfälla:
        
        Hans och Ulla hade funderat framförallt på att skaffa batterier för att kunna fördela sin elkonsumtion med att köpa billig el på natten och använda den dagtid när elen är som dyrast och när flera av deras grannar skaffat solceller har Hans har tagit reda på en hel del och beslutat att skaffa solceller med batterier.
        
        När de fick kontakt med Max på Takel så var det först och främst en trevlig person och att han presenterade ett intressant pris för solceller med batterier. De hade planer på att lägga om taket och fått in några offerter men när Max presenterade sitt erbjudande om att lägga om taket och samtidigt installera solceller, allt genom Takel, så slog de till.
        
        -Det fanns ingen som kunde presentera så bra pris och samtidigt lägga om taket, säger Hans.
        
        Jag frågar om de skulle rekommendera Takel och Hans säger -Absolut! Jag blir nyfiken på vad det beror på och vi kommer in på vad som imponerade mest och deras svar var hur snabbt det gick! Allt från att få det installerat på taket till hur snabbt elektrikern var där och fick allt inkopplat. De berättade att en av deras grannar hade fått vänta i flera månader och Hans hade varit inställd på att det ska ta så lång tid men var mycket nöjd med att det gick så snabbt.
        
        -Finns det något annat du skulle säga till de som funderar på solceller, frågar jag Hans. Han funderar och säger – Jag tycker att batterier är en självklarhet och om du kan förklara fördelarna med batterier så tror jag fler skulle välja solceller. Hans fortsätter -Ladda batterierna på dagen med solceller, använd batterierna på kvällen. Ladda sen batterierna från elnätet på natten och använd den elen på morgonen.`,
        image: "/images/Takel-Solceller-Avstyckningsvagen-Jarfalla-Hans.webp"
    },
    {
        title: "Mandolinvägen",
        location: "Järfälla",
        date: "2024",
        excerpt: "Dag och Eva fick solceller på två veckor! Vi fick en pratstund med dem på deras terrass om hur snabb och smidig processen var.",
        fullText: `Dag och Eva fick solceller på två veckor.
        
        Vi fick en pratstund med Dag och Eva på deras terrass.
        – Med ökande elpriser och poolen på 38 grader så ville vi se om solceller kunde hjälpa oss sänka elkostnaderna. Att montera solceller var billigare än vad vi trodde, säger Dag.
        
        – Takel har också installerat på andra hus i området. De var trevliga och proffsiga så vi rekommenderar absolut Takel, flikar Eva in.
        
        – Så smidigt och snabbt. På endast två veckor hade Takel installerat allt. Det känns framtidssäkert att ha solpaneler och batterier. Även miljövänligt, fortsätter Dag.`,
        image: "/images/Takel_Solceller_Mandolinvagen_1_Skrattande_Dag__Eva-1-768x512.webp"
    },
    {
        title: "Västerskogsvägen",
        location: "Vaxholm",
        date: "2024",
        excerpt: "Janne och Lena är nöjda över sitt val av Takel som leverantör av solceller, så nöjda att de rekommenderar oss till alla grannar.",
        fullText: "Janne och Lena på Västerskogsvägen är nöjda över sitt val av Takel som leverantör av solceller, så nöjda att de rekommenderar oss till alla grannar.",
        image: "/images/Takel_Solceller_Vasterskogsvagen_Tak3-600x600-1.webp"
    },
    {
        title: "Gadolinitvägen 3",
        location: "Vaxholm",
        date: "2024",
        excerpt: "Tony och Katrin är glada över sitt val av Takel. De beskriver hur personlig servicen var och hur trygga de kände sig genom hela processen.",
        fullText: "Tony och Katrin på Gadolinitvägen 3 är glada över sitt val av Takel som leverantör av solceller. De beskriver hur personlig servicen var och hur trygga de kände sig genom hela processen.",
        image: "/images/Takel_Solceller_Gadolinitvagen_Overblick_Med_Pool-600x600-1.webp"
    },
    {
        title: "Dalstigen 5",
        location: "Vaxholm",
        date: "2024",
        excerpt: "Niclas och Marianne kunde inte vara nöjdare. De berättar hur det var att välja en lokal leverantör som verkligen bryr sig.",
        fullText: "Niclas och Marianne kunde inte vara nöjdare med sitt val av Takel som leverantör av solceller. De berättar hur det var att välja en lokal leverantör som verkligen bryr sig.",
        image: "/images/Takel_Solceller_Dalstigen_Resaro_Niclas_Marianne-600x600-1.webp"
    }
];

interface InstallationsProps {
    cityFilter?: string;
}

export const Installations = ({ cityFilter }: InstallationsProps) => {
    const [selectedStory, setSelectedStory] = useState<typeof installations[0] | null>(null);

    // Filtrera på stad om cityFilter finns, annars visa alla. Om inga hittas i staden, visa alla som fallback.
    const filteredInstallations = cityFilter 
        ? installations.filter(i => i.location.toLowerCase() === cityFilter.toLowerCase())
        : installations;
    
    const displayInstallations = filteredInstallations.length > 0 ? filteredInstallations : installations;

    return (
        <section className="py-20 bg-gray-50" id="installationer">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nöjda kunder</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Vi är stolta över våra installationer och här är några av våra nöjda kunder runt om i Stockholm.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayInstallations.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                            onClick={() => setSelectedStory(item)}
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-orange-600 font-semibold mb-3">
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {item.excerpt}
                                </p>
                                <button className="text-orange-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Läs mer <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedStory && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedStory(null)}>
                    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedStory(null)}
                            className="absolute top-4 right-4 bg-white/80 rounded-full p-2 text-gray-500 hover:text-gray-800 transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="h-64 md:h-80 overflow-hidden relative">
                            <img
                                src={selectedStory.image}
                                alt={selectedStory.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div>
                                    <div className="flex items-center gap-4 text-sm text-orange-300 font-semibold mb-2">
                                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedStory.location}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white">{selectedStory.title}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="prose prose-orange max-w-none text-gray-600">
                                {selectedStory.fullText.split('\n').map((paragraph, i) => (
                                    <p key={i} className="mb-4 leading-relaxed">{paragraph.trim()}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
