import { useState } from 'react';
import { generalFaqs } from '../data/generalFaq';
import { ChevronDown } from 'lucide-react';

export const FaqPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Generate FAQ schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": generalFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <main className="bg-background min-h-screen pt-32 pb-20">
            {/* Inject Schema directly */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">Vanliga frågor om solceller</h1>
                    <p className="text-xl text-gray-600">
                        Här har vi samlat de allra vanligaste frågorna vi får kring solceller, batterilager och installation i Stockholm.
                    </p>
                </div>

                <div className="space-y-4">
                    {generalFaqs.map((faq, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-orange-50/50 transition-colors"
                            >
                                <span className="font-bold text-text pr-8">{faq.question}</span>
                                <ChevronDown 
                                    className={`w-5 h-5 text-orange-500 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            
                            <div 
                                className={`transition-all duration-300 ease-in-out ${
                                    openIndex === index 
                                        ? 'max-h-[500px] opacity-100' 
                                        : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-16 bg-orange-50 rounded-2xl p-8 text-center border border-orange-100">
                    <h2 className="text-2xl font-bold text-text mb-4">Hittade du inte svaret du letade efter?</h2>
                    <p className="text-gray-600 mb-6">
                        Tveka inte att höra av dig till oss! Vi svarar gärna på alla dina frågor om solenergi.
                    </p>
                    <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                        className="inline-block bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-700 transition-colors shadow-lg"
                    >
                        Kontakta oss
                    </button>
                </div>
            </div>
        </main>
    );
};
