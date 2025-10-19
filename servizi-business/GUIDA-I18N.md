# 🚀 GUIDA RAPIDA - APPLICARE I18N A TUTTE LE PAGINE

## ✅ FATTO:
- index.html (100%)
- calcolo-iva.html (100%)
- i18n.js (sistema completo)

## 📝 DA FARE:

### STEP 1: HEADER UNIVERSALE
Sostituisci l'header in TUTTE le pagine con questo:

```html
<header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between flex-wrap gap-4">
            <a href="index.html" class="flex items-center space-x-2">
                <i class="fas fa-calculator text-blue-600 text-2xl"></i>
                <span class="text-xl font-bold text-gray-800">Servizi Business</span>
            </a>
            
            <div class="flex items-center gap-4 flex-wrap">
                <!-- Language Selector -->
                <div class="flex items-center bg-gray-100 rounded-lg p-1">
                    <button onclick="setLanguage('it')" data-lang="it" class="lang-btn px-2 py-1 rounded text-xs font-semibold transition">🇮🇹</button>
                    <button onclick="setLanguage('en')" data-lang="en" class="lang-btn px-2 py-1 rounded text-xs font-semibold transition">🇺🇸</button>
                    <button onclick="setLanguage('de')" data-lang="de" class="lang-btn px-2 py-1 rounded text-xs font-semibold transition">🇩🇪</button>
                    <button onclick="setLanguage('fr')" data-lang="fr" class="lang-btn px-2 py-1 rounded text-xs font-semibold transition">🇫🇷</button>
                    <button onclick="setLanguage('es')" data-lang="es" class="lang-btn px-2 py-1 rounded text-xs font-semibold transition">🇪🇸</button>
                </div>
                <a href="index.html" class="text-gray-600 hover:text-blue-600 transition">
                    <i class="fas fa-home mr-2"></i><span data-i18n="home">Home</span>
                </a>
            </div>
        </div>
    </nav>
</header>
```

### STEP 2: INCLUDI i18n.js
Nel <head> di OGNI pagina, dopo Tailwind:

```html
<script src="i18n.js"></script>
```

### STEP 3: TAG data-i18n
Aggiungi data-i18n="chiave" a TUTTI i testi:

**Esempi:**
```html
<h1 data-i18n="vatCalculatorTitle">Calcolatore IVA</h1>
<button data-i18n="calculate">Calcola</button>
<span data-i18n="result">Risultato</span>
```

## 📋 LISTA PAGINE DA TRADURRE:

### PRIORITÀ ALTA (Calcolatori):
- [ ] calcolo-stipendio.html
- [ ] calcolo-ritenuta.html
- [ ] calcolo-tfr.html
- [ ] calcolo-tasse-piva.html
- [ ] generatore-qr.html

### PRIORITÀ MEDIA:
- [ ] genera-fatture.html (+ sistema paese→lingua)
- [ ] genera-preventivi.html
- [ ] login.html
- [ ] lista-fatture.html

### PRIORITÀ BASSA:
- [ ] assistente-fiscale.html
- [ ] privacy.html
- [ ] terms.html

## 🎯 SISTEMA PAESE → LINGUA PER FATTURE

Nel file `genera-fatture.html`, aggiungi questo script:

```javascript
// Quando cambia il paese, cambia anche la lingua
document.getElementById('country').addEventListener('change', function() {
    const countryToLang = {
        'IT': 'it',
        'DE': 'de',
        'FR': 'fr',
        'ES': 'es',
        'US': 'en',
        'GB': 'en',
        'AT': 'de',
        'CH': 'de'
    };
    
    const selectedCountry = this.value;
    const newLang = countryToLang[selectedCountry];
    
    if (newLang && newLang !== currentLanguage) {
        setLanguage(newLang);
    }
});
```

## ✅ TEST FINALE:
1. Carica su Netlify
2. Testa ogni pagina
3. Cambia lingua → TUTTO deve cambiare
4. Nelle fatture: cambia paese → lingua automatica
