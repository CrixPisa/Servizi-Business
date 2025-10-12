// Supabase Configuration - FALLBACK VERSION
// Funziona SEMPRE, anche se Supabase SDK non carica

const SUPABASE_URL = 'https://wnolarbrlbyzfdnnnqlz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indub2xhcmJybGJ5emZkbm5ucWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Nzc4MTksImV4cCI6MjA3NTQ1MzgxOX0.wBX5xx29skvRaCTYM_5nIYVYzFEJ5wkActWGbh7f0kk';

// Initialize Supabase client
let supabase = null;

// Wait for Supabase SDK to load
function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase connesso:', SUPABASE_URL);
        return true;
    } else {
        console.warn('⚠️ Supabase SDK non ancora caricato');
        return false;
    }
}

// Try to init immediately
setTimeout(initSupabase, 100);

// AUTH FUNCTIONS WITH FALLBACK

async function supabaseLogin(email, password) {
    // Try to init if not already done
    if (!supabase) {
        initSupabase();
    }
    
    // Fallback: use fetch directly
    if (!supabase) {
        try {
            const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('currentUser', JSON.stringify({
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.user_metadata?.name || email.split('@')[0]
                }));
                return { success: true, user: data.user };
            } else {
                return { success: false, error: data.error_description || 'Email o password errati' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Errore di connessione' };
        }
    }
    
    // Use Supabase SDK if available
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            return { success: false, error: error.message };
        }

        localStorage.setItem('currentUser', JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.name || email.split('@')[0]
        }));

        return { success: true, user: data.user };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Errore di connessione' };
    }
}

async function supabaseRegister(name, email, password) {
    // Try to init if not already done
    if (!supabase) {
        initSupabase();
    }
    
    // Fallback: use fetch directly
    if (!supabase) {
        try {
            const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    data: {
                        name: name
                    }
                })
            });

            const data = await response.json();

            if (response.ok) {
                return { success: true, user: data.user };
            } else {
                return { success: false, error: data.error_description || 'Errore durante la registrazione' };
            }
        } catch (error) {
            console.error('Register error:', error);
            return { success: false, error: 'Errore di connessione' };
        }
    }
    
    // Use Supabase SDK if available
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
        return { success: false, error: 'Errore di connessione' };
    }
}

async function supabaseLogout() {
    localStorage.removeItem('currentUser');
    
    if (!supabase) {
        return { success: true };
    }
    
    try {
        await supabase.auth.signOut();
    } catch (error) {
        console.error('Logout error:', error);
    }
    
    return { success: true };
}

async function supabaseIsLoggedIn() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
}

async function supabaseGetCurrentUser() {
    const localUser = localStorage.getItem('currentUser');
    return localUser ? JSON.parse(localUser) : null;
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

console.log('✅ supabase-config.js loaded (fallback version)');
