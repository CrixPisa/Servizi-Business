# 🚀 GUIDA SETUP CORRISPETTIVI SU SUPABASE

## 📋 CHECKLIST RAPIDA
- [ ] Accedi a Supabase Dashboard
- [ ] Esegui script SQL
- [ ] Verifica tabella creata
- [ ] Testa inserimento dati
- [ ] Verifica RLS (Row Level Security)

---

## 🔧 PASSO 1: ACCEDI A SUPABASE

1. Vai su: **https://supabase.com/dashboard**
2. Fai login con il tuo account
3. Seleziona il tuo progetto **Servizi Business**

---

## 🗄️ PASSO 2: ESEGUI LO SCRIPT SQL

### Metodo A - SQL Editor (CONSIGLIATO)

1. Nel dashboard di Supabase, clicca su **"SQL Editor"** nella sidebar sinistra
2. Clicca su **"New query"** (in alto a destra)
3. Copia **TUTTO** il contenuto del file `SETUP_CORRISPETTIVI_DB.sql`
4. Incolla nello SQL Editor
5. Clicca **"Run"** (o premi Ctrl+Enter)

✅ **Risultato atteso:** Vedrai il messaggio "Success. No rows returned"

⚠️ **Se vedi errori:**
- Verifica che la tabella `auth.users` esista (dovrebbe essere già presente)
- Se la tabella `corrispettivi` esiste già, elimina prima con:
  ```sql
  DROP TABLE IF EXISTS public.corrispettivi CASCADE;
  ```
  Poi riesegui tutto lo script.

### Metodo B - Table Editor (per verificare visualmente)

1. Clicca su **"Table Editor"** nella sidebar
2. Dovresti vedere la nuova tabella **"corrispettivi"**
3. Clicca sulla tabella per vedere la struttura

---

## ✅ PASSO 3: VERIFICA CHE TUTTO SIA OK

### Test 1: Verifica Struttura Tabella

Esegui questa query nel SQL Editor:

```sql
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns
WHERE table_name = 'corrispettivi'
ORDER BY ordinal_position;
```

**Dovresti vedere queste colonne:**
- id (uuid)
- user_id (uuid)
- data (date)
- importo_totale (numeric)
- imponibile (numeric)
- iva (numeric)
- breakdown (jsonb)
- note (text)
- country (character varying)
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

### Test 2: Verifica RLS (Row Level Security)

```sql
-- Verifica che RLS sia attivo
SELECT 
    tablename, 
    rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'corrispettivi';
```

**Risultato atteso:** `rowsecurity = true` ✅

### Test 3: Verifica Policies

```sql
-- Vedi tutte le policy create
SELECT 
    policyname, 
    cmd 
FROM pg_policies 
WHERE tablename = 'corrispettivi';
```

**Dovresti vedere 4 policy:**
- Users can view their own corrispettivi (SELECT)
- Users can insert their own corrispettivi (INSERT)
- Users can update their own corrispettivi (UPDATE)
- Users can delete their own corrispettivi (DELETE)

---

## 🧪 PASSO 4: TEST INSERIMENTO DATI (OPZIONALE)

### Test manuale con SQL:

```sql
-- ATTENZIONE: Sostituisci 'USER_ID_QUI' con un ID utente reale
-- Puoi trovare un user_id dalla tabella auth.users:
-- SELECT id, email FROM auth.users LIMIT 5;

INSERT INTO public.corrispettivi (
    user_id,
    data,
    importo_totale,
    imponibile,
    iva,
    breakdown,
    note,
    country
) VALUES (
    'USER_ID_QUI'::uuid,
    '2025-10-21',
    122.00,
    100.00,
    22.00,
    '[{"aliquota": 22, "imponibile": 100, "iva": 22}]'::jsonb,
    'Test vendita',
    'it'
);

-- Verifica inserimento
SELECT * FROM public.corrispettivi ORDER BY created_at DESC LIMIT 1;
```

### Test dall'applicazione:

1. Vai su: **https://servizi-business.com/corrispettivi-online.html**
2. Fai login con il tuo account
3. Registra una vendita di test
4. Torna su Supabase → Table Editor → corrispettivi
5. Dovresti vedere il record appena inserito! ✅

---

## 🔍 PASSO 5: TROUBLESHOOTING

### Problema: "permission denied for table corrispettivi"

**Soluzione:** Esegui:
```sql
GRANT ALL ON public.corrispettivi TO authenticated;
GRANT ALL ON public.corrispettivi TO service_role;
```

### Problema: "relation public.corrispettivi does not exist"

**Soluzione:** La tabella non è stata creata. Riesegui tutto lo script SQL dal Passo 2.

### Problema: "RLS is enabled but no policies exist"

**Soluzione:** Le policy non sono state create. Esegui solo la parte dello script dalle CREATE POLICY in poi.

### Problema: Non vedo i miei dati

**Possibili cause:**
1. **RLS attivo ma policy errate** - Verifica che l'utente loggato corrisponda al `user_id`
2. **Stai guardando con un altro account** - Verifica di essere loggato con l'account giusto
3. **Le policy filtrano i dati** - È corretto! Ogni utente vede solo i suoi dati

---

## 📊 STRUTTURA DATI BREAKDOWN (JSONB)

Il campo `breakdown` contiene un array JSON con questo formato:

```json
[
  {
    "aliquota": 22,
    "imponibile": 100.00,
    "iva": 22.00
  },
  {
    "aliquota": 10,
    "imponibile": 50.00,
    "iva": 5.00
  }
]
```

Questo permette di salvare vendite con **aliquote IVA miste** nella stessa giornata.

---

## 🎯 QUERY UTILI

### Vendite totali per utente:
```sql
SELECT 
    user_id,
    COUNT(*) as num_vendite,
    SUM(importo_totale) as totale_incassato,
    SUM(iva) as totale_iva
FROM public.corrispettivi
WHERE user_id = auth.uid()
GROUP BY user_id;
```

### Vendite per mese:
```sql
SELECT 
    DATE_TRUNC('month', data) as mese,
    COUNT(*) as num_vendite,
    SUM(importo_totale) as totale,
    SUM(iva) as iva
FROM public.corrispettivi
WHERE user_id = auth.uid()
GROUP BY DATE_TRUNC('month', data)
ORDER BY mese DESC;
```

### Vendite di oggi:
```sql
SELECT *
FROM public.corrispettivi
WHERE user_id = auth.uid()
AND data = CURRENT_DATE
ORDER BY created_at DESC;
```

### Esporta CSV (da SQL Editor):
```sql
COPY (
    SELECT 
        data,
        importo_totale,
        imponibile,
        iva,
        note,
        country
    FROM public.corrispettivi
    WHERE user_id = auth.uid()
    ORDER BY data DESC
) TO STDOUT WITH CSV HEADER;
```

---

## ✅ CHECKLIST FINALE

Prima di andare in produzione, verifica:

- [ ] ✅ Tabella `corrispettivi` creata
- [ ] ✅ RLS attivo (Row Level Security)
- [ ] ✅ 4 Policy create (SELECT, INSERT, UPDATE, DELETE)
- [ ] ✅ Indici creati per performance
- [ ] ✅ Trigger `updated_at` funzionante
- [ ] ✅ Test inserimento dati OK
- [ ] ✅ Test lettura dati OK
- [ ] ✅ Ogni utente vede solo i suoi dati

---

## 🆘 SUPPORTO

**Problemi con Supabase?**
- Documentazione: https://supabase.com/docs
- Discord: https://discord.supabase.com

**Problemi con il sito?**
- Email: info@servizi-business.com

---

## 🎉 TUTTO PRONTO!

Una volta completati tutti i passaggi, il sistema Corrispettivi è operativo e pronto all'uso!

Gli utenti potranno:
✅ Registrare vendite giornaliere
✅ Calcolare IVA automaticamente
✅ Vedere storico vendite
✅ Esportare report (Excel/CSV/PDF)
✅ Visualizzare statistiche
✅ Tutti i dati protetti con RLS

**Buon lavoro! 🚀**
