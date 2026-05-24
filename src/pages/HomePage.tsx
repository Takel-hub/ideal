import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/Hero';
import { AboutUs } from '../components/AboutUs';
import { Process } from '../components/Process';
import { Installations } from '../components/Installations';
import { Packages } from '../components/Packages';
import { ContactForm } from '../components/ContactForm';
import { LiveStats } from '../components/LiveStats';

interface HomePageProps {
    onOpenQuote: () => void;
    onOpenCalculator: () => void;
    onQuoteSuccess: (data: any) => void;
    onSelectPackage?: (pkg: string) => void;
}

export const HomePage = ({ onOpenQuote, onOpenCalculator, onQuoteSuccess, onSelectPackage }: HomePageProps) => {
    return (
        <main>
            <Helmet>
                <title>Solceller Stockholm – Batteri & Laddbox för Villa | Takel</title>
                <meta name="description" content="Kvalitativa solceller och batterilager för villor i hela Stockholmsregionen. Få en gratis offert idag." />
            </Helmet>
            <Hero
                onOpenQuote={onOpenQuote}
                onOpenCalculator={onOpenCalculator}
            />
            
            <AboutUs />
            <Process />
            <Installations />
            <Packages onSelectPackage={onSelectPackage} />
            <LiveStats />
            <ContactForm onSuccess={onQuoteSuccess} />
        </main>
    );
};
