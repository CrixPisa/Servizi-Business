// Cookie Banner GDPR
// Gestisce il consenso per cookie analitici e pubblicitari

(function() {
    'use strict';
    
    const COOKIE_NAME = 'sb_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;
    
    // Controlla se il consenso è già stato dato
    function hasConsent() {
        return localStorage.getItem(COOKIE_NAME) !== null;
    }
    
    function getConsent() {
        const consent = localStorage.getItem(COOKIE_NAME);
        return consent ? JSON.parse(consent) : null;
    }
    
    function saveConsent(analytics, advertising) {
        const consent = {
            analytics: analytics,
            advertising: advertising,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(COOKIE_NAME, JSON.stringify(consent));
        
        // Imposta cookie per 365 giorni
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + COOKIE_EXPIRY_DAYS);
        document.cookie = `${COOKIE_NAME}=accepted; expires=${expiry.toUTCString()}; path=/; SameSite=Lax`;
    }
    
    function loadGoogleAnalytics() {
        // Google Analytics già caricato nell'head, qui lo attiviamo
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
            console.log('✅ Google Analytics attivato');
        }
    }
    
    function loadGoogleAdSense() {
        // AdSense già caricato nell'head, qui lo attiviamo
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
            console.log('✅ Google AdSense attivato');
        }
        
        // Inizializza AdSense se presente
        if (typeof adsbygoogle !== 'undefined') {
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch(e) {
                console.warn('AdSense init error:', e);
            }
        }
    }
    
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div style="
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px;">
                        <div style="flex: 1; min-width: 300px;">
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <i class="fas fa-cookie-bite" style="font-size: 24px; margin-right: 12px;"></i>
                                <h3 style="margin: 0; font-size: 20px; font-weight: bold;">Cookie e Privacy</h3>
                            </div>
                            <p style="margin: 0; font-size: 14px; line-height: 1.6; opacity: 0.95;">
                                Utilizziamo cookie tecnici, analitici (Google Analytics) e pubblicitari (Google AdSense) per migliorare la tua esperienza. 
                                Continuando la navigazione accetti tutti i cookie. 
                                <a href="privacy.html" style="color: #fff; text-decoration: underline; font-weight: bold;">Leggi la Privacy Policy</a>
                            </p>
                        </div>
                        
                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            <button id="cookie-accept-all" style="
                                background: #10b981;
                                color: white;
                                border: none;
                                padding: 12px 24px;
                                border-radius: 8px;
                                font-size: 15px;
                                font-weight: bold;
                                cursor: pointer;
                                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                                transition: all 0.2s;
                            " onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10b981'">
                                <i class="fas fa-check mr-1"></i> Accetta Tutti
                            </button>
                            
                            <button id="cookie-reject-optional" style="
                                background: #ef4444;
                                color: white;
                                border: none;
                                padding: 12px 24px;
                                border-radius: 8px;
                                font-size: 15px;
                                font-weight: bold;
                                cursor: pointer;
                                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                                transition: all 0.2s;
                            " onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">
                                <i class="fas fa-times mr-1"></i> Solo Necessari
                            </button>
                            
                            <button id="cookie-customize" style="
                                background: rgba(255,255,255,0.2);
                                color: white;
                                border: 2px solid white;
                                padding: 12px 24px;
                                border-radius: 8px;
                                font-size: 15px;
                                font-weight: bold;
                                cursor: pointer;
                                transition: all 0.2s;
                            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                                <i class="fas fa-cog mr-1"></i> Personalizza
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Pannello Personalizzazione -->
            <div id="cookie-settings" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; color: #333; padding: 30px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); z-index: 10000; max-width: 500px; width: 90%;">
                <h3 style="margin: 0 0 20px 0; color: #667eea; font-size: 24px;">
                    <i class="fas fa-cookie-bite mr-2"></i>Impostazioni Cookie
                </h3>
                
                <div style="margin-bottom: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" checked disabled style="width: 20px; height: 20px; margin-right: 12px;">
                        <div>
                            <strong style="display: block; margin-bottom: 4px;">Cookie Tecnici (Necessari)</strong>
                            <span style="font-size: 13px; color: #6b7280;">Essenziali per il funzionamento del sito</span>
                        </div>
                    </label>
                </div>
                
                <div style="margin-bottom: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" id="cookie-analytics" checked style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
                        <div>
                            <strong style="display: block; margin-bottom: 4px;">Cookie Analitici</strong>
                            <span style="font-size: 13px; color: #6b7280;">Google Analytics - per migliorare il sito</span>
                        </div>
                    </label>
                </div>
                
                <div style="margin-bottom: 25px; padding: 15px; background: #f3f4f6; border-radius: 8px;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="checkbox" id="cookie-advertising" checked style="width: 20px; height: 20px; margin-right: 12px; cursor: pointer;">
                        <div>
                            <strong style="display: block; margin-bottom: 4px;">Cookie Pubblicitari</strong>
                            <span style="font-size: 13px; color: #6b7280;">Google AdSense - per annunci personalizzati</span>
                        </div>
                    </label>
                </div>
                
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button id="cookie-save-settings" style="
                        background: #667eea;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-weight: bold;
                        cursor: pointer;
                    ">
                        Salva Preferenze
                    </button>
                    <button id="cookie-close-settings" style="
                        background: #e5e7eb;
                        color: #374151;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-weight: bold;
                        cursor: pointer;
                    ">
                        Annulla
                    </button>
                </div>
            </div>
            
            <!-- Overlay -->
            <div id="cookie-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9998;"></div>
        `;
        
        document.body.appendChild(banner);
        
        // Event Listeners
        document.getElementById('cookie-accept-all').addEventListener('click', () => {
            saveConsent(true, true);
            loadGoogleAnalytics();
            loadGoogleAdSense();
            banner.remove();
        });
        
        document.getElementById('cookie-reject-optional').addEventListener('click', () => {
            saveConsent(false, false);
            banner.remove();
        });
        
        document.getElementById('cookie-customize').addEventListener('click', () => {
            document.getElementById('cookie-settings').style.display = 'block';
            document.getElementById('cookie-overlay').style.display = 'block';
        });
        
        document.getElementById('cookie-save-settings').addEventListener('click', () => {
            const analytics = document.getElementById('cookie-analytics').checked;
            const advertising = document.getElementById('cookie-advertising').checked;
            
            saveConsent(analytics, advertising);
            
            if (analytics) loadGoogleAnalytics();
            if (advertising) loadGoogleAdSense();
            
            banner.remove();
        });
        
        document.getElementById('cookie-close-settings').addEventListener('click', () => {
            document.getElementById('cookie-settings').style.display = 'none';
            document.getElementById('cookie-overlay').style.display = 'none';
        });
    }
    
    // Inizializzazione
    document.addEventListener('DOMContentLoaded', () => {
        if (!hasConsent()) {
            // Nessun consenso ancora dato - mostra banner
            createBanner();
        } else {
            // Consenso già dato - carica i servizi autorizzati
            const consent = getConsent();
            if (consent.analytics) loadGoogleAnalytics();
            if (consent.advertising) loadGoogleAdSense();
        }
    });
    
    // Esponi funzione per revocare consenso
    window.revokeCookieConsent = function() {
        localStorage.removeItem(COOKIE_NAME);
        document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        alert('Consenso cookie revocato. Ricarica la pagina per impostare nuove preferenze.');
        location.reload();
    };
    
    console.log('✅ Cookie Banner caricato');
})();
