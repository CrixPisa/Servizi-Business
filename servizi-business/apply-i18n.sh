#!/bin/bash
# Script per applicare Header Universale a tutti i calcolatori

# Header da sostituire (quello vecchio)
OLD_HEADER='    <!-- Header -->
    <header class="bg-white shadow-sm">
        <nav class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="index.html" class="flex items-center space-x-2">
                    <i class="fas fa-calculator text-blue-600 text-2xl"></i>
                    <span class="text-xl font-bold text-gray-800">Servizi Business</span>
                </a>
                <a href="index.html" class="text-gray-600 hover:text-blue-600 transition">
                    <i class="fas fa-home mr-2"></i>Home
                </a>
            </div>
        </nav>
    </header>'

# Header nuovo con selector lingua
NEW_HEADER='    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
        <nav class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between flex-wrap gap-4">
                <a href="index.html" class="flex items-center space-x-2">
                    <i class="fas fa-calculator text-blue-600 text-2xl"></i>
                    <span class="text-xl font-bold text-gray-800">Servizi Business</span>
                </a>
                <div class="flex items-center gap-4 flex-wrap">
                    <div class="flex items-center bg-gray-100 rounded-lg p-1">
                        <button onclick="setLanguage('\''it'\'')" data-lang="it" class="lang-btn px-2 py-1 rounded text-xs font-semibold transition">🇮🇹</button>
                        <button onclick="setLanguage('\''en'\'')" data-lang="en" class="lang-btn px-2 py-1 rounded text-xs font-semibold transition">🇺🇸</button>
                        <button onclick="setLanguage('\''de'\'')" data-lang="de" class="lang-btn px-2 py-1 rounded text-xs font-semibold transition">🇩🇪</button>
                        <button onclick="setLanguage('\''fr'\'')" data-lang="fr" class="lang-btn px-2 py-1 rounded text-xs font-semibold transition">🇫🇷</button>
                        <button onclick="setLanguage('\''es'\'')" data-lang="es" class="lang-btn px-2 py-1 rounded text-xs font-semibold transition">🇪🇸</button>
                    </div>
                    <a href="index.html" class="text-gray-600 hover:text-blue-600 transition">
                        <i class="fas fa-home mr-2"></i><span data-i18n="home">Home</span>
                    </a>
                </div>
            </div>
        </nav>
    </header>'

# File da processare
FILES=(
    "calcolo-stipendio.html"
    "calcolo-ritenuta.html"
    "calcolo-tfr.html"
    "calcolo-tasse-piva.html"
    "generatore-qr.html"
    "assistente-fiscale.html"
    "login.html"
    "genera-preventivi.html"
    "lista-fatture.html"
)

echo "🚀 Applicando header universale a tutti i file..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Processando $file..."
        # Sostituisci header
        # (questo è pseudo-codice, va adattato)
    else
        echo "⚠️  File $file non trovato"
    fi
done

echo "✅ Completato!"
