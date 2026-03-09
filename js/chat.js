/* ═══════════════════════════════════════════════════════════════════
   CHAT – Chat logic + Sonaris Chat API (OpenAI)
   ═══════════════════════════════════════════════════════════════════ */

const CHAT_API_CONFIG = {
    endpoint: 'http://localhost:3001/api/chat',
    maxMessages: 20,
};

let sessionMessageCount = 0;
let conversationHistory = [];
let chatMode = 'denkraum'; // 'denkraum' | 'floating'
let currentSection = null;

const chatMessages = document.getElementById('chat-messages');
const chatInput    = document.getElementById('chat-input');
const chatSend     = document.getElementById('chat-send');
const chatCleanup  = document.getElementById('chat-cleanup');

function updateCleanupVisibility() {
    if (messageCount >= 2) chatCleanup.classList.add('visible');
    else chatCleanup.classList.remove('visible');
}

function appendMessage(text, role, extraHTML) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    if (extraHTML) div.innerHTML = text + extraHTML;
    else div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    messageCount++;
    sessionMessageCount++;
    updateCleanupVisibility();
    return div;
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'msg typing';
    div.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

function cleanupChat() {
    chatMessages.innerHTML = '';
    messageCount = 0;
    conversationHistory = [];
    updateCleanupVisibility();
    setTimeout(() => appendMessage('Was beschäftigt dich im Zusammenhang mit KI gerade?', 'bot'), 400);
}

chatCleanup.addEventListener('click', cleanupChat);

async function triggerBotReply(key, userText) {
    const typing = showTyping();
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 600));
    typing.remove();

    const reply = botReplies[key] || 'Lass uns das gemeinsam durchdenken – was beschäftigt dich dabei am meisten?';
    conversationHistory.push({ role: 'user', content: userText });
    conversationHistory.push({ role: 'assistant', content: reply });
    const showCTA = ctaTopics.has(key);
    const ctaHTML = showCTA
        ? '<br><a class="msg-cta" onclick="openOverlay(\'contact\')">☎ Sollen wir kurz telefonieren?</a>'
        : '';
    appendMessage(reply, 'bot', ctaHTML);
}

async function callSonarisChatAPI(history) {
    if (!CHAT_API_CONFIG.endpoint) return null;

    try {
        const response = await fetch(CHAT_API_CONFIG.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ history }),
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        return data.response || null;
    } catch (e) {
        console.warn('Sonaris Chat API error:', e);
        return null;
    }
}

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    lastInteractionTime = performance.now();
    nudgeActive = false;
    appendMessage(text, 'user');

    if (sessionMessageCount > CHAT_API_CONFIG.maxMessages) {
        appendMessage('Wir haben schon eine Weile gesprochen. Magst du lieber persönlich weitermachen?', 'bot',
            '<br><a class="msg-cta" onclick="openOverlay(\'contact\')">☎ Persönlich sprechen</a>');
        return;
    }

    const match = allFragmentData.find(d => d.text.toLowerCase() === text.toLowerCase());
    if (match) {
        triggerBotReply(match.text, text);
        return;
    }

    conversationHistory.push({ role: 'user', content: text });
    const typing = showTyping();

    const apiReply = await callSonarisChatAPI(conversationHistory);
    typing.remove();

    if (apiReply) {
        conversationHistory.push({ role: 'assistant', content: apiReply });
        let ctaHTML = '';
        const lowerReply = apiReply.toLowerCase();
        if (lowerReply.includes('espresso') || lowerReply.includes('gespräch') || lowerReply.includes('termin')) {
            ctaHTML = '<br><a class="msg-cta" href="https://meetings-eu1.hubspot.com/oliver-andrees/meeting-link-" target="_blank" rel="noopener">Virtuellen Espresso buchen</a>';
        }
        appendMessage(apiReply, 'bot', ctaHTML);
    } else {
        conversationHistory.pop();
        await new Promise(r => setTimeout(r, 500));
        if (messageCount >= 4) {
            appendMessage(
                'Lass uns das gemeinsam durchdenken – was beschäftigt dich dabei am meisten?', 'bot',
                '<br><a class="msg-cta" onclick="openOverlay(\'contact\')">☎ Persönlich sprechen</a>'
            );
        } else {
            appendMessage('Lass uns das gemeinsam durchdenken – was beschäftigt dich dabei am meisten?', 'bot');
        }
    }
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage();
    lastInteractionTime = performance.now();
    nudgeActive = false;
});

// ── Contact button ────────────────────────────────────────────────

document.getElementById('contact-btn').addEventListener('click', () => openOverlay('contact'));

// ── Welcome message ───────────────────────────────────────────────

function showWelcome() {
    setTimeout(() => appendMessage('Was beschäftigt dich im Zusammenhang mit KI gerade?', 'bot'), 800);
}

// ── Overlay system ────────────────────────────────────────────────

const overlay = document.getElementById('overlay');
const overlayContent = document.getElementById('overlay-content');
const overlayClose = document.getElementById('overlay-close');

const overlayPages = {
    team: `
        <h2>Das Team</h2>
        <p>Vier Perspektiven, ein gemeinsames Ziel: Unternehmer befähigen, KI eigenständig und souverän einzusetzen.</p>
        <div class="team-grid">
            <div class="team-card"><div class="team-initials">OA</div><div class="name">Oliver Andrees</div><div class="role">Kontaktarchitekt</div></div>
            <div class="team-card"><div class="team-initials">CP</div><div class="name">Christian Pessing</div><div class="role">Strategische Umsetzung</div></div>
            <div class="team-card"><div class="team-initials">LS</div><div class="name">Lukas Sontheimer</div><div class="role">KI-Architektur</div></div>
            <div class="team-card"><div class="team-initials">LS</div><div class="name">Lorenz Surkemper</div><div class="role">Technologie & Integration</div></div>
        </div>
    `,
    about: `
        <h2>Über Sonaris</h2>
        <p>Sonaris begleitet Geschäftsführer und Führungskräfte im Mittelstand dabei, KI als Denkwerkzeug zu verstehen und eigenständig einzusetzen.</p>
        <h3>Was wir tun</h3>
        <p>Wir starten mit einem 90-Minuten KI-Kickstart: ein konkreter Anwendungsfall aus deinem Alltag, durchgespielt mit KI. Kein Theorievortrag, kein Verkaufsgespräch – ein Erlebnis, das zeigt, was möglich ist.</p>
        <h3>Wofür wir stehen</h3>
        <p>Selbstermächtigung statt Abhängigkeit. Du lernst, KI als Denkpartner zu nutzen – für Entscheidungen, Strategie und Führung. Souverän und kompetent.</p>
        <h3>Für wen</h3>
        <p>Für Geschäftsführer und Entscheider, die KI verstehen und nutzen wollen – aus eigener Stärke heraus.</p>
    `,
    impressum: `
        <h2>Impressum</h2>
        <h3>Angaben gemäß § 5 TMG</h3>
        <p>Sonaris GbR<br>[Adresse wird ergänzt]<br>[PLZ Ort]</p>
        <h3>Vertreten durch</h3>
        <p>Oliver Andrees, Christian Pessing,<br>Lukas Sontheimer, Lorenz Surkemper</p>
        <h3>Kontakt</h3>
        <p>E-Mail: kontakt@sonaris.de</p>
        <h3>Verantwortlich für den Inhalt</h3>
        <p>Oliver Andrees</p>
    `,
    datenschutz: `
        <h2>Datenschutz</h2>
        <h3>Verantwortlicher</h3>
        <p>Sonaris GbR<br>[Adresse wird ergänzt]<br>E-Mail: kontakt@sonaris.de</p>
        <h3>Datenverarbeitung</h3>
        <p>Diese Website speichert keine personenbezogenen Daten ohne Ihre Einwilligung. Es werden keine Cookies gesetzt. Für die Nutzungsanalyse verwenden wir eine DSGVO-konforme Lösung ohne personenbezogenes Tracking.</p>
        <h3>Chat-Funktion</h3>
        <p>Nachrichten im Chat werden über Langdock (europäischer KI-Orchestrator) verarbeitet. Die Daten verbleiben auf europäischen Servern und werden nicht für Trainingszwecke verwendet.</p>
        <h3>Ihre Rechte</h3>
        <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung. Kontaktieren Sie uns unter kontakt@sonaris.de.</p>
    `,
    contact: `
        <div class="contact-dialog" id="contact-dialog">
            <div class="contact-question">Was ist gerade dein dringendstes Thema?</div>
            <div class="contact-input-wrap">
                <input type="text" id="contact-topic" placeholder="z.B. KI für mein Vertriebsteam einsetzen" />
            </div>
            <button class="contact-send" id="contact-topic-send">Absenden</button>
        </div>
    `,
};

function openOverlay(page) {
    overlayContent.innerHTML = overlayPages[page] || '';
    overlay.classList.add('visible');
    overlayClose.classList.add('visible');
    if (page === 'contact') initContactDialog();
}

function initContactDialog() {
    const dialog = document.getElementById('contact-dialog');
    const topicInput = document.getElementById('contact-topic');
    const topicSend = document.getElementById('contact-topic-send');
    if (!dialog || !topicInput || !topicSend) return;

    topicInput.focus();
    topicInput.addEventListener('keydown', e => { if (e.key === 'Enter') topicSend.click(); });

    topicSend.addEventListener('click', () => {
        const topic = topicInput.value.trim();
        if (!topic) { topicInput.focus(); return; }

        dialog.innerHTML = `
            <div class="contact-reply">Verstanden: <em>${topic}</em><br><br>Wir melden uns innerhalb von 24 Stunden bei dir.</div>
            <div class="contact-fields visible">
                <div class="contact-input-wrap"><input type="email" id="contact-email" placeholder="Deine E-Mail-Adresse" /></div>
                <div class="contact-input-wrap"><input type="tel" id="contact-phone" placeholder="Telefon (optional)" /></div>
                <button class="contact-send" id="contact-final-send">Absenden</button>
            </div>
        `;

        document.getElementById('contact-email').focus();
        document.getElementById('contact-email').addEventListener('keydown', e => {
            if (e.key === 'Enter') document.getElementById('contact-final-send').click();
        });

        document.getElementById('contact-final-send').addEventListener('click', () => {
            const email = document.getElementById('contact-email').value.trim();
            if (!email || !email.includes('@')) { document.getElementById('contact-email').focus(); return; }

            dialog.innerHTML = `
                <div class="contact-success">
                    <div class="checkmark">✓</div>
                    <p style="color: rgba(225, 185, 145, 0.92); font-size: 16px; margin-bottom: 8px;">Danke. Wir melden uns.</p>
                    <p style="color: rgba(215, 185, 155, 0.5); font-size: 13px;">Dein Thema: ${topic}</p>
                </div>
            `;
        });
    });
}

function closeOverlay() {
    overlay.classList.remove('visible');
    overlayClose.classList.remove('visible');
}

overlayClose.addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

document.getElementById('footer-team').addEventListener('click', () => openOverlay('team'));
document.getElementById('footer-about').addEventListener('click', () => openOverlay('about'));
document.getElementById('footer-impressum').addEventListener('click', () => openOverlay('impressum'));

// ── Context-aware prompts for floating chat ───────────────────────

const sectionPrompts = {
    'dsgvo': 'Haben Sie Fragen zur Datensicherheit?',
    'produkte': 'Welches Thema interessiert Sie am meisten?',
    'projekte': 'Möchten Sie wissen, wie das bei Ihnen aussehen könnte?',
    'methode': 'Fragen zur KI-Dolmetscher-Methode?',
    'ai-first': 'Neugierig auf AI-First-Selbstermächtigung?',
};

function getContextMessage() {
    if (currentSection && sectionPrompts[currentSection]) {
        return sectionPrompts[currentSection];
    }
    return 'Was beschäftigt dich im Zusammenhang mit KI gerade?';
}

// Boot welcome
showWelcome();
