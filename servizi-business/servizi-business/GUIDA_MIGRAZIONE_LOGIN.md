# 🔐 MIGRAZIONE LOGIN A SUPABASE

## 🎯 Obiettivo

Passare da localStorage a Supabase per:
- ✅ Dati salvati nel cloud
- ✅ Multi-device sync
- ✅ Sicurezza enterprise
- ✅ Backup automatico

---

## ⏱️ TEMPO: 15 minuti

---

## 📝 MODIFICHE AL FILE `login.html`

### 1. Aggiungi CDN Supabase (già fatto se hai seguito guida)

Nel `<head>` PRIMA di `auth.js`:

```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
```

### 2. Modifica JavaScript Login

**TROVA questo codice nel `<script>` di login.html:**

```javascript
// LOGIN
document.getElementById('loginFormSubmit').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('✅ Accesso effettuato con successo!');
        window.location.href = 'genera-fatture.html';
    } else {
        alert('❌ Email o password errati!');
    }
});
```

**SOSTITUISCI con:**

```javascript
// LOGIN
document.getElementById('loginFormSubmit').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Disabilita bottone durante login
    submitBtn.disabled = true;
    submitBtn.textContent = 'Accesso in corso...';
    
    try {
        const result = await supabaseLogin(email, password);
        
        if (result.success) {
            alert('✅ Accesso effettuato con successo!');
            window.location.href = 'genera-fatture.html';
        } else {
            alert('❌ ' + result.error);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Accedi';
        }
    } catch (error) {
        alert('❌ Errore di connessione');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Accedi';
    }
});
```

### 3. Modifica JavaScript Registrazione

**TROVA questo codice:**

```javascript
// REGISTRAZIONE
document.getElementById('registerFormSubmit').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('❌ Le password non corrispondono!');
        return;
    }
    
    if (password.length < 6) {
        alert('❌ La password deve essere di almeno 6 caratteri!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
        alert('❌ Email già registrata!');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('✅ Registrazione completata con successo!');
    document.getElementById('registrationTab').classList.remove('active');
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').reset();
});
```

**SOSTITUISCI con:**

```javascript
// REGISTRAZIONE
document.getElementById('registerFormSubmit').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const submitBtn = this.querySelector('button[type="submit"]');
    
    if (password !== confirmPassword) {
        alert('❌ Le password non corrispondono!');
        return;
    }
    
    if (password.length < 6) {
        alert('❌ La password deve essere di almeno 6 caratteri!');
        return;
    }
    
    // Disabilita bottone
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registrazione in corso...';
    
    try {
        const result = await supabaseRegister(name, email, password);
        
        if (result.success) {
            alert('✅ Registrazione completata! Controlla la tua email per confermare l\'account.');
            
            // Switch to login tab
            document.getElementById('registrationTab').classList.remove('active');
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginTab').classList.add('active');
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('registerForm').reset();
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Registrati';
        } else {
            alert('❌ ' + result.error);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Registrati';
        }
    } catch (error) {
        alert('❌ Errore di connessione');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Registrati';
    }
});
```

---

## 🔐 MODIFICHE A `auth.js`

**Trova la funzione `checkAuth()`:**

```javascript
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}
```

**SOSTITUISCI con:**

```javascript
async function checkAuth() {
    const user = await supabaseGetCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
    }
    return user;
}
```

**Trova la funzione `logout()`:**

```javascript
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
```

**SOSTITUISCI con:**

```javascript
async function logout() {
    await supabaseLogout();
    window.location.href = 'index.html';
}
```

**Trova la funzione `getCurrentUser()`:**

```javascript
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}
```

**SOSTITUISCI con:**

```javascript
async function getCurrentUser() {
    return await supabaseGetCurrentUser();
}
```

---

## 🧪 TEST COMPLETO

### Test 1: Registrazione

1. Apri: https://servizi-business.com/login.html
2. Click tab "Registrati"
3. Compila form:
   - Nome: Test User
   - Email: test@example.com
   - Password: password123
   - Conferma: password123
4. Click "Registrati"
5. ✅ Messaggio: "Controlla email"
6. **Vai su Gmail** → Cerca email Supabase
7. **Click link conferma**
8. ✅ Account confermato!

### Test 2: Login

1. Tab "Accedi"
2. Email: test@example.com
3. Password: password123
4. Click "Accedi"
5. ✅ Redirect a genera-fatture.html

### Test 3: Verifica Dashboard Supabase

1. **Supabase Dashboard**
2. **Authentication** → **Users**
3. ✅ Vedi utente creato!
4. Email, Created At, etc.

### Test 4: Logout

1. In qualsiasi pagina protetta
2. Click menu utente (top-right)
3. Click "Logout"
4. ✅ Redirect a index.html

---

## 📊 VERIFICA IN SUPABASE

### Controlla Utenti:

**Dashboard → Authentication → Users**

Dovresti vedere:
- Email utente
- Created At
- Last Sign In
- Status: confirmed/unconfirmed

### Controlla Database:

**Dashboard → Table Editor → auth.users**

Dovresti vedere:
- id (UUID)
- email
- created_at
- user_metadata (contiene "name")

---

## 🎯 PROSSIMI STEP

Dopo che login funziona, modifica:

1. **genera-fatture.html**
   - Usa `supabaseSaveInvoice()` invece di localStorage

2. **lista-fatture.html**
   - Usa `supabaseGetInvoices()` per caricare fatture

3. **admin-dashboard.html**
   - Usa Supabase per statistiche

---

## ⚠️ IMPORTANTE

### Email Confirmation:

Supabase di default richiede conferma email:
- Utente registra → Riceve email
- Clicca link → Account attivo
- Può fare login

**Per disabilitare (solo per test):**
1. Dashboard → Authentication → Settings
2. **Email Confirmations** → Disable
3. Utenti possono loginarsi subito

**RACCOMANDATO:** Lascia attivo per sicurezza!

---

## 🐛 PROBLEMI COMUNI

### "Invalid login credentials"
- Password sbagliata
- Email non confermata
- Utente non esiste

### "User already registered"
- Email già in uso
- Usa email diversa
- O fai reset password

### "Network error"
- Controlla connessione internet
- Verifica URL e API key corrette

### "Email not sent"
- Controlla spam folder
- Supabase free: max 3 email/ora per utente
- Aspetta e riprova

---

## ✅ CHECKLIST

- [ ] CDN Supabase aggiunto
- [ ] Login modificato
- [ ] Registrazione modificata
- [ ] auth.js aggiornato
- [ ] Deploy su Netlify
- [ ] Test registrazione OK
- [ ] Email ricevuta e confermata
- [ ] Test login OK
- [ ] Test logout OK
- [ ] Verifica in Supabase Dashboard

---

## 🎊 COMPLETATO!

**Ora hai:**
- ✅ Auth cloud sicuro
- ✅ Multi-device sync
- ✅ Email confirmation
- ✅ Password reset (built-in)
- ✅ Backup automatico

**Prossimo:** Migra fatture a database! 📄

---

**Tempo totale: 15 minuti**
**Risultato: Sistema auth professionale! 🔐**
