import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../data/growattContent';

interface FAQAccordionProps {
    faqs: FAQItem[];
}

export const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate JSON-LD Schema
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="w-full">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className="border border-orange-100 rounded-lg overflow-hidden bg-white shadow-sm hover:border-orange-300 transition-colors"
                    >
                        <button
                            className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                            onClick={() => toggleOpen(index)}
                        >
                            <span className="font-bold text-gray-900 text-lg pr-4">{faq.question}</span>
                            {openIndex === index ? (
                                <ChevronUp className="w-6 h-6 text-orange-600 flex-shrink-0" />
                            ) : (
                                <ChevronDown className="w-6 h-6 text-orange-600 flex-shrink-0" />
                            )}
                        </button>
                        <div 
                            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                                openIndex === index ? 'max-h-[800px] pb-4 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
