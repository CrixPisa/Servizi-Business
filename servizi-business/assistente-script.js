// assistente-script.js ESTESO CON I18N
// Importa translations da i18n.js (già caricato nel HTML)

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

// Get current date info
const today = new Date();
const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
                   "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

document.getElementById('todayDate').textContent = 
    `${today.getDate()} ${monthNames[today.getMonth()]} 2025`;

// Check today's deadlines
const day = today.getDate();
let todayDeadline = "Nessuna scadenza oggi";

if (day === 16) {
    todayDeadline = "⚠️ OGGI: IVA mensile / Ritenute";
} else if (day === 30) {
    todayDeadline = "⚠️ OGGI: Possibile scadenza imposte";
}
document.getElementById('todayDeadline').textContent = todayDeadline;

// Next deadline
let nextDate = new Date(today);
nextDate.setDate(16);
if (day > 16) {
    nextDate.setMonth(today.getMonth() + 1);
}
document.getElementById('nextDeadline').textContent = 
    `16 ${monthNames[nextDate.getMonth()]} - IVA`;

// Month deadlines count
let monthCount = 1;
if (today.getMonth() === 0 || today.getMonth() === 3 || today.getMonth() === 6 || today.getMonth() === 9) {
    monthCount++;
}
document.getElementById('monthDeadlines').textContent = `${monthCount} scadenze`;

// Responses database (ITALIAN ONLY - specific to Italian tax system!)
const responses = {
    iva_mensile: `📊 <strong>IVA MENSILE</strong><br><br>
<strong>Scadenza:</strong> 16 di ogni mese<br><br>
<strong>Cosa pagare:</strong><br>
• IVA del mese precedente<br>
• Se IVA a credito puoi compensare<br><br>
<strong>Come:</strong> F24 telematico - Codice 6001<br><br>
⚠️ Se il 16 cade di sabato/domenica, slitta al lunedì.<br><br>
💡 Imposta promemoria ricorrente!`,

    iva_trimestrale: `📅 <strong>IVA TRIMESTRALE</strong><br><br>
<strong>Scadenze 2025:</strong><br>
• 16 gennaio → Q4 2024<br>
• 16 aprile → Q1 2025<br>
• 16 luglio → Q2 2025<br>
• 16 ottobre → Q3 2025<br><br>
<strong>Importante:</strong> Maggiorazione 1%<br><br>
💡 IVA mensile evita interessi!`,

    inps: `🏦 <strong>CONTRIBUTI INPS 2025</strong><br><br>
<strong>Fissi (4 rate):</strong><br>
• 16 maggio, 20 agosto<br>
• 16 novembre, 16 febbraio<br>
Circa €1.200 a rata<br><br>
<strong>Saldo/Acconto:</strong><br>
• 30 giugno, 30 novembre<br>
26,23% sul reddito<br><br>
💡 <a href="calcolo-tasse-piva.html" class="text-blue-600 underline">Calcola qui</a>`,

    acconti: `💰 <strong>ACCONTI IMPOSTE</strong><br><br>
<strong>30 giugno:</strong> 40% imposte<br>
<strong>30 novembre:</strong> 60% imposte<br><br>
<strong>Regime forfettario:</strong><br>
15% (o 5%) del reddito stimato`,

    dichiarazione: `📋 <strong>DICHIARAZIONI 2025</strong><br><br>
• <strong>30 aprile:</strong> IVA annuale<br>
• <strong>31 ottobre:</strong> Modello Redditi<br>
• <strong>31 ottobre:</strong> Modello 770<br><br>
💡 Raccogli documenti entro marzo!`,

    ritenute: `🔴 <strong>RITENUTE D'ACCONTO</strong><br><br>
<strong>Scadenza:</strong> 16 del mese successivo<br><br>
<strong>Cosa:</strong> 20% compensi professionisti<br>
<strong>Codice:</strong> 1040<br><br>
💡 <a href="calcolo-ritenuta.html" class="text-blue-600 underline">Calcola qui</a>`,

    calendario: `📅 <strong>CALENDARIO 2025</strong><br><br>
<strong>Mensile:</strong> IVA e ritenute (giorno 16)<br><br>
<strong>Trimestrale:</strong> IVA gen/apr/lug/ott<br><br>
<strong>Importante:</strong><br>
• 30 aprile: Dich. IVA<br>
• 30 giugno: Acconti + INPS<br>
• 31 ottobre: Mod. Redditi<br>
• 30 novembre: 2° acconto`
};

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';

    setTimeout(() => {
        const response = getResponse(message);
        addMessage(response, 'bot');
    }, 800);
}

function askQuestion(question) {
    userInput.value = question;
    sendMessage();
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start space-x-3' + 
                          (sender === 'user' ? ' flex-row-reverse space-x-reverse' : '');

    const avatar = document.createElement('div');
    avatar.className = 'w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 ' + 
                      (sender === 'user' ? 'bg-green-600' : 'bg-blue-600');
    avatar.innerHTML = '<i class="fas fa-' + (sender === 'user' ? 'user' : 'robot') + '"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'rounded-lg p-4 ' + 
                      (sender === 'user' ? 'bg-green-50 max-w-md' : 'bg-blue-50 max-w-lg');
    bubble.innerHTML = '<div class="text-gray-800 leading-relaxed">' + text + '</div>';

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('iva mensile') || 
        (lowerMessage.includes('iva') && lowerMessage.includes('mese'))) {
        return responses.iva_mensile;
    }

    if (lowerMessage.includes('iva trimestrale') || 
        (lowerMessage.includes('iva') && lowerMessage.includes('trimest'))) {
        return responses.iva_trimestrale;
    }

    if (lowerMessage.includes('iva')) {
        return `📊 <strong>IVA - Scegli:</strong><br><br>
1️⃣ Mensile (16 ogni mese)<br>
2️⃣ Trimestrale (16 gen/apr/lug/ott)<br><br>
Quale vuoi approfondire?`;
    }

    if (lowerMessage.includes('inps') || lowerMessage.includes('contributi')) {
        return responses.inps;
    }

    if (lowerMessage.includes('accont')) {
        return responses.acconti;
    }

    if (lowerMessage.includes('ritenuta') || lowerMessage.includes('ritenute')) {
        return responses.ritenute;
    }

    if (lowerMessage.includes('dichiarazione') || lowerMessage.includes('redditi')) {
        return responses.dichiarazione;
    }

    if (lowerMessage.includes('calendario') || lowerMessage.includes('2025')) {
        return responses.calendario;
    }

    if (lowerMessage.includes('oggi')) {
        if (day === 16) {
            return `⚠️ <strong>OGGI È IL 16!</strong><br><br>
Scadenze:<br>
• 📊 IVA mensile/trimestrale<br>
• 🔴 Ritenute d'acconto<br><br>
Paga SUBITO per evitare sanzioni!`;
        } else {
            return `📅 <strong>Oggi ${day} ${monthNames[today.getMonth()]}</strong><br><br>
Nessuna scadenza principale! ✅<br><br>
Prossima: 16 del mese`;
        }
    }

    if (lowerMessage.includes('prossim')) {
        return `⏰ <strong>PROSSIMA SCADENZA</strong><br><br>
16 ${monthNames[nextDate.getMonth()]} 2025<br><br>
• IVA mensile<br>
• Ritenute d'acconto`;
    }

    if (lowerMessage.includes('forfettario')) {
        return `📊 <strong>FORFETTARIO - SEMPLICE!</strong><br><br>
✅ NO IVA mensile/trimestrale<br>
✅ NO ritenute in uscita<br><br>
<strong>Cosa pagare:</strong><br>
• 30 giu/30 nov: Imposte 15%<br>
• INPS fissi + acconti<br>
• 31 ott: Dichiarazione<br><br>
💡 Molto più semplice!`;
    }

    return `🤔 Prova a chiedere:<br><br>
• "Quando versare IVA mensile?"<br>
• "Quando pago INPS?"<br>
• "Scadenze acconti"<br>
• "Calendario 2025"<br>
• "Cosa pago oggi?"<br><br>
O usa i bottoni qui accanto! 👉`;
}

chatMessages.scrollTop = chatMessages.scrollHeight;

// NOTE: This assistant provides information specific to Italian tax deadlines.
// The responses remain in Italian as they reference Italian tax codes and regulations.
