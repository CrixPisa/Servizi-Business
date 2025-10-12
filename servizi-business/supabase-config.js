// Supabase Configuration - NEW PROJECT
// Fresh start with clean configuration

const SUPABASE_URL = 'https://aqblvbrvndvindxjkqqq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYmx2YnJ2bmR2aW5keGprcXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNzcxNDMsImV4cCI6MjA3NTc1MzE0M30.s2vnAy1gDJuBrWapGb-dk4xDfo8Z84o9Aut3axrwZMo';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function supabaseLogin(email, password) {
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
}

async function supabaseRegister(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { name: name }
        }
    });

    if (error) {
        return { success: false, error: error.message };
    }

    return { success: true, user: data.user };
}

async function supabaseLogout() {
    await supabase.auth.signOut();
    localStorage.removeItem('currentUser');
    return { success: true };
}

async function supabaseIsLoggedIn() {
    const { data: { session } } = await supabase.auth.getSession();
    return session !== null;
}

async function supabaseGetCurrentUser() {
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
}

console.log('✅ Supabase connected:', SUPABASE_URL);
