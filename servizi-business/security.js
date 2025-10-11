// Security Utilities
// Aggiungi questo file e importalo in genera-fatture.html e genera-preventivi.html

// Sanitizza input per prevenire XSS
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Valida email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Valida Partita IVA italiana
function isValidPIVA(piva) {
    // Rimuovi spazi
    piva = piva.replace(/\s/g, '');
    
    // Deve essere 11 cifre
    if (!/^\d{11}$/.test(piva)) return false;
    
    return true;
}

// Valida Codice Fiscale italiano
function isValidCF(cf) {
    cf = cf.toUpperCase().replace(/\s/g, '');
    
    // Lunghezza 16 caratteri
    if (!/^[A-Z0-9]{16}$/.test(cf)) return false;
    
    return true;
}

// Limita lunghezza input
function limitLength(input, maxLength) {
    if (input.length > maxLength) {
        return input.substring(0, maxLength);
    }
    return input;
}

// Previeni SQL injection (anche se Supabase già protegge)
function escapeSQLInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
        .replace(/'/g, "''")
        .replace(/"/g, '""')
        .replace(/\\/g, '\\\\');
}

// Rate limiting semplice
const rateLimiter = {
    requests: {},
    
    checkLimit(key, maxRequests = 10, timeWindow = 60000) {
        const now = Date.now();
        
        if (!this.requests[key]) {
            this.requests[key] = [];
        }
        
        // Rimuovi richieste vecchie
        this.requests[key] = this.requests[key].filter(
            time => now - time < timeWindow
        );
        
        // Controlla limite
        if (this.requests[key].length >= maxRequests) {
            return false; // Troppo richieste
        }
        
        // Aggiungi richiesta
        this.requests[key].push(now);
        return true;
    }
};

// Valida importi
function isValidAmount(amount) {
    const num = parseFloat(amount);
    return !isNaN(num) && num >= 0 && num < 1000000;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sanitizeInput,
        isValidEmail,
        isValidPIVA,
        isValidCF,
        limitLength,
        escapeSQLInput,
        rateLimiter,
        isValidAmount
    };
}
