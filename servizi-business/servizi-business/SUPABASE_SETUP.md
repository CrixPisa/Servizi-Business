# 🗄️ GUIDA SETUP SUPABASE DATABASE

## ✅ FILE CREATO: `supabase-config.js`

---

## 📋 CHECKLIST SETUP

### Step 1: Crea Progetto Supabase ✅
- [ ] Vai su supabase.com
- [ ] Sign Up
- [ ] New Project → servizi-business
- [ ] Password database: ____________
- [ ] Region: Europe West (Ireland)
- [ ] Aspetta 2-3 min

### Step 2: Crea Tabelle ✅  
- [ ] SQL Editor → New Query
- [ ] Copia SQL da questa guida (sotto)
- [ ] Run
- [ ] Verifica tabelle create: invoices, customers, company_data

### Step 3: Ottieni Chiavi API ✅
- [ ] Settings → API
- [ ] Copia Project URL: __________________
- [ ] Copia anon key: __________________

### Step 4: Configura File ✅
- [ ] Apri `supabase-config.js`
- [ ] Inserisci SUPABASE_URL
- [ ] Inserisci SUPABASE_ANON_KEY
- [ ] Salva

### Step 5: Aggiungi CDN ✅
- [ ] Aggiungi in TUTTE le pagine HTML
- [ ] Vedi sezione "Modifica HTML" sotto

### Step 6: Aggiorna login.html ✅
- [ ] Usa funzioni Supabase invece di localStorage
- [ ] Vedi esempio sotto

### Step 7: Test ✅
- [ ] Registra nuovo utente
- [ ] Login
- [ ] Crea fattura
- [ ] Verifica in Supabase Dashboard

---

## 📝 SQL PER CREARE TABELLE

**Copia e incolla nel SQL Editor di Supabase:**

```sql
-- Fatture
CREATE TABLE public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  invoice_number TEXT NOT NULL,
  invoice_date DATE NOT NULL,
  due_date DATE,
  customer_name TEXT NOT NULL,
  customer_vat TEXT,
  customer_data JSONB,
  company_name TEXT,
  company_data JSONB,
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2),
  vat_total DECIMAL(10,2),
  total DECIMAL(10,2),
  withholding DECIMAL(10,2) DEFAULT 0,
  net_total DECIMAL(10,2),
  payment_method TEXT,
  iban TEXT,
  notes TEXT,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clienti
CREATE TABLE public.customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  vat TEXT,
  fiscal_code TEXT,
  address TEXT,
  zip TEXT,
  city TEXT,
  province TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Dati Azienda
CREATE TABLE public.company_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  vat TEXT,
  fiscal_code TEXT,
  address TEXT,
  zip TEXT,
  city TEXT,
  province TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici
CREATE INDEX idx_invoices_user ON public.invoices(user_id);
CREATE INDEX idx_customers_user ON public.customers(user_id);
CREATE INDEX idx_company_user ON public.company_data(user_id);

-- Row Level Security
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_data ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users see own invoices" ON public.invoices FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own customers" ON public.customers FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users see own company" ON public.company_data FOR ALL USING (auth.uid() = user_id);
```

---

## 🔧 MODIFICA HTML - Aggiungi CDN

**In TUTTE le pagine HTML protette, aggiungi nel `<head>` PRIMA di `auth.js`:**

```html
<head>
    <!-- ... altri script ... -->
    
    <!-- Supabase SDK -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="supabase-config.js"></script>
    
    <!-- Poi auth.js -->
    <script src="auth.js"></script>
</head>
```

**Pagine da modificare:**
- login.html
- genera-fatture.html
- lista-fatture.html
- admin-dashboard.html

---

## 📝 ESEMPIO: Modifica login.html

**Trova la funzione di registrazione e sostituisci:**

**PRIMA (localStorage):**
```javascript
document.getElementById('registerFormSubmit').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // localStorage vecchio
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('✅ Registrazione completata!');
    window.location.href = 'genera-fatture.html';
});
```

**DOPO (Supabase):**
```javascript
document.getElementById('registerFormSubmit').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Usa Supabase
    const result = await supabaseRegister(name, email, password);
    
    if (result.success) {
        alert('✅ Registrazione completata! Controlla la tua email per confermare.');
        window.location.href = 'genera-fatture.html';
    } else {
        alert('❌ Errore: ' + result.error);
    }
});
```

**Fai lo stesso per Login:**

```javascript
document.getElementById('loginFormSubmit').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const result = await supabaseLogin(email, password);
    
    if (result.success) {
        alert('✅ Accesso effettuato!');
        window.location.href = 'genera-fatture.html';
    } else {
        alert('❌ Email o password errati!');
    }
});
```

---

## 🧪 TEST

### 1. Test Registrazione:
```
1. Apri https://servizi-business.com/login.html
2. Registra nuovo utente
3. Controlla email (Supabase manda conferma)
4. Click link conferma
5. ✅ Utente attivo!
```

### 2. Test Login:
```
1. Login con utente creato
2. ✅ Redirect a genera-fatture.html
```

### 3. Test Fattura:
```
1. Crea fattura
2. Controlla Supabase Dashboard
3. Table Editor → invoices
4. ✅ Vedi fattura salvata!
```

---

## 💡 VANTAGGI SUPABASE

**PRIMA (localStorage):**
- ❌ Dati solo nel browser
- ❌ Cancella cache = perdi tutto
- ❌ Non sync tra dispositivi
- ❌ No backup

**DOPO (Supabase):**
- ✅ Dati nel cloud
- ✅ Backup automatico
- ✅ Sync multi-device
- ✅ Sicuro e scalabile
- ✅ GRATIS fino a 500MB

---

## 📊 COSTI

**Piano Free (Sufficiente per iniziare):**
```
Database: 500MB
Utenti: 50.000
Richieste: 2GB/mese
Bandwidth: 5GB/mese
```

**Piano Pro (Quando cresci):**
```
€20/mese
Database: 8GB
Tutto unlimited
```

**Per primi 6-12 mesi: FREE è perfetto! ✅**

---

## 🎯 PROSSIMI STEP

### Oggi:
- [ ] Setup Supabase (30 min)
- [ ] Configura supabase-config.js
- [ ] Aggiungi CDN alle pagine
- [ ] Test registrazione

### Domani:
- [ ] Migra login.html completo
- [ ] Test completo auth
- [ ] Prima fattura cloud!

### Questa Settimana:
- [ ] Migra genera-fatture.html
- [ ] Migra lista-fatture.html
- [ ] Tutto su database!

---

## 🆘 PROBLEMI COMUNI

### "Invalid API key"
→ Verifica chiavi in supabase-config.js
→ Copia da Settings → API

### "User not authenticated"
→ Fai login prima
→ Controlla supabaseIsLoggedIn()

### "Row Level Security policy violation"
→ Verifica policies create
→ Ricontrolla SQL sopra

### "Email not confirmed"
→ Controlla inbox email
→ Click link conferma Supabase

---

## ✅ COMPLETATO?

Quando hai fatto tutto:
- ✅ Tabelle create
- ✅ Chiavi configurate
- ✅ CDN aggiunto
- ✅ login.html aggiornato
- ✅ Test OK

**DEPLOY SU NETLIFY!** 🚀

---

**Tempo totale: 45 minuti**  
**Risultato: Database cloud funzionante!** ✅
