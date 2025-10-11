// Supabase Configuration - REALE
// Credenziali progetto Supabase

const SUPABASE_URL = 'https://wnolarbrlbyzfdnnnqlz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indub2xhcmJybGJ5emZkbm5ucWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Nzc4MTksImV4cCI6MjA3NTQ1MzgxOX0.wBX5xx29skvRaCTYM_5nIYVYzFEJ5wkActWGbh7f0kk';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase connesso:', SUPABASE_URL);

// AUTH FUNCTIONS

async function supabaseLogin(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            return { success: false, error: error.message };
        }

        // Save user data to localStorage for quick access
        localStorage.setItem('currentUser', JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.name || email.split('@')[0]
        }));

        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: 'Errore di connessione al server' };
    }
}

async function supabaseRegister(name, email, password) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                },
                emailRedirectTo: window.location.origin + '/login.html'
            }
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, error: 'Errore di connessione al server' };
    }
}

async function supabaseLogout() {
    try {
        const { error } = await supabase.auth.signOut();
        localStorage.removeItem('currentUser');
        
        if (error) {
            return { success: false, error: error.message };
        }
        
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Errore di connessione' };
    }
}

async function supabaseIsLoggedIn() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return session !== null;
    } catch (error) {
        return false;
    }
}

async function supabaseGetCurrentUser() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            // Update localStorage with fresh data
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                email: user.email,
                name: user.user_metadata?.name || user.email.split('@')[0]
            }));
        }
        
        return user;
    } catch (error) {
        return null;
    }
}

// DATABASE FUNCTIONS

async function saveFatturaToSupabase(fatturaData) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return { success: false, error: 'Utente non autenticato' };
        }

        // Add user_id and timestamp
        const dataToSave = {
            ...fatturaData,
            user_id: user.id,
            created_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('fatture')
            .insert([dataToSave])
            .select();

        if (error) {
            console.error('Errore Supabase:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data: data };
    } catch (error) {
        console.error('Errore generale:', error);
        return { success: false, error: 'Errore di connessione' };
    }
}

async function getFattureFromSupabase(userId) {
    try {
        const { data, error } = await supabase
            .from('fatture')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Errore Supabase:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data: data || [] };
    } catch (error) {
        console.error('Errore generale:', error);
        return { success: false, error: 'Errore di connessione' };
    }
}

async function deleteFatturaFromSupabase(fatturaId) {
    try {
        const { error } = await supabase
            .from('fatture')
            .delete()
            .eq('id', fatturaId);

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        return { success: false, error: 'Errore di connessione' };
    }
}

// PREVENTIVI FUNCTIONS

async function savePreventivoToSupabase(preventivoData) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            return { success: false, error: 'Utente non autenticato' };
        }

        const dataToSave = {
            ...preventivoData,
            user_id: user.id,
            created_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('preventivi')
            .insert([dataToSave])
            .select();

        if (error) {
            console.error('Errore Supabase:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data: data };
    } catch (error) {
        console.error('Errore generale:', error);
        return { success: false, error: 'Errore di connessione' };
    }
}

async function getPreventiviFromSupabase(userId) {
    try {
        const { data, error } = await supabase
            .from('preventivi')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Errore Supabase:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data: data || [] };
    } catch (error) {
        console.error('Errore generale:', error);
        return { success: false, error: 'Errore di connessione' };
    }
}

// Listen to auth state changes
supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event);
    
    if (event === 'SIGNED_IN') {
        console.log('✅ Utente loggato');
    } else if (event === 'SIGNED_OUT') {
        console.log('👋 Utente disconnesso');
        localStorage.removeItem('currentUser');
    }
});
