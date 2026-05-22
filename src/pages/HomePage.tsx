import { Hero } from '../components/Hero';
import { Process } from '../components/Process';
import { Installations } from '../components/Installations';
import { Packages } from '../components/Packages';
import { ContactForm } from '../components/ContactForm';

interface HomePageProps {
    onOpenQuote: () => void;
    onOpenCalculator: () => void;
    onQuoteSuccess: (data: any) => void;
    onSelectPackage?: (pkg: string) => void;
}

export const HomePage = ({ onOpenQuote, onOpenCalculator, onQuoteSuccess, onSelectPackage }: HomePageProps) => {
    return (
        <main>
            <Hero
                onOpenQuote={onOpenQuote}
                onOpenCalculator={onOpenCalculator}
            />

            <Process />
            <Installations />
            <Packages onSelectPackage={onSelectPackage} />
            <ContactForm onSuccess={onQuoteSuccess} />
        </main>
    );
};
