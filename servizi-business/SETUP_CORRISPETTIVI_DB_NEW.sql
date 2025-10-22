-- Script SQL AGGIORNATO per creare la tabella corrispettivi in Supabase
-- Versione semplificata e compatibile con il nuovo corrispettivi.js

-- 1. Elimina la tabella vecchia se esiste (ATTENZIONE: cancella tutti i dati!)
DROP TABLE IF EXISTS public.corrispettivi CASCADE;

-- 2. Crea la tabella corrispettivi con la struttura corretta
CREATE TABLE public.corrispettivi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    importo_totale DECIMAL(10, 2) NOT NULL,
    imponibile DECIMAL(10, 2) NOT NULL,
    iva DECIMAL(10, 2) NOT NULL,
    aliquota_iva DECIMAL(5, 2) NOT NULL,
    descrizione TEXT,
    country VARCHAR(2) DEFAULT 'it',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Crea indici per ottimizzare le query
CREATE INDEX idx_corrispettivi_user_id ON public.corrispettivi(user_id);
CREATE INDEX idx_corrispettivi_data ON public.corrispettivi(data);
CREATE INDEX idx_corrispettivi_user_data ON public.corrispettivi(user_id, data DESC);

-- 4. Abilita Row Level Security (RLS)
ALTER TABLE public.corrispettivi ENABLE ROW LEVEL SECURITY;

-- 5. POLICIES - Permettono agli utenti di vedere solo i propri dati

-- Policy per SELECT (leggere)
CREATE POLICY "Users can view their own sales"
ON public.corrispettivi
FOR SELECT
USING (auth.uid() = user_id);

-- Policy per INSERT (creare)
CREATE POLICY "Users can insert their own sales"
ON public.corrispettivi
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy per UPDATE (modificare)
CREATE POLICY "Users can update their own sales"
ON public.corrispettivi
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy per DELETE (eliminare)
CREATE POLICY "Users can delete their own sales"
ON public.corrispettivi
FOR DELETE
USING (auth.uid() = user_id);

-- 6. Funzione per aggiornare automaticamente updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger per updated_at
CREATE TRIGGER update_corrispettivi_updated_at
BEFORE UPDATE ON public.corrispettivi
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Grant permissions
GRANT ALL ON public.corrispettivi TO authenticated;
GRANT ALL ON public.corrispettivi TO service_role;

-- ============================================
-- ISTRUZIONI PER ESEGUIRE QUESTO SCRIPT:
-- ============================================
-- 1. Vai su: https://supabase.com/dashboard
-- 2. Seleziona il tuo progetto
-- 3. Nel menu laterale clicca su "SQL Editor"
-- 4. Clicca "+ New query"
-- 5. Copia TUTTO questo script e incollalo
-- 6. Clicca "Run" (il pulsante verde in basso a destra)
-- 7. Aspetta il messaggio "Success. No rows returned"
-- ============================================

-- VERIFICA CHE TUTTO SIA OK:
-- Esegui questa query per vedere la struttura della tabella:
-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'corrispettivi';

-- ============================================
-- STRUTTURA ATTESA:
-- ============================================
-- id               | uuid
-- user_id          | uuid
-- data             | date
-- importo_totale   | numeric
-- imponibile       | numeric
-- iva              | numeric
-- aliquota_iva     | numeric
-- descrizione      | text
-- country          | character varying
-- created_at       | timestamp with time zone
-- updated_at       | timestamp with time zone
-- ============================================
