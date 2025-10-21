-- Script SQL per creare la tabella corrispettivi in Supabase

-- 1. Crea la tabella corrispettivi
CREATE TABLE IF NOT EXISTS public.corrispettivi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    importo_totale DECIMAL(10, 2) NOT NULL,
    imponibile DECIMAL(10, 2) NOT NULL,
    iva DECIMAL(10, 2) NOT NULL,
    breakdown JSONB NOT NULL,
    note TEXT,
    country VARCHAR(2) DEFAULT 'it',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Crea indici per ottimizzare le query
CREATE INDEX IF NOT EXISTS idx_corrispettivi_user_id ON public.corrispettivi(user_id);
CREATE INDEX IF NOT EXISTS idx_corrispettivi_data ON public.corrispettivi(data);
CREATE INDEX IF NOT EXISTS idx_corrispettivi_user_data ON public.corrispettivi(user_id, data);

-- 3. Abilita Row Level Security (RLS)
ALTER TABLE public.corrispettivi ENABLE ROW LEVEL SECURITY;

-- 4. Crea policy per permettere agli utenti di vedere solo i propri dati
CREATE POLICY "Users can view their own corrispettivi"
ON public.corrispettivi
FOR SELECT
USING (auth.uid() = user_id);

-- 5. Crea policy per permettere agli utenti di inserire solo i propri dati
CREATE POLICY "Users can insert their own corrispettivi"
ON public.corrispettivi
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 6. Crea policy per permettere agli utenti di aggiornare solo i propri dati
CREATE POLICY "Users can update their own corrispettivi"
ON public.corrispettivi
FOR UPDATE
USING (auth.uid() = user_id);

-- 7. Crea policy per permettere agli utenti di eliminare solo i propri dati
CREATE POLICY "Users can delete their own corrispettivi"
ON public.corrispettivi
FOR DELETE
USING (auth.uid() = user_id);

-- 8. Crea funzione per aggiornare automaticamente updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Crea trigger per updated_at
CREATE TRIGGER update_corrispettivi_updated_at
BEFORE UPDATE ON public.corrispettivi
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Grant permissions
GRANT ALL ON public.corrispettivi TO authenticated;
GRANT ALL ON public.corrispettivi TO service_role;

-- ISTRUZIONI:
-- 1. Vai su https://supabase.com/dashboard
-- 2. Seleziona il tuo progetto
-- 3. Vai su "SQL Editor"
-- 4. Crea una "New query"
-- 5. Copia e incolla tutto questo script
-- 6. Clicca "Run" per eseguire

-- VERIFICA:
-- Dopo aver eseguito lo script, verifica che la tabella sia stata creata:
-- SELECT * FROM public.corrispettivi LIMIT 1;

-- Se tutto è ok, vedrai la struttura della tabella senza errori.
