// SISTEMA ARTICOLI MULTI-LINGUA PER BLOG
// Ogni articolo è specifico per paese/lingua con contenuti localizzati

const BLOG_ARTICLES = {
    // ARTICOLI ITALIANI
    it: [
        {
            id: 'ritenuta-acconto-2025-it',
            slug: 'ritenuta-acconto-calcolo-guida-2025',
            title: 'Ritenuta d\'Acconto 2025: Calcolo e Guida Completa',
            excerpt: 'Tutto quello che devi sapere sulla ritenuta d\'acconto: cos\'è, come si calcola, chi deve applicarla e come inserirla correttamente in fattura. Guida con esempi pratici.',
            category: 'fiscal',
            categoryLabel: 'Fiscale',
            date: '26 Ottobre 2025',
            readTime: '8 min',
            icon: 'fa-receipt',
            gradient: 'from-purple-500 to-indigo-600',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-800',
            views: '1.2k',
            comments: '23',
            featured: true
        },
        {
            id: 'stipendio-netto-2025-it',
            slug: 'calcolo-stipendio-netto-guida-2025',
            title: 'Calcolo Stipendio Netto: Guida Completa 2025',
            excerpt: 'Come calcolare lo stipendio netto da lordo: INPS, IRPEF, detrazioni. Guida con esempi pratici per dipendenti italiani.',
            category: 'fiscal',
            categoryLabel: 'Lavoro',
            date: '26 Ottobre 2025',
            readTime: '6 min',
            icon: 'fa-money-bill-wave',
            gradient: 'from-green-400 to-emerald-600',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800'
        },
        {
            id: 'tfr-calcolo-2025-it',
            slug: 'calcolo-tfr-guida-completa-2025',
            title: 'TFR: Calcolo, Liquidazione e Tassazione',
            excerpt: 'Tutto sul Trattamento di Fine Rapporto: come si calcola, quando spetta e come viene tassato in Italia.',
            category: 'fiscal',
            categoryLabel: 'Lavoro',
            date: '26 Ottobre 2025',
            readTime: '7 min',
            icon: 'fa-piggy-bank',
            gradient: 'from-orange-400 to-red-600',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-800'
        },
        {
            id: 'fattura-elettronica-it',
            slug: 'come-fare-fattura-elettronica-gratis',
            title: 'Come Fare una Fattura Elettronica Gratis',
            excerpt: 'Guida passo-passo per creare fatture elettroniche professionali senza software costosi. Sistema di Interscambio (SDI) e normativa italiana.',
            category: 'invoicing',
            categoryLabel: 'Fatturazione',
            date: '27 Ottobre 2025',
            readTime: '10 min',
            icon: 'fa-file-invoice',
            gradient: 'from-blue-400 to-cyan-600',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-800'
        }
    ],

    // ARTICOLI INGLESI (UK/US)
    en: [
        {
            id: 'tax-withholding-2025-en',
            slug: 'tax-withholding-calculation-guide-2025',
            title: 'Tax Withholding 2025: Complete Calculation Guide',
            excerpt: 'Everything you need to know about tax withholding: what it is, how to calculate it, who must apply it. Guide with practical examples for UK/US professionals.',
            category: 'fiscal',
            categoryLabel: 'Tax',
            date: 'October 26, 2025',
            readTime: '8 min',
            icon: 'fa-receipt',
            gradient: 'from-purple-500 to-indigo-600',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-800',
            views: '2.5k',
            comments: '45',
            featured: true
        },
        {
            id: 'net-salary-2025-en',
            slug: 'net-salary-calculation-guide-2025',
            title: 'Net Salary Calculation: Complete 2025 Guide',
            excerpt: 'How to calculate net salary from gross: National Insurance, Income Tax, deductions. Complete guide with examples.',
            category: 'fiscal',
            categoryLabel: 'Work',
            date: 'October 26, 2025',
            readTime: '6 min',
            icon: 'fa-money-bill-wave',
            gradient: 'from-green-400 to-emerald-600',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800'
        },
        {
            id: 'severance-pay-2025-en',
            slug: 'severance-pay-calculation-guide-2025',
            title: 'Severance Pay: Calculation and Taxation',
            excerpt: 'Everything about severance pay: how it\'s calculated, when it\'s due and how it\'s taxed in UK/US.',
            category: 'fiscal',
            categoryLabel: 'Work',
            date: 'October 26, 2025',
            readTime: '7 min',
            icon: 'fa-piggy-bank',
            gradient: 'from-orange-400 to-red-600',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-800'
        },
        {
            id: 'electronic-invoice-en',
            slug: 'how-to-create-electronic-invoice-free',
            title: 'How to Create an Electronic Invoice Free',
            excerpt: 'Step-by-step guide to create professional electronic invoices without expensive software. MTD and Making Tax Digital compliance.',
            category: 'invoicing',
            categoryLabel: 'Invoicing',
            date: 'October 27, 2025',
            readTime: '10 min',
            icon: 'fa-file-invoice',
            gradient: 'from-blue-400 to-cyan-600',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-800'
        }
    ],

    // ARTICOLI TEDESCHI
    de: [
        {
            id: 'quellensteuer-2025-de',
            slug: 'quellensteuer-berechnung-leitfaden-2025',
            title: 'Quellensteuer 2025: Vollständiger Berechnungsleitfaden',
            excerpt: 'Alles über Quellensteuer: was sie ist, wie man sie berechnet, wer sie anwenden muss. Leitfaden mit praktischen Beispielen für deutsche Fachleute.',
            category: 'fiscal',
            categoryLabel: 'Steuern',
            date: '26. Oktober 2025',
            readTime: '8 Min.',
            icon: 'fa-receipt',
            gradient: 'from-purple-500 to-indigo-600',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-800',
            views: '1.8k',
            comments: '32',
            featured: true
        },
        {
            id: 'nettogehalt-2025-de',
            slug: 'nettogehalt-berechnung-leitfaden-2025',
            title: 'Nettogehalt-Berechnung: Vollständiger Leitfaden 2025',
            excerpt: 'So berechnen Sie das Nettogehalt vom Brutto: Sozialversicherung, Einkommensteuer, Abzüge. Vollständiger Leitfaden.',
            category: 'fiscal',
            categoryLabel: 'Arbeit',
            date: '26. Oktober 2025',
            readTime: '6 Min.',
            icon: 'fa-money-bill-wave',
            gradient: 'from-green-400 to-emerald-600',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800'
        },
        {
            id: 'abfindung-2025-de',
            slug: 'abfindung-berechnung-leitfaden-2025',
            title: 'Abfindung: Berechnung und Besteuerung',
            excerpt: 'Alles über Abfindung: wie sie berechnet wird, wann sie fällig ist und wie sie in Deutschland besteuert wird.',
            category: 'fiscal',
            categoryLabel: 'Arbeit',
            date: '26. Oktober 2025',
            readTime: '7 Min.',
            icon: 'fa-piggy-bank',
            gradient: 'from-orange-400 to-red-600',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-800'
        }
    ],

    // ARTICOLI FRANCESI
    fr: [
        {
            id: 'retenue-source-2025-fr',
            slug: 'retenue-source-calcul-guide-2025',
            title: 'Retenue à la Source 2025: Guide Complet',
            excerpt: 'Tout sur la retenue à la source: ce qu\'elle est, comment la calculer, qui doit l\'appliquer. Guide avec exemples pratiques.',
            category: 'fiscal',
            categoryLabel: 'Fiscal',
            date: '26 Octobre 2025',
            readTime: '8 min',
            icon: 'fa-receipt',
            gradient: 'from-purple-500 to-indigo-600',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-800',
            views: '1.5k',
            comments: '28',
            featured: true
        },
        {
            id: 'salaire-net-2025-fr',
            slug: 'salaire-net-calcul-guide-2025',
            title: 'Calcul du Salaire Net: Guide Complet 2025',
            excerpt: 'Comment calculer le salaire net du brut: cotisations sociales, impôts, déductions. Guide complet.',
            category: 'fiscal',
            categoryLabel: 'Travail',
            date: '26 Octobre 2025',
            readTime: '6 min',
            icon: 'fa-money-bill-wave',
            gradient: 'from-green-400 to-emerald-600',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800'
        },
        {
            id: 'indemnite-depart-2025-fr',
            slug: 'indemnite-depart-calcul-guide-2025',
            title: 'Indemnité de Départ: Calcul et Imposition',
            excerpt: 'Tout sur l\'indemnité de départ: comment elle est calculée, quand elle est due et comment elle est imposée.',
            category: 'fiscal',
            categoryLabel: 'Travail',
            date: '26 Octobre 2025',
            readTime: '7 min',
            icon: 'fa-piggy-bank',
            gradient: 'from-orange-400 to-red-600',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-800'
        }
    ],

    // ARTICOLI SPAGNOLI
    es: [
        {
            id: 'retencion-impuestos-2025-es',
            slug: 'retencion-impuestos-calculo-guia-2025',
            title: 'Retención de Impuestos 2025: Guía Completa',
            excerpt: 'Todo sobre la retención de impuestos: qué es, cómo calcularla, quién debe aplicarla. Guía con ejemplos prácticos.',
            category: 'fiscal',
            categoryLabel: 'Fiscal',
            date: '26 de Octubre de 2025',
            readTime: '8 min',
            icon: 'fa-receipt',
            gradient: 'from-purple-500 to-indigo-600',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-800',
            views: '1.3k',
            comments: '25',
            featured: true
        },
        {
            id: 'salario-neto-2025-es',
            slug: 'salario-neto-calculo-guia-2025',
            title: 'Cálculo de Salario Neto: Guía Completa 2025',
            excerpt: 'Cómo calcular el salario neto del bruto: Seguridad Social, IRPF, deducciones. Guía completa.',
            category: 'fiscal',
            categoryLabel: 'Trabajo',
            date: '26 de Octubre de 2025',
            readTime: '6 min',
            icon: 'fa-money-bill-wave',
            gradient: 'from-green-400 to-emerald-600',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800'
        },
        {
            id: 'indemnizacion-2025-es',
            slug: 'indemnizacion-calculo-guia-2025',
            title: 'Indemnización: Cálculo e Impuestos',
            excerpt: 'Todo sobre la indemnización: cómo se calcula, cuándo se debe y cómo se grava.',
            category: 'fiscal',
            categoryLabel: 'Trabajo',
            date: '26 de Octubre de 2025',
            readTime: '7 min',
            icon: 'fa-piggy-bank',
            gradient: 'from-orange-400 to-red-600',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-800'
        }
    ],

    // ARTICOLI UNGHERESI
    hu: [
        {
            id: 'forrásadó-2025-hu',
            slug: 'forrasado-szamitas-utmutato-2025',
            title: 'Forrásadó 2025: Teljes Útmutató',
            excerpt: 'Minden a forrásadóról: mi az, hogyan kell kiszámítani, kinek kell alkalmaznia. Útmutató gyakorlati példákkal.',
            category: 'fiscal',
            categoryLabel: 'Adó',
            date: '2025. október 26.',
            readTime: '8 perc',
            icon: 'fa-receipt',
            gradient: 'from-purple-500 to-indigo-600',
            bgColor: 'bg-purple-100',
            textColor: 'text-purple-800',
            views: '900',
            comments: '18',
            featured: true
        },
        {
            id: 'netto-fizetes-2025-hu',
            slug: 'netto-fizetes-szamitas-utmutato-2025',
            title: 'Nettó Fizetés Számítása: Teljes Útmutató 2025',
            excerpt: 'Hogyan számítsuk ki a nettó fizetést a bruttóból: társadalombiztosítás, SZJA, levonások.',
            category: 'fiscal',
            categoryLabel: 'Munka',
            date: '2025. október 26.',
            readTime: '6 perc',
            icon: 'fa-money-bill-wave',
            gradient: 'from-green-400 to-emerald-600',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800'
        },
        {
            id: 'vegkielegites-2025-hu',
            slug: 'vegkielegites-szamitas-utmutato-2025',
            title: 'Végkielégítés: Számítás és Adózás',
            excerpt: 'Minden a végkielégítésről: hogyan számítják ki, mikor jár és hogyan adózik.',
            category: 'fiscal',
            categoryLabel: 'Munka',
            date: '2025. október 26.',
            readTime: '7 perc',
            icon: 'fa-piggy-bank',
            gradient: 'from-orange-400 to-red-600',
            bgColor: 'bg-orange-100',
            textColor: 'text-orange-800'
        }
    ]
};

// Funzione per ottenere articoli per lingua
function getArticlesByLanguage(lang) {
    return BLOG_ARTICLES[lang] || BLOG_ARTICLES['en'];
}

// Funzione per ottenere articolo featured
function getFeaturedArticle(lang) {
    const articles = getArticlesByLanguage(lang);
    return articles.find(article => article.featured) || articles[0];
}

// Funzione per ottenere articoli per categoria
function getArticlesByCategory(lang, category) {
    const articles = getArticlesByLanguage(lang);
    if (category === 'all') return articles;
    return articles.filter(article => article.category === category);
}

// Funzione per generare HTML articolo
function generateArticleHTML(article, featured = false) {
    if (featured) {
        return `
            <a href="${article.slug}.html" class="block bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition" data-article-category="${article.category}">
                <div class="md:flex">
                    <div class="md:w-1/3 bg-gradient-to-br ${article.gradient} p-12 flex items-center justify-center">
                        <i class="fas ${article.icon} text-white text-8xl"></i>
                    </div>
                    <div class="p-8 md:w-2/3">
                        <div class="flex items-center gap-3 mb-3 text-sm text-gray-600">
                            <span class="${article.bgColor} ${article.textColor} px-3 py-1 rounded-full font-semibold">${article.categoryLabel}</span>
                            <span><i class="far fa-calendar"></i> ${article.date}</span>
                            ${article.readTime ? `<span>•</span><span><i class="far fa-clock"></i> ${article.readTime}</span>` : ''}
                        </div>
                        <h3 class="text-3xl font-bold text-gray-900 mb-4">${article.title}</h3>
                        <p class="text-gray-600 text-lg mb-6">${article.excerpt}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-blue-600 font-semibold inline-flex items-center">
                                ${article.comingSoon ? '<span data-i18n="blog.comingSoon">Prossimamente</span>' : '<span data-i18n="blog.readArticle">Leggi l\'articolo</span> <i class="fas fa-arrow-right ml-2"></i>'}
                            </span>
                            ${article.views ? `<div class="flex items-center gap-4 text-gray-500 text-sm"><span><i class="fas fa-eye"></i> ${article.views}</span><span><i class="fas fa-comment"></i> ${article.comments}</span></div>` : ''}
                        </div>
                    </div>
                </div>
            </a>
        `;
    } else {
        return `
            <a href="${article.comingSoon ? '#' : article.slug + '.html'}" class="article-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition block ${article.comingSoon ? 'opacity-60' : ''}" data-article-category="${article.category}">
                <div class="h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center">
                    <i class="fas ${article.icon} text-white text-6xl"></i>
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-2 mb-3 text-sm text-gray-600">
                        <span class="${article.bgColor} ${article.textColor} px-3 py-1 rounded-full font-semibold">${article.categoryLabel}</span>
                        <span><i class="far fa-calendar"></i> ${article.date}</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">${article.title}</h3>
                    <p class="text-gray-600 mb-4">${article.excerpt}</p>
                    <span class="${article.comingSoon ? 'text-gray-400' : 'text-blue-600'} font-semibold ${article.comingSoon ? '' : 'inline-flex items-center'}">
                        ${article.comingSoon ? '<span data-i18n="blog.comingSoon">In arrivo...</span>' : '<span data-i18n="blog.readArticle">Leggi l\'articolo</span> <i class="fas fa-arrow-right ml-2"></i>'}
                    </span>
                </div>
            </a>
        `;
    }
}

// Funzione per renderizzare articoli
function renderBlogArticles(lang) {
    const featuredArticle = getFeaturedArticle(lang);
    const articles = getArticlesByLanguage(lang).filter(a => !a.featured);
    
    // Renderizza articolo in evidenza
    const featuredSection = document.getElementById('featuredSection');
    if (featuredSection && featuredArticle) {
        featuredSection.innerHTML = `
            <h2 class="text-2xl font-bold text-gray-800 mb-6" data-i18n="blog.featured">In Evidenza</h2>
            ${generateArticleHTML(featuredArticle, true)}
        `;
    }
    
    // Renderizza articoli normali
    const articlesGrid = document.getElementById('articlesGrid');
    if (articlesGrid) {
        articlesGrid.innerHTML = articles.map(article => generateArticleHTML(article, false)).join('');
    }
}

console.log('✅ Blog articles system loaded with multi-language support');