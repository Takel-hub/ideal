
import { Zap, Star } from 'lucide-react';

export const Packages = () => {
    return (
        <section className="py-20 bg-background" id="paket">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Våra solcellspaket</h2>
                    <p className="text-gray-500">
                        Alla priser är efter <a href="https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik.4.676f4884175c97df4192860.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-600">Grönt Teknikavdrag*</a> (50% skattereduktion)
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Start Package */}
                    <div className="bg-white rounded-2xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-orange-800 mb-2">Start</h3>
                        <div className="text-2xl font-bold text-text mb-2">8 paneler + 5 kWh batteri</div>
                        <div className="text-3xl font-bold text-orange-500 mb-1">81 845 kr</div>
                        <p className="text-xs text-gray-400 mb-4">efter <a href="https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik.4.676f4884175c97df4192860.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-600">Grönt Teknikavdrag*</a>: 2 personer</p>
                        <p className="text-sm font-bold text-orange-700 mb-8">Spara 8-10 000 kr/år</p>

                        <ul className="space-y-3 mb-8 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> 8 paneler</li>
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> Installation ingår</li>
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> 25 års garanti</li>
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> Uppföljning via app</li>
                        </ul>

                        <button className="w-full py-3 border-2 border-orange-200 text-orange-700 font-bold rounded-lg hover:bg-orange-50 transition-colors">
                            Välj Start
                        </button>
                    </div>

                    {/* Familj Package (Highlighted) */}
                    <div className="bg-white rounded-2xl p-8 border-2 border-orange-500 shadow-xl relative transform md:-translate-y-4">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                            Mest populär <Star className="w-3 h-3 fill-current" />
                        </div>

                        <h3 className="text-xl font-bold text-orange-800 mb-2">Familj</h3>
                        <div className="text-2xl font-bold text-text mb-2">16 paneler + 10 kWh batteri</div>
                        <div className="text-3xl font-bold text-orange-500 mb-1">120 889 kr</div>
                        <p className="text-xs text-gray-400 mb-4">efter <a href="https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik.4.676f4884175c97df4192860.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-600">Grönt Teknikavdrag*</a>: 2 personer</p>
                        <p className="text-sm font-bold text-orange-700 mb-8">Spara 12-18 000 kr/år</p>

                        <ul className="space-y-3 mb-8 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> 16 paneler</li>
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> Installation ingår</li>
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> 30 års garanti</li>
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> Energioptimering</li>
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> Support</li>
                        </ul>

                        <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-md">
                            Välj Familj
                        </button>
                    </div>

                    {/* Framtidssäkrad Villa Package */}
                    <div className="bg-white rounded-2xl p-8 border border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-orange-800 mb-2">Framtidssäkrad Villa</h3>
                        <div className="text-2xl font-bold text-text mb-2">22 paneler + 15 kWh batteri + Laddbox</div>
                        <div className="text-3xl font-bold text-orange-500 mb-1">182 278 kr</div>
                        <p className="text-xs text-gray-400 mb-4">efter <a href="https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik.4.676f4884175c97df4192860.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-600">Grönt Teknikavdrag*</a>: 2 personer</p>
                        <p className="text-sm font-bold text-orange-700 mb-8">Bli din egen elproducent</p>

                        <ul className="space-y-3 mb-8 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> 22 paneler & 15 kWh batteri</li>
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> Smart elbilsladdare ingår</li>
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> Installation & 30 års garanti</li>
                            <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> Sälj dyr el, ladda billigt på natten</li>
                        </ul>

                        <button className="w-full py-3 border-2 border-orange-200 text-orange-700 font-bold rounded-lg hover:bg-orange-50 transition-colors">
                            Välj Helhetspaketet
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
