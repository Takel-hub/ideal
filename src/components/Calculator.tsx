import { useState, useMemo } from 'react';
import { X } from 'lucide-react';

interface CalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Calculator = ({ isOpen, onClose }: CalculatorProps) => {
    const [consumption, setConsumption] = useState(15000);
    const [panels, setPanels] = useState(12);
    const [fuse, setFuse] = useState('20 A');
    const [profile, setProfile] = useState('Jobbar dagtid');
    const [tariffRate, setTariffRate] = useState(100); // kr/kW per month (Effekttariff)
    const [batterySize, setBatterySize] = useState(10); // kWh

    // Constants
    const PANEL_POWER = 440; // W
    const YIELD_PER_KW = 950; // kWh/kWp in Stockholm
    const SELF_USE_RATIO = profile === 'Hemma dagtid' ? 0.5 : 0.35;
    const ELEC_PRICE_BUY = 2.50; // kr/kWh (saved)
    const ELEC_PRICE_SELL = 0.80; // kr/kWh (sold + tax reduction)

    // Battery / Tariff Logic
    // Rule of thumb: 1 kWh battery capacity can reduce peak by ~0.4 kW.
    // Max reduction capped at realistic villa peak (e.g. 11-15 kW depending on fuse).

    // Pricing Logic (Piecewise interpolation to match Packages)
    const calculateInvestment = (p: number, b: number) => {
        const BASE_PRICE = 81845; // Start Package (8p + 5kWh)

        let panelCost = 0;
        if (p <= 16) {
            // Linear from 8 -> 16 (Start -> Familj)
            // Slope: (120889 - 81845 - (5000*5)) / 8 = 1755 per panel (assuming battery slope 5000)
            panelCost = (p - 8) * 1755;
        } else {
            // Linear from 16 -> 22 (Familj -> Premium)
            // Slope: (172278 - 120889 - (5000*5)) / 6 = 4398 per panel
            panelCost = (8 * 1755) + (p - 16) * 4400;
        }

        let batteryCost = 0;
        // Battery slope assumed constant ~5000kr/kWh based on package deltas
        batteryCost = (b - 5) * 5000;

        return Math.round(BASE_PRICE + panelCost + batteryCost);
    };

    const calculations = useMemo(() => {
        const systemSizeKw = (panels * PANEL_POWER) / 1000;
        const production = Math.round(systemSizeKw * YIELD_PER_KW);

        const selfUsed = Math.round(production * SELF_USE_RATIO);
        const sold = production - selfUsed;

        const savingsSelfUse = Math.round(selfUsed * ELEC_PRICE_BUY);
        const earningsSold = Math.round(sold * ELEC_PRICE_SELL);

        // Tariff Savings Calculation
        const estimatedPeakReduction = Math.min(batterySize * 0.4, 12); // Cap at 12kW reduction
        const earningsBattery = Math.round(estimatedPeakReduction * tariffRate * 12);

        const totalReturn = savingsSelfUse + earningsSold + earningsBattery;
        const investment = calculateInvestment(panels, batterySize);
        const payback = (investment / totalReturn).toFixed(1);

        return {
            production,
            selfUsed,
            sold,
            savingsSelfUse,
            earningsSold,
            earningsBattery,
            totalReturn,
            investment,
            payback,
            estimatedPeakReduction
        };
    }, [panels, profile, tariffRate, batterySize]);

    if (!isOpen) return null;

    // Pie Chart Data
    const total = calculations.totalReturn;
    const p1 = (calculations.earningsSold / total) * 100;
    const p2 = (calculations.savingsSelfUse / total) * 100;
    const p3 = (calculations.earningsBattery / total) * 100;

    // SVG Pie Chart Paths
    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    let cumulativePercent = 0;
    const slices = [
        { percent: p1 / 100, color: '#ef4444', label: 'Såld el' }, // Red
        { percent: p2 / 100, color: '#3b82f6', label: 'Egenanvändning' }, // Blue
        { percent: p3 / 100, color: '#eab308', label: 'Batteri & Tariff' }  // Yellow
    ].map(slice => {
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += slice.percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
        const pathData = [
            `M 0 0`,
            `L ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 0 0`,
        ].join(' ');
        return { ...slice, path: pathData };
    });

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl flex flex-col md:flex-row"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Left Column: Inputs */}
                <div className="w-full md:w-1/2 p-8 border-r border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Information om hushållet</h2>

                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">Årsförbrukning</label>
                                <span className="text-sm font-bold text-gray-900">{consumption.toLocaleString()} kWh</span>
                            </div>
                            <input
                                type="range"
                                min="5000"
                                max="30000"
                                step="500"
                                value={consumption}
                                onChange={(e) => setConsumption(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Huvudsäkring</label>
                                <select
                                    value={fuse}
                                    onChange={(e) => setFuse(e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                                >
                                    <option>16 A</option>
                                    <option>20 A</option>
                                    <option>25 A</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profil</label>
                                <select
                                    value={profile}
                                    onChange={(e) => setProfile(e.target.value)}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2 border"
                                >
                                    <option>Jobbar dagtid</option>
                                    <option>Hemma dagtid</option>
                                </select>
                            </div>
                        </div>

                        <div className={batterySize === 0 ? "opacity-50 transition-opacity" : "transition-opacity"}>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">Effekttariff (kr/kW/mån)</label>
                                <span className="text-sm font-bold text-gray-900">{tariffRate} kr</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                step="10"
                                value={tariffRate}
                                disabled={batterySize === 0}
                                onChange={(e) => setTariffRate(parseInt(e.target.value))}
                                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${batterySize === 0 ? 'bg-gray-200' : 'bg-gray-200 accent-orange-600'}`}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {batterySize === 0 ? "Kräver ett batteri för att kapa effekttoppar" : "Avgift för effekttoppar (varierar per nätägare)"}
                            </p>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">Batteristorlek</label>
                                <span className="text-sm font-bold text-gray-900">{batterySize} kWh</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="60"
                                step="5"
                                value={batterySize}
                                onChange={(e) => setBatterySize(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Sänker din effekttopp med ca <span className="font-bold">{calculations.estimatedPeakReduction.toFixed(1)} kW</span>
                            </p>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Välj antal paneler</h3>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700">Antal paneler</label>
                                <span className="text-sm font-bold text-gray-900">{panels} st</span>
                            </div>
                            <input
                                type="range"
                                min="5"
                                max="40"
                                step="1"
                                value={panels}
                                onChange={(e) => setPanels(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Results */}
                <div className="w-full md:w-1/2 p-8 bg-gray-50">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Avkastning per år</h2>
                    <p className="text-5xl font-bold text-orange-600 mb-2">
                        {calculations.totalReturn.toLocaleString()} kr
                    </p>

                    <div className="mb-8">
                        <p className="text-sm text-gray-600">Beräknad investering: <span className="font-bold">{calculations.investment.toLocaleString()} kr</span></p>
                        <p className="text-sm text-gray-600">Återbetalningstid: <span className="font-bold">{calculations.payback} år</span></p>
                    </div>

                    <div className="flex items-center justify-center mb-8">
                        <div className="relative w-48 h-48">
                            <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-90">
                                {slices.map((slice, i) => (
                                    <path key={i} d={slice.path} fill={slice.color} />
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 text-xs mb-8">
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>Såld el</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>Använd el</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span>Batteri & Tariff</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="text-gray-500 text-xs">Elproduktion</p>
                            <p className="font-bold">{calculations.production.toLocaleString()} kWh</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="text-gray-500 text-xs">El du kan sälja</p>
                            <p className="font-bold">{calculations.sold.toLocaleString()} kWh</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="text-gray-500 text-xs">Förtjänst: Batteri & Tariff</p>
                            <p className="font-bold text-yellow-600">{calculations.earningsBattery.toLocaleString()} kr</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-sm">
                            <p className="text-gray-500 text-xs">Förtjänst: Såld el</p>
                            <p className="font-bold text-red-500">{calculations.earningsSold.toLocaleString()} kr</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
