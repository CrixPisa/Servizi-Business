// auth.js - Sistema di autenticazione completo con Supabase

// ==========================================
// HELPER FUNCTIONS - Gestione Utente LocalStorage
// ==========================================

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}

// ==========================================
// PROTEZIONE PAGINE
// ==========================================

document.addEventListener('DOMContentLoaded', async function() {
    const isProtected = document.body.hasAttribute('data-protected');
    
    // Verifica se l'utente è loggato con Supabase
    let userLoggedIn = false;
    try {
        if (typeof supabaseIsLoggedIn === 'function') {
            userLoggedIn = await supabaseIsLoggedIn();
            
            // Se loggato su Supabase ma non in localStorage, sincronizza
            if (userLoggedIn && !isLoggedIn()) {
                const userData = await supabaseGetCurrentUser();
                if (userData) {
                    setCurrentUser(userData);
                }
            }
        }
    } catch (error) {
        console.warn('Supabase check failed, using localStorage:', error);
        userLoggedIn = isLoggedIn();
    }
    
    // Se la pagina è protetta e l'utente non è loggato
    if (isProtected && !userLoggedIn) {
        const wantsToAccess = confirm(
            '⚠️ Devi effettuare il login per accedere a questa pagina.\n\n' +
            'La registrazione è GRATUITA e richiede solo 30 secondi.\n\n' +
            'Vuoi procedere al login/registrazione?'
        );
        
        if (wantsToAccess) {
            window.location.href = 'login.html';
        } else {
            window.location.href = 'index.html';
        }
        return;
    }
    
    // Se loggato, aggiorna UI
    if (userLoggedIn || isLoggedIn()) {
        updateHeaderForLoggedUser();
        injectUserDashboard();
    }
});

// ==========================================
// UPDATE HEADER - Mostra Menu Utente
// ==========================================

function updateHeaderForLoggedUser() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Cerca container per pulsanti auth nell'header
    let authContainer = document.getElementById('authButtons');
    
    // Se non esiste, cerca un contenitore nell'header
    if (!authContainer) {
        const header = document.querySelector('header nav');
        if (header) {
            const existingContainer = header.querySelector('.flex.items-center.gap-4');
            if (existingContainer) {
                authContainer = document.createElement('div');
                authContainer.id = 'authButtons';
                authContainer.className = 'flex items-center gap-3';
                existingContainer.appendChild(authContainer);
            }
        }
    }
    
    if (authContainer) {
        authContainer.innerHTML = `
            <a href="lista-fatture.html" class="text-gray-600 hover:text-blue-600 transition">
                <i class="fas fa-file-invoice mr-1"></i>
                <span class="hidden md:inline">Dashboard</span>
            </a>
            <div class="relative group">
                <button class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <i class="fas fa-user-circle"></i>
                    <span class="hidden md:inline">${user.name.split(' ')[0]}</span>
                    <i class="fas fa-chevron-down text-xs"></i>
                </button>
                <div class="hidden group-hover:block absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                    <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
                        <p class="text-sm font-semibold text-gray-800 truncate">${user.name}</p>
                        <p class="text-xs text-gray-600 truncate">${user.email}</p>
                    </div>
                    <a href="lista-fatture.html" class="block px-4 py-2 text-gray-800 hover:bg-blue-50 transition text-sm">
                        <i class="fas fa-file-invoice mr-2 text-blue-600"></i>Le Mie Fatture
                    </a>
                    <a href="genera-fatture.html" class="block px-4 py-2 text-gray-800 hover:bg-blue-50 transition text-sm">
                        <i class="fas fa-plus mr-2 text-green-600"></i>Nuova Fattura
                    </a>
                    <a href="genera-preventivi.html" class="block px-4 py-2 text-gray-800 hover:bg-blue-50 transition text-sm">
                        <i class="fas fa-file-alt mr-2 text-purple-600"></i>Nuovo Preventivo
                    </a>
                    <hr class="my-2">
                    <button onclick="logout()" class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition text-sm">
                        <i class="fas fa-sign-out-alt mr-2"></i>Esci
                    </button>
                </div>
            </div>
        `;
    }
}

// ==========================================
// INJECT DASHBOARD (per pagine protette)
// ==========================================

function injectUserDashboard() {
    const user = getCurrentUser();
    if (!user) return;
    
    // Cerca un container per user info
    const userInfoContainer = document.getElementById('userInfo');
    if (userInfoContainer && !userInfoContainer.querySelector('.user-dashboard')) {
        const dashboardHTML = `
            <div class="user-dashboard flex items-center gap-4">
                <a href="genera-fatture.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <i class="fas fa-plus mr-2"></i>Nuova Fattura
                </a>
                <a href="genera-preventivi.html" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    <i class="fas fa-file-alt mr-2"></i>Nuovo Preventivo
                </a>
                <a href="index.html" class="text-gray-600 hover:text-blue-600 transition">
                    <i class="fas fa-home mr-2"></i>Home
                </a>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                    <i class="fas fa-user-circle text-lg"></i>
                    <span class="hidden md:inline">${user.name.split(' ')[0]}</span>
                </div>
                <button onclick="logout()" class="text-red-600 hover:text-red-700 transition">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="hidden md:inline ml-1">Esci</span>
                </button>
            </div>
        `;
        userInfoContainer.innerHTML = dashboardHTML;
    }
}

// ==========================================
// LOGOUT FUNCTION
// ==========================================

async function logout() {
    if (!confirm('Sei sicuro di voler uscire?')) {
        return;
    }
    
    try {
        // Logout da Supabase se disponibile
        if (typeof supabaseLogout === 'function') {
            await supabaseLogout();
        }
        
        // Pulisci localStorage
        clearCurrentUser();
        
        alert('✅ Logout effettuato con successo!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
        // Fallback: pulisci comunque localStorage
        clearCurrentUser();
        window.location.href = 'index.html';
    }
}

// ==========================================
// FUNZIONI DI SUPPORTO PER LOGIN/REGISTER
// ==========================================

// Queste funzioni vengono chiamate da login.html
// e usano le funzioni di supabase-config.js

async function performLogin(email, password) {
    try {
        const result = await supabaseLogin(email, password);
        return result;
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Errore di connessione' };
    }
}

async function performRegister(name, email, password) {
    try {
        const result = await supabaseRegister(name, email, password);
        return result;
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, error: 'Errore di connessione' };
    }
}

// ==========================================
// PROTEZIONE LINK A FATTURE/PREVENTIVI
// ==========================================

// Aggiungi protezione ai link fatture/preventivi anche su pagine pubbliche
document.addEventListener('DOMContentLoaded', function() {
    // Aspetta un momento per dare tempo al sistema di caricare
    setTimeout(() => {
        const protectedLinks = document.querySelectorAll('a[href="genera-fatture.html"], a[href="genera-preventivi.html"], a[href="lista-fatture.html"]');
        
        protectedLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (!isLoggedIn()) {
                    e.preventDefault();
                    const wantsToRegister = confirm(
                        '⚠️ Devi essere registrato per accedere a questo servizio!\n\n' +
                        '✅ Registrazione GRATUITA in 30 secondi\n' +
                        '✅ Crea fatture e preventivi illimitati\n' +
                        '✅ Dashboard con storico documenti\n\n' +
                        'Vuoi registrarti ora?'
                    );
                    
                    if (wantsToRegister) {
                        window.location.href = 'login.html';
                    }
                }
            });
        });
    }, 500);
});

console.log('✅ Auth system loaded');