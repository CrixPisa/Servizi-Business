# 📊 SETUP GOOGLE ANALYTICS - Tracking Visite

## 🎯 Obiettivo

Vedere:
- ✅ Quante visite totali
- ✅ Quante visite oggi/ieri/settimana
- ✅ Quanti utenti online ora
- ✅ Da dove vengono
- ✅ Quali pagine visitano

---

## ⏱️ TEMPO: 15 minuti

---

## 📋 STEP-BY-STEP

### Step 1: Crea Account (3 min)

1. Vai su: **https://analytics.google.com**
2. Click **"Inizia a misurare"**
3. Login con Gmail
4. **"Crea account"**

### Step 2: Configura Proprietà (5 min)

**Nome Account:** `Servizi Business`

**Nome Proprietà:** `Servizi Business Web`
- Fuso orario: **Italia**
- Valuta: **EUR - Euro**

**Dettagli Attività:**
- Settore: `Business e mercati industriali`
- Dimensioni: `Piccola (1-10 dipendenti)`

### Step 3: Crea Stream Web (2 min)

1. Piattaforma: **Web**
2. **URL sito web**: `https://servizi-business.com`
3. **Nome stream**: `Sito Web`
4. Click **"Crea stream"**

### Step 4: Copia Measurement ID (1 min)

Vedrai:
```
Measurement ID: G-XXXXXXXXXX
```

**COPIA QUESTO!** ← Lo usi nel codice

### Step 5: Aggiungi Codice (5 minuti)

**Nel `<head>` di TUTTE le pagine HTML:**

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Sostituisci `G-XXXXXXXXXX` con il TUO ID!**

**Pagine da aggiornare (13 file):**
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

### Step 6: Deploy (2 min)

1. Salva tutti i file
2. Upload su Netlify
3. Aspetta deploy

### Step 7: Verifica (2 min)

1. Google Analytics → **"Rapporti"** → **"Tempo reale"**
2. Apri https://servizi-business.com
3. **Dovresti vederti online!** ✅

---

## 📊 METRICHE PRINCIPALI

### Dashboard Tempo Reale:

```
┌─────────────────────────────────┐
│  👤 Utenti online ora: 1        │
│  📄 Pagine viste: 3             │
│  ⏱️  Tempo medio: 1:30          │
│  🌍 Località: Roma, Italia      │
└─────────────────────────────────┘
```

### Rapporti Giornalieri:

**OGGI:**
- Utenti: 15
- Visite: 25
- Visualizzazioni pagina: 45

**IERI:**
- Utenti: 12
- Visite: 20
- Visualizzazioni: 38

**ULTIMI 7 GIORNI:**
- Utenti: 89
- Visite: 142
- Visualizzazioni: 267

**ULTIMI 30 GIORNI:**
- Utenti: 456
- Visite: 723
- Visualizzazioni: 1.234

### Top Pagine Visitate:

1. /index.html - 234 visite
2. /calcolo-iva.html - 156 visite
3. /calcolo-stipendio.html - 98 visite
4. /login.html - 67 visite
5. /calcolo-tasse-piva.html - 54 visite

### Sorgenti Traffico:

- **Direct**: 45% (digitano URL)
- **Google Search**: 30% (da ricerche)
- **Social**: 15% (Facebook, LinkedIn)
- **Referral**: 10% (altri siti)

### Dispositivi:

- 📱 Mobile: 65%
- 💻 Desktop: 30%
- 📲 Tablet: 5%

---

## 🎯 OBIETTIVI PERSONALIZZATI

### Evento: Registrazione

**Aggiungi in login.html dopo registrazione successo:**

```javascript
// Dopo registrazione completata
if (typeof gtag !== 'undefined') {
    gtag('event', 'sign_up', {
        method: 'Email'
    });
}
```

### Evento: Fattura Creata

**Aggiungi in fatture.js dopo creazione fattura:**

```javascript
// Dopo salvataggio fattura
if (typeof gtag !== 'undefined') {
    gtag('event', 'generate_lead', {
        value: totalAmount,
        currency: 'EUR'
    });
}
```

### Evento: Calcolatore Usato

**Aggiungi nei calcolatori dopo click calcola:**

```javascript
// Dopo calcolo
if (typeof gtag !== 'undefined') {
    gtag('event', 'calculator_use', {
        calculator_type: 'IVA' // o 'Stipendio', 'TFR', etc.
    });
}
```

---

## 📱 APP MOBILE GOOGLE ANALYTICS

**Monitora in movimento:**

1. Scarica app **Google Analytics** (iOS/Android)
2. Login con Gmail
3. Seleziona proprietà "Servizi Business"
4. Vedi statistiche real-time sul telefono!

**Notifiche:**
- Picchi di traffico
- Anomalie
- Obiettivi raggiunti

---

## 🔔 ALERT PERSONALIZZATI

### Crea Alert per Picchi:

1. GA → **Admin** → **Custom Alerts**
2. **New Alert**
   - Nome: "Picco Traffico Giornaliero"
   - Condizione: Utenti > 100 in 1 giorno
   - Email notifica: tua@email.com

### Suggerimenti Alert:

- **Traffico basso**: < 10 utenti/giorno
- **Picco traffico**: > 100 utenti/giorno
- **Zero conversioni**: 0 registrazioni/giorno
- **Errore 404**: > 10 errori/giorno

---

## 📊 REPORT AUTOMATICI

### Email Settimanali:

1. GA → **Rapporti** → Qualsiasi rapporto
2. Click **"Condividi"** (top-right)
3. **"Pianifica email"**
   - Frequenza: Settimanale
   - Giorno: Lunedì mattina
   - Email: tua@email.com
   - **Salva**

**Riceverai ogni lunedì:**
- Statistiche settimana precedente
- Confronto con settimana prima
- Top pagine
- Sorgenti traffico

---

## 💡 TIPS PRO

### Migliora Tracking:

1. **UTM Parameters** per campagne:
   ```
   https://servizi-business.com?utm_source=facebook&utm_medium=social&utm_campaign=lancio
   ```

2. **Segmenti Personalizzati**:
   - Visitatori nuovi vs ritornanti
   - Mobile vs Desktop
   - Italia vs Altri paesi

3. **Funnel Conversioni**:
   - Homepage → Login → Registrazione
   - Homepage → Calcolatore → Fatture

---

## ✅ CHECKLIST

- [ ] Account Google Analytics creato
- [ ] Proprietà configurata
- [ ] Measurement ID copiato
- [ ] Codice aggiunto a tutte le 13 pagine
- [ ] Deploy su Netlify
- [ ] Verifica Tempo Reale funziona
- [ ] App mobile installata (opzionale)
- [ ] Report email configurato (opzionale)

---

## 🎯 RISULTATO

**Dopo setup avrai:**

✅ **Real-Time Dashboard**: Vedi chi è online ORA
✅ **Statistiche Giornaliere**: Visite oggi vs ieri
✅ **Report Settimanali**: Email automatiche
✅ **Top Pagine**: Quali calcolatori più usati
✅ **Sorgenti Traffico**: Da dove arrivano utenti
✅ **Conversioni**: Quanti si registrano

**Tempo totale:** 15 minuti
**Costo:** GRATIS forever!

---

## 📞 SUPPORTO

### Problemi Comuni:

**Non vedo dati in Tempo Reale:**
- Aspetta 5 minuti dopo deploy
- Verifica Measurement ID corretto
- Controlla console browser (F12) per errori
- Disabilita AdBlock

**Dati sembrano sbagliati:**
- GA filtra traffico bot/spam automaticamente
- I tuoi test potrebbero essere filtrati
- Aspetta 24h per dati accurati

**Codice non funziona:**
- Verifica script nel `<head>`
- Verifica ID formato: G-XXXXXXXXXX
- Non A-XXXXXXXXXX (vecchio formato)

### Link Utili:

- Help GA: https://support.google.com/analytics
- GA Academy: https://analytics.google.com/analytics/academy

---

## 🎊 FATTO!

**Ora sai sempre:**
- Quante visite totali
- Quante oggi/ieri
- Chi è online ora
- Da dove vengono
- Cosa guardano

**Prossimo step:** Google AdSense per monetizzare! 💰

---

*Setup completato: 15 minuti*
*Costo: €0*
*Risultato: Tracking completo! ✅*
