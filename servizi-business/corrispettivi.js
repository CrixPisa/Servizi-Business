// corrispettivi.js
// Gestione Corrispettivi Giornalieri

let currentUser = null;
let currentCountry = 'it';
let currentTaxSystem = null;
let vendite = [];

// Inizializzazione
document.addEventListener('DOMContentLoaded', async () => {
    await initApp();
    setupEventListeners();
    setupTabs();
    loadVendite();
});

async function initApp() {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = 'login.html?redirect=corrispettivi.html';
        return;
    }
    currentUser = session.user;
    
    // Get country and tax system
    currentCountry = getCurrentCountry();
    currentTaxSystem = TAX_SYSTEMS[currentCountry];
    
    // Setup UI
    updateCurrencySymbol();
    setupIVABreakdown();
    setTodayDate();
    
    // Setup language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            setLanguage(this.dataset.lang);
        });
    });
}

function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dataVendita').value = today;
}

function updateCurrencySymbol() {
    document.getElementById('currencySymbol').textContent = currentTaxSystem.currencySymbol;
}

function setupIVABreakdown() {
    const container = document.getElementById('ivaBreakdown');
    container.innerHTML = '';
    
    currentTaxSystem.vat.rates.forEach((rate, index) => {
        const rateLabel = t(rate.labelKey) || `Aliquota ${rate.value}%`;
        
        const div = document.createElement('div');
        div.className = 'flex items-center gap-4';
        div.innerHTML = `
            <label class="flex-1 font-semibold text-gray-700">${rateLabel} (${rate.value}%)</label>
            <div class="flex-1 relative">
                <input type="number" 
                       step="0.01" 
                       min="0" 
                       class="iva-input w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none" 
                       data-rate="${rate.value}" 
                       placeholder="0.00">
                <span class="absolute right-12 top-2.5 text-gray-400">${currentTaxSystem.currencySymbol}</span>
            </div>
            <div class="flex-1 text-right text-sm">
                <span class="text-gray-600">IVA: </span>
                <span class="iva-amount-${index} font-semibold text-blue-600">0.00 ${currentTaxSystem.currencySymbol}</span>
            </div>
        `;
        container.appendChild(div);
    });
    
    // Add event listeners to all inputs
    document.querySelectorAll('.iva-input').forEach(input => {
        input.addEventListener('input', calcolaRiepilogo);
    });
}

function calcolaRiepilogo() {
    let totaleImponibile = 0;
    let totaleIVA = 0;
    
    document.querySelectorAll('.iva-input').forEach((input, index) => {
        const imponibile = parseFloat(input.value) || 0;
        const rate = parseFloat(input.dataset.rate);
        const iva = imponibile * (rate / 100);
        
        totaleImponibile += imponibile;
        totaleIVA += iva;
        
        // Update IVA amount display
        const amountSpan = document.querySelector(`.iva-amount-${index}`);
        if (amountSpan) {
            amountSpan.textContent = `${iva.toFixed(2)} ${currentTaxSystem.currencySymbol}`;
        }
    });
    
    const totaleGenerale = totaleImponibile + totaleIVA;
    const importoInserito = parseFloat(document.getElementById('importoTotale').value) || 0;
    const differenza = importoInserito - totaleGenerale;
    
    // Update displays
    document.getElementById('totaleImponibile').textContent = `${currentTaxSystem.currencySymbol} ${totaleImponibile.toFixed(2)}`;
    document.getElementById('totaleIVA').textContent = `${currentTaxSystem.currencySymbol} ${totaleIVA.toFixed(2)}`;
    document.getElementById('totaleGenerale').textContent = `${currentTaxSystem.currencySymbol} ${totaleGenerale.toFixed(2)}`;
    
    // Show/hide difference alert
    const diffAlert = document.getElementById('differenzaAlert');
    if (Math.abs(differenza) > 0.01 && importoInserito > 0) {
        diffAlert.classList.remove('hidden');
        document.getElementById('differenzaValue').textContent = `${currentTaxSystem.currencySymbol} ${Math.abs(differenza).toFixed(2)}`;
    } else {
        diffAlert.classList.add('hidden');
    }
}

function setupEventListeners() {
    // Form submission
    document.getElementById('formVendita').addEventListener('submit', salvaVendita);
    
    // Reset button
    document.getElementById('btnReset').addEventListener('click', resetForm);
    
    // Import change triggers calculation
    document.getElementById('importoTotale').addEventListener('input', calcolaRiepilogo);
    
    // Export buttons
    document.getElementById('btnExportExcel').addEventListener('click', exportExcel);
    document.getElementById('btnExportPDF').addEventListener('click', exportPDF);
    
    // View storico button
    document.getElementById('btnVediStorico').addEventListener('click', () => {
        switchTab('storico');
    });
    
    // Country changed
    window.addEventListener('countryChanged', (e) => {
        currentCountry = e.detail.country;
        currentTaxSystem = TAX_SYSTEMS[currentCountry];
        updateCurrencySymbol();
        setupIVABreakdown();
    });
}

function setupTabs() {
    const tabs = ['tabRegistra', 'tabStorico', 'tabReport'];
    
    tabs.forEach(tabId => {
        document.getElementById(tabId).addEventListener('click', () => {
            const tabName = tabId.replace('tab', '').toLowerCase();
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    document.getElementById(`content${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.remove('hidden');
    
    // Load data if needed
    if (tabName === 'storico') {
        renderStorico();
    } else if (tabName === 'report') {
        // Future: generate report
    }
}

async function salvaVendita(e) {
    e.preventDefault();
    
    const data = document.getElementById('dataVendita').value;
    const importoTotale = parseFloat(document.getElementById('importoTotale').value);
    const note = document.getElementById('noteVendita').value;
    
    // Get IVA breakdown
    const ivaBreakdown = [];
    let totaleImponibile = 0;
    let totaleIVA = 0;
    
    document.querySelectorAll('.iva-input').forEach(input => {
        const imponibile = parseFloat(input.value) || 0;
        if (imponibile > 0) {
            const rate = parseFloat(input.dataset.rate);
            const iva = imponibile * (rate / 100);
            
            ivaBreakdown.push({
                aliquota: rate,
                imponibile: imponibile,
                iva: iva
            });
            
            totaleImponibile += imponibile;
            totaleIVA += iva;
        }
    });
    
    const vendita = {
        data: data,
        importo_totale: importoTotale,
        imponibile: totaleImponibile,
        iva: totaleIVA,
        breakdown: ivaBreakdown,
        note: note,
        country: currentCountry,
        user_id: currentUser.id,
        created_at: new Date().toISOString()
    };
    
    // Save to Supabase
    const { data: saved, error } = await supabase
        .from('corrispettivi')
        .insert([vendita])
        .select();
    
    if (error) {
        alert('Errore nel salvare la vendita: ' + error.message);
        console.error(error);
        return;
    }
    
    alert('✅ Vendita salvata con successo!');
    resetForm();
    loadVendite();
    updateRiepilogoOggi();
}

function resetForm() {
    document.getElementById('formVendita').reset();
    setTodayDate();
    document.querySelectorAll('.iva-input').forEach(input => input.value = '');
    calcolaRiepilogo();
}

async function loadVendite() {
    const { data, error } = await supabase
        .from('corrispettivi')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('data', { ascending: false });
    
    if (error) {
        console.error('Errore caricamento vendite:', error);
        return;
    }
    
    vendite = data || [];
    updateRiepilogoOggi();
}

function updateRiepilogoOggi() {
    const today = new Date().toISOString().split('T')[0];
    const venditeOggi = vendite.filter(v => v.data === today);
    
    const totaleVendite = venditeOggi.length;
    const totaleIncasso = venditeOggi.reduce((sum, v) => sum + v.importo_totale, 0);
    const totaleIVA = venditeOggi.reduce((sum, v) => sum + v.iva, 0);
    
    document.getElementById('venditeTotali').textContent = totaleVendite;
    document.getElementById('incassoTotale').textContent = `${currentTaxSystem.currencySymbol} ${totaleIncasso.toFixed(2)}`;
    document.getElementById('ivaTotale').textContent = `${currentTaxSystem.currencySymbol} ${totaleIVA.toFixed(2)}`;
}

function renderStorico() {
    const table = document.getElementById('tabellaVendite');
    const noData = document.getElementById('noDataMessage');
    
    if (vendite.length === 0) {
        table.innerHTML = '';
        noData.classList.remove('hidden');
        return;
    }
    
    noData.classList.add('hidden');
    
    let html = `
        <table class="w-full">
            <thead>
                <tr class="bg-gray-100 border-b-2 border-gray-300">
                    <th class="px-4 py-3 text-left font-semibold">Data</th>
                    <th class="px-4 py-3 text-right font-semibold">Imponibile</th>
                    <th class="px-4 py-3 text-right font-semibold">IVA</th>
                    <th class="px-4 py-3 text-right font-semibold">Totale</th>
                    <th class="px-4 py-3 text-left font-semibold">Note</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    vendite.forEach(v => {
        html += `
            <tr class="border-b border-gray-200 hover:bg-gray-50">
                <td class="px-4 py-3">${formatDate(v.data)}</td>
                <td class="px-4 py-3 text-right">${currentTaxSystem.currencySymbol} ${v.imponibile.toFixed(2)}</td>
                <td class="px-4 py-3 text-right text-blue-600">${currentTaxSystem.currencySymbol} ${v.iva.toFixed(2)}</td>
                <td class="px-4 py-3 text-right font-semibold">${currentTaxSystem.currencySymbol} ${v.importo_totale.toFixed(2)}</td>
                <td class="px-4 py-3 text-gray-600">${v.note || '-'}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    table.innerHTML = html;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function exportExcel() {
    if (vendite.length === 0) {
        alert('Nessuna vendita da esportare');
        return;
    }
    
    // Simple CSV export
    let csv = 'Data,Imponibile,IVA,Totale,Note\n';
    
    vendite.forEach(v => {
        csv += `${v.data},${v.imponibile},${v.iva},${v.importo_totale},"${v.note || ''}"\n`;
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `corrispettivi_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('✅ Export completato!');
}

function exportPDF() {
    alert('Funzione Export PDF in arrivo! Per ora usa Export Excel.');
}

console.log('✅ Corrispettivi.js loaded');
