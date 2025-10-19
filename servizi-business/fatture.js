// Invoice Generator JavaScript - INTERNATIONAL VERSION
// Supports multiple countries with dynamic tax systems

let items = [];
let invoiceCounter = parseInt(localStorage.getItem('invoiceCounter') || '1');
let currentCountry = 'IT'; // Default country

document.addEventListener('DOMContentLoaded', function() {
    setDefaultDate();
    updateInvoiceNumber();
    addFirstItem();
    setupEventListeners();
    checkSavedCompany();
    updateTaxSystem(); // Initialize tax system
});

// INTERNATIONAL TAX SYSTEM FUNCTIONS

function updateTaxSystem() {
    currentCountry = document.getElementById('countrySelect').value;
    const taxSystem = getTaxSystem(currentCountry);
    
    // Update currency symbol in placeholders
    updateCurrencyPlaceholders(taxSystem.symbol);
    
    // Show/hide state selector for US
    const stateSelector = document.getElementById('stateSelector');
    if (currentCountry === 'US') {
        stateSelector.classList.remove('hidden');
    } else {
        stateSelector.classList.add('hidden');
    }
    
    // Update VAT options in all item rows
    updateVATOptions(taxSystem);
    
    // Update withholding tax checkbox
    updateWithholdingTax(taxSystem);
    
    // Recalculate totals
    calculateTotals();
    
    console.log('✅ Tax system updated:', taxSystem.name);
}

function updateCurrencyPlaceholders(symbol) {
    // Update price input placeholders
    document.querySelectorAll('.item-price').forEach(input => {
        input.placeholder = `0.00 ${symbol}`;
    });
}

function updateVATOptions(taxSystem) {
    const template = taxSystem.vat.labels.map((label, index) => {
        const rate = index === 0 ? taxSystem.vat.standard : 
                     (taxSystem.vat.reduced ? taxSystem.vat.reduced[index - 1] : 0);
        return `<option value="${rate}">${label}</option>`;
    }).join('');
    
    document.querySelectorAll('.item-vat').forEach(select => {
        const currentValue = select.value;
        select.innerHTML = template;
        // Try to maintain selection
        if (select.querySelector(`option[value="${currentValue}"]`)) {
            select.value = currentValue;
        }
    });
}

function updateWithholdingTax(taxSystem) {
    const withholdingContainer = document.getElementById('withholding').parentElement;
    const label = withholdingContainer.querySelector('label');
    
    if (taxSystem.withholdingTax.enabled) {
        withholdingContainer.classList.remove('hidden');
        label.textContent = `Applica ${taxSystem.withholdingTax.label || 'Ritenuta'} ${taxSystem.withholdingTax.rate}%`;
    } else {
        withholdingContainer.classList.add('hidden');
        document.getElementById('withholding').checked = false;
    }
}

function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];
}

function updateInvoiceNumber() {
    const year = new Date().getFullYear();
    const number = String(invoiceCounter).padStart(3, '0');
    document.getElementById('invoiceNumber').value = year + '/' + number;
}

function setupEventListeners() {
    document.getElementById('addItemBtn').addEventListener('click', addItem);
    document.getElementById('generatePDFBtn').addEventListener('click', generatePDF);
    document.getElementById('saveDraftBtn').addEventListener('click', saveDraft);
    document.getElementById('resetBtn').addEventListener('click', resetForm);
    document.getElementById('loadCompanyBtn').addEventListener('click', loadCompanyData);
    document.getElementById('loadClientBtn').addEventListener('click', loadClientData);
    document.getElementById('withholding').addEventListener('change', calculateTotals);
    
    // Country and state selectors
    const stateSelect = document.getElementById('stateSelect');
    if (stateSelect) {
        stateSelect.addEventListener('change', calculateTotals);
    }
}

function addFirstItem() {
    addItem();
}

function addItem() {
    const itemId = Date.now();
    const container = document.getElementById('itemsContainer');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'border border-gray-200 rounded-lg p-4 bg-gray-50';
    itemDiv.id = 'item-' + itemId;
    
    const taxSystem = getTaxSystem(currentCountry);
    const vatOptions = taxSystem.vat.labels.map((label, index) => {
        const rate = index === 0 ? taxSystem.vat.standard : 
                     (taxSystem.vat.reduced ? taxSystem.vat.reduced[index - 1] : 0);
        return `<option value="${rate}">${label}</option>`;
    }).join('');
    
    itemDiv.innerHTML = `
        <div class="flex justify-between items-center mb-3">
            <span class="font-semibold text-gray-700">Riga ${items.length + 1}</span>
            <button onclick="removeItem(${itemId})" class="text-red-600 hover:text-red-700 transition">
                <i class="fas fa-trash"></i> Rimuovi
            </button>
        </div>
        <div class="grid md:grid-cols-2 gap-3 mb-3">
            <div class="md:col-span-2">
                <label class="block text-xs font-semibold text-gray-600 mb-1">Descrizione *</label>
                <input type="text" class="item-description w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="Descrizione prodotto/servizio">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Quantità *</label>
                <input type="number" class="item-quantity w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" value="1" min="0.01" step="0.01">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Prezzo Unitario (${taxSystem.symbol}) *</label>
                <input type="number" class="item-price w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" placeholder="0.00" min="0" step="0.01">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">IVA/Tax (%)</label>
                <select class="item-vat w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                    ${vatOptions}
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Totale Riga</label>
                <input type="text" class="item-total w-full px-3 py-2 text-sm bg-gray-100 font-semibold" readonly value="${taxSystem.symbol} 0.00">
            </div>
        </div>
    `;
    
    container.appendChild(itemDiv);
    
    const inputs = itemDiv.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', calculateItemTotal);
        input.addEventListener('change', calculateItemTotal);
    });
    
    items.push(itemId);
}

function removeItem(itemId) {
    const itemDiv = document.getElementById('item-' + itemId);
    if (itemDiv) {
        itemDiv.remove();
        items = items.filter(id => id !== itemId);
        calculateTotals();
        document.querySelectorAll('#itemsContainer > div').forEach((div, index) => {
            const label = div.querySelector('span');
            if (label) label.textContent = 'Riga ' + (index + 1);
        });
    }
}

function calculateItemTotal(event) {
    const itemDiv = event.target.closest('[id^="item-"]');
    const quantity = parseFloat(itemDiv.querySelector('.item-quantity').value) || 0;
    const price = parseFloat(itemDiv.querySelector('.item-price').value) || 0;
    const total = quantity * price;
    const taxSystem = getTaxSystem(currentCountry);
    itemDiv.querySelector('.item-total').value = formatCurrency(total, currentCountry);
    calculateTotals();
}

function calculateTotals() {
    let subtotal = 0;
    let vatTotal = 0;
    
    const taxSystem = getTaxSystem(currentCountry);
    const stateCode = currentCountry === 'US' ? document.getElementById('stateSelect').value : null;
    
    document.querySelectorAll('[id^="item-"]').forEach(itemDiv => {
        const quantity = parseFloat(itemDiv.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(itemDiv.querySelector('.item-price').value) || 0;
        let vatRate = parseFloat(itemDiv.querySelector('.item-vat').value) || 0;
        
        // For US, use state sales tax if selected
        if (currentCountry === 'US' && stateCode && taxSystem.states[stateCode]) {
            vatRate = taxSystem.states[stateCode].salesTax;
        }
        
        const itemSubtotal = quantity * price;
        const itemVat = itemSubtotal * (vatRate / 100);
        subtotal += itemSubtotal;
        vatTotal += itemVat;
    });
    
    const total = subtotal + vatTotal;
    
    // Withholding tax
    let withholding = 0;
    if (taxSystem.withholdingTax.enabled && document.getElementById('withholding').checked) {
        withholding = subtotal * (taxSystem.withholdingTax.rate / 100);
    }
    
    const netTotal = total - withholding;
    
    document.getElementById('subtotal').textContent = formatCurrency(subtotal, currentCountry);
    document.getElementById('vatTotal').textContent = formatCurrency(vatTotal, currentCountry);
    document.getElementById('total').textContent = formatCurrency(total, currentCountry);
    
    if (withholding > 0) {
        document.getElementById('withholdingRow').classList.remove('hidden');
        document.getElementById('netRow').classList.remove('hidden');
        document.getElementById('withholdingAmount').textContent = formatCurrency(withholding, currentCountry);
        document.getElementById('netTotal').textContent = formatCurrency(netTotal, currentCountry);
    } else {
        document.getElementById('withholdingRow').classList.add('hidden');
        document.getElementById('netRow').classList.add('hidden');
    }
}

// Rest of the functions remain the same...
function loadCompanyData() {
    const companyData = JSON.parse(localStorage.getItem('companyData'));
    if (companyData) {
        document.getElementById('companyName').value = companyData.name || '';
        document.getElementById('companyVat').value = companyData.vat || '';
        document.getElementById('companyFiscalCode').value = companyData.fiscalCode || '';
        document.getElementById('companyAddress').value = companyData.address || '';
        document.getElementById('companyZip').value = companyData.zip || '';
        document.getElementById('companyCity').value = companyData.city || '';
        document.getElementById('companyEmail').value = companyData.email || '';
        document.getElementById('companyPhone').value = companyData.phone || '';
        alert('✅ Dati emittente caricati!');
    } else {
        alert('❌ Nessun dato salvato trovato.');
    }
}

function checkSavedCompany() {
    const companyData = JSON.parse(localStorage.getItem('companyData'));
    if (companyData && companyData.name) {
        if (confirm('Vuoi caricare i tuoi dati aziendali salvati?')) {
            loadCompanyData();
        }
    }
}

function loadClientData() {
    alert('🚧 Funzione rubrica clienti in arrivo!');
}

function saveDraft() {
    const invoice = collectInvoiceData();
    invoice.status = 'draft';
    invoice.id = Date.now();
    invoice.createdAt = new Date().toISOString();
    
    let drafts = JSON.parse(localStorage.getItem('invoiceDrafts') || '[]');
    drafts.push(invoice);
    localStorage.setItem('invoiceDrafts', JSON.stringify(drafts));
    
    alert('✅ Bozza salvata con successo!');
}

function collectInvoiceData() {
    const itemsData = [];
    document.querySelectorAll('[id^="item-"]').forEach(itemDiv => {
        itemsData.push({
            description: itemDiv.querySelector('.item-description').value,
            quantity: parseFloat(itemDiv.querySelector('.item-quantity').value) || 0,
            price: parseFloat(itemDiv.querySelector('.item-price').value) || 0,
            vat: parseFloat(itemDiv.querySelector('.item-vat').value) || 0
        });
    });
    
    return {
        country: currentCountry,
        number: document.getElementById('invoiceNumber').value,
        date: document.getElementById('invoiceDate').value,
        dueDate: document.getElementById('dueDate').value,
        company: {
            name: document.getElementById('companyName').value,
            vat: document.getElementById('companyVat').value,
            fiscalCode: document.getElementById('companyFiscalCode').value,
            address: document.getElementById('companyAddress').value,
            zip: document.getElementById('companyZip').value,
            city: document.getElementById('companyCity').value,
            email: document.getElementById('companyEmail').value,
            phone: document.getElementById('companyPhone').value
        },
        client: {
            name: document.getElementById('clientName').value,
            vat: document.getElementById('clientVat').value,
            fiscalCode: document.getElementById('clientFiscalCode').value,
            address: document.getElementById('clientAddress').value,
            zip: document.getElementById('clientZip').value,
            city: document.getElementById('clientCity').value
        },
        items: itemsData,
        paymentMethod: document.getElementById('paymentMethod').value,
        iban: document.getElementById('iban').value,
        notes: document.getElementById('notes').value,
        withholding: document.getElementById('withholding').checked
    };
}

function generatePDF() {
    if (!validateForm()) {
        alert('❌ Compila tutti i campi obbligatori (*)');
        return;
    }
    
    const invoice = collectInvoiceData();
    const taxSystem = getTaxSystem(invoice.country);
    
    alert(`✅ PDF generation for ${taxSystem.name} - Coming soon!\n\n🚧 Funzione in sviluppo avanzato.\nPer ora il sistema internazionale calcola correttamente le tasse per ${taxSystem.name}.`);
    
    // TODO: Implement international PDF generation
    saveInvoiceToHistory(invoice);
    invoiceCounter++;
    localStorage.setItem('invoiceCounter', invoiceCounter.toString());
}

function validateForm() {
    const required = ['invoiceNumber', 'invoiceDate', 'companyName', 'companyVat', 'companyAddress', 'companyZip', 'companyCity', 'clientName', 'clientAddress', 'clientZip', 'clientCity'];
    for (const field of required) {
        const el = document.getElementById(field);
        if (!el || !el.value.trim()) return false;
    }
    const itemsCount = document.querySelectorAll('[id^="item-"]').length;
    if (itemsCount === 0) return false;
    let valid = true;
    document.querySelectorAll('[id^="item-"]').forEach(itemDiv => {
        const desc = itemDiv.querySelector('.item-description').value.trim();
        const price = itemDiv.querySelector('.item-price').value;
        if (!desc || !price) valid = false;
    });
    return valid;
}

function saveInvoiceToHistory(invoice) {
    invoice.id = Date.now();
    invoice.status = 'completed';
    invoice.createdAt = new Date().toISOString();
    let history = JSON.parse(localStorage.getItem('invoiceHistory') || '[]');
    history.unshift(invoice);
    localStorage.setItem('invoiceHistory', JSON.stringify(history));
}

function resetForm() {
    if (confirm('Sei sicuro di voler cancellare tutti i dati?')) {
        location.reload();
    }
}

console.log('✅ International invoice system ready');
