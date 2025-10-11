// Authentication System - Servizi Business Italia
// Integrato con Supabase

// Check if user is logged in (check both localStorage and Supabase session)
async function isLoggedIn() {
    // Quick check localStorage first
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return false;
    
    // Verify with Supabase if available
    if (typeof supabase !== 'undefined') {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            return session !== null;
        } catch (error) {
            console.error('Error checking auth:', error);
            return currentUser !== null;
        }
    }
    
    return currentUser !== null;
}

// Get current user
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Get current user from Supabase
async function getCurrentUserFromSupabase() {
    if (typeof supabase === 'undefined') {
        return getCurrentUser();
    }
    
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            // Update localStorage
            const userData = {
                id: user.id,
                email: user.email,
                name: user.user_metadata?.name || user.email.split('@')[0]
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            return userData;
        }
        
        return null;
    } catch (error) {
        console.error('Error getting user:', error);
        return getCurrentUser();
    }
}

// Logout function
async function logout() {
    if (confirm('Sei sicuro di voler uscire?')) {
        // Logout from Supabase if available
        if (typeof supabase !== 'undefined' && typeof supabaseLogout === 'function') {
            try {
                await supabaseLogout();
            } catch (error) {
                console.error('Error logging out:', error);
            }
        }
        
        // Clear localStorage
        localStorage.removeItem('currentUser');
        
        // Redirect to home
        window.location.href = 'index.html';
    }
}

// Protect page - redirect to login if not authenticated
async function protectPage() {
    const loggedIn = await isLoggedIn();
    
    if (!loggedIn) {
        alert('⚠️ Devi effettuare l\'accesso per usare questo servizio!');
        window.location.href = 'login.html';
    } else {
        // Refresh user data from Supabase
        await getCurrentUserFromSupabase();
    }
}

// Display user info in header
async function displayUserInfo() {
    const user = await getCurrentUserFromSupabase();
    
    if (user) {
        // Find user info container
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

// Listen to Supabase auth changes
if (typeof supabase !== 'undefined') {
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session) {
            // Update localStorage when user signs in
            const userData = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata?.name || session.user.email.split('@')[0]
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
        } else if (event === 'SIGNED_OUT') {
            // Clear localStorage when user signs out
            localStorage.removeItem('currentUser');
        }
    });
}

// Initialize auth on protected pages
document.addEventListener('DOMContentLoaded', async function() {
    // Check if page has 'protected' class or data attribute
    if (document.body.classList.contains('protected') || document.body.dataset.protected === 'true') {
        await protectPage();
        await displayUserInfo();
    } else {
        // Just display user info if logged in (for non-protected pages)
        const loggedIn = await isLoggedIn();
        if (loggedIn) {
            await displayUserInfo();
        }
    }
});

console.log('✅ Auth.js loaded (Supabase integrated)');
