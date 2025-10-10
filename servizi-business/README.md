# 🚀 Servizi Business Italia - Piattaforma Strumenti Gratuiti

Benvenuto nel progetto **Servizi Business Italia**!

Una piattaforma completa di strumenti gratuiti per professionisti e aziende italiane.

## 📂 Struttura Progetto

```
servizi-business/
├── index.html                # Homepage principale
├── calcolo-iva.html          # Calcolatore IVA ✅
├── calcolo-stipendio.html    # Calcolatore Stipendio ✅
├── calcolo-ritenuta.html     # Calcolatore Ritenuta ✅
├── calcolo-tfr.html          # Calcolatore TFR ✅
├── genera-fatture.html       # Generatore Fatture ✅ NUOVO!
├── lista-fatture.html        # Dashboard Fatture ✅ NUOVO!
├── fatture.js                # Logica Fatture ✅ NUOVO!
└── README.md                 # Questo file
```

## ✨ Funzionalità Implementate

### ✅ Homepage (index.html)
- Design moderno e responsive
- Sezione Hero accattivante
- Presentazione servizi
- Calcolatori pubblici (2 funzionanti, 4 "coming soon")
- Servizi premium (fatture, preventivi)
- Footer completo
- **Pronta per Google AdSense**

### ✅ Calcolatore IVA (calcolo-iva.html)
- **Funzionante al 100%**
- Calcolo netto → lordo
- Calcolo lordo → netto
- Tutte le aliquote italiane (22%, 10%, 4%, 0%)
- Toggle modalità
- Copia risultati
- Sezione informativa completa
- Spazi AdSense predisposti

### ✅ Calcolatore Stipendio (calcolo-stipendio.html)
- **Funzionante al 100%**
- Calcolo stipendio netto da lordo
- INPS 9.19%
- IRPEF progressiva (scaglioni corretti)
- Detrazioni fiscali
- Detrazioni familiari
- Breakdown dettagliato
- Spazi AdSense predisposti

### ✅ Calcolatore Ritenuta d'Acconto (calcolo-ritenuta.html)
- **Funzionante al 100%**
- Calcolo ritenuta 20% per professionisti
- Dettaglio fattura completo
- Toggle IVA 22%
- Esempio pratico in fattura
- Info su quando si applica
- Spazi AdSense predisposti

### ✅ Calcolatore TFR (calcolo-tfr.html)
- **Funzionante al 100%**
- Calcolo TFR maturato
- Input anni + mesi di servizio
- Rivalutazione automatica (1.5% annuo)
- Stima tassazione separata
- Breakdown dettagliato
- Spazi AdSense predisposti

### ✅ Generatore Fatture (genera-fatture.html) ⭐ NUOVO!
- **Funzionante al 100%**
- Form completo dati emittente e cliente
- Tabella prodotti/servizi dinamica
- Calcolo automatico (imponibile, IVA, totale)
- Ritenuta d'acconto 20% opzionale
- Generazione PDF professionale scaricabile
- Salvataggio dati azienda per riutilizzo
- Salvataggio clienti
- Salvataggio bozze
- Numerazione progressiva automatica
- Storage locale (localStorage)

### ✅ Dashboard Fatture (lista-fatture.html) ⭐ NUOVO!
- Visualizzazione tutte fatture generate
- Statistiche: totale fatture, fatturato, mese corrente
- Tab: Fatture completate / Bozze / Clienti
- Eliminazione fatture e bozze
- Gestione clienti salvati

## 🌐 Come Testare Localmente

### Metodo 1: Doppio Click
1. Vai su Desktop → cartella `servizi-business`
2. Doppio click su `index.html`
3. Si apre nel browser!

### Metodo 2: VS Code Live Server
1. Apri la cartella in VS Code
2. Installa estensione "Live Server"
3. Click destro su `index.html` → "Open with Live Server"

### Metodo 3: Python Server
```bash
cd Desktop/servizi-business
python -m http.server 8000
```
Poi apri: http://localhost:8000

## 🔐 Sistema di Autenticazione

### ✅ NUOVO! Servizi Premium Protetti

**Servizi Pubblici (Sempre Accessibili):**
- Calcolo IVA
- Calcolo Stipendio
- Calcolo Ritenuta d'Acconto
- Calcolo TFR
- Calcolo Tasse P.IVA
- Generatore QR Code

**Servizi Premium (Registrazione Gratuita Richiesta):**
- 🔒 Generatore Fatture
- 🔒 Dashboard Fatture
- 🔒 Salvataggio Clienti
- 🔒 Storico Fatture

### Come Funziona:
1. L'utente clicca su "Genera Fattura" dalla homepage
2. Se non è registrato → Popup + redirect a pagina login
3. Registrazione gratuita (nome, email, password)
4. Dopo il login → Accesso completo ai servizi premium
5. Header mostra nome utente + pulsante "Esci"

### File Sistema Auth:
- `auth.js` - Sistema di autenticazione
- `login.html` - Pagina login/registrazione
- `AUTH_SISTEMA.md` - Documentazione completa

**Nota:** Attualmente usa localStorage. In futuro migreremo a Supabase per cloud storage.

## 🚀 Deploy su Vercel (Gratis!)

### Step-by-Step:

1. **Installa Vercel CLI** (opzionale):
```bash
npm install -g vercel
```

2. **Deploy via Web**:
   - Vai su https://vercel.com
   - Login con GitHub
   - Click "Add New Project"
   - Click "Import Git Repository" OPPURE upload cartella
   - Deploy automatico!

3. **Deploy via CLI**:
```bash
cd Desktop/servizi-business
vercel
```

### Risultato:
- Sito online in 2 minuti!
- URL tipo: `servizi-business.vercel.app`
- SSL gratuito (HTTPS)
- Deploy automatici ad ogni modifica

## 📊 Prossimi Step

### Fase 2 - Database e Autenticazione (Prossima settimana):
- [ ] Setup Supabase
- [ ] Sistema registrazione/login
- [ ] Dashboard utente
- [ ] Database fatture/preventivi

### Fase 3 - Servizi Avanzati:
- [ ] Generatore fatture elettroniche (XML + PDF)
- [ ] Generatore preventivi
- [ ] Generatore contratti
- [ ] Altri calcolatori (TFR, ritenuta, tasse P.IVA, QR code)

### Fase 4 - Monetizzazione:
- [ ] Integrazione Google AdSense
- [ ] SEO ottimizzazione
- [ ] Blog per traffico organico
- [ ] Funzionalità premium (opzionale)

## 💡 Tecnologie Utilizzate

- **HTML5**: Semantico e ottimizzato SEO
- **Tailwind CSS**: Design moderno via CDN
- **JavaScript Vanilla**: Nessuna dipendenza, performance ottimali
- **Font Awesome**: Icone
- **Responsive Design**: Mobile-first

## 🎨 Personalizzazione

### Cambiare Nome Brand:
Cerca e sostituisci "Servizi Business" con il tuo nome in tutti i file

### Cambiare Colori:
Il tema principale è blu (#2563eb). Per cambiare:
- Cerca `blue-600` e sostituisci con altro colore Tailwind
- Oppure personalizza con CSS custom

### Aggiungere Google AdSense:
1. Crea account AdSense
2. Ottieni codice annuncio
3. Sostituisci i placeholder "Spazio pubblicitario" con vero codice AdSense

## 📈 Stima Traffico e Guadagni

### Obiettivo Mesi 1-6:
- 10k-50k visitatori/mese
- CPC medio: €0.50-2.00
- Guadagno stimato: €100-500/mese

### Obiettivo Anno 1:
- 200k-500k visitatori/mese
- Guadagno stimato: €1.000-3.000/mese

### Chiavi del Successo:
1. **SEO**: Ottimizza meta tags, contenuti
2. **Calcolatori funzionanti**: Valore reale per utenti
3. **Contenuti**: Aggiungi guide, tutorial
4. **Condivisione**: Social media, forum

## 🔧 Risoluzione Problemi

### I calcolatori non funzionano:
- Verifica che JavaScript sia abilitato
- Apri Console browser (F12) per vedere errori
- Assicurati che Tailwind CDN carichi

### Layout rotto su mobile:
- Dovrebbe essere responsive
- Testa con DevTools (F12 → Toggle Device Toolbar)

### Deploy Vercel non funziona:
- Assicurati di avere file `index.html` nella root
- Verifica account Vercel sia verificato

## 📞 Supporto

Per domande o problemi:
- Controlla la documentazione
- Testa localmente prima
- Verifica Console browser per errori

## 📝 Licenza

Questo progetto è stato creato per scopi educativi e commerciali.
Sei libero di modificarlo e usarlo come preferisci!

## 🎉 Complimenti!

Hai creato la base per una piattaforma di servizi business completa!

### Prossimi Step Immediati:
1. ✅ Testa tutto localmente
2. ✅ Deploy su Vercel
3. ✅ Compra dominio (quando pronto)
4. ✅ Aggiungi altri calcolatori
5. ✅ Setup Supabase per servizi avanzati
6. ✅ Monetizza con AdSense

**Buon lavoro! 🚀**

---

*Creato con ❤️ da Claude AI*
*Data: Gennaio 2025*