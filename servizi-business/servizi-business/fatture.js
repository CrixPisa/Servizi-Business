// Invoice Generator JavaScript - Servizi Business Italia

let items = [];
let invoiceCounter = parseInt(localStorage.getItem('invoiceCounter') || '1');

document.addEventListener('DOMContentLoaded', function() {
    setDefaultDate();
    updateInvoiceNumber();
    addFirstItem();
    setupEventListeners();
    checkSavedCompany();
});

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
    document.getElementById('saveCompanyBtn').addEventListener('click', saveCompanyData);
    document.getElementById('loadCompanyBtn').addEventListener('click', loadCompanyData);
    document.getElementById('saveCustomerBtn').addEventListener('click', saveCustomer);
    document.getElementById('loadCustomerBtn').addEventListener('click', loadCustomer);
    document.getElementById('withholding').addEventListener('change', calculateTotals);
}

function addFirstItem() {
    addItem();
}

function addItem() {
    const itemId = Date.now();
    const container = document.getElementById('itemsContainer');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'border border-gray-200 rounded-lg p-4';
    itemDiv.id = 'item-' + itemId;
    
    itemDiv.innerHTML = `
        <div class="flex justify-between items-center mb-3">
            <span class="font-semibold text-gray-700">Riga ${items.length + 1}</span>
            <button onclick="removeItem(${itemId})" class="text-red-600 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="grid md:grid-cols-2 gap-3 mb-3">
            <div class="md:col-span-2">
                <label class="block text-xs font-semibold text-gray-600 mb-1">Descrizione *</label>
                <input type="text" class="item-description w-full px-3 py-2 text-sm border border-gray-300 rounded" placeholder="Descrizione prodotto/servizio">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Quantità *</label>
                <input type="number" class="item-quantity w-full px-3 py-2 text-sm border border-gray-300 rounded" value="1" min="0.01" step="0.01">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Prezzo Unitario (€) *</label>
                <input type="number" class="item-price w-full px-3 py-2 text-sm border border-gray-300 rounded" placeholder="0.00" min="0" step="0.01">
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">IVA (%)</label>
                <select class="item-vat w-full px-3 py-2 text-sm border border-gray-300 rounded">
                    <option value="22">22%</option>
                    <option value="10">10%</option>
                    <option value="4">4%</option>
                    <option value="0">0%</option>
                </select>
            </div>
            <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Totale Riga</label>
                <input type="text" class="item-total w-full px-3 py-2 text-sm bg-gray-50" readonly value="€ 0,00">
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
    itemDiv.querySelector('.item-total').value = formatCurrency(total);
    calculateTotals();
}

function calculateTotals() {
    let subtotal = 0;
    let vatTotal = 0;
    
    document.querySelectorAll('[id^="item-"]').forEach(itemDiv => {
        const quantity = parseFloat(itemDiv.querySelector('.item-quantity').value) || 0;
        const price = parseFloat(itemDiv.querySelector('.item-price').value) || 0;
        const vatRate = parseFloat(itemDiv.querySelector('.item-vat').value) || 0;
        const itemSubtotal = quantity * price;
        const itemVat = itemSubtotal * (vatRate / 100);
        subtotal += itemSubtotal;
        vatTotal += itemVat;
    });
    
    const total = subtotal + vatTotal;
    const withholding = document.getElementById('withholding').checked ? subtotal * 0.20 : 0;
    const netTotal = total - withholding;
    
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('vatTotal').textContent = formatCurrency(vatTotal);
    document.getElementById('total').textContent = formatCurrency(total);
    
    if (withholding > 0) {
        document.getElementById('withholdingRow').classList.remove('hidden');
        document.getElementById('netRow').classList.remove('hidden');
        document.getElementById('withholdingAmount').textContent = formatCurrency(withholding);
        document.getElementById('netTotal').textContent = formatCurrency(netTotal);
    } else {
        document.getElementById('withholdingRow').classList.add('hidden');
        document.getElementById('netRow').classList.add('hidden');
    }
}

function formatCurrency(value) {
    return '€ ' + value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function saveCompanyData() {
    const companyData = {
        name: document.getElementById('companyName').value,
        vat: document.getElementById('companyVat').value,
        fiscalCode: document.getElementById('companyFiscalCode').value,
        address: document.getElementById('companyAddress').value,
        zip: document.getElementById('companyZip').value,
        city: document.getElementById('companyCity').value,
        province: document.getElementById('companyProvince').value,
        email: document.getElementById('companyEmail').value,
        phone: document.getElementById('companyPhone').value
    };
    localStorage.setItem('companyData', JSON.stringify(companyData));
    alert('✅ Dati emittente salvati con successo!');
}

function loadCompanyData() {
    const companyData = JSON.parse(localStorage.getItem('companyData'));
    if (companyData) {
        document.getElementById('companyName').value = companyData.name || '';
        document.getElementById('companyVat').value = companyData.vat || '';
        document.getElementById('companyFiscalCode').value = companyData.fiscalCode || '';
        document.getElementById('companyAddress').value = companyData.address || '';
        document.getElementById('companyZip').value = companyData.zip || '';
        document.getElementById('companyCity').value = companyData.city || '';
        document.getElementById('companyProvince').value = companyData.province || '';
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

function saveCustomer() {
    const customerName = document.getElementById('customerName').value;
    if (!customerName) {
        alert('❌ Inserisci almeno il nome del cliente.');
        return;
    }
    
    const customer = {
        name: customerName,
        vat: document.getElementById('customerVat').value,
        fiscalCode: document.getElementById('customerFiscalCode').value,
        address: document.getElementById('customerAddress').value,
        zip: document.getElementById('customerZip').value,
        city: document.getElementById('customerCity').value,
        province: document.getElementById('customerProvince').value
    };
    
    let customers = JSON.parse(localStorage.getItem('customers') || '[]');
    customers.push(customer);
    localStorage.setItem('customers', JSON.stringify(customers));
    alert('✅ Cliente salvato con successo!');
}

function loadCustomer() {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    if (customers.length === 0) {
        alert('❌ Nessun cliente salvato.');
        return;
    }
    
    const customerList = customers.map((c, i) => (i + 1) + '. ' + c.name).join('\n');
    const choice = prompt('Seleziona cliente (inserisci il numero):\n\n' + customerList);
    
    if (choice) {
        const index = parseInt(choice) - 1;
        if (index >= 0 && index < customers.length) {
            const customer = customers[index];
            document.getElementById('customerName').value = customer.name || '';
            document.getElementById('customerVat').value = customer.vat || '';
            document.getElementById('customerFiscalCode').value = customer.fiscalCode || '';
            document.getElementById('customerAddress').value = customer.address || '';
            document.getElementById('customerZip').value = customer.zip || '';
            document.getElementById('customerCity').value = customer.city || '';
            document.getElementById('customerProvince').value = customer.province || '';
            alert('✅ Cliente caricato!');
        }
    }
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
            province: document.getElementById('companyProvince').value,
            email: document.getElementById('companyEmail').value,
            phone: document.getElementById('companyPhone').value
        },
        customer: {
            name: document.getElementById('customerName').value,
            vat: document.getElementById('customerVat').value,
            fiscalCode: document.getElementById('customerFiscalCode').value,
            address: document.getElementById('customerAddress').value,
            zip: document.getElementById('customerZip').value,
            city: document.getElementById('customerCity').value,
            province: document.getElementById('customerProvince').value
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
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('FATTURA', 105, 25, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    
    // Invoice info box
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Numero:', 150, 35);
    doc.text('Data:', 150, 41);
    if (invoice.dueDate) doc.text('Scadenza:', 150, 47);
    
    doc.setFont(undefined, 'normal');
    doc.text(invoice.number, 175, 35);
    doc.text(formatDate(invoice.date), 175, 41);
    if (invoice.dueDate) doc.text(formatDate(invoice.dueDate), 175, 47);
    
    // Emittente
    doc.setFillColor(37, 99, 235);
    doc.rect(20, 55, 85, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text('EMITTENTE', 22, 60);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    let y = 67;
    doc.setFont(undefined, 'bold');
    doc.text(invoice.company.name, 22, y);
    doc.setFont(undefined, 'normal');
    y += 5;
    if (invoice.company.vat) { doc.text('P.IVA: ' + invoice.company.vat, 22, y); y += 5; }
    if (invoice.company.fiscalCode) { doc.text('C.F.: ' + invoice.company.fiscalCode, 22, y); y += 5; }
    doc.text(invoice.company.address, 22, y); y += 5;
    doc.text(invoice.company.zip + ' ' + invoice.company.city + ' (' + invoice.company.province + ')', 22, y); y += 5;
    if (invoice.company.email) { doc.text('Email: ' + invoice.company.email, 22, y); y += 5; }
    if (invoice.company.phone) { doc.text('Tel: ' + invoice.company.phone, 22, y); y += 5; }
    
    // Cliente
    doc.setFillColor(34, 197, 94);
    doc.rect(110, 55, 85, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.text('DESTINATARIO', 112, 60);
    
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    y = 67;
    doc.setFont(undefined, 'bold');
    doc.text(invoice.customer.name, 112, y);
    doc.setFont(undefined, 'normal');
    y += 5;
    if (invoice.customer.vat) { doc.text('P.IVA: ' + invoice.customer.vat, 112, y); y += 5; }
    if (invoice.customer.fiscalCode) { doc.text('C.F.: ' + invoice.customer.fiscalCode, 112, y); y += 5; }
    doc.text(invoice.customer.address, 112, y); y += 5;
    doc.text(invoice.customer.zip + ' ' + invoice.customer.city + ' (' + invoice.customer.province + ')', 112, y);
    
    // Table
    const tableData = invoice.items.map(item => {
        const subtotal = item.quantity * item.price;
        const vat = subtotal * (item.vat / 100);
        const total = subtotal + vat;
        return [
            item.description,
            item.quantity.toFixed(2),
            formatCurrency(item.price),
            item.vat + '%',
            formatCurrency(total)
        ];
    });
    
    doc.autoTable({
        startY: Math.max(y + 15, 110),
        head: [['Descrizione', 'Q.tà', 'Prezzo', 'IVA', 'Totale']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: 'bold' },
        styles: { fontSize: 9, cellPadding: 3 },
        columnStyles: {
            0: { cellWidth: 80 },
            1: { cellWidth: 20, halign: 'center' },
            2: { cellWidth: 30, halign: 'right' },
            3: { cellWidth: 20, halign: 'center' },
            4: { cellWidth: 30, halign: 'right' }
        }
    });
    
    // Totals
    let finalY = doc.lastAutoTable.finalY + 10;
    const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const vatTotal = invoice.items.reduce((sum, item) => {
        const itemSubtotal = item.quantity * item.price;
        return sum + (itemSubtotal * item.vat / 100);
    }, 0);
    const total = subtotal + vatTotal;
    
    doc.setFontSize(10);
    doc.text('Imponibile:', 140, finalY);
    doc.text(formatCurrency(subtotal), 190, finalY, { align: 'right' });
    
    finalY += 6;
    doc.text('IVA:', 140, finalY);
    doc.text(formatCurrency(vatTotal), 190, finalY, { align: 'right' });
    
    finalY += 8;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text('TOTALE:', 140, finalY);
    doc.text(formatCurrency(total), 190, finalY, { align: 'right' });
    
    if (invoice.withholding) {
        const withholdingAmount = subtotal * 0.20;
        const netTotal = total - withholdingAmount;
        
        finalY += 8;
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(220, 38, 38);
        doc.text('Ritenuta d\'acconto (20%):', 140, finalY);
        doc.text('-' + formatCurrency(withholdingAmount), 190, finalY, { align: 'right' });
        
        finalY += 8;
        doc.setFont(undefined, 'bold');
        doc.setFontSize(13);
        doc.setTextColor(22, 163, 74);
        doc.text('NETTO A PAGARE:', 140, finalY);
        doc.text(formatCurrency(netTotal), 190, finalY, { align: 'right' });
        doc.setTextColor(0, 0, 0);
    }
    
    // Payment
    finalY += 15;
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Modalità di pagamento: ', 20, finalY);
    doc.setFont(undefined, 'normal');
    doc.text(invoice.paymentMethod, 65, finalY);
    
    if (invoice.iban) {
        finalY += 5;
        doc.text('IBAN: ' + invoice.iban, 20, finalY);
    }
    
    // Notes
    if (invoice.notes) {
        finalY += 10;
        doc.setFont(undefined, 'bold');
        doc.text('Note:', 20, finalY);
        finalY += 5;
        doc.setFont(undefined, 'normal');
        const lines = doc.splitTextToSize(invoice.notes, 170);
        doc.text(lines, 20, finalY);
    }
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Generato con Servizi Business Italia', 105, 285, { align: 'center' });
    
    // Save
    saveInvoiceToHistory(invoice);
    invoiceCounter++;
    localStorage.setItem('invoiceCounter', invoiceCounter.toString());
    
    doc.save('Fattura_' + invoice.number.replace('/', '_') + '.pdf');
    alert('✅ Fattura generata e salvata con successo!');
}

function validateForm() {
    const required = ['invoiceNumber', 'invoiceDate', 'companyName', 'companyVat', 'companyAddress', 'companyZip', 'companyCity', 'companyProvince', 'customerName', 'customerAddress', 'customerZip', 'customerCity', 'customerProvince'];
    for (const field of required) {
        if (!document.getElementById(field).value.trim()) return false;
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

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT');
}

function resetForm() {
    if (confirm('Sei sicuro di voler cancellare tutti i dati?')) {
        location.reload();
    }
}