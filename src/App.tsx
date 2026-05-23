import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { QuoteModal } from './components/QuoteModal';
import { Calculator } from './components/Calculator';
import { PrivacyModal } from './components/PrivacyModal';
import { CookieBanner } from './components/CookieBanner';

import { HomePage } from './pages/HomePage';
import { LocalLandingPage } from './pages/LocalLandingPage';
import { ArticlePage } from './pages/ArticlePage';
import { FaqPage } from './pages/FaqPage';

function App() {
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [quoteData, setQuoteData] = useState<any>(null);
    const [initialQuoteData, setInitialQuoteData] = useState<any>(null);
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

    const handleQuoteSuccess = (data: any) => {
        setQuoteData(data);
    };

    const handleOpenQuote = (initialData?: any) => {
        setInitialQuoteData(initialData || null);
        setIsQuoteModalOpen(true);
        if (isCalculatorOpen) setIsCalculatorOpen(false);
    };

    return (
        <Router>
            <div className="min-h-screen bg-background font-sans text-text">
                <Header />
                <ChatWidget quoteData={quoteData} selectedPackage={selectedPackage} onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />
                
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

                <Routes>
                    <Route path="/" element={
                        <HomePage 
                            onOpenQuote={() => handleOpenQuote()} 
                            onOpenCalculator={() => setIsCalculatorOpen(true)} 
                            onQuoteSuccess={handleQuoteSuccess}
                            onSelectPackage={(pkg) => setSelectedPackage(pkg)}
                        />
                    } />
                    <Route path="/solceller/:ort" element={
                        <LocalLandingPage 
                            onOpenQuote={() => handleOpenQuote()} 
                            onOpenCalculator={() => setIsCalculatorOpen(true)} 
                            onQuoteSuccess={handleQuoteSuccess}
                            onSelectPackage={(pkg) => setSelectedPackage(pkg)}
                        />
                    } />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/:articleId" element={
                        <ArticlePage 
                            onOpenQuote={() => handleOpenQuote()} 
                            onQuoteSuccess={handleQuoteSuccess}
                        />
                    } />
                </Routes>

                <Footer onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />
                <CookieBanner onOpenPrivacy={() => setIsPrivacyModalOpen(true)} />
            </div>
        </Router>
    );
}

export default App;
