import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

import { Features } from './components/Features';
import { Packages } from './components/Packages';
import { Installations } from './components/Installations';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { QuoteModal } from './components/QuoteModal';
import { Calculator } from './components/Calculator';

function App() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [quoteData, setQuoteData] = useState<any>(null);
    const [initialQuoteData, setInitialQuoteData] = useState<any>(null);

    const handleQuoteSuccess = (data: any) => {
        setQuoteData(data);
        // The ChatWidget will detect this change and trigger the flow
    };

    const handleOpenQuote = (initialData?: any) => {
        setInitialQuoteData(initialData || null);
        setIsQuoteModalOpen(true);
        if (isCalculatorOpen) setIsCalculatorOpen(false);
    };

    return (
        <div className="min-h-screen bg-background font-sans text-text">
            <Header />
            <ChatWidget quoteData={quoteData} />
            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                onSuccess={handleQuoteSuccess}
                initialData={initialQuoteData}
            />
            <Calculator
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
                onBook={(data) => handleOpenQuote(data)}
            />
            <main>
                <Hero
                    onOpenQuote={() => handleOpenQuote()}
                    onOpenCalculator={() => setIsCalculatorOpen(true)}
                />

                <Installations />
                <Packages />
                <Features />
                <ContactForm onSuccess={handleQuoteSuccess} />
            </main>
            <Footer />
        </div>
    );
}

export default App;
