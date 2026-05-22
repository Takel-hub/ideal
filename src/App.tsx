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
import { PrivacyModal } from './components/PrivacyModal';
import { CookieBanner } from './components/CookieBanner';

function App() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
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
            <ChatWidget quoteData={quoteData} onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />
            
            <QuoteModal
                isOpen={isQuoteModalOpen}
                onClose={() => setIsQuoteModalOpen(false)}
                onSuccess={handleQuoteSuccess}
                initialData={initialQuoteData}
                onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
            />
            
            <Calculator
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
                onBook={(data) => handleOpenQuote(data)}
            />

            <PrivacyModal 
                isOpen={isPrivacyModalOpen}
                onClose={() => setIsPrivacyModalOpen(false)}
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
            <Footer onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />
            <CookieBanner onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />
        </div>
    );
}

export default App;
