// tax-systems.js
// Unica fonte di verità per dati e logiche fiscali specifiche per paese.

const TAX_SYSTEMS = {
    // 🇮🇹 ITALY
    it: {
        country: "Italia",
        currency: "EUR",
        currencySymbol: "€",
        currencyPosition: "before",
        decimalSeparator: ",",
        vat: {
            name: "IVA",
            rates: [
                { value: 22, labelKey: "ordinaryRateDesc" },
                { value: 10, labelKey: "reducedRateDesc" },
                { value: 4, labelKey: "minimumRateDesc" },
                { value: 0, labelKey: "exemptDesc" }
            ]
        },
        withholding: {
            name: "Ritenuta d'Acconto",
            standardRate: 20
        },
        salary: {
            available: true,
            socialSecurityRate: 0.0919, // INPS 9.19%
            taxBrackets: [
                { limit: 28000, rate: 0.23 },
                { limit: 50000, rate: 0.35 },
                { limit: Infinity, rate: 0.43 }
            ],
            deductions: {
                base: function(gross) {
                    if (gross <= 15000) return 1955;
                    if (gross <= 28000) return 1910 + 1190 * ((28000 - gross) / 13000);
                    if (gross <= 50000) return 1910 * ((50000 - gross) / 22000);
                    return 0;
                },
                spouse: 690,
                child1: 950,
                child2: 1900
            }
        },
        tfr: {
            available: true,
            divisor: 13.5,
            revaluationRate: 0.015
        },
        pivaRegimes: {
            available: true
        }
    },
    
    // 🇩🇪 GERMANY
    de: {
        country: "Germania",
        currency: "EUR",
        currencySymbol: "€",
        currencyPosition: "after",
        decimalSeparator: ",",
        vat: {
            name: "MwSt",
            rates: [
                { value: 19, labelKey: "de_standardRate" },
                { value: 7, labelKey: "de_reducedRate" }
            ]
        },
        salary: {
            available: true,
            socialSecurityRate: 0.20, // Simplified (Pension, Health, Unemployment)
            taxBrackets: [
                { limit: 10908, rate: 0 }, // Tax-free allowance
                { limit: 62809, rate: 0.14 }, // Progressive 14-42%
                { limit: 277825, rate: 0.42 },
                { limit: Infinity, rate: 0.45 }
            ],
            deductions: {
                base: function(gross) {
                    return 1230; // Standard deduction (Werbungskostenpauschale)
                },
                spouse: 0,
                child1: 0
            }
        }
    },

    // 🇫🇷 FRANCE
    fr: {
        country: "Francia",
        currency: "EUR",
        currencySymbol: "€",
        currencyPosition: "after",
        decimalSeparator: ",",
        vat: {
            name: "TVA",
            rates: [
                { value: 20, labelKey: "fr_standardRate" },
                { value: 10, labelKey: "fr_intermediateRate" },
                { value: 5.5, labelKey: "fr_reducedRate" },
                { value: 2.1, labelKey: "fr_superReducedRate" }
            ]
        },
        salary: {
            available: true,
            socialSecurityRate: 0.22, // Employee social contributions
            taxBrackets: [
                { limit: 10777, rate: 0 },
                { limit: 27478, rate: 0.11 },
                { limit: 78570, rate: 0.30 },
                { limit: 168994, rate: 0.41 },
                { limit: Infinity, rate: 0.45 }
            ],
            deductions: {
                base: function(gross) {
                    return 0; // France uses quotient familial system
                },
                spouse: 0,
                child1: 0
            }
        }
    },

    // 🇪🇸 SPAIN
    es: {
        country: "Spagna",
        currency: "EUR",
        currencySymbol: "€",
        currencyPosition: "after",
        decimalSeparator: ",",
        vat: {
            name: "IVA",
            rates: [
                { value: 21, labelKey: "es_generalRate" },
                { value: 10, labelKey: "es_reducedRate" },
                { value: 4, labelKey: "es_superReducedRate" }
            ]
        },
        withholding: {
            name: "Retención IRPF",
            standardRate: 15
        },
        salary: {
            available: true,
            socialSecurityRate: 0.0635, // Employee SS contribution
            taxBrackets: [
                { limit: 12450, rate: 0.19 },
                { limit: 20200, rate: 0.24 },
                { limit: 35200, rate: 0.30 },
                { limit: 60000, rate: 0.37 },
                { limit: 300000, rate: 0.45 },
                { limit: Infinity, rate: 0.47 }
            ],
            deductions: {
                base: function(gross) {
                    if (gross <= 13115) return 6498;
                    if (gross <= 16825) return 6498 - ((gross - 13115) * 1.75);
                    return 0;
                },
                spouse: 0,
                child1: 2400
            }
        }
    },

    // 🇬🇧 UNITED KINGDOM
    gb: {
        country: "Regno Unito",
        currency: "GBP",
        currencySymbol: "£",
        currencyPosition: "before",
        decimalSeparator: ".",
        vat: {
            name: "VAT",
            rates: [
                { value: 20, labelKey: "gb_standardRate" },
                { value: 5, labelKey: "gb_reducedRate" },
                { value: 0, labelKey: "gb_zeroRate" }
            ]
        },
        salary: {
            available: true,
            socialSecurityRate: 0.12, // National Insurance (NI) Class 1
            taxBrackets: [
                { limit: 12570, rate: 0 }, // Personal Allowance
                { limit: 50270, rate: 0.20 }, // Basic rate
                { limit: 125140, rate: 0.40 }, // Higher rate
                { limit: Infinity, rate: 0.45 } // Additional rate
            ],
            deductions: {
                base: function(gross) {
                    return 0; // Already included in tax-free allowance
                },
                spouse: 0,
                child1: 0
            }
        }
    },

    // 🇺🇸 USA
    us: {
        country: "Stati Uniti",
        currency: "USD",
        currencySymbol: "$",
        currencyPosition: "before",
        decimalSeparator: ".",
        vat: {
            name: "Sales Tax",
            rates: [
                { value: 7.25, labelKey: "us_averageRate" },
                { value: 0, labelKey: "us_exemptRate" }
            ],
            noteKey: "usSalesTaxNote"
        },
        salary: {
            available: true,
            socialSecurityRate: 0.0765, // FICA (SS 6.2% + Medicare 1.45%)
            taxBrackets: [ // Federal tax (Single filer, 2024)
                { limit: 11600, rate: 0.10 },
                { limit: 47150, rate: 0.12 },
                { limit: 100525, rate: 0.22 },
                { limit: 191950, rate: 0.24 },
                { limit: 243725, rate: 0.32 },
                { limit: 609350, rate: 0.35 },
                { limit: Infinity, rate: 0.37 }
            ],
            deductions: {
                base: function(gross) {
                    return 13850; // Standard deduction 2024
                },
                spouse: 27700, // Married filing jointly
                child1: 0
            }
        }
    },

    // 🇦🇺 AUSTRALIA
    au: {
        country: "Australia",
        currency: "AUD",
        currencySymbol: "$",
        currencyPosition: "before",
        decimalSeparator: ".",
        vat: {
            name: "GST",
            rates: [
                { value: 10, labelKey: "au_standardRate" },
                { value: 0, labelKey: "au_exemptRate" }
            ]
        },
        salary: {
            available: true,
            socialSecurityRate: 0.105, // Superannuation (employer paid, included for reference)
            taxBrackets: [
                { limit: 18200, rate: 0 }, // Tax-free threshold
                { limit: 45000, rate: 0.19 },
                { limit: 120000, rate: 0.325 },
                { limit: 180000, rate: 0.37 },
                { limit: Infinity, rate: 0.45 }
            ],
            deductions: {
                base: function(gross) {
                    return 0;
                },
                spouse: 0,
                child1: 0
            }
        }
    }
};

// Funzioni helper
function getCurrentCountry() {
    return localStorage.getItem('selectedCountry') || 'it';
}

function setCurrentCountry(countryCode) {
    if (TAX_SYSTEMS[countryCode]) {
        localStorage.setItem('selectedCountry', countryCode);
        window.dispatchEvent(new CustomEvent('countryChanged', { detail: { country: countryCode } }));
        return true;
    }
    return false;
}

function getCurrentTaxSystem() {
    return TAX_SYSTEMS[getCurrentCountry()];
}

// CALCOLO STIPENDIO UNIVERSALE
function calculateSalary(grossSalary, familyStatus, countryCode) {
    const taxSystem = TAX_SYSTEMS[countryCode];
    if (!taxSystem || !taxSystem.salary || !taxSystem.salary.available) {
        return null;
    }

    const salary = taxSystem.salary;
    
    // 1. Contributi sociali
    const socialSecurity = grossSalary * salary.socialSecurityRate;
    
    // 2. Reddito imponibile
    let taxableIncome = grossSalary - socialSecurity;
    
    // 3. Calcolo tasse (progressivo)
    let tax = 0;
    let previousLimit = 0;
    
    for (const bracket of salary.taxBrackets) {
        if (taxableIncome > previousLimit) {
            const taxableInBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
            tax += taxableInBracket * bracket.rate;
        }
        previousLimit = bracket.limit;
        if (taxableIncome <= bracket.limit) break;
    }
    
    // 4. Detrazioni
    let deductions = 0;
    if (salary.deductions.base) {
        deductions = typeof salary.deductions.base === 'function' 
            ? salary.deductions.base(grossSalary) 
            : salary.deductions.base;
    }
    
    if (familyStatus === 'married' && salary.deductions.spouse) {
        deductions += salary.deductions.spouse;
    }
    
    // 5. Netto
    const netIncome = grossSalary - socialSecurity - tax + deductions;
    
    return {
        gross: grossSalary,
        socialSecurity: socialSecurity,
        taxableIncome: taxableIncome,
        tax: tax,
        deductions: deductions,
        net: netIncome,
        monthly: netIncome / 12
    };
}

console.log('✅ Tax Systems Database loaded');