# ISTRUZIONI VELOCI FIX PREVENTIVI

Il file `genera-preventivi.html` è identico a `genera-fatture.html`.

## SOLUZIONE VELOCE:
1. Apri `genera-preventivi.html`
2. Cerca e sostituisci (CTRL+H):

**Trova:** `<label class="block text-sm font-semibold text-gray-700 mb-2">Numero Fattura *</label>`
**Sostituisci:** `<label class="block text-sm font-semibold text-gray-700 mb-2" data-i18n="invoiceNumber">Numero Fattura *</label>`

**Trova:** `<label class="block text-sm font-semibold text-gray-700 mb-2">Data Emissione *</label>`
**Sostituisci:** `<label class="block text-sm font-semibold text-gray-700 mb-2" data-i18n="issueDate">Data Emissione *</label>`

**Trova:** `<label class="block text-sm font-semibold text-gray-700 mb-2">Scadenza</label>`
**Sostituisci:** `<label class="block text-sm font-semibold text-gray-700 mb-2" data-i18n="dueDate">Scadenza</label>`

**Trova:** `<label class="block text-sm font-semibold text-gray-700 mb-2">Ragione Sociale / Nome *</label>`
**Sostituisci:** `<label class="block text-sm font-semibold text-gray-700 mb-2" data-i18n="companyName">Ragione Sociale / Nome *</label>`

E così via per TUTTI i label...

## OPPURE (PIÙ VELOCE):
Copia TUTTO il contenuto di `genera-fatture.html` e incollalo in `genera-preventivi.html`!
Sono identici!
