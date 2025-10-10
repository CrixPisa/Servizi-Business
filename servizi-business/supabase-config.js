// =====================================================
// SUPABASE CONFIGURATION
// =====================================================
const SUPABASE_URL = 'https://wnolarbrlbyzfdnnnqlz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indub2xhcmJybGJ5emZkbm5ucWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Nzc4MTksImV4cCI6MjA3NTQ1MzgxOX0.wBX5xx29skvRaCTYM_5nIYVYzFEJ5wkActWGbh7f0kk';

// Inizializza Supabase Client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =====================================================
// AUTH FUNCTIONS
// =====================================================

// Registrazione nuovo utente
async function supabaseRegister(name, email, password) {
  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        }
      }
    });
    
    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
}

// Login utente
async function supabaseLogin(email, password) {
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });
    
    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

// Logout
async function supabaseLogout() {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
}

// Get current user
async function supabaseGetCurrentUser() {
  try {
    const { data: { user }, error } = await supabaseClient.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

// Check if user is logged in
async function supabaseIsLoggedIn() {
  const user = await supabaseGetCurrentUser();
  return user !== null;
}

// =====================================================
// INVOICE FUNCTIONS
// =====================================================

// Salva fattura
async function supabaseSaveInvoice(invoiceData) {
  try {
    const user = await supabaseGetCurrentUser();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabaseClient
      .from('invoices')
      .insert([{
        user_id: user.id,
        ...invoiceData
      }])
      .select();
    
    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    console.error('Save invoice error:', error);
    return { success: false, error: error.message };
  }
}

// Get tutte le fatture dell'utente
async function supabaseGetInvoices() {
  try {
    const user = await supabaseGetCurrentUser();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabaseClient
      .from('invoices')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    console.error('Get invoices error:', error);
    return { success: false, error: error.message };
  }
}

// Elimina fattura
async function supabaseDeleteInvoice(invoiceId) {
  try {
    const { error } = await supabaseClient
      .from('invoices')
      .delete()
      .eq('id', invoiceId);
    
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Delete invoice error:', error);
    return { success: false, error: error.message };
  }
}

// =====================================================
// CUSTOMER FUNCTIONS
// =====================================================

// Salva cliente
async function supabaseSaveCustomer(customerData) {
  try {
    const user = await supabaseGetCurrentUser();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabaseClient
      .from('customers')
      .insert([{
        user_id: user.id,
        ...customerData
      }])
      .select();
    
    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    console.error('Save customer error:', error);
    return { success: false, error: error.message };
  }
}

// Get tutti i clienti
async function supabaseGetCustomers() {
  try {
    const user = await supabaseGetCurrentUser();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabaseClient
      .from('customers')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    console.error('Get customers error:', error);
    return { success: false, error: error.message };
  }
}

// =====================================================
// COMPANY DATA FUNCTIONS
// =====================================================

// Salva dati azienda
async function supabaseSaveCompanyData(companyData) {
  try {
    const user = await supabaseGetCurrentUser();
    if (!user) throw new Error('User not authenticated');
    
    // Upsert: insert se non esiste, update se esiste
    const { data, error } = await supabaseClient
      .from('company_data')
      .upsert({
        user_id: user.id,
        ...companyData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select();
    
    if (error) throw error;
    return { success: true, data: data };
  } catch (error) {
    console.error('Save company data error:', error);
    return { success: false, error: error.message };
  }
}

// Get dati azienda
async function supabaseGetCompanyData() {
  try {
    const user = await supabaseGetCurrentUser();
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabaseClient
      .from('company_data')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return { success: true, data: data };
  } catch (error) {
    console.error('Get company data error:', error);
    return { success: false, error: error.message };
  }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Initialize Supabase Auth Listener
function initSupabaseAuth() {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event);
    if (event === 'SIGNED_IN') {
      console.log('User signed in:', session.user);
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out');
      // Redirect to home or login
      window.location.href = 'index.html';
    }
  });
}

// Call this on page load for protected pages
document.addEventListener('DOMContentLoaded', function() {
  // Initialize auth listener
  initSupabaseAuth();
});

console.log('✅ Supabase configuration loaded');
console.log('📊 Connected to:', SUPABASE_URL);
