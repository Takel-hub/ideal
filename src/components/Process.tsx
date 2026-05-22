import { Home, FileText, Wrench, Sun } from 'lucide-react';

const steps = [
    {
        title: "Kostnadsfritt hembesök",
        description: "Vi kommer hem till dig och undersöker dina förutsättningar, mäter taket och pratar igenom dina önskemål utan något köptvång.",
        icon: Home,
    },
    {
        title: "Skräddarsydd offert",
        description: "Inom kort får du ett detaljerat förslag med fast pris, beräknad besparing och en skiss på hur solpanelerna kommer se ut på ditt tak.",
        icon: FileText,
    },
    {
        title: "Installation på 2 veckor",
        description: "När du säger ja så kör vi! Våra certifierade montörer och elektriker installerar vanligtvis allt inom två veckor från beställning.",
        icon: Wrench,
    },
    {
        title: "Njut av grön el",
        description: "Anläggningen är driftsatt. Du sänker din elkostnad från dag ett, får Grönt Teknikavdrag och ökar värdet på ditt hus.",
        icon: Sun,
    }
];

export const Process = () => {
    return (
        <section className="py-24 bg-white" id="process">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Vägen till solenergi är <span className="text-orange-600">busenkel</span></h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Att skaffa solceller ska inte vara krångligt. Med Takel som lokal partner i Stockholm får du en trygg och blixtsnabb helhetslösning.
                    </p>
                </div>

                <div className="relative">
                    {/* Linje i bakgrunden (desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gray-100 rounded-full" />

                    <div className="grid md:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center relative group">
                                {/* Steg-nummer & Ikon */}
                                <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center mb-6 border-4 border-white shadow-lg relative group-hover:scale-110 transition-transform duration-300">
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                                        {index + 1}
                                    </div>
                                    <step.icon className="w-10 h-10 text-orange-600" />
                                </div>

                                {/* Text */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
