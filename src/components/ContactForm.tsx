import React, { useState, useEffect } from 'react';
import { Loader2, Check } from 'lucide-react';

interface ContactFormProps {
    onSuccess?: (data: any) => void;
}

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        street: '',
        zip: '',
        city: '',
        consumption: 'T.ex. 15000',
        gdpr: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingCity, setIsLoadingCity] = useState(false);

    // Zip Code Lookup
    useEffect(() => {
        const lookupCity = async () => {
            const cleanZip = formData.zip.replace(/\s/g, '');
            if (cleanZip.length === 5) {
                setIsLoadingCity(true);
                try {
                    const res = await fetch(`https://api.zippopotam.us/se/${cleanZip}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.places && data.places.length > 0) {
                            setFormData(prev => ({ ...prev, city: data.places[0]['place name'] }));
                            setErrors(prev => ({ ...prev, city: '' }));
                        }
                    }
                } catch (err) {
                    // Silent fail
                } finally {
                    setIsLoadingCity(false);
                }
            }
        };

        const timer = setTimeout(lookupCity, 500);
        return () => clearTimeout(timer);
    }, [formData.zip]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Namn krävs';
        if (!formData.phone.replace(/[\s-]/g, '').match(/^\d{8,12}$/)) newErrors.phone = 'Ange ett giltigt telefonnummer';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Ange en giltig e-postadress';
        if (!formData.street.trim()) newErrors.street = 'Gatuadress krävs';
        if (!formData.zip.replace(/\s/g, '').match(/^\d{5}$/)) newErrors.zip = 'Postnummer ska vara 5 siffror';
        if (!formData.city.trim()) newErrors.city = 'Ort krävs';
        if (!formData.gdpr) newErrors.gdpr = 'Du måste godkänna villkoren';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/quote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    address: {
                        street: formData.street,
                        zip: formData.zip,
                        city: formData.city
                    },
                    consumption: formData.consumption,
                    gdprConsent: formData.gdpr
                })
            });

            if (res.ok) {
                if (onSuccess) onSuccess(formData);
                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    street: '',
                    zip: '',
                    city: '',
                    consumption: 'T.ex. 15000',
                    gdpr: false
                });
                alert('Tack för din förfrågan! Vi återkommer snart.');
            } else {
                alert('Något gick fel. Försök igen senare.');
            }
        } catch (err) {
            console.error(err);
            alert('Kunde inte skicka förfrågan.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-20 bg-white" id="kontakt">
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Få din gratis offert idag!</h2>
                    <p className="text-gray-500">Svar inom 24 timmar - inga dolda avgifter</p>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-orange-100 shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Namn *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ditt namn"
                                    className={`w-full p-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all`}
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Telefon *</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="070-123 45 67"
                                    className={`w-full p-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all`}
                                />
                                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">E-post *</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                placeholder="din@epost.se"
                                className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all`}
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Adress i Stockholm *</label>
                            <input
                                type="text"
                                value={formData.street}
                                onChange={e => setFormData({ ...formData, street: e.target.value })}
                                placeholder="Gatuadress"
                                className={`w-full p-3 rounded-lg border ${errors.street ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all`}
                            />
                            {errors.street && <p className="text-xs text-red-500">{errors.street}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Postnummer *</label>
                                <input
                                    type="text"
                                    value={formData.zip}
                                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                    placeholder="123 45"
                                    maxLength={6}
                                    className={`w-full p-3 rounded-lg border ${errors.zip ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all`}
                                />
                                {errors.zip && <p className="text-xs text-red-500">{errors.zip}</p>}
                            </div>
                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700">Ort *</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        placeholder="Ort"
                                        className={`w-full p-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-gray-50`}
                                    />
                                    {isLoadingCity && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                                        </div>
                                    )}
                                </div>
                                {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="consumption" className="text-sm font-bold text-gray-700">Årlig elförbrukning</label>
                            <select
                                id="consumption"
                                value={formData.consumption}
                                onChange={e => setFormData({ ...formData, consumption: e.target.value })}
                                className="w-full p-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all appearance-none bg-white"
                            >
                                <option>T.ex. 15000</option>
                                <option>Under 10 000</option>
                                <option>10 000 - 20 000</option>
                                <option>Över 20 000</option>
                            </select>
                        </div>

                        <div className="flex items-start gap-3 pt-2">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    id="contact-gdpr"
                                    checked={formData.gdpr}
                                    onChange={e => setFormData({ ...formData, gdpr: e.target.checked })}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-orange-500 checked:bg-orange-500 hover:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                                />
                                <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                            </div>
                            <label htmlFor="contact-gdpr" className="text-sm text-gray-600 cursor-pointer select-none">
                                Jag godkänner att Takel sparar mina uppgifter för att kunna hantera min offertförfrågan.
                            </label>
                        </div>
                        {errors.gdpr && <p className="text-xs text-red-500">{errors.gdpr}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg shadow-md transition-colors text-lg mt-4 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Skickar...
                                </>
                            ) : (
                                'Skicka offertförfrågan'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
