# 💰 SETUP GOOGLE ADSENSE - Guida Completa

## ⏱️ TEMPO: 20 min + attesa approvazione (1-2 settimane)

---

## ⚠️ PREREQUISITI (Controlla PRIMA di applicare)

### ✅ DEVI AVERE:

- [x] Sito online da almeno 2 settimane
- [x] Dominio proprio (servizi-business.com) ✅
- [x] Privacy Policy ✅
- [x] Terms of Service ✅
- [x] Contenuto originale ✅
- [x] Navigazione chiara ✅

### 📊 RACCOMANDATO (Non obbligatorio):

- [ ] 50-100 visitatori/giorno
- [ ] 10-15 pagine contenuto
- [ ] Traffico organico (Google Search)
- [ ] Sito attivo 1-2 mesi

**Se hai meno traffico:** Puoi comunque applicare, ma aspetta almeno 2-4 settimane di sito online.

---

## 🚫 COSA NON FARE (Importante!)

❌ **MAI fare click sui tuoi ads** (ban permanente!)
❌ Chiedere ad amici di cliccare (Google lo rileva)
❌ Contenuto copiato/duplicato
❌ Troppi ads (max 3 per pagina)
❌ Ads nascosti o ingannevoli
❌ Contenuto per adulti/violento

---

## 📋 PROCEDURA COMPLETA

### Step 1: Iscrizione AdSense (10 min)

1. **Vai su:** https://www.google.com/adsense
2. **Click:** "Get Started" o "Inizia"
3. **Login** con Gmail
4. **Inserisci dati:**
   - URL sito: `https://servizi-business.com`
   - Email per pagamenti: (tua email)
   - Paese: Italia
5. **Accetta** Termini e Condizioni
6. **Click:** "Crea account"

---

### Step 2: Collega Sito (5 min)

Google ti darà un **codice da inserire nel sito**.

**Codice tipo:**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
     crossorigin="anonymous"></script>
```

**Dove metterlo:**

Aggiungi nel `<head>` di **TUTTE** le pagine HTML:

**File da modificare (13 pagine):**
- index.html
- login.html
- genera-fatture.html
- lista-fatture.html
- admin-dashboard.html
- calcolo-iva.html
- calcolo-stipendio.html
- calcolo-ritenuta.html
- calcolo-tfr.html
- calcolo-tasse-piva.html
- generatore-qr.html
- privacy.html
- terms.html

**Posizione esatta:**
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>...</title>
    
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX"
         crossorigin="anonymous"></script>
    
    <!-- Altri script -->
    <script src="https://cdn.tailwindcss.com"></script>
    ...
</head>
```

---

### Step 3: Verifica Sito (2 min)

1. Dopo aver aggiunto il codice
2. **Upload tutto su Netlify**
3. Aspetta deploy (1-2 min)
4. Torna su **AdSense Dashboard**
5. **Click:** "Verifica sito" o "I've placed the code"
6. Google scansiona il sito
7. ✅ **Sito collegato!**

---

### Step 4: Attesa Revisione (1-2 settimane)

**Google revisionerà:**
- Contenuto originale?
- Traffico sufficiente?
- Conforme policy?
- Privacy present?

**Email che riceverai:**
1. "Il tuo sito è in revisione"
2. "Stiamo controllando il contenuto"
3. Poi: **"Approvato!"** oppure "Rifiutato"

**Tempo medio:** 7-14 giorni (a volte fino a 30 giorni)

---

### Step 5: DOPO Approvazione - Crea Annunci

**Metodo A:** Auto Ads (Raccomandato per iniziare)

1. Dashboard → **"Annunci"**
2. Click **"Per sito"**
3. **Attiva** Auto Ads
4. Google posiziona ads automaticamente
5. ✅ Fatto!

**Metodo B:** Annunci Manuali

Crei unità ads specifiche e scegli dove metterle.

---

## 📍 DOVE METTERE GLI ADS (Dopo approvazione)

### Posizioni che Convertono:

**Homepage (index.html):**
```
1. Dopo Hero Section (top)
2. Tra Calcolatori e Servizi
3. Prima del Footer
```

**Calcolatori:**
```
1. Sidebar destra
2. Dopo risultato calcolo
3. Prima del footer
```

**Fatture/Login:**
```
❌ NON mettere ads qui
→ Pagine di servizio/login non si monetizzano bene
```

---

## 💰 QUANTO GUADAGNERAI?

### Formula Base:
```
Guadagno = Visite × CTR × CPC

CTR = 1-3% (media 2%)
CPC = €0.10-€3.00 (media €0.80)
```

### Esempi Realistici:

**Scenario Mese 1-2:**
```
1.000 visite/giorno
CTR: 1.5%
CPC: €0.50
= 15 click/giorno × €0.50 = €7/giorno
= €210/mese
```

**Scenario Mese 3-6:**
```
5.000 visite/giorno
CTR: 2%
CPC: €0.80
= 100 click/giorno × €0.80 = €80/giorno
= €2.400/mese
```

**Scenario Anno 1:**
```
15.000 visite/giorno
CTR: 2.5%
CPC: €1.20
= 375 click/giorno × €1.20 = €450/giorno
= €13.500/mese
```

### Fattori che Aumentano CPC:

✅ Traffico Italia (paese ricco)
✅ Utenti business/partite IVA
✅ Topic: finanza, tasse, business
✅ Desktop > Mobile
✅ Contenuto di qualità

---

## 💳 PAGAMENTI

### Soglie:

- **€10:** Prima verifica (PIN via posta)
- **€60:** Test pagamento (€1 per conferma)
- **€100:** Primo pagamento reale
- Poi ogni mese se > €100

### Metodi:

1. **Bonifico Bancario** (raccomandato)
   - Setup IBAN in dashboard
   - Pagamenti automatici

2. Assegno (lento, sconsigliato)

### Quando pagano:

- **Tra 21-26** del mese successivo
- Es: Gennaio guadagni €150 → Pagato 21-26 Febbraio

---

## 📊 MONITORAGGIO PERFORMANCE

### Dashboard AdSense:

**Metriche chiave:**
- **Impressioni:** Volte che ads mostrati
- **Click:** Volte che ads cliccati
- **CTR:** % click/impressioni (1-3% buono)
- **CPC:** Guadagno per click (€0.50-2.00 buono)
- **RPM:** Revenue Per Mille (per 1000 visite)
- **Guadagno:** €€€ totali

**Controlla ogni giorno:**
- Performance ads
- Quali pagine convertono meglio
- CTR per posizione
- Ottimizza!

---

## 🐛 COSA FARE SE RIFIUTATO

### Motivi Comuni Rifiuto:

**1. Traffico Insufficiente**
- **Soluzione:** Aspetta, fai SEO, raggiungi 50+ visite/giorno
- Riapplica dopo 1-2 mesi

**2. Contenuto Insufficiente**
- **Soluzione:** Aggiungi 5-10 articoli blog
- Guide su "Come calcolare IVA", "Guida TFR", etc.

**3. Policy Violation**
- **Soluzione:** Rileggi policy Google
- Correggi problemi (es. manca privacy)

**4. Navigazione Poco Chiara**
- **Soluzione:** Migliora menu, link interni

**Dopo correzioni:**
- Aspetta 2-4 settimane
- Riapplica
- Google dà 2-3 chance

---

## ⚠️ POLICY IMPORTANTE

### VIETATO:

❌ Click fraud (cliccare tuoi ads)
❌ Incentive clicks ("Clicca i miei ads!")
❌ Invalid traffic (bot, VPN, fake)
❌ Troppi ads (max 3-4/pagina)
❌ Ads nascosti o ingannevoli

### PERMESSO:

✅ Chiedere feedback sul sito
✅ A/B test posizioni
✅ Ottimizzare contenuto
✅ SEO legittimo
✅ Social media marketing

**Violazioni = BAN permanente!** Google è SEVERO.

---

## 📈 OTTIMIZZAZIONE TIPS

### Per Aumentare Guadagni:

**1. Posizioni:**
- Above the fold (visibili subito)
- Sidebar destra desktop
- In-content (tra paragrafi)
- Before footer

**2. Dimensioni che Convertono:**
- 300x250 - Medium Rectangle
- 728x90 - Leaderboard
- 320x100 - Mobile Banner
- 336x280 - Large Rectangle

**3. Mobile:**
- 60-70% traffico è mobile!
- Usa responsive ads
- Attiva Anchor ads (sticky bottom)
- Attiva Vignette ads (tra pagine)

**4. Contenuto:**
- Più pagine = più views = più €€€
- Blog con guide pratiche
- SEO per traffico organico
- Aggiorna contenuto regolarmente

---

## ✅ CHECKLIST COMPLETA

### Prima di Applicare:
- [ ] Sito online 2+ settimane
- [ ] Privacy Policy presente
- [ ] Terms presente
- [ ] Contenuto originale
- [ ] Navigazione chiara
- [ ] 50+ visite/giorno (ideale)

### Durante Application:
- [ ] Account AdSense creato
- [ ] Codice AdSense aggiunto in 13 pagine
- [ ] Upload su Netlify
- [ ] Sito verificato
- [ ] In attesa revisione

### Dopo Approvazione:
- [ ] Auto Ads attivati
- [ ] Mobile ads attivi
- [ ] Monitoraggio giornaliero
- [ ] IBAN configurato
- [ ] Mai cliccare propri ads!

---

## 🎯 TIMELINE REALISTICA

**Giorno 1:**
- Applica AdSense
- Aggiungi codice
- Sito verificato

**Giorno 7-14:**
- In revisione Google
- Continua ad aggiungere contenuto
- Fai marketing

**Giorno 15-30:**
- (Speriamo) Approvazione! ✅
- Attiva ads
- Primi guadagni!

**Mese 2:**
- Ottimizza posizioni
- Primi €50-150

**Mese 3-6:**
- Traffico cresce
- €300-1.000/mese

**Anno 1:**
- Business stabile
- €2.000-10.000/mese

---

## 📞 SUPPORTO

**Problemi?**
- Help: https://support.google.com/adsense
- Community: https://support.google.com/adsense/community
- Policy: https://support.google.com/adsense/answer/48182

---

## 🎊 RISULTATO FINALE

**Dopo setup completo:**

✅ Account AdSense approvato
✅ Ads attivi su sito
✅ Guadagno automatico
✅ Pagamenti mensili
✅ Scalabile con traffico
✅ €100-10.000/mese potenziale

**Tempo setup:** 20 minuti
**Attesa approvazione:** 1-2 settimane
**Primo pagamento:** Mese 2-3
**ROI:** INFINITO (gratis!)

---

## 💪 CONSIGLI FINALI

1. **Pazienza:** Primi mesi guadagni bassi
2. **Contenuto:** Più pagine = più €€€
3. **SEO:** Traffico organico è oro
4. **Mai barare:** Mai cliccare propri ads
5. **Diversifica:** Non solo AdSense

**IL TRAFFICO È TUTTO!**

Più visite = Più impressioni = Più click = Più €€€

**Concentrati su:**
- SEO
- Content marketing
- Social media
- Qualità sito

---

**BUONA FORTUNA! 💰🚀**

*Tempo totale: 20 min + attesa*
*Potenziale: €2.000-10.000/mese*
