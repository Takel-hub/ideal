import { Hero } from '../components/Hero';
import { Process } from '../components/Process';
import { Installations } from '../components/Installations';
import { Packages } from '../components/Packages';
import { Features } from '../components/Features';
import { ContactForm } from '../components/ContactForm';

interface HomePageProps {
    onOpenQuote: () => void;
    onOpenCalculator: () => void;
    onQuoteSuccess: (data: any) => void;
}

export const HomePage = ({ onOpenQuote, onOpenCalculator, onQuoteSuccess }: HomePageProps) => {
    return (
        <main>
            <Hero
                onOpenQuote={onOpenQuote}
                onOpenCalculator={onOpenCalculator}
            />

            <Process />
            <Installations />
            <Packages />
            <Features />
            <ContactForm onSuccess={onQuoteSuccess} />
        </main>
    );
};
