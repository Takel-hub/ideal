export interface FAQItem {
    question: string;
    answer: string;
}

export interface ArticleSection {
    subtitle: string;
    content: string; 
}

export interface ArticleContent {
    id: string;
    title: string;
    intro: string;
    sections: ArticleSection[];
    faqs: FAQItem[];
    ctaText?: string;
}

export const growattArticles: ArticleContent[] = [
    {
        id: 'growatt-batteri',
        title: 'Growatt smarta batterisystem för din villa',
        intro: 'Framtidssäkra ditt hem med Growatt APX. Att investera i ett batterisystem handlar om mer än att bara spara solenergi till kvällen. Med Growatts moderna, modulära batterilösningar får ditt hem en intelligent energihub som kapar dina effekttoppar, skyddar dig mot skenande elpriser och öppnar dörren till helt nya intäktskällor. Genom att välja ett renodlat Growatt-system får du en sömlös integration mellan växelriktare, batteri och styrning där alla komponenter talar samma språk.',
        sections: [
            {
                subtitle: 'Modulär design – Bygg ut din lagringskapacitet efter hand',
                content: 'Många äldre batterisystem tvingar dig att bestämma exakt hur mycket kapacitet du behöver redan på installationsdagen. Growatts APX-system är uppbyggt av smarta moduler på 5 kWh styck. Tack vare inbyggd energioptimering i varje enskild modul kan du starta i en skala som passar din nuvarande budget och energiförbrukning, för att sedan enkelt bygga ut med fler moduler i framtiden om dina behov förändras – till exempel om du skaffar elbil eller installerar en pool. Nya och gamla moduler kan blandas helt utan prestandaförluster.'
            },
            {
                subtitle: 'Hur stort batteri behöver min villa?',
                content: 'Kapaciteten anpassas enkelt efter ditt hushålls unika förutsättningar. Här är de vanligaste konfigurationerna för svenska hem:\n\n**5 kWh (1 modul):** Perfekt för den mindre villan som vill öka sin egenanvändning av solenergi och kapa de högsta effekttopparna under morgon och kväll.\n\n**10 kWh (2 moduler):** Det mest populära valet för en normalstor familjevilla. Ger tillräckligt med kraft för att driva hushållet genom kvällens och nattens dyra eltimmar.\n\n**15–20 kWh (3–4 moduler):** För dig med högre energiförbrukning (t.ex. bergvärme eller dubbla elbilar) som dessutom vill maximera din kapacitet för stödtjänster och nätbalansering.'
            }
        ],
        faqs: [
            {
                question: 'Kan jag installera ett Growatt-batteri till mina befintliga solceller?',
                answer: 'Ja, absolut. Om du redan har en kompatibel hybridväxelriktare från Growatt är det i princip bara att plugga in batterimodulerna. Om du har ett äldre solcellssystem av ett annat märke kan vi installera en så kallad AC-kopplad batteriväxelriktare vid sidan av ditt befintliga system. Det gör att du kan uppgradera till ett modernt Growatt-batteri oavsett vilket fabrikat du har på dina nuvarande solceller.'
            },
            {
                question: 'Var är det bäst att placera Growatt-batteriet – inomhus eller utomhus?',
                answer: 'Growatts APX-batterier har en mycket hög kapslingsklass (IP66), vilket innebär att de är helt damm- och spolsäkra och tekniskt sett kan installeras utomhus. Men för att maximera battericellernas livslängd och prestanda i det nordiska klimatet rekommenderar vi i första hand ett frostfritt utrymme inomhus, såsom ett garage, förråd, tvättstuga eller en källare. Optimal arbetstemperatur för batterier är rumstemperatur.'
            },
            {
                question: 'Vad är livslängden på ett Growatt APX-batteri?',
                answer: 'Growatt använder Litiumjärnfosfat (LFP), vilket är den säkraste och mest långlivade batteritekniken på marknaden. Batterierna är designade för att klara över 6 000 laddcykler. I praktiken innebär det en förväntad livslängd på runt 15–20 år vid normal användning i en villa, och Growatt lämnar en omfattande fabriksgaranti på 10 år.'
            }
        ],
        ctaText: 'Att välja rätt batteristorlek och förstå hur mycket just ditt hus kan tjäna kräver personlig omtanke. Ring oss eller lämna dina kontaktuppgifter, så tar vi en lugn och kostnadsfri genomgång.'
    },
    {
        id: 'growatt-smart-styrning',
        title: 'Optimera din elförbrukning med Growatt AI Smart Scheduling',
        intro: 'Låt tekniken sänka din elräkning automatiskt. Att ha ett batteri är bra, men att ha ett smart batteri är det som gör den stora skillnaden på elräkningen. Growatts moderna växelriktare är utrustade med intelligenta algoritmer för smart schemaläggning (Smart Scheduling). Det innebär att ditt energisystem inte bara passivt tar emot ström, utan aktivt planerar dygnet baserat på data. Systemet blir som en osynlig energiförvaltare i din villa som ser till att du alltid köper el när den är som billigast och använder din sparade energi när elnätet är som mest belastat.',
        sections: [
            {
                subtitle: 'Hur fungerar Growatt AI-styrning i praktiken?',
                content: 'Growatts smarta mjukvara analyserar tre parametrar i realtid för att optimera ditt hem:\n\n* **Morgondagens elpriser:** Systemet läser av timpriserna på elbörsen (Nord Pool) för att identifiera dygnets billigaste och dyraste timmar.\n* **Väderprognoser:** Genom att veta hur mycket solen kommer att lysa imorgon kan systemet avgöra om det ska lämna utrymme i batteriet för gratis solenergi, eller om det ska ladda batteriet fullt från elnätet under natten.\n* **Ditt hushålls förbrukningsmönster:** Systemet lär sig när din familj förbrukar mest el (t.ex. vid matlagning och tvätt på kvällen) och sparar kapacitet i batteriet för att täcka just dessa effekttoppar.'
            },
            {
                subtitle: 'Full kontroll direkt i ShinePhone-appen',
                content: 'Oavsett om du vill gå in på djupet i din statistik eller bara vill luta dig tillbaka och låta systemet sköta sig själv, har du allt samlat i Growatts app ShinePhone. Här ser du ett tydligt, visuellt flöde över var elen produceras, hur mycket som lagras och hur mycket som går åt i huset just nu. Det ger en direkt och tillfredsställande överblick över din investering och din klimatnytta.'
            }
        ],
        faqs: [
            {
                question: 'Vad är skillnaden mellan vanliga batterilägen och AI Smart Scheduling?',
                answer: 'I standardläget laddas batteriet så fort solen skiner och laddas ur så fort huset behöver mer el än solcellerna producerar. Med Smart Scheduling (smart schemaläggning) kan du eller systemet styra detta baserat på klockslag och elpris. Du kan exempelvis bestämma att batteriet ska laddas från elnätet mellan klockan 02:00 och 04:00 på natten om elpriset är extremt lågt, för att sedan driva huset på morgonen när elpriset och nätavgifterna skjuter i höjden.'
            },
            {
                question: 'Kostar det något extra att använda Growatts app och smarta styrning?',
                answer: 'Nej, både ShinePhone-appen och tillgången till Growatts övervakningsportal (ShineServer) är helt kostnadsfria för dig som kund. Det ingår i systemet och det tillkommer inga dolda månadskostnader eller abonnemang för att se din data eller använda grundfunktionerna för smart styrning.'
            },
            {
                question: 'Kan jag styra min elbilsladdning i samma system?',
                answer: 'Ja. Om du kombinerar din Growatt-växelriktare med en av Growatts egna laddboxar (Thor EV Charger) kan de prata direkt med varandra. Du kan då ställa in systemet på "Linkage Mode", vilket gör att bilen enbart laddas med ren överskottsel från dina solceller – du kör med andra ord din bil på 100% gratis solenergi.'
            }
        ]
    },
    {
        id: 'growatt-support',
        title: 'Support och inställningar för din Growatt-anläggning',
        intro: 'För oss på Takel slutar inte vårt åtagande när den sista skruven är dragen. Vi är ditt lokala bollplank även i vardagen. Ibland händer det att man byter bredbandsleverantör, uppdaterar sitt hemmanätverk eller bara vill finjustera sina inställningar. Här har vi samlat enkla, steg-för-steg-instruktioner för de vanligaste supportfrågorna så att du snabbt kan få ordning på ditt system på egen hand. Skulle du ändå behöva hjälp finns vi naturligtvis bara ett telefonsamtal bort.',
        sections: [
            {
                subtitle: 'Steg-för-steg: Återanslut din Growatt till ett nytt Wi-Fi',
                content: 'Den absolut vanligaste orsaken till att appen slutar uppdateras är att växelriktaren har tappat kontakten med hemmanätverket (t.ex. efter ett strömavbrott eller routerbyte). Din solproduktion fortsätter att fungera precis som vanligt i bakgrunden, men data skickas inte till appen.\n\n**Så här återansluter du din ShineWiFi-X-dongel:**\n1. Säkerställ att din mobiltelefon är ansluten till ditt hemmanätverk på 2,4 GHz-bandet (Growatts Wi-Fi-donglar stöder inte 5 GHz).\n2. Öppna ShinePhone-appen, gå till fliken Verktyg (Tools) och välj Datalogger-konfiguration (Configure Datalogger).\n3. Skanna QR-koden som sitter på din Wi-Fi-dongel (den lilla stickan som pluggats in i botten av växelriktaren).\n4. Följ instruktionerna i appen för att mata in ditt nya Wi-Fi-lösenord och tryck på konfigurera. När lampan på dongeln lyser med ett fast blått sken är systemet online igen.'
            }
        ],
        faqs: [
            {
                question: 'Min växelriktare piper eller visar en röd lampa – vad ska jag göra?',
                answer: 'En röd lampa betyder att växelriktaren har registrerat en felkod (en "Event Code" eller "Fault Code"). Öppna din ShinePhone-app och titta under status för att se vilket nummer felkoden har. Många felkoder är tillfälliga och beror på externa faktorer, som att spänningen på det allmänna elnätet utanför ditt hus har varit för hög eller låg under en kort stund. Om lampan fortsätter att lysa rött i mer än 30 minuter, skriv ner felkoden och ring oss på Takel, så loggar vi in i vårt installatörssystem och kollar upp exakt vad det beror på.'
            },
            {
                question: 'Varför stämmer inte siffrorna i appen exakt med min elräkning?',
                answer: 'Growatts smarta energimätare (Smart Meter) mäter elflödet extremt noggrant, men det kan finnas en liten fördröjning i hur data paketeras och skickas till appen (oftast var 5:e minut). Dessutom mäter ditt elnätsbolag din förbrukning per timme via sin egen mätare vid tomtgränsen. Små avvikelser på några procent är helt normalt och beror på interna nätförluster och mätskillnader, men över tid ger appen en mycket tillförlitlig bild av din ekonomi.'
            },
            {
                question: 'Hur uppdaterar jag mjukvaran (Firmware) i min Growatt?',
                answer: 'Growatt uppdaterar regelbundet mjukvaran i sina maskiner för att förbättra prestanda och säkerhet. Som privatkund behöver eller bör du inte göra detta själv, då en avbruten uppdatering kan skada komponenterna. Vi på Takel kan fjärruppdatera din växelriktare och ditt batteri direkt från vårt kontor i Stockholm. Om du misstänker att ditt system behöver en uppdatering är det bara att höra av dig till oss.'
            }
        ]
    },
    {
        id: 'stodtjanster',
        title: 'Lönsamhet, Grönt Avdrag & Stödtjänster',
        intro: 'Gör ditt batteri till en lönsam affär. Ekonomin kring solenergi har förändrats i grunden. Att bara sälja överskottsekonomi under soliga högsommardagar är inte längre den enda vägen till god avkastning. Med lokala elnätsbolag som i allt högre grad inför rörliga effektavgifter, och en obalanserad elmarknad som kräver stabilitet, har batteriet blivit den enskilt viktigaste komponenten för en snabb återbetalningstid.',
        sections: [
            {
                subtitle: 'Grönt Teknikavdrag – 50% direkt på fakturan',
                content: 'När du köper ett batterisystem och laddbox för att lagra din egenproducerade el har du rätt till det statliga Gröna Teknikavdraget. Det fungerar precis som ROT-avdraget men ger hela 50% avdrag på både material och arbetskostnad. Det bästa av allt är att vi drar av beloppet direkt på din faktura från oss – du slipper ligga ute med pengar eller krångla med blanketter till Skatteverket.\n\n*(Obs: För att få 50% avdrag på batteriet krävs det enligt nuvarande regler att det installeras i syfte att lagra den egna solelen, vilket sker helt automatiskt när vi monterar ditt kompletta Growatt-system).*'
            },
            {
                subtitle: 'Tjäna pengar på stödtjänster och nätbalansering',
                content: 'Svenska kraftnät behöver hjälp med att hålla frekvensen i elnätet stabil på 50 Hz. Genom att koppla upp ditt Growatt-batteri mot en så kallad aggregator kan du hyra ut din batterikapacitet till elnätet. När frekvensen svänger kliver ditt batteri in under några sekunder för att antingen ta emot eller skjuta till ström. För denna beredskap får du ekonomisk ersättning varje månad. Detta har blivit ett av de absolut mest lönsamma sätten att snabba på återbetalningstiden för ett batterisystem, då ersättningarna ofta är betydligt högre än vad du sparar på att bara flytta din egen solel.'
            }
        ],
        faqs: [
            {
                question: 'Hur mycket kan jag tjäna på att ha mitt Growatt-batteri uppkopplat mot stödtjänster?',
                answer: 'Intäkterna varierar beroende på marknadens efterfrågan, säsong och storleken på ditt batteri. Generellt har ersättningarna för frekvensreglering varit mycket förmånliga de senaste åren. Vi hjälper dig att räkna på en realistisk prognos för just din fastighet baserat på den batterikapacitet och den växelriktare du väljer.'
            },
            {
                question: 'Sliter det inte väldigt mycket på batteriet att vara med i stödtjänster?',
                answer: 'Det är en vanlig missuppfattning. Vid frekvensreglering (stödtjänster) aktiveras batteriet oftast i mycket korta pulser – ibland bara under några sekunder eller minuter åt gången – för att finjustera nätet. Det handlar alltså sällan om djupa urladdningar från 100% till 0%, vilket är det som sliter mest på battericeller. Det intelligenta styrsystemet ser dessutom till att batteriet alltid håller sig inom säkra laddningsnivåer, vilket gör att slitaget blir minimalt och inte påverkar den långa livslängden negativt.'
            },
            {
                question: 'Vad händer med det Gröna Avdraget om jag redan har utnyttjat ROT-avdrag i år?',
                answer: 'Det Gröna Teknikavdraget ligger i en helt egen "pott" och påverkas inte av hur mycket ROT-avdrag du har använt för andra renoveringar på huset. Maxbeloppet för det gröna avdraget är 50 000 kr per person och år. Om ni är två delägare i huset kan ni registrera installationen på båda och därmed utnyttja upp till 100 000 kr i grönt avdrag under samma kalenderår.'
            }
        ],
        ctaText: 'Att räkna på stödtjänster och skattereduktioner kan kännas krångligt, men vi gör det enkelt. Hör av dig så kikar vi på vad din fastighet har för förutsättningar!'
    }
];
