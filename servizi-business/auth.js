// Authentication System - Servizi Business Italia
// PRODUCTION VERSION - Simplified and Stable

// Check if user is logged in
function isLoggedIn() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
}

// Get current user
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Logout function
function logout() {
    if (confirm('Sei sicuro di voler uscire?')) {
        // Try Supabase logout if available
        if (typeof supabaseLogout === 'function') {
            supabaseLogout().then(() => {
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            }).catch(() => {
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        } else {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        }
    }
}

// Protect page - redirect to login if not authenticated
function protectPage() {
    if (!isLoggedIn()) {
        alert('⚠️ Devi effettuare l\'accesso per usare questo servizio!');
        window.location.href = 'login.html';
    }
}

// Display user info in header
function displayUserInfo() {
    const user = getCurrentUser();
    if (user) {
        const userInfoContainer = document.getElementById('userInfo');
        if (userInfoContainer) {
            userInfoContainer.innerHTML = `
                <div class="flex items-center gap-4">
                    <span class="text-gray-700">
                        <i class="fas fa-user-circle mr-2"></i>${user.name}
                    </span>
                    <button onclick="logout()" class="text-red-600 hover:text-red-700 font-semibold">
                        <i class="fas fa-sign-out-alt mr-1"></i>Esci
                    </button>
                </div>
            `;
        }
    }
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if page needs protection
    if (document.body.classList.contains('protected') || 
        document.body.dataset.protected === 'true') {
        protectPage();
        displayUserInfo();
    } else {
        // Just display user info if logged in
        if (isLoggedIn()) {
            displayUserInfo();
        }
    }
});

console.log('✅ auth.js loaded (simplified version)');
