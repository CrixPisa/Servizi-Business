# ✅ SUPABASE - Setup Rapido (10 minuti)

## 🎉 CHIAVI GIÀ CONFIGURATE!

✅ **URL**: https://wnolarbrlbyzfdnnnqlz.supabase.co
✅ **API Key**: Configurata in `supabase-config.js`

---

## 📋 PROSSIMI STEP

### Step 1: Crea Tabelle (5 min)

1. Vai su: **https://supabase.com/dashboard**
2. Login
3. Seleziona progetto
4. **SQL Editor** (sidebar sinistra)
5. **New Query**
6. **Copia e incolla questo SQL:**

```sql
-- Tabella Fatture
CREATE TABLE public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  invoice_number TEXT NOT NULL,
  invoice_date DATE NOT NULL,
  due_date DATE,
  
  -- Cliente
  customer_name TEXT NOT NULL,
  customer_vat TEXT,
  customer_fiscal_code TEXT,
  customer_address TEXT,
  customer_zip TEXT,
  customer_city TEXT,
  customer_province TEXT,
  
  -- Emittente
  company_name TEXT,
  company_vat TEXT,
  company_data JSONB,
  
  -- Items
  items JSONB NOT NULL,
  
  -- Totali
  subtotal DECIMAL(10,2),
  vat_total DECIMAL(10,2),
  total DECIMAL(10,2),
  withholding DECIMAL(10,2) DEFAULT 0,
  net_total DECIMAL(10,2),
  
  -- Extra
  payment_method TEXT,
  iban TEXT,
  notes TEXT,
  status TEXT DEFAULT 'completed',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella Clienti
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

-- Tabella Dati Azienda
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

-- Indici per Performance
CREATE INDEX idx_invoices_user ON public.invoices(user_id);
CREATE INDEX idx_invoices_date ON public.invoices(invoice_date);
CREATE INDEX idx_customers_user ON public.customers(user_id);
CREATE INDEX idx_company_user ON public.company_data(user_id);

-- Row Level Security
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_data ENABLE ROW LEVEL SECURITY;

-- Policies (utenti vedono solo i propri dati)
CREATE POLICY "Users manage own invoices" ON public.invoices
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own customers" ON public.customers
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own company" ON public.company_data
  FOR ALL USING (auth.uid() = user_id);
```

7. Click **RUN** (o Ctrl+Enter)
8. ✅ **Tabelle create!**

---

### Step 2: Aggiungi CDN Supabase (5 min)

**In queste 4 pagine HTML, aggiungi nel `<head>` PRIMA di `auth.js`:**

- `login.html`
- `genera-fatture.html`
- `lista-fatture.html`
- `admin-dashboard.html`

**Codice da aggiungere:**

```html
<head>
    <!-- ... altri script ... -->
    
    <!-- Supabase SDK -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="supabase-config.js"></script>
    
    <!-- Auth.js -->
    <script src="auth.js"></script>
</head>
```

---

### Step 3: Test Immediato (2 min)

1. **Upload tutto su Netlify** (trascina cartella)
2. Aspetta deploy
3. Apri: **https://servizi-business.com/login.html**
4. Apri Console Browser (F12)
5. Dovresti vedere:
   ```
   ✅ Supabase configuration loaded
   📊 Connected to: https://wnolarbrlbyzfdnnnqlz.supabase.co
   ```

---

## 🧪 TEST REGISTRAZIONE

### Test Manuale:

1. Apri Console Browser (F12)
2. Vai su tab **Console**
3. Scrivi:

```javascript
supabaseRegister('Test User', 'test@example.com', 'password123').then(result => console.log(result));
```

4. Premi Enter
5. Dovresti vedere: `{success: true, data: {...}}`
6. **Controlla Supabase Dashboard** → Authentication → Users
7. ✅ Vedi l'utente creato!

---

## 📝 PROSSIMO: Migra Login

Ora devi modificare `login.html` per usare Supabase invece di localStorage.

**File:** `GUIDA_MIGRAZIONE_LOGIN.md` (creo ora!)

---

## ✅ FATTO!

- ✅ Chiavi configurate
- ✅ Tabelle create
- ✅ CDN aggiunto
- ✅ Test OK

**Tempo totale: 10 minuti** ⚡

**Prossimo:** Migra sistema login a Supabase!
