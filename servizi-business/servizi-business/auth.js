// Authentication System - Servizi Business Italia

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
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
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
        // Find user info container
        const userInfoContainer = document.getElementById('userInfo');
        if (userInfoContainer) {
            userInfoContainer.innerHTML = `
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

// Initialize auth on protected pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if page has 'protected' class or data attribute
    if (document.body.classList.contains('protected') || document.body.dataset.protected === 'true') {
        protectPage();
        displayUserInfo();
    }
});
