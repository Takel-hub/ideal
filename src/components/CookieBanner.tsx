import { useState, useEffect } from 'react';

interface CookieBannerProps {
    onOpenPrivacy?: () => void;
}

export const CookieBanner = ({ onOpenPrivacy }: CookieBannerProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted or declined cookies
        const cookieConsent = localStorage.getItem('takel_cookie_consent');
        if (!cookieConsent) {
            // Show banner after a short delay so it doesn't block immediate initial render
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        } else if (cookieConsent === 'accepted') {
            // If already accepted, initialize Analytics silently
            initAnalytics();
        }
    }, []);

    const initAnalytics = () => {
        const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with real Google Analytics ID
        const FB_PIXEL_ID = 'XXXXXXXXXXXXXXX'; // TODO: Replace with real Facebook Pixel ID
        
        // Inject Google Analytics script if not already present
        if (!document.getElementById('ga-script')) {
            const script1 = document.createElement('script');
            script1.id = 'ga-script';
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
            `;
            document.head.appendChild(script2);
        }

        // Inject Facebook Pixel if not already present
        if (!document.getElementById('fb-pixel-script')) {
            const fbScript = document.createElement('script');
            fbScript.id = 'fb-pixel-script';
            fbScript.innerHTML = `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
            `;
            document.head.appendChild(fbScript);
        }
    };

    const handleAccept = () => {
        localStorage.setItem('takel_cookie_consent', 'accepted');
        setIsVisible(false);
        initAnalytics();
    };

    const handleDecline = () => {
        localStorage.setItem('takel_cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 md:p-6 z-[200] animate-in slide-in-from-bottom-10 duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-600 flex-1">
                    <p className="font-bold text-gray-900 mb-1">Vi använder cookies 🍪</p>
                    <p>
                        Takel.se använder cookies för att analysera trafik och förbättra din upplevelse. 
                        Genom att klicka på "Acceptera" godkänner du vår användning av cookies. 
                        Du kan läsa mer i vår <button type="button" onClick={onOpenPrivacy} className="text-orange-600 underline hover:text-orange-700 font-medium">Integritetspolicy</button>.
                    </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto shrink-0">
                    <button 
                        onClick={handleDecline}
                        className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Neka
                    </button>
                    <button 
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-6 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors shadow-sm"
                    >
                        Acceptera
                    </button>
                </div>
            </div>
        </div>
    );
};
