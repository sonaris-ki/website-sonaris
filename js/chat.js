/* ═══════════════════════════════════════════════════════════════════
   CHAT – Chat logic + Sonaris Chat API (OpenAI)
   ═══════════════════════════════════════════════════════════════════ */

const CHAT_API_CONFIG = {
    endpoint: 'https://sonaris-chat-api.vercel.app/api/chat',
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
        <div class="team-section-grid team-overlay-grid">
            <div class="team-section-card" data-member="oliver">
                <img src="pics/SONARIS-Oliver_Andrees.png" alt="Oliver Andrees" class="team-photo">
                <div class="team-name" data-fs="body">Oliver Andrees</div>
                <div class="team-role" data-fs="small">Sales & Strategy</div>
                <button type="button" class="team-more-btn product-toggle" data-action="team-detail" data-target="overlay-oliver">Details</button>
            </div>
            <div class="team-section-card" data-member="lukas">
                <img src="pics/SONARIS-Lukas-Sontheimer.jpg" alt="Lukas Sontheimer" class="team-photo">
                <div class="team-name" data-fs="body">Lukas Sontheimer</div>
                <div class="team-role" data-fs="small">KI-Stratege</div>
                <button type="button" class="team-more-btn product-toggle" data-action="team-detail" data-target="overlay-lukas">Details</button>
            </div>
            <div class="team-section-card" data-member="lorenz">
                <img src="pics/SONARIS-Lorenz_Surkemper.png" alt="Lorenz Surkemper" class="team-photo">
                <div class="team-name" data-fs="body">Lorenz Surkemper</div>
                <div class="team-role" data-fs="small">Technologie-Experte</div>
                <button type="button" class="team-more-btn product-toggle" data-action="team-detail" data-target="overlay-lorenz">Details</button>
            </div>
            <div class="team-section-card" data-member="christian">
                <img src="pics/SONARIS-Christian_Pessing.png" alt="Christian Pessing" class="team-photo">
                <div class="team-name" data-fs="body">Christian Pessing</div>
                <div class="team-role" data-fs="small">Training & Coaching</div>
                <button type="button" class="team-more-btn product-toggle" data-action="team-detail" data-target="overlay-christian">Details</button>
            </div>
            <div class="team-section-card team-card--ai" data-member="elysium">
                <img src="pics/elysium.png" alt="Elysium Echo" class="team-photo team-photo--ai">
                <div class="team-ai-badge" data-fs="label">KI-Charakter</div>
                <div class="team-name" data-fs="body">Elysium Echo</div>
                <div class="team-role" data-fs="small">Head of Research & Development</div>
                <button type="button" class="team-more-btn product-toggle team-more-btn--ai" data-action="team-detail" data-target="overlay-elysium">Details</button>
            </div>
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
        <p>Remote Sourcing GmbH<br>Wilhelmstr. 15<br>31542 Bad Nenndorf</p>
        <h3>Vertreten durch</h3>
        <p>Lorenz Surkemper (Geschäftsführer)</p>
        <h3>Kontakt</h3>
        <p>Telefon: +49 (0) 5723 98390 10<br>E-Mail: <a href="mailto:lorenz@sonaris.de">lorenz@sonaris.de</a></p>
        <h3>Umsatzsteuer-ID</h3>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br>DE322588403</p>
        <h3>Registereintrag</h3>
        <p>Eintragung im Handelsregister<br>Registergericht: Amtsgericht Stadthagen<br>Registernummer: HRB 201565</p>
        <h3>Haftung für Inhalte</h3>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
        <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
        <h3>Haftung für Links</h3>
        <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
        <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
        <h3>Urheberrecht</h3>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
        <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
    `,
    datenschutz: `
        <h2>Datenschutzerklärung – sonaris.de</h2>
        <p>Wir freuen uns über Ihren Besuch auf unserer Website. Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir Sie darüber, welche personenbezogenen Daten wir bei der Nutzung unserer Website verarbeiten und zu welchen Zwecken.</p>
        <h3>1. Verantwortlicher</h3>
        <p>Remote Sourcing GmbH<br>Wilhelmstr. 15<br>31542 Bad Nenndorf<br>Telefon: +49 (0) 5723 98390 10<br>E-Mail: <a href="mailto:hallo@remotesourcing.de">hallo@remotesourcing.de</a></p>
        <h3>2. Verarbeitungen auf unserer Website</h3>
        <h4>a) Besuch der Website (Server-Logfiles)</h4>
        <p>Beim Aufruf unserer Website werden durch den Browser automatisch Informationen an unseren Server übermittelt und in Server-Logfiles verarbeitet. Dabei können insbesondere folgende Daten verarbeitet werden:</p>
        <ul>
        <li>IP-Adresse (ggf. in gekürzter Form)</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite/Datei und URL</li>
        <li>Referrer-URL</li>
        <li>Browsertyp/-version, Betriebssystem</li>
        <li>Name des Access-Providers</li>
        </ul>
        <p><strong>Zwecke:</strong> Bereitstellung der Website, Sicherstellung der Systemsicherheit und -stabilität, Fehleranalyse und Abwehr von Angriffen.</p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 S. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb).</p>
        <p><strong>Speicherdauer:</strong> Logfiles werden für 14 Tage gespeichert und danach gelöscht, sofern keine sicherheitsrelevante Ereignisaufklärung eine längere Aufbewahrung erfordert.</p>
        <h4>b) Hosting</h4>
        <p>Unsere Website wird bei der Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland, gehostet. Hetzner verarbeitet die unter Abschnitt 2a genannten Daten in unserem Auftrag. Ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO) ist abgeschlossen. Die Verarbeitung erfolgt ausschließlich in Rechenzentren innerhalb der EU/des EWR.</p>
        <h4>c) Content Delivery Network (CDN)</h4>
        <p>Zur Beschleunigung der Seitenauslieferung und zum Schutz vor Angriffen setzen wir Content-Delivery-Dienste ein:</p>
        <p><strong>Cloudflare:</strong> Cloudflare Inc., 101 Townsend St, San Francisco, CA 94107, USA (für EWR: Cloudflare London, UK). Beim Aufruf unserer Website werden Verbindungsdaten (insbesondere IP-Adresse) über Cloudflare-Server geleitet. Ein Auftragsverarbeitungsvertrag ist abgeschlossen.</p>
        <p><strong>Vercel:</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Vercel kann als Plattform für die Seitenauslieferung fungieren. Ein Auftragsverarbeitungsvertrag ist abgeschlossen.</p>
        <p><strong>Drittlandtransfer:</strong> Eine Übermittlung in die USA kann bei beiden Diensten stattfinden. Die Übermittlung erfolgt auf Grundlage von EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) sowie – soweit vorhanden – einer Zertifizierung nach dem EU-U.S. Data Privacy Framework (Art. 45 DSGVO).</p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 S. 1 lit. f DSGVO (berechtigtes Interesse an schneller und sicherer Bereitstellung der Website).</p>
        <h4>d) Google Fonts</h4>
        <p>Unsere Website nutzt Schriftarten von Google (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Beim Aufruf der Website stellt Ihr Browser eine Verbindung zu Servern von Google her, um die benötigten Schriftarten zu laden. Dabei wird Ihre IP-Adresse an Google übermittelt.</p>
        <p><strong>Drittlandtransfer:</strong> Eine Übermittlung an Google LLC in den USA kann stattfinden. Google ist nach dem EU-U.S. Data Privacy Framework zertifiziert.</p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 S. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen Darstellung der Website).</p>
        <p><strong>Hinweis:</strong> Alternativ können Google Fonts lokal eingebunden werden, wodurch keine Verbindung zu Google-Servern hergestellt wird. Sollte eine lokale Einbindung erfolgen, entfällt dieser Abschnitt.</p>
        <h4>e) Terminbuchung über HubSpot</h4>
        <p>Für die Online-Terminvereinbarung nutzen wir ein Terminbuchungs-Tool der HubSpot Inc.</p>
        <p><strong>Verarbeitete Daten (je nach Eingabe):</strong></p>
        <ul>
        <li>Name, E-Mail-Adresse</li>
        <li>Telefonnummer (falls angegeben)</li>
        <li>gewünschter Termin/Zeitraum</li>
        <li>Inhalte aus Freitextfeldern (falls vorhanden)</li>
        </ul>
        <p><strong>Zwecke:</strong> Terminvereinbarung und -verwaltung, Bearbeitung Ihrer Anfrage, Anbahnung unserer Leistungen.</p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 S. 1 lit. b DSGVO (vorvertragliche Maßnahmen).</p>
        <p><strong>Empfänger:</strong> HubSpot Inc., 25 First Street, 2nd Floor, Cambridge, MA 02141, USA.</p>
        <p><strong>Auftragsverarbeitung:</strong> Wir setzen HubSpot als Auftragsverarbeiter ein und haben hierfür eine Datenverarbeitungsvereinbarung (Art. 28 DSGVO) abgeschlossen.</p>
        <p><strong>Drittlandtransfer:</strong> Eine Übermittlung in die USA findet statt. HubSpot ist nach dem EU-U.S. Data Privacy Framework zertifiziert.</p>
        <p><strong>Weitere Informationen:</strong> <a href="https://legal.hubspot.com/privacy-policy" target="_blank" rel="noopener">https://legal.hubspot.com/privacy-policy</a></p>
        <h4>f) Kontaktaufnahme per E-Mail</h4>
        <p>Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten (z. B. E-Mail-Adresse, Name, Inhalt der Nachricht sowie ggf. weitere Kontaktdaten), um Ihre Anfrage zu bearbeiten.</p>
        <p><strong>Zwecke:</strong> Kommunikation und Bearbeitung der Anfrage.</p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 S. 1 lit. b DSGVO (vorvertragliche/vertragliche Maßnahmen) und Art. 6 Abs. 1 S. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Geschäftskommunikation).</p>
        <p><strong>Speicherdauer:</strong> Bis zur Erledigung Ihrer Anfrage; nach Abschluss der Kommunikation werden die Daten nach 6 Monaten gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten (z. B. steuer- oder handelsrechtlich) eine längere Speicherung erfordern.</p>
        <h4>g) Chatfenster auf der Website (OpenAI-API-Anbindung)</h4>
        <p>Auf unserer Website stellen wir ein Chatfenster bereit, das technisch über die API von OpenAI angebunden ist, um Anfragen zu beantworten und Informationen bereitzustellen.</p>
        <p><strong>Verarbeitete Daten:</strong></p>
        <ul>
        <li>Inhalte, die Sie im Chat eingeben (Nachrichten/Prompts)</li>
        <li>technische Metadaten zur Bereitstellung des Chats (z. B. IP-Adresse, Geräte-/Browserinformationen, Zeitstempel, Session-ID)</li>
        <li>ggf. Kontaktdaten, wenn Sie diese im Chat freiwillig angeben</li>
        </ul>
        <p><strong>Zwecke:</strong> Bereitstellung eines Website-Chats, Beantwortung von Fragen, Anbahnung von Leistungen.</p>
        <p><strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 S. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation mit Interessenten).</p>
        <p><strong>Empfänger / Dienstanbieter:</strong> OpenAI (für EWR: OpenAI Ireland Ltd., 1st Floor, The Liffey Trust Centre, 117–126 Sheriff Street Upper, Dublin 1, D01 YC43, Irland).</p>
        <p><strong>Auftragsverarbeitung:</strong> Wir setzen OpenAI als Auftragsverarbeiter ein und haben hierfür eine Datenverarbeitungsvereinbarung (Art. 28 DSGVO) abgeschlossen.</p>
        <p><strong>Drittlandtransfer:</strong> Eine Verarbeitung kann auch außerhalb des EWR (insbesondere USA) erfolgen. Die Übermittlung erfolgt auf Grundlage von EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) gemäß der Datenverarbeitungsvereinbarung.</p>
        <p><strong>Speicherung:</strong> Chat-Inhalte werden bei uns nicht dauerhaft gespeichert; die Verarbeitung erfolgt ausschließlich innerhalb der laufenden Browser-Session. Nach Schließen des Chat-Fensters werden die Inhalte auf unserer Seite nicht weiter vorgehalten. Beim Anbieter (OpenAI) können gemäß dessen vertraglichen und technischen Vorgaben befristete Speicherungen stattfinden.</p>
        <p><strong>Training/Modellverbesserung:</strong> Daten, die über die OpenAI-API übermittelt werden, werden nach Angaben von OpenAI standardmäßig nicht zum Training oder zur Verbesserung der Modelle verwendet.</p>
        <p><strong>Hinweis:</strong> Bitte geben Sie im Chat keine besonderen Kategorien personenbezogener Daten (z. B. Gesundheitsdaten) und keine vertraulichen Geschäftsinformationen ein, wenn dies nicht erforderlich ist.</p>
        <h3>3. Cookies / Local Storage</h3>
        <p>Wir verwenden ausschließlich technisch notwendige Cookies bzw. technisch notwendige Speichermechanismen (z. B. Session-Cookies, Local Storage), die erforderlich sind, um die grundlegenden Funktionen der Website bereitzustellen (z. B. Seitennavigation, Sicherheitsfunktionen, Chat-Funktion).</p>
        <p><strong>Rechtsgrundlage (Speichern/Auslesen auf dem Endgerät):</strong> § 25 Abs. 2 TDDDG (technisch erforderlich).</p>
        <p><strong>Rechtsgrundlage (nachgelagerte Datenverarbeitung):</strong> Art. 6 Abs. 1 S. 1 lit. f DSGVO (berechtigtes Interesse am technisch fehlerfreien Betrieb).</p>
        <h3>4. Weitergabe von Daten</h3>
        <p>Wir geben personenbezogene Daten nur weiter, wenn:</p>
        <ul>
        <li>dies für die Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO),</li>
        <li>eine rechtliche Verpflichtung besteht (Art. 6 Abs. 1 lit. c DSGVO), oder</li>
        <li>wir ein berechtigtes Interesse haben und kein überwiegendes Interesse der betroffenen Person entgegensteht (Art. 6 Abs. 1 lit. f DSGVO).</li>
        </ul>
        <p>Empfänger sind insbesondere die in Abschnitt 2 genannten Auftragsverarbeiter (Hetzner, Cloudflare, Vercel, HubSpot, OpenAI) sowie ggf. Google (Fonts).</p>
        <h3>5. Betroffenenrechte</h3>
        <p>Sie haben folgende Rechte gegenüber uns:</p>
        <ul>
        <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO)</li>
        <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
        <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
        <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
        <li><strong>Widerruf</strong> erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <p>Darüber hinaus haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren (Art. 77 DSGVO), insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthalts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.</p>
        <h3>6. Widerspruchsrecht (Art. 21 DSGVO)</h3>
        <p><strong>Soweit wir personenbezogene Daten auf Grundlage eines berechtigten Interesses (Art. 6 Abs. 1 S. 1 lit. f DSGVO) verarbeiten, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung einzulegen. Wir verarbeiten Ihre Daten dann nicht mehr zu diesen Zwecken, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.</strong></p>
        <p><strong>Zur Ausübung Ihres Widerspruchsrechts wenden Sie sich an die unter Abschnitt 1 genannten Kontaktdaten.</strong></p>
        <h3>7. Datensicherheit</h3>
        <p>Wir verwenden geeignete technische und organisatorische Maßnahmen, um Ihre Daten zu schützen, insbesondere TLS-/SSL-Verschlüsselung bei der Datenübertragung.</p>
        <h3>8. Aktualität und Änderungen</h3>
        <p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand März 2026. Wir passen sie an, wenn sich unsere Website, eingesetzte Dienste oder rechtliche Anforderungen ändern.</p>
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
    overlayContent.classList.toggle('overlay-content--team', page === 'team');
    overlay.classList.add('visible');
    overlayClose.classList.add('visible');
    if (page === 'contact') initContactDialog();
}

overlayContent.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.getAttribute('data-action');
    if (action === 'team-detail') {
        const detailId = target.getAttribute('data-target');
        const teamOverlay = document.getElementById(detailId);
        if (teamOverlay) {
            const inner = teamOverlay.querySelector('.team-overlay-inner');
            if (inner) {
                const clone = inner.cloneNode(true);
                const closeBtn = clone.querySelector('.team-overlay-close');
                if (closeBtn) closeBtn.remove();
                overlayContent.innerHTML = `
                    <button type="button" class="team-detail-back product-toggle" data-action="team-back">← Zurück zum Team</button>
                    <div class="team-overlay-inner team-detail-in-overlay">${clone.innerHTML}</div>
                `;
            }
        }
    } else if (action === 'team-back') {
        overlayContent.innerHTML = overlayPages.team;
    }
});

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
            const phone = document.getElementById('contact-phone').value.trim();
            const subject = encodeURIComponent('Kontaktanfrage von sonaris.de');
            const body = encodeURIComponent(`Thema: ${topic}\n\nE-Mail: ${email}\nTelefon: ${phone || '(nicht angegeben)'}`);
            window.location.href = `mailto:oliver@sonaris.de?subject=${subject}&body=${body}`;

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
    overlayContent.classList.remove('overlay-content--team');
    overlayClose.classList.remove('visible');
}

overlayClose.addEventListener('click', closeOverlay);
overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (overlayContent.querySelector('.team-detail-in-overlay')) {
        overlayContent.innerHTML = overlayPages.team;
    } else {
        closeOverlay();
    }
});

document.getElementById('denkraum-footer').addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    e.preventDefault();
    const page = link.id === 'footer-team' ? 'team' : link.id === 'footer-impressum' ? 'impressum' : link.id === 'footer-datenschutz' ? 'datenschutz' : null;
    if (page) openOverlay(page);
});
document.getElementById('footer-bottom-impressum')?.addEventListener('click', (e) => { e.preventDefault(); openOverlay('impressum'); });
document.getElementById('footer-bottom-datenschutz')?.addEventListener('click', (e) => { e.preventDefault(); openOverlay('datenschutz'); });

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
