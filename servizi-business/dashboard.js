// dashboard.js

// Funzione per verificare se l'utente è loggato
async function isLoggedIn() {
    if (typeof supabaseIsLoggedIn === 'function') {
        const isLoggedIn = await supabaseIsLoggedIn();
        return isLoggedIn;
    }
    return false;
}

// Funzione per iniettare la dashboard
async function injectDashboard() {
    const isAuthenticated = await isLoggedIn();
    const header = document.querySelector('header');
    if (!header) return;

    if (isAuthenticated) {
        const dashboardHTML = `
            <div id="dashboard" class="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-sm text-gray-600">Benvenuto! Sei loggato.</p>
                        <p id="userEmail" class="text-sm text-gray-700"></p>
                    </div>
                    <button id="logoutButton" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                        <i class="fas fa-sign-out-alt mr-2"></i>Esci
                    </button>
                </div>
            </div>
        `;
        header.insertAdjacentHTML('beforeend', dashboardHTML);

        // Recupera e mostra l'email dell'utente
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.email) {
            document.getElementById('userEmail').textContent = user.email;
        }

        // Aggiungi event listener per il logout
        document.getElementById('logoutButton').addEventListener('click', async () => {
            const logoutBtn = document.getElementById('logoutButton');
            logoutBtn.disabled = true;
            logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Disconnessione...';

            try {
                const { error } = await supabase.auth.signOut();
                if (error) {
                    alert('❌ Errore durante il logout: ' + error.message);
                } else {
                    alert('✅ Disconnessione avvenuta con successo!');
                    window.location.href = 'login.html';
                }
            } catch (error) {
                alert('❌ Errore di connessione durante il logout');
            } finally {
                logoutBtn.disabled = false;
                logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt mr-2"></i>Esci';
            }
        });
    } else {
        // Reindirizza al login se non autenticato
        alert('⚠️ Devi essere registrato per accedere a questa pagina!\n\nRegistrazione GRATUITA.');
        window.location.href = 'login.html';
    }
}

// Esegui l'iniezione della dashboard all'avvio
document.addEventListener('DOMContentLoaded', injectDashboard);