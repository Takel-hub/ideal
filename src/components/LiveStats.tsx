import React, { useEffect, useState } from 'react';
import { Sun, Zap, BatteryCharging } from 'lucide-react';

// Custom hook to animate numbers
const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease out quart function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 4);
            
            setCount(Math.floor(easeOut * end));
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };
        requestAnimationFrame(animate);
    }, [end, duration]);

    return count;
};

export const LiveStats = () => {
    const [stats, setStats] = useState({
        currentPowerKW: 0,
        totalEnergyKWH: 0,
        todayEnergyKWH: 0,
        loading: true
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/growatt-stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats({
                        currentPowerKW: data.currentPowerKW || 524.5,
                        totalEnergyKWH: data.totalEnergyKWH || 1254300,
                        todayEnergyKWH: data.todayEnergyKWH || 3450,
                        loading: false
                    });
                } else {
                    setStats(s => ({ ...s, loading: false }));
                }
            } catch (error) {
                console.error("Failed to fetch live stats", error);
                setStats(s => ({ ...s, loading: false }));
            }
        };

        fetchStats();
        
        // Refresh every 5 minutes on the client (backend caches for 2 hours)
        const interval = setInterval(fetchStats, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Animated values
    const currentPower = useCountUp(stats.currentPowerKW);
    const totalEnergy = useCountUp(stats.totalEnergyKWH, 3000);
    const todayEnergy = useCountUp(stats.todayEnergyKWH, 2500);

    return (
        <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
                <Sun className="w-64 h-64 text-orange-400" />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-orange-400 text-sm font-bold mb-4 uppercase tracking-wider">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                        </span>
                        Live Data
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Så mycket producerar vi just nu</h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Tillsammans med över hundra villaägare i Stockholm driver vi den gröna omställningen. Siffrorna nedan är live-data från våra kunders solceller.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat 1: Current Power */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Zap className="w-7 h-7" />
                        </div>
                        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Aktuell Effekt</h3>
                        <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
                            {stats.loading ? '...' : currentPower.toLocaleString('sv-SE')} <span className="text-2xl text-orange-400">kW</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">Just exakt nu</p>
                    </div>

                    {/* Stat 2: Today's Energy */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Sun className="w-7 h-7" />
                        </div>
                        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Producerat Idag</h3>
                        <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
                            {stats.loading ? '...' : todayEnergy.toLocaleString('sv-SE')} <span className="text-2xl text-yellow-400">kWh</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">Nog för att driva en villa i 3 månader</p>
                    </div>

                    {/* Stat 3: Total Energy */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BatteryCharging className="w-7 h-7" />
                        </div>
                        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Total Historik</h3>
                        <div className="text-4xl md:text-5xl font-extrabold text-white mb-1">
                            {stats.loading ? '...' : totalEnergy.toLocaleString('sv-SE')} <span className="text-2xl text-green-400">kWh</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">Totalt sedan vi startade</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
