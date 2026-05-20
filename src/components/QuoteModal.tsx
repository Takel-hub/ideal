import React, { useState, useEffect } from 'react';
import { X, Check, Loader2 } from 'lucide-react';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: any) => void;
    initialData?: any;
}

export const QuoteModal = ({ isOpen, onClose, onSuccess, initialData }: QuoteModalProps) => {
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

    // Reset form when opening, merge with initialData if provided
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: '',
                phone: '',
                email: '',
                street: '',
                zip: '',
                city: '',
                consumption: initialData?.consumption ? initialData.consumption.toString() : 'T.ex. 15000',
                gdpr: false
            });
            setErrors({});
        }
    }, [isOpen, initialData]);

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
                            setErrors(prev => ({ ...prev, city: '' })); // Clear city error if any
                        }
                    }
                } catch (err) {
                    // Silent fail or manual entry allowed
                } finally {
                    setIsLoadingCity(false);
                }
            }
        };

        const timer = setTimeout(lookupCity, 500); // Debounce
        return () => clearTimeout(timer);
    }, [formData.zip]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Namn krävs';

        // Phone validation (simple SE format check)
        // A simpler regex for "contains digits, maybe spaces/dashes, min length 8" is often safer for UX
        if (!formData.phone.replace(/[\s-]/g, '').match(/^\d{8,12}$/)) {
            newErrors.phone = 'Ange ett giltigt telefonnummer';
        }

        // Email validation
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Ange en giltig e-postadress';
        }

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
                onSuccess(formData);
                onClose();
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

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Gratis hembesök!</h2>
                        <p className="text-gray-500">Fyll i formuläret så återkommer vi inom 24 timmar.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Phone */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Namn *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full p-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all`}
                                    placeholder="För- och efternamn"
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Telefon *</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className={`w-full p-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all`}
                                    placeholder="070-123 45 67"
                                />
                                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">E-post *</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className={`w-full p-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all`}
                                placeholder="namn@exempel.se"
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Adress *</label>
                            <input
                                type="text"
                                value={formData.street}
                                onChange={e => setFormData({ ...formData, street: e.target.value })}
                                className={`w-full p-3 rounded-lg border ${errors.street ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all`}
                                placeholder="Gatuadress"
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
                                    className={`w-full p-3 rounded-lg border ${errors.zip ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all`}
                                    placeholder="123 45"
                                    maxLength={6}
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
                                        className={`w-full p-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-gray-50`}
                                        placeholder="Ort"
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

                        {/* Consumption */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Ungefärlig elförbrukning (kWh/år)</label>
                            <select
                                value={formData.consumption}
                                onChange={e => setFormData({ ...formData, consumption: e.target.value })}
                                className="w-full p-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all bg-white"
                            >
                                <option>T.ex. 15000</option>
                                <option>Under 10 000</option>
                                <option>10 000 - 20 000</option>
                                <option>Över 20 000</option>
                            </select>
                        </div>

                        {/* GDPR */}
                        <div className="flex items-start gap-3 pt-2">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    id="gdpr"
                                    checked={formData.gdpr}
                                    onChange={e => setFormData({ ...formData, gdpr: e.target.checked })}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-orange-500 checked:bg-orange-500 hover:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                                />
                                <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                            </div>
                            <label htmlFor="gdpr" className="text-sm text-gray-600 cursor-pointer select-none">
                                Jag godkänner att Takel sparar mina uppgifter för att kunna hantera min offertförfrågan. <span className="text-xs text-gray-400 block mt-1">(Ditt godkännande sparas säkert i vårt system)</span>
                            </label>
                        </div>
                        {errors.gdpr && <p className="text-xs text-red-500">{errors.gdpr}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg shadow-md transition-all transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Skickar...
                                </>
                            ) : (
                                'Få gratis offert nu'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
