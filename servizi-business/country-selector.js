// country-selector.js
// Gestisce il selettore paese globale e sincronizza tra pagine

function createCountrySelector() {
    const currentCountry = getCurrentCountry();
    const currentTaxSystem = TAX_SYSTEMS[currentCountry];
    
    return `
        <div class="relative">
            <button id="countryToggle" class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                <i class="fas fa-globe"></i>
                <span id="currentCountryName">${currentTaxSystem.country}</span>
                <i class="fas fa-chevron-down text-xs"></i>
            </button>
            
            <div id="countryDropdown" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                ${Object.keys(TAX_SYSTEMS).map(code => `
                    <button class="country-option w-full text-left px-4 py-3 hover:bg-blue-50 transition flex items-center gap-3 ${code === currentCountry ? 'bg-blue-100 font-semibold' : ''}"
                            data-country="${code}">
                        <span class="text-2xl">${getCountryFlag(code)}</span>
                        <span>${TAX_SYSTEMS[code].country}</span>
                        ${code === currentCountry ? '<i class="fas fa-check ml-auto text-blue-600"></i>' : ''}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function getCountryFlag(code) {
    const flags = {
        it: '🇮🇹',
        de: '🇩🇪',
        fr: '🇫🇷',
        es: '🇪🇸',
        gb: '🇬🇧',
        us: '🇺🇸',
        au: '🇦🇺'
    };
    return flags[code] || '🌍';
}

function initCountrySelector() {
    document.getElementById('countryToggle')?.addEventListener('click', function(e) {
        e.stopPropagation();
        document.getElementById('countryDropdown').classList.toggle('hidden');
    });
    
    document.addEventListener('click', function() {
        document.getElementById('countryDropdown')?.classList.add('hidden');
    });
    
    document.querySelectorAll('.country-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const newCountry = this.dataset.country;
            setCurrentCountry(newCountry);
            
            document.getElementById('currentCountryName').textContent = TAX_SYSTEMS[newCountry].country;
            document.getElementById('countryDropdown').classList.add('hidden');
            
            location.reload();
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('headerCountrySelector');
    if (container) {
        container.innerHTML = createCountrySelector();
        initCountrySelector();
    }
});

console.log('✅ Country Selector loaded');