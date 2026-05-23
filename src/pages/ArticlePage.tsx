import { useParams, Navigate } from 'react-router-dom';
import { growattArticles } from '../data/growattContent';
import { FAQAccordion } from '../components/FAQAccordion';
import { ContactForm } from '../components/ContactForm';
import { ArrowRight, BookOpen } from 'lucide-react';

interface ArticlePageProps {
    onOpenQuote: () => void;
    onQuoteSuccess: (data: any) => void;
}

export const ArticlePage = ({ onOpenQuote, onQuoteSuccess }: ArticlePageProps) => {
    const { articleId } = useParams<{ articleId: string }>();
    
    const article = growattArticles.find(a => a.id === articleId);

    if (!article) {
        return <Navigate to="/" />;
    }

    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="bg-orange-50 pt-20 pb-24 px-6 md:px-12 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium text-sm mb-6">
                        <BookOpen className="w-4 h-4" />
                        Kunskapsbank & Support
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        {article.title}
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                        {article.intro}
                    </p>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-16 px-6 md:px-12 bg-white">
                <div className="max-w-3xl mx-auto space-y-16">
                    {article.sections.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                                {section.subtitle}
                            </h2>
                            <div 
                                className="text-lg text-gray-700 leading-relaxed whitespace-pre-line" 
                                dangerouslySetInnerHTML={{ 
                                    __html: section.content
                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-bold">$1</strong>')
                                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-orange-600 underline hover:text-orange-800">$1</a>')
                                }}
                            />
                        </div>
                    ))}
                    
                    {article.ctaText && (
                        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg mt-12">
                            <p className="text-lg text-gray-800 mb-4 italic">{article.ctaText}</p>
                            <button 
                                onClick={onOpenQuote}
                                className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 underline underline-offset-4"
                            >
                                Boka en gratis rådgivning <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50 px-6 md:px-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Vanliga frågor & svar</h2>
                        <p className="text-gray-600 text-lg">Här har vi samlat de vanligaste funderingarna kring ämnet.</p>
                    </div>
                    <FAQAccordion faqs={article.faqs} />
                </div>
            </section>

            <ContactForm onSuccess={onQuoteSuccess} />
        </main>
    );
};
