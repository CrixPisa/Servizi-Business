// corrispettivi.js - VERSIONE CORRETTA
// Gestione Corrispettivi Giornalieri

let currentUser = null;
let currentCountry = 'it';
let currentTaxSystem = null;
let vendite = [];
let salesChart = null;
let vatChart = null;

// Inizializzazione
document.addEventListener('DOMContentLoaded', async () => {
    await initApp();
    setupEventListeners();
    setupTabs();
    await loadVendite();
    updateCharts();
});

async function initApp() {
    // Get user session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        const currentUrl = encodeURIComponent(window.location.href);
        window.location.href = `login.html?redirect=${currentUrl}`;
        return;
    }
    currentUser = session.user;
    
    // Get country and tax system
    currentCountry = getCurrentCountry();
    currentTaxSystem = TAX_SYSTEMS[currentCountry];
    
    // Setup years filter
    setupYearFilter();
    
    console.log('✅ App initialized:', { user: currentUser.email, country: currentCountry });
}

function setupYearFilter() {
    const yearSelect = document.getElementById('filterYear');
    const currentYear = new Date().getFullYear();
    
    for (let year = currentYear; year >= currentYear - 5; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

function setupEventListeners() {
    // Form submission
    const form = document.getElementById('saleForm');
    if (form) {
        form.addEventListener('submit', salvaVendita);
    }
    
    // Reset button
    const resetBtn = document.getElementById('resetForm');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetForm);
    }
    
    // Input changes for real-time calculation (già gestito nell'HTML)
    
    // Filter changes
    const filterMonth = document.getElementById('filterMonth');
    const filterYear = document.getElementById('filterYear');
    
    if (filterMonth) filterMonth.addEventListener('change', applyFilters);
    if (filterYear) filterYear.addEventListener('change', applyFilters);
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });
    
    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) {
        targetTab.classList.remove('hidden');
    }
    
    // Load data if needed
    if (tabName === 'history') {
        renderStorico();
    } else if (tabName === 'stats') {
        updateCharts();
        updateKPIs();
    }
}

async function salvaVendita(e) {
    e.preventDefault();
    
    const data = document.getElementById('saleDate').value;
    const importoLordo = parseFloat(document.getElementById('saleAmount').value);
    const aliquotaIVA = parseFloat(document.getElementById('vatRate').value);
    const descrizione = document.getElementById('saleDescription').value;
    
    if (!data || !importoLordo || importoLordo <= 0) {
        alert('⚠️ Compila tutti i campi obbligatori');
        return;
    }
    
    // Calcola IVA e imponibile
    const iva = importoLordo * aliquotaIVA / (100 + aliquotaIVA);
    const imponibile = importoLordo - iva;
    
    const vendita = {
        data: data,
        importo_totale: importoLordo,
        imponibile: imponibile,
        iva: iva,
        aliquota_iva: aliquotaIVA,
        descrizione: descrizione,
        country: currentCountry,
        user_id: currentUser.id
    };
    
    console.log('Saving sale:', vendita);
    
    // Save to Supabase
    const { data: saved, error } = await supabase
        .from('corrispettivi')
        .insert([vendita])
        .select();
    
    if (error) {
        console.error('Save error:', error);
        alert('❌ Errore nel salvare la vendita: ' + error.message);
        return;
    }
    
    console.log('✅ Sale saved:', saved);
    alert('✅ Vendita salvata con successo!');
    
    resetForm();
    await loadVendite();
    updateCharts();
    updateKPIs();
}

function resetForm() {
    document.getElementById('saleForm').reset();
    
    // Reset to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('saleDate').value = today;
    
    // Reset summary
    const currencySymbol = currentTaxSystem.currencySymbol;
    document.getElementById('summaryGross').textContent = `${currencySymbol} 0.00`;
    document.getElementById('summaryVat').textContent = `${currencySymbol} 0.00`;
    document.getElementById('summaryNet').textContent = `${currencySymbol} 0.00`;
}

async function loadVendite() {
    console.log('Loading sales for user:', currentUser.id);
    
    const { data, error } = await supabase
        .from('corrispettivi')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('data', { ascending: false });
    
    if (error) {
        console.error('Load error:', error);
        alert('❌ Errore nel caricamento: ' + error.message);
        return;
    }
    
    vendite = data || [];
    console.log(`✅ Loaded ${vendite.length} sales`);
    
    renderStorico();
    updateKPIs();
}

function applyFilters() {
    const month = document.getElementById('filterMonth').value;
    const year = document.getElementById('filterYear').value;
    
    console.log('Applying filters:', { month, year });
    renderStorico(month, year);
}

function renderStorico(filterMonth = '', filterYear = '') {
    const tbody = document.getElementById('historyTableBody');
    
    // Filter sales
    let filteredVendite = [...vendite];
    
    if (filterMonth) {
        filteredVendite = filteredVendite.filter(v => {
            const date = new Date(v.data);
            return (date.getMonth() + 1) === parseInt(filterMonth);
        });
    }
    
    if (filterYear) {
        filteredVendite = filteredVendite.filter(v => {
            const date = new Date(v.data);
            return date.getFullYear() === parseInt(filterYear);
        });
    }
    
    // Calculate totals
    let totalNet = 0;
    let totalVat = 0;
    let totalGross = 0;
    
    if (filteredVendite.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-2"></i>
                    <p>Nessuna vendita trovata</p>
                </td>
            </tr>
        `;
    } else {
        let html = '';
        
        filteredVendite.forEach(v => {
            totalNet += v.imponibile;
            totalVat += v.iva;
            totalGross += v.importo_totale;
            
            html += `
                <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">${formatDate(v.data)}</td>
                    <td class="px-6 py-4">${v.descrizione || '-'}</td>
                    <td class="px-6 py-4 text-right">${currentTaxSystem.currencySymbol} ${v.imponibile.toFixed(2)}</td>
                    <td class="px-6 py-4 text-right">${v.aliquota_iva}%</td>
                    <td class="px-6 py-4 text-right text-green-600">${currentTaxSystem.currencySymbol} ${v.iva.toFixed(2)}</td>
                    <td class="px-6 py-4 text-right font-semibold">${currentTaxSystem.currencySymbol} ${v.importo_totale.toFixed(2)}</td>
                    <td class="px-6 py-4 text-center">
                        <button onclick="deleteVendita('${v.id}')" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
    }
    
    // Update totals
    document.getElementById('totalNet').textContent = `${currentTaxSystem.currencySymbol} ${totalNet.toFixed(2)}`;
    document.getElementById('totalVat').textContent = `${currentTaxSystem.currencySymbol} ${totalVat.toFixed(2)}`;
    document.getElementById('totalGross').textContent = `${currentTaxSystem.currencySymbol} ${totalGross.toFixed(2)}`;
}

async function deleteVendita(id) {
    if (!confirm('Sei sicuro di voler eliminare questa vendita?')) {
        return;
    }
    
    const { error } = await supabase
        .from('corrispettivi')
        .delete()
        .eq('id', id)
        .eq('user_id', currentUser.id);
    
    if (error) {
        alert('❌ Errore nell\'eliminazione: ' + error.message);
        return;
    }
    
    alert('✅ Vendita eliminata');
    await loadVendite();
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}

function updateKPIs() {
    const totalSales = vendite.length;
    const revenue = vendite.reduce((sum, v) => sum + v.importo_totale, 0);
    const average = totalSales > 0 ? revenue / totalSales : 0;
    const totalVat = vendite.reduce((sum, v) => sum + v.iva, 0);
    
    document.getElementById('kpiTotalSales').textContent = totalSales;
    document.getElementById('kpiRevenue').textContent = `${currentTaxSystem.currencySymbol} ${revenue.toFixed(0)}`;
    document.getElementById('kpiAverage').textContent = `${currentTaxSystem.currencySymbol} ${average.toFixed(0)}`;
    document.getElementById('kpiTotalVat').textContent = `${currentTaxSystem.currencySymbol} ${totalVat.toFixed(0)}`;
}

function updateCharts() {
    updateSalesChart();
    updateVatChart();
}

function updateSalesChart() {
    // Group by date
    const salesByDate = {};
    
    vendite.forEach(v => {
        const date = v.data;
        if (!salesByDate[date]) {
            salesByDate[date] = 0;
        }
        salesByDate[date] += v.importo_totale;
    });
    
    const dates = Object.keys(salesByDate).sort().slice(-30); // Last 30 days
    const amounts = dates.map(d => salesByDate[d]);
    
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    if (salesChart) {
        salesChart.destroy();
    }
    
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.map(d => formatDate(d)),
            datasets: [{
                label: 'Vendite',
                data: amounts,
                borderColor: '#16a34a',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return currentTaxSystem.currencySymbol + ' ' + value;
                        }
                    }
                }
            }
        }
    });
}

function updateVatChart() {
    // Group by VAT rate
    const vatByRate = {};
    
    vendite.forEach(v => {
        const rate = v.aliquota_iva;
        if (!vatByRate[rate]) {
            vatByRate[rate] = 0;
        }
        vatByRate[rate] += v.iva;
    });
    
    const rates = Object.keys(vatByRate);
    const amounts = Object.values(vatByRate);
    
    const ctx = document.getElementById('vatChart');
    if (!ctx) return;
    
    if (vatChart) {
        vatChart.destroy();
    }
    
    vatChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: rates.map(r => `${r}%`),
            datasets: [{
                data: amounts,
                backgroundColor: [
                    '#16a34a',
                    '#3b82f6',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Export functions
async function exportToExcel() {
    if (vendite.length === 0) {
        alert('⚠️ Nessuna vendita da esportare');
        return;
    }
    
    let csv = 'Data,Descrizione,Imponibile,IVA %,IVA,Totale\n';
    
    vendite.forEach(v => {
        csv += `${v.data},"${v.descrizione || ''}",${v.imponibile},${v.aliquota_iva},${v.iva},${v.importo_totale}\n`;
    });
    
    downloadFile(csv, `corrispettivi_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
    alert('✅ Export Excel completato!');
}

async function exportToCSV() {
    exportToExcel(); // Same as Excel
}

async function exportToPDF() {
    alert('📄 Export PDF in arrivo! Per ora usa Export Excel/CSV.');
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type: type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

console.log('✅ Corrispettivi.js loaded and ready');
