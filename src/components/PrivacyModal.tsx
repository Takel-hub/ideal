import { X } from 'lucide-react';

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 relative"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                <div className="p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Integritetspolicy</h2>
                    
                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">1. Vilka vi är</h3>
                            <p>
                                Denna webbplats ägs och drivs av Takel AB. Vi värnar om din personliga integritet och strävar efter att skydda dina personuppgifter på bästa sätt. Denna policy förklarar hur vi samlar in, använder och skyddar dina uppgifter i enlighet med dataskyddsförordningen (GDPR).
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">2. Vilka personuppgifter vi samlar in</h3>
                            <p>
                                Vi samlar in uppgifter när du gör en offertförfrågan, bokar ett hembesök eller på annat sätt kontaktar oss. Dessa uppgifter inkluderar vanligtvis:
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Namn</li>
                                <li>Telefonnummer</li>
                                <li>E-postadress</li>
                                <li>Adress och postnummer</li>
                                <li>Eventuell information om din fastighet (t.ex. elförbrukning)</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">3. Varför vi använder dina uppgifter</h3>
                            <p>
                                Vi använder dina personuppgifter för att:
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Kunna hantera och besvara din offertförfrågan.</li>
                                <li>Boka in och genomföra hembesök eller installationer.</li>
                                <li>Kommunicera med dig gällande våra tjänster och dina projekt.</li>
                                <li>Fullgöra våra rättsliga förpliktelser (t.ex. bokföringslagen).</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">4. Hur länge vi sparar dina uppgifter</h3>
                            <p>
                                Vi sparar dina uppgifter så länge de är nödvändiga för ändamålen ovan, eller så länge det krävs enligt lag. Om du begär en offert men inte går vidare med ett köp, raderas dina uppgifter inom 12 månader, såvida du inte gett samtycke till att vi behåller dem längre för marknadsföringssyften.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">5. Dina rättigheter</h3>
                            <p>Enligt GDPR har du rätt att:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Få ett registerutdrag på vilka uppgifter vi har om dig.</li>
                                <li>Be oss rätta felaktiga uppgifter.</li>
                                <li>Kräva att vi raderar dina uppgifter (Rätten att bli bortglömd), förutsatt att de inte längre behövs för det syfte de samlades in för och vi inte har en laglig skyldighet att spara dem.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">6. Cookies och spårningstekniker</h3>
                            <p>
                                Vi använder cookies på vår webbplats för att analysera trafik och förbättra användarupplevelsen. Vi använder endast spårningscookies (som t.ex. Google Analytics) om du uttryckligen har gett ditt samtycke via vår cookie-banner.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">7. Kontakt</h3>
                            <p>
                                Om du har frågor om hur vi hanterar dina personuppgifter eller vill utöva dina rättigheter, vänligen kontakta oss på:
                            </p>
                            <p className="mt-2 font-medium">Takel AB<br/>E-post: hej@takel.se</p>
                        </section>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                        <button 
                            onClick={onClose}
                            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Stäng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
