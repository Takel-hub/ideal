import { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, ChevronLeft, ChevronRight } from 'lucide-react';

interface Message {
    id: number;
    sender: 'user' | 'bot';
    text: string;
    choices?: string[];
}

interface BookingData {
    name?: string;
    time?: string;
    phone?: string;
    email?: string;
    street?: string;
    zip?: string;
    city?: string;
    fullAddress?: string;
}

export const ChatWidget = ({ quoteData, onOpenPrivacy }: { quoteData?: any; onOpenPrivacy?: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: 'bot',
            text: 'Välkommen till Takel. Jag svarar på frågor och bokar möten.',
            choices: ['Boka hembesök', 'Fråga om solceller']
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [bookingState, setBookingState] = useState('none');
    const [bookingData, setBookingData] = useState<BookingData>({});
    const [slotMap, setSlotMap] = useState<Record<string, string>>({});
    const [isBackendOnline, setIsBackendOnline] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Handle Quote Data Injection
    useEffect(() => {
        if (quoteData) {
            setIsOpen(true);

            // Map quote data to booking data
            const newBookingData = {
                name: quoteData.name,
                phone: quoteData.phone,
                email: quoteData.email,
                street: quoteData.street,
                zip: quoteData.zip,
                city: quoteData.city,
                fullAddress: `${quoteData.street}, ${quoteData.zip} ${quoteData.city}`
            };
            setBookingData(newBookingData);

            // Add bot message
            const botMsg: Message = {
                id: Date.now(),
                sender: 'bot',
                text: `Tack för din offertförfrågan, ${quoteData.name.split(' ')[0]}! 🎉\n\nJag har tagit emot dina uppgifter. Vill du passa på att boka ett hembesök direkt så att vi kan titta på ditt tak? Jag har redan fyllt i dina kontaktuppgifter.`,
                choices: ['Ja, visa tider', 'Nej tack']
            };
            setMessages(prev => [...prev, botMsg]);
            setBookingState('quote_followup');
        }
    }, [quoteData]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    // Check Backend Status
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/`);
                if (res.ok) setIsBackendOnline(true);
                else setIsBackendOnline(false);
            } catch (err) {
                setIsBackendOnline(false);
            }
        };
        checkStatus();
        const interval = setInterval(checkStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        handleInteraction(inputValue);
        setInputValue('');
    };

    const handleChoice = (choice: string) => {
        handleInteraction(choice);
    };

    const callApi = async (endpoint: string, method = 'GET', body: any = null) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api${endpoint}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: body ? JSON.stringify(body) : null,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!res.ok) throw new Error('Server error');
            return await res.json();
        } catch (err) {
            return null;
        }
    };

    // Weekly Calendar Helper
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const now = new Date();
        const day = now.getDay(); // 0=Sun, 1=Mon
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
        return new Date(now.setDate(diff));
    });

    const [weeklySlots, setWeeklySlots] = useState<any[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    useEffect(() => {
        if (bookingState === 'date_selection') {
            fetchWeeklySlots();
        }
    }, [currentWeekStart, bookingState]);

    const fetchWeeklySlots = async () => {
        setIsLoadingSlots(true);
        const start = new Date(currentWeekStart);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(end.getDate() + 7); // Fetch 7 days (Mon-Sun)

        const data = await callApi(`/calendar/slots?startDate=${start.toISOString()}&endDate=${end.toISOString()}`);
        if (data && data.slots) {
            setWeeklySlots(data.slots);
        }
        setIsLoadingSlots(false);
    };

    const renderWeeklyCalendar = () => {
        const weekDays: Date[] = [];
        // Ensure we start from Monday of the current week view
        const startOfViewWeek = new Date(currentWeekStart);
        const day = startOfViewWeek.getDay(); // 0=Sun, 1=Mon
        const diff = startOfViewWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday
        startOfViewWeek.setDate(diff);

        for (let i = 0; i < 5; i++) {
            const d = new Date(startOfViewWeek);
            d.setDate(d.getDate() + i);
            weekDays.push(d);
        }

        // 09:00 to 18:00 (last slot starts at 18:00)
        const timeSlots = Array.from({ length: 10 }, (_, i) => i + 9);

        const changeWeek = (offset: number) => {
            const newStart = new Date(currentWeekStart);
            newStart.setDate(newStart.getDate() + (offset * 7));
            setCurrentWeekStart(newStart);
        };

        return (
            <div className="bg-white p-2 rounded-xl shadow-sm border border-orange-100 mt-2 w-full overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                    <button onClick={() => changeWeek(-1)} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="font-bold text-gray-800 text-sm">
                        v.{getWeekNumber(weekDays[0])} ({weekDays[0].toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })} - {weekDays[4].toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })})
                    </span>
                    <button onClick={() => changeWeek(1)} className="p-1 hover:bg-gray-100 rounded">
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="grid grid-cols-6 gap-1 min-w-[300px]">
                    {/* Header Row */}
                    <div className="text-xs font-bold text-gray-400 text-center pt-2">Tid</div>
                    {weekDays.map(d => (
                        <div key={d.toISOString()} className="text-center">
                            <div className="text-xs font-bold text-gray-600">{d.toLocaleDateString('sv-SE', { weekday: 'short' }).replace('.', '')}</div>
                            <div className="text-[10px] text-gray-400">{d.getDate()}/{d.getMonth() + 1}</div>
                        </div>
                    ))}

                    {/* Time Rows */}
                    {timeSlots.map(hour => (
                        <div key={`row-${hour}`} className="contents">
                            <div key={`time-${hour}`} className="text-[10px] text-gray-400 font-medium flex items-center justify-center">
                                {hour}:00
                            </div>
                            {weekDays.map(day => {
                                const slot = weeklySlots.find(s => {
                                    const sDate = new Date(s.start);
                                    return sDate.getDate() === day.getDate() && sDate.getHours() === hour;
                                });

                                const isAvailable = slot?.status === 'available';
                                const isBusy = slot?.status === 'busy';
                                const isPast = new Date(day).setHours(hour, 0, 0, 0) < Date.now();

                                // If it's past, it's effectively busy/unavailable even if backend says available (double check)
                                const finalIsAvailable = isAvailable && !isPast;

                                return (
                                    <button
                                        key={`${day.toISOString()}-${hour}`}
                                        disabled={!finalIsAvailable}
                                        onClick={() => finalIsAvailable && handleSlotSelect(slot)}
                                        className={`
                                            h-8 rounded-md text-[10px] font-medium transition-all
                                            ${finalIsAvailable
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200'
                                                : 'bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100'}
                                        `}
                                    >
                                        {finalIsAvailable ? 'Boka' : (isBusy || isPast ? 'Uppt.' : '-')}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const getWeekNumber = (d: Date) => {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    };

    const handleSlotSelect = (slot: any) => {
        const dateStr = new Date(slot.start).toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

        // We simulate user input to keep the chat flow natural
        const userMsg: Message = { id: Date.now(), sender: 'user', text: `Jag väljer tiden: ${dateStr}` };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Directly trigger the next step
        setTimeout(() => {
            // Save ISO if available, otherwise input (fallback)
            const updatedData = { ...bookingData, time: slot.iso };
            setBookingData(updatedData);

            // CHECK: If we already have details (from Quote), skip straight to confirmation
            if (updatedData.name && updatedData.phone && updatedData.email) {
                // Format the time nicely for display
                let displayTime = updatedData.time || '';
                if (displayTime.includes('T')) {
                    try {
                        const dateObj = new Date(displayTime);
                        const dStr = dateObj.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });
                        const tStr = dateObj.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
                        displayTime = `${dStr} kl ${tStr}`;
                        displayTime = displayTime.charAt(0).toUpperCase() + displayTime.slice(1);
                    } catch (e) { }
                }

                const botResponse: Message = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: `Toppen! Jag har reserverat ${dateStr}.\n\nEftersom jag redan har dina uppgifter ser det ut så här:\n\n👤 ${updatedData.name}\n📞 ${updatedData.phone}\n📧 ${updatedData.email}\n🏠 ${updatedData.fullAddress}\n📅 ${displayTime}\n\nStämmer detta?`,
                    choices: ['Ja, boka nu', 'Ändra uppgifter']
                };
                setMessages(prev => [...prev, botResponse]);
                setBookingState('confirmation');
            } else {
                // Normal Flow
                const botResponse: Message = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: `Toppen! Jag har reserverat ${dateStr}. \n\nInnan vi går vidare måste jag be dig godkänna att vi behandlar dina personuppgifter enligt GDPR för att kunna hantera din bokning. Läs gärna vår [Integritetspolicy] för mer information.`,
                    choices: ['Jag godkänner']
                };
                setMessages(prev => [...prev, botResponse]);
                setBookingState('gdpr_consent');
            }
            setIsTyping(false);
        }, 600);
    };

    const handleInteraction = async (input: string) => {
        const userMsg: Message = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 800));

        let botResponse: Message = { id: Date.now() + 1, sender: 'bot', text: '', choices: [] };

        try {
            const lowerInput = input.toLowerCase();

            // --- GLOBAL INTENT RECOGNITION (Smart Recovery) ---

            // 1. Time of Day Change (e.g. User clicks "Kväll" while in Name step)
            if (['förmiddag', 'eftermiddag', 'kväll'].includes(lowerInput)) {
                const timeOfDay = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
                setBookingData(prev => ({ ...prev, time: timeOfDay })); // Store preference

                botResponse.text = `Jag har uppdaterat kalendern för ${lowerInput}. Välj ett datum:`;
                setBookingState('date_selection');
                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);
                return;
            }

            // 2. Restart / New Booking
            if (input === 'Ja, boka hembesök' || lowerInput.includes('boka hembesök') || (lowerInput.includes('boka') && bookingState === 'none')) {
                setBookingData({});
                // SKIP Time of Day Selection -> Go straight to Calendar
                botResponse.text = 'Absolut! Här är lediga tider i kalendern. De gröna tiderna är lediga att boka:';
                setBookingState('date_selection');
                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);
                return;
            }

            // 3. Change Details (Explicit Command)
            if (input === 'Ändra uppgifter') {
                botResponse.text = "Inga problem! Låt oss ta det från början. Vad är ditt för- och efternamn?";
                setBookingState('details_name');
                setBookingData(prev => ({ ...prev, name: '', phone: '', email: '', street: '', zip: '', city: '' }));
                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);
                return;
            }

            // 4. Close Chat
            if (input === 'Stäng chatt') {
                setIsOpen(false);
                setIsTyping(false);
                return;
            }

            // 5. Global Button Protection (Ghost Clicks)
            // Prevent button text from being interpreted as data input (Name, Phone, etc.)
            const protectedPhrases = [
                'jag godkänner',
                'ja, boka nu',
                'välj annat datum',
                'visa fler tider',
                'solceller',
                'fråga om solceller',
                'nej tack',
                'ja, visa tider'
            ];

            if (protectedPhrases.includes(lowerInput)) {
                // If we are here, it means the input didn't match a specific state handler below
                // (or we are in a state that treats everything as text, like 'details_name').

                // Specific Check: 'Jag godkänner' is only valid in 'gdpr_consent'
                if (lowerInput === 'jag godkänner' && bookingState !== 'gdpr_consent') {
                    botResponse.text = "Det valet är inte aktuellt just nu. Låt oss fortsätta där vi var.";
                    setMessages(prev => [...prev, botResponse]);
                    setIsTyping(false);
                    return;
                }

                // Specific Check: 'Ja, boka nu' is only valid in 'confirmation'
                if (lowerInput === 'ja, boka nu' && bookingState !== 'confirmation') {
                    botResponse.text = "Vi är inte riktigt klara för bokning än. Jag behöver lite mer uppgifter först.";
                    setMessages(prev => [...prev, botResponse]);
                    setIsTyping(false);
                    return;
                }

                // Handle 'Solceller' / 'Fråga om solceller' - General Inquiry
                if (lowerInput === 'solceller' || lowerInput === 'fråga om solceller') {
                    botResponse.text = "Vad funderar du på kring solceller? Jag kan svara på det mesta! Skriv din fråga här.";
                    // We can reset booking state if they switch to asking questions, or keep it.
                    // Resetting is safer to avoid "Name: Solceller".
                    if (bookingState !== 'none') {
                        setBookingState('none');
                        setBookingData({});
                    }
                    setMessages(prev => [...prev, botResponse]);
                    setIsTyping(false);
                    return;
                }

                // Handle 'Nej tack'
                if (lowerInput === 'nej tack') {
                    botResponse.text = "Inga problem! Säg till om du ändrar dig eller undrar något annat.";
                    setBookingState('none');
                    setBookingData({});
                    setMessages(prev => [...prev, botResponse]);
                    setIsTyping(false);
                    return;
                }

                // Handle Quote Followup
                if (lowerInput === 'ja, visa tider' && bookingState === 'quote_followup') {
                    botResponse.text = 'Härligt! Här är lediga tider i kalendern:';
                    setBookingState('date_selection');
                    setMessages(prev => [...prev, botResponse]);
                    setIsTyping(false);
                    return;
                }

                // General catch-all for other buttons
                if (bookingState.startsWith('details_')) {
                    botResponse.text = "Jag förstod inte riktigt. Kan du skriva svaret istället för att klicka på gamla knappar? 🙂";
                    setMessages(prev => [...prev, botResponse]);
                    setIsTyping(false);
                    return;
                }
            }

            // --- END GLOBAL INTENTS ---

            // Booking Flow
            if (bookingState !== 'none' && bookingState !== 'done') {
                if (input === 'Visa fler tider') {
                    // Legacy/Fallback
                    botResponse.text = "Använd kalendern ovan för att se alla tider.";
                }
                else if (bookingState === 'date_selection') {
                    // If the input is a slot selection from the calendar, handleSlotSelect already manages the flow.
                    // We just return here to prevent handleInteraction from adding another bot response.
                    if (input.startsWith('Jag väljer tiden: ')) {
                        return;
                    }
                    // Input should be "Jag väljer datum: YYYY-MM-DD"
                    const dateMatch = input.match(/datum: (\d{4}-\d{2}-\d{2})/);
                    if (dateMatch) {
                        const selectedDate = dateMatch[1];
                        const preferredTime = bookingData.time || 'Förmiddag'; // Fallback to Förmiddag if undefined

                        // Fetch slots for this date AND preference
                        const calendarData = await callApi(`/calendar/slots?date=${selectedDate}&timeOfDay=${preferredTime}`);

                        if (calendarData && calendarData.slots && calendarData.slots.length > 0) {
                            const backendTimes = calendarData.slots.map((s: any) => s.time);

                            // Store mapping
                            const newMap: Record<string, string> = {};
                            calendarData.slots.forEach((s: any) => {
                                newMap[s.time] = s.iso;
                            });
                            setSlotMap(newMap);

                            botResponse.text = `Här är lediga tider för ${selectedDate} (${preferredTime.toLowerCase()}):`;
                            botResponse.choices = [...backendTimes, 'Välj annat datum'];
                            setBookingState('specific_time');
                        } else {
                            botResponse.text = `Tyvärr fanns inga tider den ${selectedDate} på ${preferredTime.toLowerCase()}en. Välj ett annat datum:`;
                            // Stay in date_selection
                            setBookingState('date_selection');
                        }
                    } else if (input === 'Välj annat datum') {
                        botResponse.text = 'Välj ett nytt datum i kalendern:';
                        setBookingState('date_selection');
                    } else {
                        // Fallback
                        botResponse.text = 'Vänligen välj ett datum i kalendern.';
                        setBookingState('date_selection');
                    }
                }
                else if (bookingState === 'specific_time') {
                    if (input === 'Välj annat datum') {
                        botResponse.text = 'Inga problem. Välj ett nytt datum i kalendern:';
                        setBookingState('date_selection');
                    } else {
                        // Retrieve ISO string from map
                        const isoTime = slotMap[input];

                        // Save ISO if available, otherwise input (fallback)
                        setBookingData({ ...bookingData, time: isoTime || input });

                        // GDPR Check
                        botResponse.text = `Toppen! Jag har reserverat ${input}. \n\nInnan vi går vidare måste jag be dig godkänna att vi behandlar dina personuppgifter enligt GDPR för att kunna hantera din bokning. Läs gärna vår [Integritetspolicy] för mer information.`;
                        botResponse.choices = ['Jag godkänner'];
                        setBookingState('gdpr_consent');
                    }
                }
                else if (bookingState === 'gdpr_consent' && input === 'Jag godkänner') {
                    botResponse.text = "Tack! Vad är ditt för- och efternamn?";
                    setBookingState('details_name');
                }
                else if (bookingState === 'details_name') {
                    if (input.trim().split(' ').length < 2) {
                        botResponse.text = "Förlåt, jag behöver både för- och efternamn för bokningen. Försök igen! 🙂";
                    } else {
                        setBookingData({ ...bookingData, name: input });
                        botResponse.text = `Tack ${input}. Vilket telefonnummer kan Hans nå dig på?`;
                        setBookingState('details_phone');
                    }
                }
                else if (bookingState === 'details_phone') {
                    setBookingData({ ...bookingData, phone: input });
                    botResponse.text = "Utmärkt. Vilken e-postadress ska vi skicka bokningsbekräftelsen till?";
                    setBookingState('details_email');
                }
                else if (bookingState === 'details_email') {
                    if (!input.includes('@')) {
                        botResponse.text = "Det ser inte ut som en giltig e-postadress. Försök igen! 📧";
                    } else {
                        setBookingData({ ...bookingData, email: input });
                        botResponse.text = "Perfekt. Slutligen, vad är din adress (Gata, Gatunummer)?";
                        setBookingState('details_address_street');
                    }
                }
                else if (bookingState === 'details_address_street') {
                    setBookingData({ ...bookingData, street: input });
                    botResponse.text = "Tack. Vilket postnummer?";
                    setBookingState('details_address_zip');
                }
                else if (bookingState === 'details_address_zip') {
                    const cleanZip = input.replace(/\\s/g, '');
                    setBookingData({ ...bookingData, zip: input });

                    // Try to auto-fetch the city if zip is 5 digits
                    if (cleanZip.length === 5) {
                        try {
                            const zipRes = await fetch(`https://api.zippopotam.us/se/${cleanZip}`);
                            if (zipRes.ok) {
                                const data = await zipRes.json();
                                if (data.places && data.places.length > 0) {
                                    const autoCity = data.places[0]['place name'];
                                    const fullAddress = `${bookingData.street}, ${input} ${autoCity}`;
                                    const newData = { ...bookingData, zip: input, city: autoCity, fullAddress };
                                    setBookingData(newData);

                                    // Format the time nicely for display
                                    let displayTime = newData.time || '';
                                    if (displayTime.includes('T')) {
                                        try {
                                            const dateObj = new Date(displayTime);
                                            const dateStr = dateObj.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });
                                            const timeStr = dateObj.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
                                            displayTime = `${dateStr} kl ${timeStr}`;
                                            displayTime = displayTime.charAt(0).toUpperCase() + displayTime.slice(1);
                                        } catch (e) {}
                                    }

                                    botResponse.text = `Tack! Jag ser att det är i ${autoCity}. Då har jag följande uppgifter:
                    
👤 ${newData.name}
📞 ${newData.phone}
📧 ${newData.email}
🏠 ${fullAddress}
📅 ${displayTime}

Stämmer detta?`;
                                    botResponse.choices = ['Ja, boka nu', 'Ändra uppgifter'];
                                    setBookingState('confirmation');
                                    
                                    // Early return since we updated botResponse
                                    setMessages(prev => [...prev, botResponse]);
                                    setIsTyping(false);
                                    return;
                                }
                            }
                        } catch (err) {
                            // Silent fail, just ask for city normally
                        }
                    }

                    // Fallback: If zip lookup fails, ask manually
                    botResponse.text = "Och vilken ort?";
                    setBookingState('details_address_city');
                }
                else if (bookingState === 'details_address_city') {
                    const fullAddress = `${bookingData.street}, ${bookingData.zip} ${input}`;
                    const newData = { ...bookingData, city: input, fullAddress };
                    setBookingData(newData);

                    // Format the time nicely for display
                    let displayTime = newData.time || '';
                    if (displayTime.includes('T')) {
                        try {
                            const dateObj = new Date(displayTime);
                            const dateStr = dateObj.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });
                            const timeStr = dateObj.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
                            displayTime = `${dateStr} kl ${timeStr}`;
                            // Capitalize first letter
                            displayTime = displayTime.charAt(0).toUpperCase() + displayTime.slice(1);
                        } catch (e) {
                            // Fallback to original if parse fails
                        }
                    }

                    botResponse.text = `Tack! Då har jag följande uppgifter:
                    
👤 ${newData.name}
📞 ${newData.phone}
📧 ${newData.email}
🏠 ${fullAddress}
📅 ${displayTime}

Stämmer detta?`;
                    botResponse.choices = ['Ja, boka nu', 'Ändra uppgifter'];
                    setBookingState('confirmation');
                }
                else if (bookingState === 'confirmation' && input === 'Ändra uppgifter') {
                    botResponse.text = "Inga problem! Låt oss ta det från början. Vad är ditt för- och efternamn?";
                    setBookingState('details_name');
                    // Keep the time, reset other details
                    setBookingData({ ...bookingData, name: '', phone: '', email: '', street: '', zip: '', city: '' });
                }
                else if (bookingState === 'confirmation' && input === 'Ja, boka nu') {                    // Helper to format date nicely: "Måndag 25 november kl 10:00"
                    let dateObj = new Date();
                    const timeInput = bookingData.time!;

                    // Robust ISO check
                    if (timeInput.includes('T') && (timeInput.includes('-') || timeInput.includes(':'))) {
                        dateObj = new Date(timeInput);
                    } else {
                        // Fallback for legacy/text inputs (should rarely happen now)
                        const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
                        const dayName = timeInput.split(' ')[0];
                        const timePart = timeInput.match(/\d{2}:\d{2}/)?.[0] || "10:00";
                        const [hours, minutes] = timePart.split(':').map(Number);

                        const currentDayIndex = dateObj.getDay();
                        const targetDayIndex = days.indexOf(dayName);

                        if (targetDayIndex !== -1) {
                            let daysToAdd = (targetDayIndex + 7 - currentDayIndex) % 7;
                            if (daysToAdd === 0 && (dateObj.getHours() > hours)) {
                                daysToAdd = 7;
                            }
                            dateObj.setDate(dateObj.getDate() + daysToAdd);
                            dateObj.setHours(hours, minutes, 0, 0);
                        }
                    }

                    const dateStr = dateObj.toLocaleDateString('sv-SE', { weekday: 'long', day: 'numeric', month: 'long' });
                    const timeStr = dateObj.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
                    const niceDate = `${dateStr} kl ${timeStr}`;

                    // Send Email to Customer AND Admin
                    await callApi('/email/send', 'POST', {
                        to: [bookingData.email, 'hej@takel.se'], // Send to both
                        subject: `Bokningsbekräftelse - ${niceDate}`,
                        body: `
                            <p>Hej ${bookingData.name}!</p>
                            <p>På ${niceDate} kommer Hans Nilsson från Takel till er då vi går igenom hur solceller och batterier kan hjälpa er med just era förutsättningar.</p>
                            <p>Om ni får förhinder når ni Hans på 070-870 42 33.</p>
                            <br>
                            <p>Med vänlig hälsning,</p>
                            <p>Takel AB</p>
                            <hr>
                            <p><small>Admin-kopia: Ny bokning mottagen.</small></p>
                        `
                    });

                    // Book Calendar
                    await callApi('/calendar/book', 'POST', {
                        summary: `Hembesök: ${bookingData.name}`,
                        description: `Tel: ${bookingData.phone}\nAdress: ${bookingData.fullAddress}\nEmail: ${bookingData.email}`,
                        startTime: bookingData.time // Pass ISO string directly
                    });

                    botResponse.text = "Fantastiskt! 🎉 Bokningen är bekräftad och jag har skickat ett mail till dig (och en kopia till Hans). Vi ses!";
                    botResponse.choices = ['Stäng chatt'];
                    setBookingState('done');
                }
            }
            else {
                // General Chat with Backend
                const chatData = await callApi('/chat', 'POST', { message: input });
                if (chatData && chatData.response) {
                    botResponse.text = chatData.response;
                    if (!botResponse.choices || botResponse.choices.length === 0) {
                        if (botResponse.text.toLowerCase().includes('boka')) {
                            botResponse.choices = ['Ja, boka hembesök', 'Nej tack'];
                        } else {
                            botResponse.choices = ['Boka hembesök'];
                        }
                    }
                } else {
                    botResponse.text = "Jag har lite svårt att nå min hjärna just nu, men jag kan boka möten! Vill du boka ett hembesök?";
                    botResponse.choices = ['Ja, boka hembesök'];
                }
            }

            setMessages(prev => [...prev, botResponse]);

        } catch (error) {
            console.error(error);
        } finally {
            setIsTyping(false);
        }
    };

    const [isClosing, setIsClosing] = useState(false);
    const [showHelpMessage, setShowHelpMessage] = useState(false);
    const [isPillClosed, setIsPillClosed] = useState(false);
    const [isPillAnimation, setIsPillAnimation] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
            setShowHelpMessage(true);
            setTimeout(() => setShowHelpMessage(false), 4000);
        }, 500); // 500ms animation duration
    };

    const handlePillClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPillAnimation(true);
        setTimeout(() => {
            setIsPillClosed(true);
            setIsPillAnimation(false);
            setShowHelpMessage(true);
            setTimeout(() => setShowHelpMessage(false), 4000);
        }, 500); // Animation duration
    };

    return (
        <>
            {/* Floating Trigger / Top Bar */}
            {!isOpen && (
                <>
                    {/* Top Center Trigger */}
                    {!isPillClosed && (
                        <div
                            className={`fixed z-50 animate-in slide-in-from-top-4 duration-500
                                ${isClosing ? 'invisible' : ''}
                                ${isPillAnimation
                                    ? 'transition-all duration-500 ease-in-out opacity-0 translate-y-[80vh] translate-x-[40vw] scale-0'
                                    : 'top-24 left-1/2 -translate-x-1/2'
                                }
                            `}
                            style={isPillAnimation ? { top: '6rem', left: '50%' } : {}}
                        >
                            <div className="relative group">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="bg-white/90 backdrop-blur-md border border-orange-200 shadow-lg rounded-full px-6 py-3 flex items-center gap-3 hover:scale-105 transition-transform"
                                >
                                    <div className="relative">
                                        <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white"></div>
                                        <Bot className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs text-gray-500 font-medium">Takel Assistent</p>
                                        <p className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Boka hembesök & få offert</p>
                                    </div>
                                </button>

                                {/* Close Button for Pill */}
                                <button
                                    onClick={handlePillClose}
                                    className="absolute -top-2 -right-2 bg-white border border-orange-100 shadow-sm rounded-full p-1 text-gray-400 hover:text-orange-600 hover:border-orange-200 transition-colors z-20"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Bottom Right Trigger */}
                    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
                        {showHelpMessage && (
                            <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-xl border border-orange-100 max-w-[200px] animate-in fade-in slide-in-from-bottom-2 mb-2">
                                <p className="text-sm font-medium text-gray-800">Jag finns här om du behöver hjälp! 👋</p>
                            </div>
                        )}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-transform hover:scale-110 animate-in slide-in-from-bottom-4 duration-500"
                        >
                            <Bot className="w-8 h-8" />
                        </button>
                    </div>
                </>
            )}

            {/* Chat Window - Centered Top/Middle */}
            {isOpen && (
                <div
                    className={`fixed z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-orange-100 flex flex-col overflow-hidden max-h-[80vh]
                        ${isClosing
                            ? 'transition-all duration-500 ease-in-out opacity-0 translate-y-[40vh] translate-x-[40vw] scale-0'
                            : 'top-24 left-1/2 -translate-x-1/2 animate-in zoom-in-95 duration-300'
                        }
                    `}
                    style={isClosing ? { top: '6rem', left: '50%' } : {}}
                >
                    {/* Header */}
                    <div className="bg-orange-600 p-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-full">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Takel Assistent</h3>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                                    <p className="text-orange-100 text-xs">{isBackendOnline ? 'Online' : 'Offline'}</p>
                                </div>
                            </div>
                        </div>
                        {/* Custom Close Button */}
                        <div className="relative group">
                            <button
                                onClick={handleClose}
                                className="bg-orange-700/50 hover:bg-orange-800/80 rounded-full p-2 text-white/90 hover:text-white transition-all shadow-sm group-hover:shadow-md"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 min-h-[300px]">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`p-4 rounded-2xl max-w-[85%] text-sm md:text-base leading-relaxed shadow-sm whitespace-pre-wrap ${msg.sender === 'user'
                                    ? 'bg-orange-600 text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                                    }`}>
                                    {(() => {
                                        if (msg.text.includes('[Integritetspolicy]')) {
                                            const parts = msg.text.split('[Integritetspolicy]');
                                            return (
                                                <>
                                                    {parts[0]}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            onOpenPrivacy?.();
                                                        }}
                                                        className="text-orange-600 underline font-medium hover:text-orange-700 mx-1 inline-block"
                                                    >
                                                        Integritetspolicy
                                                    </button>
                                                    {parts[1]}
                                                </>
                                            );
                                        }
                                        return msg.text;
                                    })()}
                                </div>

                                {/* Suggestions / Choices - ALWAYS BELOW */}
                                {msg.sender === 'bot' && msg.choices && msg.choices.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        {msg.choices.map((choice, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleChoice(choice)}
                                                className="bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:shadow-sm"
                                            >
                                                {choice}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex items-center gap-1 p-4 bg-white rounded-2xl rounded-tl-none w-fit border border-gray-200">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />

                        {/* Weekly Calendar View */}
                        {bookingState === 'date_selection' && (
                            isLoadingSlots ? (
                                <div className="p-4 text-center text-gray-500 text-sm animate-pulse">
                                    Laddar tillgängliga tider...
                                </div>
                            ) : renderWeeklyCalendar()
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Skriv en fråga..."
                                className="flex-1 p-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-sm"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-xl transition-colors shadow-sm"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div >
            )}
        </>
    );
};
