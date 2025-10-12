// Authentication System - STABLE VERSION
// Last updated: 2025-01-12

function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function logout() {
    if (confirm('Sei sicuro di voler uscire?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

function protectPage() {
    if (!isLoggedIn()) {
        alert('⚠️ Devi effettuare l\'accesso per usare questo servizio!');
        window.location.href = 'login.html';
    }
}

function displayUserInfo() {
    const user = getCurrentUser();
    if (user) {
        const container = document.getElementById('userInfo');
        if (container) {
            container.innerHTML = `
                <div class="flex items-center gap-4">
                    <span class="text-gray-700">
                        <i class="fas fa-user-circle mr-2"></i>${user.name}
                    </span>
                    <button onclick="logout()" class="text-red-600 hover:text-red-700">
                        <i class="fas fa-sign-out-alt mr-1"></i>Esci
                    </button>
                </div>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('protected') || 
        document.body.dataset.protected === 'true') {
        protectPage();
        displayUserInfo();
    }
});

console.log('✅ auth.js loaded');
