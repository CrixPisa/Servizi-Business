# 📧 SETUP EMAIL PROFESSIONALE - info@servizi-business.com

## ⏱️ TEMPO: 10 minuti

---

## 🎯 OPZIONE RACCOMANDATA: Zoho Mail FREE

### Perché Zoho?
- ✅ **GRATIS FOREVER** (1 email)
- ✅ 5GB storage
- ✅ No pubblicità
- ✅ App mobile
- ✅ Professionale

---

## 📋 PROCEDURA STEP-BY-STEP

### Step 1: Registrazione (2 min)

1. Vai su: **https://www.zoho.com/mail/zohomail-pricing.html**
2. Scroll fino a **"Forever Free Plan"**
3. Click **"Get Started"**
4. Compila form:
   - Email personale: (tua email attuale)
   - Password: (scegli password sicura)
   - Agree terms
5. Click **"Sign Up"**
6. ✅ Conferma email ricevuta

---

### Step 2: Aggiungi Dominio (3 min)

1. Dashboard Zoho → **"Add Domain"**
2. Inserisci: **servizi-business.com**
3. **NON** mettere .it - il tuo dominio è **.com**!
4. Scegli: **"I'll use my existing domain"**
5. Click **"Add Domain"**

---

### Step 3: Verifica Dominio (5 min)

Zoho ti chiederà di verificare il dominio aggiungendo record DNS.

**Dove aggiungere DNS:**
- Vai dove hai comprato il dominio (Netlify/Namecheap/GoDaddy/etc)
- Cerca "DNS Settings" o "DNS Management"

**Record da aggiungere:**

```
Type: TXT
Host: @
Value: zoho-verification=zb12345678.zmverify.zoho.com
```

(Zoho ti darà il valore esatto da copiare)

**Come fare:**
1. Copia esattamente il codice da Zoho
2. Vai su pannello DNS del tuo dominio
3. Click "Add DNS Record"
4. Type: TXT
5. Name/Host: @ (oppure vuoto)
6. Value: (incolla codice Zoho)
7. Save
8. Aspetta 5-15 minuti
9. Torna su Zoho → Click "Verify"
10. ✅ Dominio verificato!

---

### Step 4: Configura MX Records (2 min)

**Per ricevere email devi aggiungere MX records:**

Nel pannello DNS del tuo dominio, aggiungi:

```
Type: MX
Priority: 10
Value: mx.zoho.com

Type: MX
Priority: 20
Value: mx2.zoho.com

Type: MX
Priority: 50
Value: mx3.zoho.com
```

**Procedura:**
1. DNS Panel → Add Record
2. Type: MX
3. Priority: 10
4. Value: mx.zoho.com
5. Save
6. Ripeti per mx2 e mx3

---

### Step 5: Crea Mailbox (1 min)

1. Zoho Dashboard → **"User Details"**
2. Click **"Add User"**
3. Username: **info**
4. Email risultante: **info@servizi-business.com** ✅
5. Password: (scegli password sicura)
6. Click **"Create"**
7. ✅ Email pronta!

---

### Step 6: Test Email (1 min)

1. Vai su: **https://mail.zoho.com**
2. Login: **info@servizi-business.com**
3. Password: (quella scelta)
4. Invia email di test a te stesso
5. ✅ Funziona!

---

## 📱 APP MOBILE (Opzionale)

**Scarica:**
- iOS: Zoho Mail app
- Android: Zoho Mail app

**Login:**
- Email: info@servizi-business.com
- Password: (tua password)

---

## 🔄 AGGIORNA SITO

Dopo aver creato email, aggiorna questi file:

### 1. privacy.html

Cerca: `info@servizibusiness.it`
Sostituisci con: `info@servizi-business.com`

### 2. terms.html

Cerca: `info@servizibusiness.it`
Sostituisci con: `info@servizi-business.com`

### 3. index.html (footer)

Cerca: `info@servizibusiness.it`
Sostituisci con: `info@servizi-business.com`

---

## ✅ CHECKLIST

- [ ] Account Zoho creato
- [ ] Dominio aggiunto
- [ ] TXT record verificato
- [ ] MX records configurati
- [ ] Mailbox "info" creata
- [ ] Test invio/ricezione OK
- [ ] Email aggiornata in privacy.html
- [ ] Email aggiornata in terms.html
- [ ] Email aggiornata in index.html
- [ ] Re-upload su Netlify

---

## 🐛 PROBLEMI COMUNI

### "Domain verification failed"
→ Aspetta 15-30 min dopo aggiunta TXT record
→ DNS propagation può richiedere tempo
→ Verifica TXT copiato correttamente

### "Cannot receive emails"
→ Controlla MX records aggiunti
→ Priority corrette (10, 20, 50)
→ Aspetta 1-2 ore per propagation

### "Wrong domain format"
→ Usa **servizi-business.com** (NON .it!)
→ Il tuo dominio è .com

---

## 💡 TIPS PRO

### Firma Email:

Crea firma professionale:
```
--
Servizi Business Italia
Strumenti Gratuiti per Professionisti

🌐 https://servizi-business.com
📧 info@servizi-business.com
```

### Forward Email:

Puoi forwardare info@servizi-business.com a tua email personale:
1. Zoho → Settings → Email Forwarding
2. Aggiungi tua email
3. Ricevi notifiche sul telefono!

### Auto-Reply:

Setup risposta automatica:
- "Grazie per il tuo messaggio!"
- "Risponderemo entro 24 ore"

---

## 🎯 RISULTATO

**Dopo setup avrai:**

✅ Email professionale: info@servizi-business.com
✅ Webmail: mail.zoho.com
✅ App mobile
✅ 5GB storage
✅ GRATIS forever
✅ Dominio professionale
✅ Pronto per clienti!

---

## 📞 SUPPORTO ZOHO

- Help: https://www.zoho.com/mail/help/
- Guide DNS: https://www.zoho.com/mail/help/adminconsole/domain-verification.html

---

**TEMPO TOTALE: 10 minuti**
**COSTO: €0**
**RISULTATO: Email professionale! ✅**
