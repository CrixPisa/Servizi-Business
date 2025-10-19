// Supabase Configuration - ORIGINAL VERSION
// Minimal setup - tested and working

const SUPABASE_URL = 'https://wnolarbrlbyzfdnnnqlz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indub2xhcmJybGJ5emZkbm5ucWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Nzc4MTksImV4cCI6MjA3NTQ1MzgxOX0.wBX5xx29skvRaCTYM_5nIYVYzFEJ5wkActWGbh7f0kk';

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

console.log('Supabase configured');
