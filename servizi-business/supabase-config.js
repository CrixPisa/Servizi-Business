// Supabase Configuration - PRODUCTION READY
// Credenziali progetto Supabase

const SUPABASE_URL = 'https://wnolarbrlbyzfdnnnqlz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indub2xhcmJybGJ5emZkbm5ucWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Nzc4MTksImV4cCI6MjA3NTQ1MzgxOX0.wBX5xx29skvRaCTYM_5nIYVYzFEJ5wkActWGbh7f0kk';

// Initialize Supabase client
let supabase;

try {
    if (typeof window !== 'undefined' && window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase connesso:', SUPABASE_URL);
    } else {
        console.warn('⚠️ Supabase SDK non caricato, alcune funzioni potrebbero non funzionare');
    }
} catch (error) {
    console.error('❌ Errore inizializzazione Supabase:', error);
}

// AUTH FUNCTIONS

async function supabaseLogin(email, password) {
    if (!supabase) {
        return { success: false, error: 'Sistema non disponibile' };
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            return { success: false, error: error.message };
        }

        // Save user data to localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.name || email.split('@')[0]
        }));

        return { success: true, user: data.user };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Errore di connessione al server' };
    }
}

async function supabaseRegister(name, email, password) {
    if (!supabase) {
        return { success: false, error: 'Sistema non disponibile' };
    }
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, user: data.user };
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, error: 'Errore di connessione al server' };
    }
}

async function supabaseLogout() {
    if (!supabase) {
        localStorage.removeItem('currentUser');
        return { success: true };
    }
    
    try {
        const { error } = await supabase.auth.signOut();
        localStorage.removeItem('currentUser');
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true };
    } catch (error) {
        localStorage.removeItem('currentUser');
        return { success: true };
    }
}

async function supabaseIsLoggedIn() {
    // Quick check localStorage first
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return false;
    
    if (!supabase) return true; // Fallback to localStorage if Supabase unavailable
    
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return session !== null;
    } catch (error) {
        console.error('Session check error:', error);
        return currentUser !== null;
    }
}

async function supabaseGetCurrentUser() {
    // Try localStorage first
    const localUser = localStorage.getItem('currentUser');
    
    if (!supabase) {
        return localUser ? JSON.parse(localUser) : null;
    }
    
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            const userData = {
                id: user.id,
                email: user.email,
                name: user.user_metadata?.name || user.email.split('@')[0]
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            return userData;
        }
        
        return localUser ? JSON.parse(localUser) : null;
    } catch (error) {
        console.error('Get user error:', error);
        return localUser ? JSON.parse(localUser) : null;
    }
}

// Listen to auth state changes (only if Supabase is available)
if (supabase) {
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth event:', event);
        
        if (event === 'SIGNED_IN' && session) {
            const userData = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata?.name || session.user.email.split('@')[0]
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
        } else if (event === 'SIGNED_OUT') {
            localStorage.removeItem('currentUser');
        }
    });
}

console.log('✅ supabase-config.js loaded');
