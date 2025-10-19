// Script per aggiornare i bottoni Login/Register con traduzioni
document.addEventListener('DOMContentLoaded', function() {
    updateHeaderButtons();
});

function updateHeaderButtons() {
    const currentUser = getCurrentUser();
    const headerButtons = document.getElementById('headerButtons');
    
    if (!headerButtons) return;
    
    if (currentUser) {
        headerButtons.innerHTML = `
            <a href="lista-fatture.html" class="text-gray-600 hover:text-blue-600 transition">
                <i class="fas fa-tachometer-alt mr-1"></i><span data-i18n="dashboard">Dashboard</span>
            </a>
            <div class="relative group">
                <button class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <i class="fas fa-user-circle"></i>
                    <span>${currentUser.name}</span>
                    <i class="fas fa-chevron-down text-sm"></i>
                </button>
                <div class="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <button onclick="logout()" class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition">
                        <i class="fas fa-sign-out-alt mr-2"></i><span data-i18n="logout">Esci</span>
                    </button>
                </div>
            </div>
        `;
    } else {
        headerButtons.innerHTML = `
            <a href="login.html" class="text-blue-600 hover:text-blue-700 transition font-semibold">
                <i class="fas fa-sign-in-alt mr-1"></i><span data-i18n="login">Accedi</span>
            </a>
            <a href="login.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                <i class="fas fa-user-plus mr-1"></i><span data-i18n="register">Registrati</span>
            </a>
        `;
    }
    
    // Re-translate after updating
    if (typeof setLanguage === 'function' && typeof currentLanguage !== 'undefined') {
        setLanguage(currentLanguage);
    }
}
