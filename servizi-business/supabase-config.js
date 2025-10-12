// Supabase Configuration - STABLE VERSION
// Last updated: 2025-01-12

const SUPABASE_URL = 'https://wnolarbrlbyzfdnnnqlz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indub2xhcmJybGJ5emZkbm5ucWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Nzc4MTksImV4cCI6MjA3NTQ1MzgxOX0.wBX5xx29skvRaCTYM_5nIYVYzFEJ5wkActWGbh7f0kk';

// Create Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase initialized');

// Simple Login Function
async function supabaseLogin(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.name || email.split('@')[0]
        }));

        return { success: true, user: data.user };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message || 'Credenziali non valide' };
    }
}

// Simple Register Function
async function supabaseRegister(name, email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { name: name }
            }
        });

        if (error) throw error;

        return { success: true, user: data.user };
    } catch (error) {
        console.error('Register error:', error);
        return { success: false, error: error.message || 'Errore durante la registrazione' };
    }
}

// Simple Logout Function
async function supabaseLogout() {
    try {
        await supabase.auth.signOut();
        localStorage.removeItem('currentUser');
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        localStorage.removeItem('currentUser');
        return { success: true };
    }
}

// Check if logged in
async function supabaseIsLoggedIn() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return session !== null;
    } catch (error) {
        return false;
    }
}

// Get current user
async function supabaseGetCurrentUser() {
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
        
        return null;
    } catch (error) {
        return null;
    }
}
