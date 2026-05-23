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
                answer: 'Ja, absolut. Om du har ett äldre solcellssystem av ett annat märke kan vi installera en smartmätare som kan hantera både er gamla växelriktare och den nya och det gör att du kan uppgradera till ett modernt Growatt-batteri oavsett vilket fabrikat du har på dina nuvarande solceller.'
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
    },
    {
        id: 'vad-kostar-solceller-stockholm',
        title: 'Vad kostar solceller för en villa i Stockholm 2026?',
        intro: 'Att investera i solceller är ett av de smartaste besluten en stockholmsvillaägare kan göra idag – men vad kostar det egentligen? I den här guiden bryter vi ned priserna, förklarar vad som påverkar kostnaden och visar hur du räknar ut återbetalningstiden för just din villa.\n\n**Snabbfakta:** En genomsnittlig solcellsanläggning för en villa i Stockholm kostar 120 000–180 000 kr före Grönt Teknikavdrag och efter hamnar många på en nettokostnad runt 80 000–120 000 kr.',
        sections: [
            {
                subtitle: 'Vad påverkar priset på solceller?',
                content: 'Priset för en solcellsinstallation varierar utifrån flera faktorer. Här är de viktigaste:\n\n**1. Anläggningens storlek**\nDels är det beroende på hur många solceller som är lämpligt utifrån ert elbehov och utifrån ert taks förutsättningar, och dels hur mycket batterier som passar just er. För 2-3 år sedan var det vanligt med 20-30 solpaneler, om det fick plats på taket, men idag är det vanligare med 15-20 stycken och istället satsar fler på större batterilagring.\n\nVi har tagit fram tre olika alternativ som är vanliga och dessa utgår ifrån hur stor elförbrukning och hur stort tak ni har.\n\n*   **Startpaketet** är med 8 solpaneler och 5kWh batteri och passar det mindre hushållet. Priset för det inklusive allt är 81 845 kr efter Grönt Teknikavdrag.\n*   **Familjepaketet** är med 16 solceller och 10kWh batteri och är vårt vanligaste paket och passar de flesta villorna i Stockholmsområdet. Priset är 120 889 kr efter Grönt Teknikavdrag för två fastighetsägare.\n*   **Framtidssäkrad villa** är vårt stora paket som gör att du med 22 paneler förlänger tiden du kan använda solenergi till både huset och batteriet som är på 15kWh. Med detta paket har du en lösning som täcker de flesta medelstora och stora villors behov under lång tid av året. Priset för detta är 182 278 kr efter Grönt Teknikavdrag för två fastighetsägare.\n\n**2. Takets utformning**\nEtt tak med sydlig eller sydvästlig orientering ger bäst produktion och då framförallt under sommarhalvåret. Om du har gaveln i söderläge och en taklutning om max 20 grader ger det bättre produktion under hela året men eftersom du har det tak ni har så kommer vi ut och går igenom vad som är bäst för er. Självklart så ger komplicerade tak med flera vinklar och/eller takkupor en högre installationskostnaden och därför är det alltid bäst att på plats gå igenom just era förutsättningar.\n\n**3. Växelriktare (inverter)**\nDesto fler paneler/solceller du har desto större växelriktare behövs vilket även påverkar priset. Vi samarbetar med Growatt som funnits länge på marknaden och är de som är bäst på alla sätt, allt från att vara små och enkla att installera till att ge en sömlös integration med både batterier och deras elbilsladdare och har så lång garantitid som 10 år!'
            },
            {
                subtitle: 'Grönt Teknikavdrag – så fungerar det för solceller',
                content: 'Det viktiga här är att den som är köpare även är fastighetsägare och får då upp till 50 000 kr per person och år. Precis som med ROT-avdraget dras även Grönt Teknikavdraget direkt på fakturan av oss. I Grönt Teknikavdrag så räkna allt in, inte bara arbetskostnaden eller materialet, utan allt.\n\nLäs mer på [Skatteverkets regler för Grönt teknikavdrag](https://www.skatteverket.se/privat/fastigheterochbostad/gronteknik.4.676f4884175c97df4192860.html).\n\nPå solcellsdelen har Grönt Teknikavdraget sjunkit och är idag bara 15% medans det är 50% för lagringsdelen (batterierna) och laddbox för elbil. Vi har märkt att sedan Grönt Teknikavdrag för solceller sjönk till 15% har fler valt att kombinera solceller med ett batterilagring och även lägga till en elbilsladdare om planen är att skaffa hybrid eller elbil (om de inte redan har det). Även om lagringsdelen och laddboxar har 50% i Grönt Teknikavdrag så påverkar det ändå ekonomi mest, både inköpspris och minskad elräkning!\n\n**Batterilager** ökar självförsörjningsgraden från 30 % till 70 %+.\n**Laddbox** tillkommer ca 10 000–20 000 kr installerat. Möjliggör elbilsladdning på egenproducerad el.\n\nDe paket som vi presenterade tidigare innebär en kostnad på ca 80 000–180 000 kr, men ger maximal energioberoende och lägst driftkostnad över tid.'
            },
            {
                subtitle: 'Återbetalningstid i Stockholm',
                content: 'Stockholm har ca 1 800–1 900 soltimmar per år, vilket är tillräckligt för en god avkastning. Med ett elpris på 1,20–1,50 kr/kWh och nuvarande solcellspriser ser kalkylen ut så här:\n\n*   Produktion: 10 kWp × ~950 kWh/kWp ≈ 9 500 kWh/år\n*   Egenanvändning (ca 40–50 %): ~4 500 kWh × 1,35 kr = ~6 075 kr/år\n*   Försäljning av överskott: ~5 000 kWh × 0,60 kr = ~3 000 kr/år\n*   Total besparing: ca 9 000–12 000 kr/år → **Återbetalningstid: 9–12 år**'
            },
            {
                subtitle: 'Hur går installationen till?',
                content: 'Hos Takel följer vi alltid samma trygga process:\n\n1. Gratis besiktning och kalkyl\n2. Skräddarsydd offert – solceller, batteri och laddbox\n3. Tillståndsansökan hos elnätsbolag och ev. kommun\n4. Installation av certifierat team\n5. Driftsättning, test och genomgång\n6. Anmälan för nettodebitering och elcertifikat'
            }
        ],
        faqs: [],
        ctaText: 'Att investera i solceller och lagring är en trygg affär. Tveka inte att kontakta oss för ett hembesök eller en snabb kalkyl!'
    }
];
