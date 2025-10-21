// INTERNATIONAL TRANSLATIONS
const TRANSLATIONS = {
    it: {
        // Header & Navigation
        home: "Home",
        features: "Servizi",
        tools: "Calcolatori",
        aboutUs: "Chi Siamo",
        login: "Accedi",
        register: "Registrati",
        logout: "Esci",
        
        // Hero Section
        heroTitle: "Strumenti Gratuiti per il Tuo Business",
        heroSubtitle: "Calcolatori, generatori di documenti e molto altro. Tutto gratis.",
        ctaStart: "Inizia Subito",
        ctaLearnMore: "Scopri di Più",
        
        // Stats
        statsTools: "Strumenti Gratuiti",
        statsFree: "Gratis Forever",
        statsAvailable: "Sempre Disponibile",
        
        // Tools Section
        toolsTitle: "Strumenti Disponibili",
        freeTools: "Calcolatori Gratuiti",
        freeToolsDesc: "Senza registrazione. Usa subito i nostri calcolatori!",
        invoiceGenerator: "Generatore Fatture",
        quotesGenerator: "Generatore Preventivi",
        ivaCalc: "Calcolo IVA",
        ivaCalcDesc: "Calcola velocemente l'IVA su qualsiasi importo.",
        salaryCalc: "Calcolo Stipendio Netto",
        salaryCalcDesc: "Scopri quanto guadagnerai effettivamente.",
        tfrCalc: "Calcolo TFR",
        withholdingCalc: "Calcolo Ritenuta d'Acconto",
        withholdingCalcDesc: "Calcola la ritenuta per professionisti.",
        tfrCalcDesc: "Calcola il tuo TFR maturato.",
        taxCalc: "Calcolo Tasse P.IVA",
        taxCalcDesc: "Calcola le tasse da pagare.",
        qrGenerator: "Generatore QR Code",
        qrGeneratorDesc: "Crea codici QR gratuiti.",
        corrispettiviCalc: "Corrispettivi Online",
        corrispettiviCalcDesc: "Gestisci le vendite giornaliere con calcolo IVA automatico.",
        myInvoices: "Le Mie Fatture",
        useNow: "Usa ora",

        // Testimonianze
        testimonialsTitle: "Cosa Dicono i Nostri Utenti",
        testimonialsSubtitle: "Migliaia di professionisti si fidano dei nostri strumenti ogni giorno.",
        testimonial1Text: "Il generatore di fatture mi ha salvato la vita! Semplice, veloce e professionale.",
        testimonial1Name: "Marco Rossi",
        testimonial1Role: "Graphic Designer",
        testimonial2Text: "Finalmente un sito che raccoglie tutti gli strumenti utili in un unico posto.",
        testimonial2Name: "Giulia Bianchi",
        testimonial2Role: "Impiegata",
        testimonial3Text: "Il tempo è denaro. Servizi Business mi permette di calcolare tutto al volo.",
        testimonial3Name: "Andrea Ferri",
        testimonial3Role: "Imprenditore",
        
        // Premium Services
        premiumServices: "Servizi Avanzati",
        premiumDesc: "Crea fatture e preventivi professionali",
        invoiceGenTitle: "Generatore Fatture",
        invoiceGenDesc: "Crea fatture professionali in PDF.",
        invoiceFeature1: "PDF professionale",
        invoiceFeature2: "Multi-valuta",
        invoiceFeature3: "Tutti i paesi",
        createInvoiceFree: "Crea Fattura - Gratis",
        quoteGenTitle: "Generatore Preventivi",
        quoteGenDesc: "Crea preventivi professionali in PDF.",
        quoteFeature1: "PDF professionale",
        quoteFeature2: "Validità personalizzabile",
        quoteFeature3: "Tutti i paesi",
        createQuoteFree: "Crea Preventivo - Gratis",
        
        // CTA Section
        ctaTitle: "Pronto a Semplificare il Tuo Lavoro?",
        ctaSubtitle: "Inizia subito ad usare i nostri strumenti gratuiti!",
        ctaButton: "Esplora i Calcolatori",
        
        // Footer
        footerTagline: "Strumenti gratuiti per professionisti.",
        usefulLinks: "Link Utili",
        calculators: "Calcolatori",
        services: "Servizi",
        contacts: "Contatti",
        allRightsReserved: "Tutti i diritti riservati",
        privacy: "Privacy Policy",
        terms: "Termini di Servizio",
        
        // Invoice/Quote Form
        generateInvoice: "Genera Fattura",
        generateInvoiceDesc: "Crea una fattura professionale in PDF",
        generateQuote: "Genera Preventivo",
        generateQuoteDesc: "Crea un preventivo professionale in PDF",
        invoiceData: "Dati Fattura",
        quoteData: "Dati Preventivo",
        invoiceNumber: "Numero Fattura",
        quoteNumber: "Numero Preventivo",
        issueDate: "Data Emissione",
        dueDate: "Scadenza",
        validityDays: "Validità (giorni)",
        senderData: "Dati Emittente",
        companyData: "Dati Azienda",
        clientData: "Dati Destinatario",
        companyName: "Ragione Sociale / Nome",
        vatNumber: "Partita IVA / VAT",
        address: "Indirizzo",
        city: "Città",
        zip: "CAP",
        phone: "Telefono",
        email: "Email",
        items: "Prodotti / Servizi",
        description: "Descrizione",
        quantity: "Quantità",
        unitPrice: "Prezzo Unitario",
        tax: "IVA",
        total: "Totale",
        addRow: "Aggiungi Riga",
        summary: "Riepilogo",
        subtotal: "Imponibile",
        vatTotal: "IVA",
        withholding: "Ritenuta d'acconto",
        netTotal: "Totale",
        totalQuote: "Totale Preventivo",
        generatePDF: "Genera PDF",
        sendEmail: "Invia via Email",
        reset: "Cancella Tutto",
        includeVat: "Includi IVA",
        additionalNotes: "Note Aggiuntive",
        quoteInfo: "Il preventivo non ha valore fiscale.",
        
        // VAT Calculator
        vatCalculatorTitle: "Calcolatore IVA",
        vatCalculatorSubtitle: "Calcola velocemente l'IVA",
        fromNetToGross: "Da Netto a Lordo",
        fromGrossToNet: "Da Lordo a Netto",
        netAmount: "Importo Netto",
        grossAmount: "Importo Lordo",
        vatRateLabel: "Aliquota",
        
        // Withholding Calculator
        withholdingCalculatorTitle: "Calcolo Ritenuta Fiscale",
        withholdingCalculatorSubtitle: "Calcola la ritenuta per professionisti",
        grossInvoiceAmount: "Importo Fattura Lordo",
        withholdingRate: "Aliquota Ritenuta",
        withholdingAmount: "Importo Ritenuta",
        netToReceive: "Netto da Incassare",
        
        // Salary Calculator
        salaryCalculatorTitle: "Calcolo Stipendio Netto",
        salaryCalculatorSubtitle: "Scopri quanto guadagnerai al netto",
        grossSalaryLabel: "Stipendio Lordo Annuo",
        familyDeductions: "Detrazioni Familiari",
        noDeductions: "Nessuna (Single)",
        spouseDependent: "Coniuge a carico",
        netYearlySalary: "Stipendio Netto Annuo",
        netMonthlySalary: "Stipendio Netto Mensile",
        deductionsDetail: "Dettaglio Trattenute",
        inpsContributions: "Contributi INPS",
        incomeTax: "Imposte",
        taxDeductions: "Detrazioni Fiscali",
        totalNetYearly: "Totale Netto Annuo",
        
        // TFR Calculator
        tfrCalculatorTitle: "Calcolo TFR",
        tfrCalculatorSubtitle: "Calcola il Trattamento di Fine Rapporto",
        
        // P.IVA Tax Calculator
        pivaTaxTitle: "Calcolo Tasse P.IVA",
        pivaTaxSubtitle: "Confronta Forfettario e Ordinario",
        annualRevenue: "Fatturato Annuo",
        businessCosts: "Costi Aziendali",
        activityType: "Tipo di Attività",
        flatRegime: "Regime Forfettario",
        ordinaryRegime: "Regime Ordinario",
        taxableIncome: "Reddito Imponibile",
        totalTaxes: "Totale Tasse",
        netAnnual: "Netto Annuo",
        monthly: "Mensile:",
        comparison: "Confronto",
        savingsWithFlat: "Risparmio con Forfettario",
        taxBurden: "Pressione Fiscale",
        
        // QR Generator
        qrGeneratorTitle: "Generatore QR Code",
        qrGeneratorSubtitle: "Crea codici QR gratuiti",
        qrType: "Tipo di QR Code",
        qrTypeUrl: "URL",
        qrTypeText: "Testo",
        qrTypeEmail: "Email",
        qrTypePhone: "Telefono",
        qrTypeSms: "SMS",
        qrTypeWifi: "WiFi",
        insertUrl: "Inserisci URL",
        insertText: "Inserisci Testo",
        emailRecipient: "Email Destinatario",
        emailSubject: "Oggetto (opzionale)",
        emailBody: "Messaggio (opzionale)",
        phoneNumber: "Numero di Telefono",
        smsMessage: "Messaggio",
        wifiSsid: "Nome Rete (SSID)",
        wifiPassword: "Password",
        wifiEncryption: "Tipo Sicurezza",
        wifiEncWpa: "WPA/WPA2",
        wifiEncWep: "WEP",
        wifiEncNone: "Nessuna",
        qrSize: "Dimensione QR Code",
        generateQr: "Genera QR Code",
        qrPreview: "Anteprima QR Code",
        qrPlaceholder: "Il QR code apparirà qui",
        downloadPng: "Scarica PNG",
        createNew: "Crea Nuovo",
        
        // VAT Rates by Country
        ordinaryRateDesc: "Aliquota Ordinaria",
        reducedRateDesc: "Aliquota Ridotta",
        minimumRateDesc: "Aliquota Minima",
        exemptDesc: "Esente IVA",
        
        de_standardRate: "Aliquota Standard",
        de_reducedRate: "Aliquota Ridotta",
        
        fr_standardRate: "Aliquota Standard",
        fr_intermediateRate: "Aliquota Intermedia",
        fr_reducedRate: "Aliquota Ridotta",
        fr_superReducedRate: "Aliquota Super Ridotta",
        
        es_generalRate: "Tipo General",
        es_reducedRate: "Tipo Reducido",
        es_superReducedRate: "Tipo Superreducido",
        
        gb_standardRate: "Standard Rate",
        gb_reducedRate: "Reduced Rate",
        gb_zeroRate: "Zero Rate",
        
        us_averageRate: "Sales Tax (Media)",
        us_exemptRate: "Esente",
        usSalesTaxNote: "Nota: La Sales Tax varia per stato",
        
        au_standardRate: "GST Standard",
        au_exemptRate: "GST Free",
        
        // Common
        calculate: "Calcola",
        clear: "Pulisci",
        download: "Scarica",
        save: "Salva",
        cancel: "Annulla",
        confirm: "Conferma",
        back: "Indietro",
        next: "Avanti",
        loading: "Caricamento...",
        error: "Errore",
        success: "Successo",
        warning: "Attenzione",
        info: "Info"
    },
    
    en: {
        home: "Home",
        features: "Services",
        tools: "Tools",
        aboutUs: "About Us",
        login: "Sign In",
        register: "Sign Up",
        logout: "Logout",
        
        heroTitle: "Free Tools for Your Business",
        heroSubtitle: "Calculators, document generators and much more. All free.",
        ctaStart: "Get Started",
        ctaLearnMore: "Learn More",
        
        statsTools: "Free Tools",
        statsFree: "Free Forever",
        statsAvailable: "Always Available",
        
        toolsTitle: "Available Tools",
        freeTools: "Free Calculators",
        freeToolsDesc: "No registration required. Use our calculators now!",
        ivaCalc: "VAT Calculator",
        ivaCalcDesc: "Quickly calculate VAT on any amount.",
        salaryCalc: "Net Salary Calculator",
        salaryCalcDesc: "Find out what you'll actually earn.",
        withholdingCalc: "Withholding Tax Calculator",
        withholdingCalcDesc: "Calculate withholding for professionals.",
        tfrCalc: "Severance Calculator",
        tfrCalcDesc: "Calculate your accrued severance.",
        taxCalc: "Tax Calculator",
        taxCalcDesc: "Calculate taxes to pay.",
        qrGenerator: "QR Code Generator",
        qrGeneratorDesc: "Create free QR codes.",
        corrispettiviCalc: "Daily Sales",
        corrispettiviCalcDesc: "Manage daily sales with automatic VAT calculation.",
        useNow: "Use now",
        
        testimonialsTitle: "What Our Users Say",
        testimonialsSubtitle: "Thousands of professionals trust our tools every day.",
        testimonial1Text: "The invoice generator saved my life! Simple, fast and professional.",
        testimonial1Name: "Marco Rossi",
        testimonial1Role: "Graphic Designer",
        testimonial2Text: "Finally a site that gathers all useful tools in one place.",
        testimonial2Name: "Giulia Bianchi",
        testimonial2Role: "Employee",
        testimonial3Text: "Time is money. Servizi Business allows me to calculate everything on the fly.",
        testimonial3Name: "Andrea Ferri",
        testimonial3Role: "Entrepreneur",
        
        premiumServices: "Advanced Services",
        premiumDesc: "Create professional invoices and quotes",
        invoiceGenTitle: "Invoice Generator",
        invoiceGenDesc: "Create professional PDF invoices.",
        invoiceFeature1: "Professional PDF",
        invoiceFeature2: "Multi-currency",
        invoiceFeature3: "All countries",
        createInvoiceFree: "Create Invoice - Free",
        quoteGenTitle: "Quote Generator",
        quoteGenDesc: "Create professional PDF quotes.",
        quoteFeature1: "Professional PDF",
        quoteFeature2: "Customizable validity",
        quoteFeature3: "All countries",
        createQuoteFree: "Create Quote - Free",
        
        ctaTitle: "Ready to Simplify Your Work?",
        ctaSubtitle: "Start using our free tools now!",
        ctaButton: "Explore Calculators",
        
        footerTagline: "Free tools for professionals.",
        usefulLinks: "Useful Links",
        calculators: "Calculators",
        services: "Services",
        contacts: "Contacts",
        allRightsReserved: "All rights reserved",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        
        generateInvoice: "Generate Invoice",
        generateInvoiceDesc: "Create a professional PDF invoice",
        generateQuote: "Generate Quote",
        generateQuoteDesc: "Create a professional PDF quote",
        invoiceData: "Invoice Data",
        quoteData: "Quote Data",
        invoiceNumber: "Invoice Number",
        quoteNumber: "Quote Number",
        issueDate: "Issue Date",
        dueDate: "Due Date",
        validityDays: "Validity (days)",
        senderData: "Sender Data",
        companyData: "Company Data",
        clientData: "Client Data",
        companyName: "Company Name",
        vatNumber: "VAT Number",
        address: "Address",
        city: "City",
        zip: "ZIP Code",
        phone: "Phone",
        email: "Email",
        items: "Products / Services",
        description: "Description",
        quantity: "Quantity",
        unitPrice: "Unit Price",
        tax: "Tax",
        total: "Total",
        addRow: "Add Row",
        summary: "Summary",
        subtotal: "Subtotal",
        vatTotal: "VAT",
        withholding: "Withholding Tax",
        netTotal: "Total",
        totalQuote: "Quote Total",
        generatePDF: "Generate PDF",
        sendEmail: "Send via Email",
        reset: "Clear All",
        includeVat: "Include VAT",
        additionalNotes: "Additional Notes",
        quoteInfo: "The quote has no fiscal value.",
        
        vatCalculatorTitle: "VAT Calculator",
        vatCalculatorSubtitle: "Quickly calculate VAT",
        fromNetToGross: "Net to Gross",
        fromGrossToNet: "Gross to Net",
        netAmount: "Net Amount",
        grossAmount: "Gross Amount",
        vatRateLabel: "VAT Rate",
        
        withholdingCalculatorTitle: "Withholding Tax Calculator",
        withholdingCalculatorSubtitle: "Calculate withholding for professionals",
        grossInvoiceAmount: "Gross Invoice Amount",
        withholdingRate: "Withholding Rate",
        withholdingAmount: "Withholding Amount",
        netToReceive: "Net to Receive",
        
        salaryCalculatorTitle: "Net Salary Calculator",
        salaryCalculatorSubtitle: "Find out your net income",
        grossSalaryLabel: "Gross Annual Salary",
        familyDeductions: "Family Deductions",
        noDeductions: "None (Single)",
        spouseDependent: "Dependent Spouse",
        netYearlySalary: "Net Annual Salary",
        netMonthlySalary: "Net Monthly Salary",
        deductionsDetail: "Deductions Detail",
        inpsContributions: "Social Security",
        incomeTax: "Income Tax",
        taxDeductions: "Tax Deductions",
        totalNetYearly: "Total Net Annual",
        
        tfrCalculatorTitle: "Severance Calculator",
        tfrCalculatorSubtitle: "Calculate severance pay",
        
        pivaTaxTitle: "Tax Calculator",
        pivaTaxSubtitle: "Compare tax regimes",
        annualRevenue: "Annual Revenue",
        businessCosts: "Business Costs",
        activityType: "Activity Type",
        flatRegime: "Flat Rate Regime",
        ordinaryRegime: "Ordinary Regime",
        taxableIncome: "Taxable Income",
        totalTaxes: "Total Taxes",
        netAnnual: "Net Annual",
        monthly: "Monthly:",
        comparison: "Comparison",
        savingsWithFlat: "Savings with Flat Rate",
        taxBurden: "Tax Burden",
        
        qrGeneratorTitle: "QR Code Generator",
        qrGeneratorSubtitle: "Create free QR codes",
        qrType: "QR Code Type",
        qrTypeUrl: "URL",
        qrTypeText: "Text",
        qrTypeEmail: "Email",
        qrTypePhone: "Phone",
        qrTypeSms: "SMS",
        qrTypeWifi: "WiFi",
        insertUrl: "Enter URL",
        insertText: "Enter Text",
        emailRecipient: "Recipient Email",
        emailSubject: "Subject (optional)",
        emailBody: "Message (optional)",
        phoneNumber: "Phone Number",
        smsMessage: "Message",
        wifiSsid: "Network Name (SSID)",
        wifiPassword: "Password",
        wifiEncryption: "Security Type",
        wifiEncWpa: "WPA/WPA2",
        wifiEncWep: "WEP",
        wifiEncNone: "None",
        qrSize: "QR Code Size",
        generateQr: "Generate QR Code",
        qrPreview: "QR Code Preview",
        qrPlaceholder: "QR code will appear here",
        downloadPng: "Download PNG",
        createNew: "Create New",
        
        ordinaryRateDesc: "Standard Rate",
        reducedRateDesc: "Reduced Rate",
        minimumRateDesc: "Minimum Rate",
        exemptDesc: "VAT Exempt",
        
        calculate: "Calculate",
        clear: "Clear",
        download: "Download",
        save: "Save",
        cancel: "Cancel",
        confirm: "Confirm",
        back: "Back",
        next: "Next",
        loading: "Loading...",
        error: "Error",
        success: "Success",
        warning: "Warning",
        info: "Info"
    },
    
    de: {
        home: "Startseite",
        features: "Dienste",
        tools: "Werkzeuge",
        aboutUs: "Über Uns",
        
        heroTitle: "Kostenlose Tools für Ihr Unternehmen",
        heroSubtitle: "Rechner, Dokumentengeneratoren und vieles mehr. Alles kostenlos.",
        ctaStart: "Jetzt Starten",
        ctaLearnMore: "Mehr Erfahren",
        
        statsTools: "Kostenlose Tools",
        statsFree: "Für Immer Kostenlos",
        statsAvailable: "Immer Verfügbar",
        
        freeTools: "Kostenlose Rechner",
        freeToolsDesc: "Keine Registrierung erforderlich. Nutzen Sie unsere Rechner jetzt!",
        ivaCalc: "MwSt-Rechner",
        ivaCalcDesc: "Berechnen Sie schnell die MwSt.",
        salaryCalc: "Gehaltsrechner",
        salaryCalcDesc: "Finden Sie Ihr Nettogehalt heraus.",
        qrGenerator: "QR-Code-Generator",
        qrGeneratorDesc: "Erstellen Sie kostenlose QR-Codes.",
        corrispettiviCalc: "Tagesverkäufe",
        corrispettiviCalcDesc: "Verwalten Sie tägliche Verkäufe mit automatischer MwSt-Berechnung.",
        useNow: "Jetzt verwenden",
        
        testimonialsTitle: "Was unsere Nutzer sagen",
        testimonialsSubtitle: "Tausende von Fachleuten vertrauen täglich auf unsere Tools.",
        testimonial1Text: "Der Rechnungsgenerator hat mein Leben gerettet! Einfach, schnell und professionell.",
        testimonial1Name: "Marco Rossi",
        testimonial1Role: "Grafikdesigner",
        testimonial2Text: "Endlich eine Seite, die alle nützlichen Tools an einem Ort sammelt.",
        testimonial2Name: "Giulia Bianchi",
        testimonial2Role: "Angestellte",
        testimonial3Text: "Zeit ist Geld. Servizi Business ermöglicht mir, alles im Handumdrehen zu berechnen.",
        testimonial3Name: "Andrea Ferri",
        testimonial3Role: "Unternehmer",
        
        premiumServices: "Erweiterte Dienste",
        premiumDesc: "Erstellen Sie professionelle Rechnungen und Angebote",
        invoiceGenTitle: "Rechnungsgenerator",
        invoiceGenDesc: "Erstellen Sie professionelle PDF-Rechnungen.",
        createInvoiceFree: "Rechnung Erstellen - Kostenlos",
        quoteGenTitle: "Angebotsgenerator",
        quoteGenDesc: "Erstellen Sie professionelle PDF-Angebote.",
        createQuoteFree: "Angebot Erstellen - Kostenlos",
        
        ctaTitle: "Bereit, Ihre Arbeit zu Vereinfachen?",
        ctaSubtitle: "Beginnen Sie jetzt mit unseren kostenlosen Tools!",
        ctaButton: "Rechner Erkunden",
        
        footerTagline: "Kostenlose Tools für Profis.",
        usefulLinks: "Nützliche Links",
        calculators: "Rechner",
        services: "Dienste",
        contacts: "Kontakte",
        allRightsReserved: "Alle Rechte vorbehalten",
        
        vatCalculatorTitle: "MwSt-Rechner",
        fromNetToGross: "Netto zu Brutto",
        fromGrossToNet: "Brutto zu Netto",
        netAmount: "Nettobetrag",
        grossAmount: "Bruttobetrag",
        
        generateInvoice: "Rechnung Erstellen",
        generateQuote: "Angebot Erstellen",
        invoiceNumber: "Rechnungsnummer",
        companyName: "Firmenname",
        vatNumber: "USt-IdNr",
        address: "Adresse",
        city: "Stadt",
        zip: "PLZ",
        description: "Beschreibung",
        quantity: "Menge",
        unitPrice: "Einzelpreis",
        generatePDF: "PDF Erstellen",
        
        calculate: "Berechnen",
        downloadPng: "PNG Herunterladen"
    },
    
    fr: {
        home: "Accueil",
        features: "Services",
        tools: "Outils",
        aboutUs: "À Propos",
        
        heroTitle: "Outils Gratuits pour Votre Entreprise",
        heroSubtitle: "Calculateurs, générateurs de documents et bien plus. Tout gratuit.",
        ctaStart: "Commencer",
        ctaLearnMore: "En Savoir Plus",
        
        statsTools: "Outils Gratuits",
        statsFree: "Gratuit Pour Toujours",
        statsAvailable: "Toujours Disponible",
        
        freeTools: "Calculateurs Gratuits",
        freeToolsDesc: "Pas d'inscription requise. Utilisez nos calculateurs maintenant!",
        ivaCalc: "Calculateur TVA",
        ivaCalcDesc: "Calculez rapidement la TVA.",
        salaryCalc: "Calculateur Salaire",
        salaryCalcDesc: "Découvrez votre salaire net.",
        qrGenerator: "Générateur QR Code",
        qrGeneratorDesc: "Créez des QR codes gratuits.",
        corrispettiviCalc: "Ventes Quotidiennes",
        corrispettiviCalcDesc: "Gérez les ventes quotidiennes avec calcul TVA automatique.",
        useNow: "Utiliser maintenant",
        
        testimonialsTitle: "Ce que disent nos utilisateurs",
        testimonialsSubtitle: "Des milliers de professionnels font confiance à nos outils chaque jour.",
        testimonial1Text: "Le générateur de factures m'a sauvé la vie! Simple, rapide et professionnel.",
        testimonial1Name: "Marco Rossi",
        testimonial1Role: "Graphiste",
        testimonial2Text: "Enfin un site qui rassemble tous les outils utiles en un seul endroit.",
        testimonial2Name: "Giulia Bianchi",
        testimonial2Role: "Employée",
        testimonial3Text: "Le temps c'est de l'argent. Servizi Business me permet de tout calculer rapidement.",
        testimonial3Name: "Andrea Ferri",
        testimonial3Role: "Entrepreneur",
        
        premiumServices: "Services Avancés",
        premiumDesc: "Créez des factures et devis professionnels",
        invoiceGenTitle: "Générateur de Factures",
        invoiceGenDesc: "Créez des factures PDF professionnelles.",
        createInvoiceFree: "Créer Facture - Gratuit",
        quoteGenTitle: "Générateur de Devis",
        quoteGenDesc: "Créez des devis PDF professionnels.",
        createQuoteFree: "Créer Devis - Gratuit",
        
        ctaTitle: "Prêt à Simplifier Votre Travail?",
        ctaSubtitle: "Commencez à utiliser nos outils gratuits maintenant!",
        ctaButton: "Explorer les Calculateurs",
        
        footerTagline: "Outils gratuits pour professionnels.",
        usefulLinks: "Liens Utiles",
        calculators: "Calculateurs",
        services: "Services",
        contacts: "Contacts",
        allRightsReserved: "Tous droits réservés",
        
        vatCalculatorTitle: "Calculateur TVA",
        fromNetToGross: "HT vers TTC",
        fromGrossToNet: "TTC vers HT",
        
        generateInvoice: "Créer Facture",
        generateQuote: "Créer Devis",
        companyName: "Nom Société",
        vatNumber: "Numéro TVA",
        address: "Adresse",
        city: "Ville",
        description: "Description",
        
        calculate: "Calculer"
    },
    
    es: {
        home: "Inicio",
        features: "Servicios",
        tools: "Herramientas",
        aboutUs: "Sobre Nosotros",
        
        heroTitle: "Herramientas Gratuitas para Tu Negocio",
        heroSubtitle: "Calculadoras, generadores de documentos y mucho más. Todo gratis.",
        ctaStart: "Comenzar",
        ctaLearnMore: "Saber Más",
        
        statsTools: "Herramientas Gratuitas",
        statsFree: "Gratis Para Siempre",
        statsAvailable: "Siempre Disponible",
        
        freeTools: "Calculadoras Gratuitas",
        freeToolsDesc: "Sin registro requerido. ¡Usa nuestras calculadoras ahora!",
        ivaCalc: "Calculadora IVA",
        ivaCalcDesc: "Calcula rápidamente el IVA.",
        salaryCalc: "Calculadora Salario",
        salaryCalcDesc: "Descubre tu salario neto.",
        qrGenerator: "Generador Código QR",
        qrGeneratorDesc: "Crea códigos QR gratis.",
        corrispettiviCalc: "Ventas Diarias",
        corrispettiviCalcDesc: "Gestiona ventas diarias con cálculo IVA automático.",
        useNow: "Usar ahora",
        
        testimonialsTitle: "Lo que dicen nuestros usuarios",
        testimonialsSubtitle: "Miles de profesionales confían en nuestras herramientas cada día.",
        testimonial1Text: "¡El generador de facturas me ha salvado la vida! Simple, rápido y profesional.",
        testimonial1Name: "Marco Rossi",
        testimonial1Role: "Diseñador Gráfico",
        testimonial2Text: "Por fin un sitio que reúne todas las herramientas útiles en un solo lugar.",
        testimonial2Name: "Giulia Bianchi",
        testimonial2Role: "Empleada",
        testimonial3Text: "El tiempo es oro. Servizi Business me permite calcular todo al vuelo.",
        testimonial3Name: "Andrea Ferri",
        testimonial3Role: "Empresario",
        
        premiumServices: "Servicios Avanzados",
        premiumDesc: "Crea facturas y presupuestos profesionales",
        invoiceGenTitle: "Generador de Facturas",
        invoiceGenDesc: "Crea facturas PDF profesionales.",
        createInvoiceFree: "Crear Factura - Gratis",
        quoteGenTitle: "Generador de Presupuestos",
        quoteGenDesc: "Crea presupuestos PDF profesionales.",
        createQuoteFree: "Crear Presupuesto - Gratis",
        
        ctaTitle: "¿Listo para Simplificar tu Trabajo?",
        ctaSubtitle: "¡Empieza a usar nuestras herramientas gratuitas ahora!",
        ctaButton: "Explorar Calculadoras",
        
        footerTagline: "Herramientas gratuitas para profesionales.",
        usefulLinks: "Enlaces Útiles",
        calculators: "Calculadoras",
        services: "Servicios",
        contacts: "Contactos",
        allRightsReserved: "Todos los derechos reservados",
        
        vatCalculatorTitle: "Calculadora IVA",
        
        generateInvoice: "Crear Factura",
        generateQuote: "Crear Presupuesto",
        companyName: "Nombre Empresa",
        vatNumber: "NIF/CIF",
        address: "Dirección",
        city: "Ciudad",
        
        calculate: "Calcular"
    }
};

let currentLanguage = 'it';

function detectLanguage() {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved && TRANSLATIONS[saved]) return saved;
    
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    if (TRANSLATIONS[langCode]) return langCode;
    return browserLang.startsWith('it') ? 'it' : 'en';
}

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) {
        console.warn('Language not supported:', lang);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Traduci tutti gli elementi con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (TRANSLATIONS[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = TRANSLATIONS[lang][key];
            } else {
                updateElementText(element, TRANSLATIONS[lang][key]);
            }
        }
    });
    
    // ✅ NUOVA FUNZIONE: Traduci anche i placeholder con data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (TRANSLATIONS[lang][key]) {
            element.placeholder = TRANSLATIONS[lang][key];
        }
    });
    
    // Aggiorna pulsanti lingua
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-blue-600', 'text-white');
        btn.classList.add('text-gray-700');
    });
    const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active', 'bg-blue-600', 'text-white');
        activeBtn.classList.remove('text-gray-700');
    }
    
    console.log('✅ Language set to:', lang);
}

function updateElementText(element, newText) {
    const textSpan = element.querySelector('span[data-i18n], [data-i18n]');
    
    if (textSpan && textSpan !== element) {
        textSpan.textContent = newText;
    } else if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
        element.textContent = newText;
    } else {
        for (let node of element.childNodes) {
            if (node.nodeType === 3 && node.textContent.trim()) {
                node.textContent = newText;
                return;
            }
        }
        element.textContent = newText;
    }
}

function t(key) {
    return TRANSLATIONS[currentLanguage][key] || key;
}

document.addEventListener('DOMContentLoaded', function() {
    currentLanguage = detectLanguage();
    setLanguage(currentLanguage);
});

console.log('✅ i18n system loaded');