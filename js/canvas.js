/* ═══════════════════════════════════════════════════════════════════
   CANVAS – Particle system, fragments, network, FX
   Extracted from sonaris-v4.html
   ═══════════════════════════════════════════════════════════════════ */

const mainCanvas = document.getElementById('main');
const mainCtx = mainCanvas.getContext('2d');
const fragmentsCanvas = document.getElementById('fragments');
const fragmentsCtx = fragmentsCanvas.getContext('2d');
const fxCanvas = document.getElementById('fx');
const fxCtx = fxCanvas.getContext('2d');

let width, height;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;
let time = 0;
let dwellTime = 0;
let lastMouseX = 0, lastMouseY = 0;

let lastInteractionTime = 0;
let nudgeFragmentIndex = -1;
let nudgeActive = false;
const NUDGE_DELAY = 30000;

let clickTrails = [];
let messageCount = 0;
let canvasPaused = false;

const colors = {
    blue:  { bg: {r:20,g:28,b:36}, base: {r:55,g:75,b:100}, clarity: {r:110,g:145,b:180}, highlight: {r:180,g:200,b:225}, text: {r:160,g:185,b:215} },
    red:   { bg: {r:28,g:18,b:20}, base: {r:85,g:45,b:55}, clarity: {r:160,g:85,b:95}, highlight: {r:220,g:140,b:150}, text: {r:210,g:160,b:165} },
    warm:  { bg: {r:30,g:24,b:18}, base: {r:95,g:70,b:50}, clarity: {r:170,g:125,b:85}, highlight: {r:225,g:185,b:145}, text: {r:215,g:185,b:155} },
};

let settings = {
    mood: 50,
    depthOfField: 50,
    density: 50,
    network: 50,
    soundOn: false,
};

let params = {
    breathSpeed: 1,
    movementIntensity: 1.8,
    parallaxStrength: 1,
    fragmentVisibility: 1,
    fragmentSize: 1,
    networkIntensity: 1,
    targetParticleCount: 800,
};

function recalcParams() {
    const m = settings.mood / 100;
    const d = settings.depthOfField / 100;
    const n = settings.network / 100;
    const dens = settings.density / 100;

    params.breathSpeed = 0.4 + m * 1.8;
    params.movementIntensity = 0.6 + m * 2.4;
    params.parallaxStrength = 0.1 + d * 1.8;
    params.targetParticleCount = Math.round(200 + dens * 1000);
    params.networkIntensity = n * 2;
    params.fragmentVisibility = 1;
    params.fragmentSize = 1;
}

function lerp(a, b, t) { return a + (b - a) * t; }
function getHighlightColor() { return colors.blue.highlight; }
function getTextColor()      { return colors.blue.text; }
function getBgColor()        { return colors.blue.bg; }
function getBaseColor()      { return colors.blue.base; }

// ── All 20 concept fragments ──────────────────────────────────────

const allFragmentData = [
    { text: 'Selbstermächtigung', explanation: 'Du triffst Entscheidungen, die wirklich von dir kommen.', question: 'Wie treffe ich Entscheidungen, die wirklich meine eigenen sind?', hasCTA: false },
    { text: 'Denkpartner', explanation: 'Ein Gegenüber, das mitdenkt – jederzeit, ohne Agenda.', question: 'Wie finde ich einen Denkpartner, der mitdenkt – ohne eigene Agenda?', hasCTA: false },
    { text: 'Führung', explanation: 'Deine Haltung wird sichtbar, bevor du ein Wort sagst.', question: 'Was macht Führung in der KI-Ära aus?', hasCTA: false },
    { text: 'Klarheit', explanation: 'Du weißt, was zählt – und warum.', question: 'Wie komme ich schneller zu Klarheit bei komplexen Entscheidungen?', hasCTA: false },
    { text: 'Tempo', explanation: 'Deine besten Gedanken kommen schneller zum Einsatz.', question: 'Wie bringe ich meine besten Gedanken schneller in die Umsetzung?', hasCTA: false },
    { text: 'Entscheidung', explanation: 'Du entscheidest auf Basis von dem, was du wirklich weißt.', question: 'Wie kann KI mir helfen, besser zu entscheiden?', hasCTA: false },
    { text: 'Delegation', explanation: 'Du übergibst mit Vertrauen – und behältst den Überblick.', question: 'Wie delegiere ich besser und behalte trotzdem den Überblick?', hasCTA: false },
    { text: 'Wirksamkeit', explanation: 'Was du tust, hinterlässt Spuren, die du gewollt hast.', question: 'Wie werde ich in meiner Rolle wirksamer?', hasCTA: false },
    { text: 'Transformation', explanation: 'Veränderung, die von dir ausgeht – und dich weiterbringt.', question: 'Wie starte ich eine KI-Transformation, die wirklich von mir ausgeht?', hasCTA: true },
    { text: 'Kontrolle', explanation: 'Du behältst den Faden – auch wenn vieles gleichzeitig läuft.', question: 'Wie behalte ich den Überblick, wenn alles gleichzeitig passiert?', hasCTA: false },
    { text: 'Vertrauen', explanation: 'Dein Team spürt, dass du weißt, wohin es geht.', question: 'Wie schaffe ich Vertrauen in meinem Team durch KI-Kompetenz?', hasCTA: false },
    { text: 'Fokus', explanation: 'Deine Aufmerksamkeit landet dort, wo sie den größten Unterschied macht.', question: 'Wie finde ich heraus, worauf ich mich wirklich fokussieren sollte?', hasCTA: false },
    { text: 'Verantwortung', explanation: 'Du trägst sie – und KI hilft dir, ihr gerecht zu werden.', question: 'Wie hilft mir KI, meiner Verantwortung besser gerecht zu werden?', hasCTA: false },
    { text: 'Zukunft', explanation: 'Du gestaltest sie aktiv, statt auf sie zu reagieren.', question: 'Wie gestalte ich die Zukunft meines Unternehmens aktiv mit KI?', hasCTA: false },
    { text: 'Kompetenz', explanation: 'Deine Erfahrung verbindet sich mit neuen Möglichkeiten.', question: 'Wie verbinde ich meine Erfahrung mit den Möglichkeiten von KI?', hasCTA: false },
    { text: 'Orientierung', explanation: 'Du weißt, wo du stehst – und was als nächstes kommt.', question: 'Wo stehe ich mit KI – und was wäre ein guter nächster Schritt?', hasCTA: true },
    { text: 'Eigenständigkeit', explanation: 'Du bleibst Herr deiner Werkzeuge.', question: 'Wie nutze ich KI eigenständig, ohne von Dienstleistern abhängig zu sein?', hasCTA: false },
    { text: 'Haltung', explanation: 'Deine Überzeugungen prägen, wie KI bei dir wirkt.', question: 'Welche Haltung brauche ich, damit KI bei mir wirklich wirkt?', hasCTA: false },
    { text: 'Souveränität', explanation: 'Du nutzt KI aus einer Position der Stärke.', question: 'Wie nutze ich KI souverän – ohne mich davon treiben zu lassen?', hasCTA: false },
    { text: 'Anfang', explanation: 'Der erste Schritt gehört dir – und er ist kleiner als gedacht.', question: 'Was ist ein guter erster Schritt, um KI für mich zu nutzen?', hasCTA: true },
];

const botReplies = {
    'Selbstermächtigung': 'KI-Selbstermächtigung heißt: Du bleibst der Entscheider. KI gibt dir Werkzeuge für mehr Klarheit und Tempo. Was würde sich ändern, wenn du KI als Denkpartner hättest?',
    'Denkpartner': 'Ein KI-Denkpartner erledigt keine Aufgaben – er schärft deine Gedanken. Jede strategische Überlegung sofort durchspielbar. Willst du das einmal erleben?',
    'Führung': 'Führung heißt: verstehen, was möglich ist, und die Richtung vorgeben. Dafür musst du KI nicht programmieren – du musst sie denken können. Wie gehst du damit heute um?',
    'Klarheit': 'Klarheit entsteht durch die richtigen Fragen – und schnelle, belastbare Antworten. KI beschleunigt diesen Prozess massiv. Was ist gerade dein dringlichstes Thema?',
    'Tempo': 'Zwischen Gedanke und Umsetzung liegen oft zu viele Schleifen. KI verkürzt diesen Weg drastisch. Was bremst dich gerade am meisten?',
    'Entscheidung': 'KI liefert dir in Minuten, wofür du sonst Tage brauchst: Recherche, Analyse, Szenarien. Welche Entscheidung steht bei dir gerade an?',
    'Delegation': 'Delegation funktioniert besser mit Überblick. KI hilft dir, schneller zu prüfen und Zusammenhänge zu erkennen. Wo fällt dir Loslassen schwer?',
    'Wirksamkeit': 'Wirksamkeit heißt: weniger sortieren, mehr gestalten. KI schafft Raum für das, was wirklich zählt. Was wäre dein erster Anwendungsfall?',
    'Transformation': 'Transformation beginnt mit einem konkreten Moment. 90 Minuten, ein Anwendungsfall aus deinem Alltag. Das ist unser KI-Kickstart.',
    'Kontrolle': 'KI hilft dir, komplexe Situationen schneller zu durchdringen – ohne dich in Details zu verlieren. Was beschäftigt dich dabei am meisten?',
    'Vertrauen': 'Vertrauen entsteht, wenn dein Team sieht, dass du die Richtung kennst. KI hilft dir, schneller und fundierter zu kommunizieren. Wie setzt du heute Impulse?',
    'Fokus': 'KI filtert aus der Informationsflut das Wesentliche – damit deine Aufmerksamkeit dort landet, wo sie zählt. Wo verlierst du aktuell am meisten Zeit?',
    'Verantwortung': 'Verantwortung lässt sich nicht delegieren – aber du kannst dir Werkzeuge schaffen, die helfen. Genau da setzt Sonaris an. Was ist deine größte Verantwortung gerade?',
    'Zukunft': 'KI ist kein Autopilot – sie ist ein Beschleuniger für dein Denken. Wie blickst du auf die nächsten 12 Monate?',
    'Kompetenz': 'Deine Erfahrung ist dein größtes Asset. KI macht sie nicht überflüssig – sie erweitert, was du damit tun kannst. Welche Kompetenz würdest du gern verstärken?',
    'Orientierung': 'KI kann dein persönliches Radar sein – für Markt, Team und Strategie. Was fehlt dir gerade an Überblick?',
    'Eigenständigkeit': 'Eigenständigkeit heißt: du verstehst deine Werkzeuge. Sonaris zeigt dir, wie du KI selbst nutzt – souverän und kompetent. Wo möchtest du unabhängiger werden?',
    'Haltung': 'Haltung entscheidet, ob KI Mehrwert schafft oder Komplexität. Wir helfen dir, eine fundierte Position zu entwickeln. Was ist deine aktuelle Haltung zum Thema?',
    'Souveränität': 'Souveränität heißt: du nutzt KI, weil du es willst – kein Hype, kein Druck. Wie souverän fühlst du dich aktuell im Umgang mit KI?',
    'Anfang': '90 Minuten, ein konkreter Anwendungsfall aus deinem Alltag, und du erlebst, was möglich ist. Das ist unser KI-Kickstart.',
};

const ctaTopics = new Set(['Transformation', 'Orientierung', 'Anfang']);

const VISIBLE_COUNT = 6;
const ROTATION_INTERVAL = 16000;

let fragments = [];
let poolIndices = [];
let hoveredFragment = null;
let lastRotation = 0;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function makeFragment(dataIndex) {
    const d = allFragmentData[dataIndex];
    return {
        dataIndex, text: d.text, explanation: d.explanation, question: d.question,
        depth: 0.4 + Math.random() * 0.6,
        x: 0.08 + Math.random() * 0.84, y: 0.06 + Math.random() * 0.68,
        baseX: 0, baseY: 0, currentX: 0, currentY: 0,
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: 0.18 + Math.random() * 0.25,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.4 + Math.random() * 0.6,
        visibility: 0, targetVisibility: 0,
        fadingOut: false, frozen: false, clickFlash: 0,
    };
}

function initFragments() {
    const order = shuffle([...Array(allFragmentData.length).keys()]);
    const active = order.slice(0, VISIBLE_COUNT);
    poolIndices = order.slice(VISIBLE_COUNT);
    fragments = active.map(i => {
        const f = makeFragment(i);
        f.baseX = f.x * width;
        f.baseY = f.y * height;
        return f;
    });
}

function rotateSingleFragment() {
    if (poolIndices.length === 0) return;
    const candidates = fragments.filter(f => !f.frozen && !f.fadingOut);
    if (candidates.length === 0) return;
    const outFrag = candidates[Math.floor(Math.random() * candidates.length)];
    outFrag.fadingOut = true;
    setTimeout(() => {
        const newIndex = poolIndices.shift();
        poolIndices.push(outFrag.dataIndex);
        const idx = fragments.indexOf(outFrag);
        if (idx === -1) return;
        const f = makeFragment(newIndex);
        f.baseX = f.x * width;
        f.baseY = f.y * height;
        fragments[idx] = f;
    }, 1200);
}

// ── Particles ─────────────────────────────────────────────────────

let particles = [];

function initParticles() {
    const count = params.targetParticleCount;
    if (particles.length > count) particles.length = count;
    while (particles.length < count) {
        const depth = 0.2 + Math.random() * 0.8;
        particles.push({
            x: Math.random() * width, y: Math.random() * height, depth,
            size: 2 + depth * 4, phase: Math.random() * Math.PI * 2,
            speedX: (Math.random() - 0.5) * 0.3, speedY: (Math.random() - 0.5) * 0.3,
            orbitRadius: 10 + Math.random() * 30, orbitSpeed: 0.2 + Math.random() * 0.5,
            opacity: 0.15 + depth * 0.3, calm: 0,
        });
    }
}

// ── Resize ────────────────────────────────────────────────────────

function resize() {
    width  = mainCanvas.width  = fragmentsCanvas.width  = fxCanvas.width  = window.innerWidth;
    height = mainCanvas.height = fragmentsCanvas.height = fxCanvas.height = window.innerHeight;
    if (!targetMouseX) { targetMouseX = width / 2; targetMouseY = height / 2; }
    mouseX = width / 2;
    mouseY = height / 2;
    initParticles();
    initFragments();
}
window.addEventListener('resize', resize);

// ── Mouse & Touch ─────────────────────────────────────────────────

document.addEventListener('mousemove', e => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
    lastInteractionTime = performance.now();
    nudgeActive = false;
});
document.addEventListener('mouseleave', () => { targetMouseX = width / 2; targetMouseY = height / 2; });

document.addEventListener('touchmove', e => {
    if (e.target.closest('#denkraum-layer')) {
        e.preventDefault();
        targetMouseX = e.touches[0].clientX;
        targetMouseY = e.touches[0].clientY;
        lastInteractionTime = performance.now();
        nudgeActive = false;
    }
}, { passive: false });
document.addEventListener('touchend', () => { targetMouseX = width / 2; targetMouseY = height / 2; });

// ── Click trail FX ────────────────────────────────────────────────

function spawnClickTrail(fromX, fromY) {
    const chatPanel = document.getElementById('chat-panel');
    const rect = chatPanel.getBoundingClientRect();
    const toX = rect.left + rect.width / 2;
    const toY = rect.top + 10;
    const count = 12;
    for (let i = 0; i < count; i++) {
        const delay = i * 0.06;
        const spread = 20;
        clickTrails.push({
            x: fromX + (Math.random() - 0.5) * spread,
            y: fromY + (Math.random() - 0.5) * spread,
            toX: toX + (Math.random() - 0.5) * 40, toY: toY,
            progress: -delay, speed: 0.025 + Math.random() * 0.015,
            size: 2 + Math.random() * 3, alpha: 0.8,
        });
    }
}

function updateClickTrails() {
    for (let i = clickTrails.length - 1; i >= 0; i--) {
        clickTrails[i].progress += clickTrails[i].speed;
        if (clickTrails[i].progress > 1.2) clickTrails.splice(i, 1);
    }
}

function drawClickTrails() {
    fxCtx.clearRect(0, 0, width, height);
    const hl = getHighlightColor();
    clickTrails.forEach(t => {
        if (t.progress < 0) return;
        const p = Math.min(t.progress, 1);
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        const x = lerp(t.x, t.toX, ease);
        const y = lerp(t.y, t.toY, ease);
        const alpha = t.alpha * (1 - p);
        const size = t.size * (1 - p * 0.5);
        fxCtx.beginPath();
        fxCtx.arc(x, y, size, 0, Math.PI * 2);
        fxCtx.fillStyle = `rgba(${hl.r},${hl.g},${hl.b},${alpha})`;
        fxCtx.fill();
    });
}

// ── Update particles ──────────────────────────────────────────────

function updateParticles() {
    const mi = params.movementIntensity;
    const ps = params.parallaxStrength;

    particles.forEach(p => {
        const parallaxFactor = (1 - p.depth) * ps * 35;
        const offsetX = (mouseX - width / 2) / width * parallaxFactor;
        const offsetY = (mouseY - height / 2) / height * parallaxFactor;
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 300);
        p.calm += (influence - p.calm) * 0.05;
        const orbitX = Math.cos(time * p.orbitSpeed + p.phase) * p.orbitRadius * mi;
        const orbitY = Math.sin(time * p.orbitSpeed * 0.7 + p.phase) * p.orbitRadius * mi;
        p.x += p.speedX * mi + orbitX * 0.01;
        p.y += p.speedY * mi + orbitY * 0.01;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        p.displayX = p.x + offsetX;
        p.displayY = p.y + offsetY;
    });
}

// ── Update fragments ──────────────────────────────────────────────

const fragmentTooltip = document.getElementById('fragment-tooltip');

function updateFragments(now) {
    if (now - lastRotation > ROTATION_INTERVAL) {
        lastRotation = now;
        rotateSingleFragment();
    }

    if (!nudgeActive && now - lastInteractionTime > NUDGE_DELAY && fragments.length > 0) {
        const eligible = fragments.filter(f => !f.fadingOut);
        if (eligible.length > 0) {
            nudgeFragmentIndex = fragments.indexOf(eligible[Math.floor(Math.random() * eligible.length)]);
            nudgeActive = true;
        }
    }

    const attentionRadius = 220;
    const ps = params.parallaxStrength;
    let closestFragment = null;
    let closestDist = Infinity;

    fragments.forEach((f, idx) => {
        if (f.fadingOut) { f.visibility = Math.max(0, f.visibility - 0.025); return; }

        const parallaxFactor = (1 - f.depth) * ps * 45;
        const offsetX = (mouseX - width / 2) / width * parallaxFactor;
        const offsetY = (mouseY - height / 2) / height * parallaxFactor;
        const driftX = Math.sin(time * f.driftSpeed + f.driftPhase) * 18 * f.depth;
        const driftY = Math.cos(time * f.driftSpeed * 0.7 + f.driftPhase) * 18 * f.depth;

        f.currentX = f.baseX + driftX + offsetX;
        f.currentY = f.baseY + driftY + offsetY;

        const dx = f.currentX - mouseX;
        const dy = f.currentY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pulse = Math.sin(time * f.pulseSpeed + f.pulsePhase);
        const pulseBoost = 0.04 + pulse * 0.04;
        const isNudged = nudgeActive && idx === nudgeFragmentIndex;
        const nudgeBoost = isNudged ? 0.12 + Math.sin(time * 1.2) * 0.08 : 0;

        if (f.frozen) {
            f.targetVisibility = 1.0;
        } else {
            const proximity = Math.max(0, 1 - dist / attentionRadius);
            f.targetVisibility = pulseBoost + nudgeBoost + proximity * proximity * (0.5 + dwellTime * 0.42);
        }

        f.visibility += (f.targetVisibility - f.visibility) * 0.05;
        if (f.clickFlash > 0) f.clickFlash *= 0.92;

        if (f.visibility > 0.25 && dist < closestDist) {
            closestDist = dist;
            closestFragment = f;
        }
    });

    fragments.forEach(f => { f.frozen = false; });

    if (closestFragment && closestDist < 90) {
        hoveredFragment = closestFragment;
        closestFragment.frozen = true;
        fragmentTooltip.textContent = closestFragment.explanation;
        let tooltipX = closestFragment.currentX - 120;
        let tooltipY = closestFragment.currentY + 38;
        tooltipX = Math.max(8, Math.min(tooltipX, width - 280));
        tooltipY = Math.min(tooltipY, height - 80);
        fragmentTooltip.style.left = tooltipX + 'px';
        fragmentTooltip.style.top  = tooltipY + 'px';
        fragmentTooltip.classList.add('visible');
        mainCanvas.style.cursor = 'pointer';
    } else {
        hoveredFragment = null;
        fragmentTooltip.classList.remove('visible');
        mainCanvas.style.cursor = 'default';
    }
}

// ── Draw particles + vignette ─────────────────────────────────────

function drawMain() {
    const bg = getBgColor();
    const moodBright = settings.mood / 100;
    const bgR = bg.r + moodBright * 4;
    const bgG = bg.g + moodBright * 3;
    const bgB = bg.b + moodBright * 2;
    mainCtx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
    mainCtx.fillRect(0, 0, width, height);

    const highlight = getHighlightColor();
    const base = getBaseColor();

    particles.forEach(p => {
        const depthFactor = 0.5 + p.depth * 0.5;
        const r = lerp(base.r, highlight.r, p.calm) * depthFactor;
        const g = lerp(base.g, highlight.g, p.calm) * depthFactor;
        const b = lerp(base.b, highlight.b, p.calm) * depthFactor;
        const alpha = (p.opacity + p.calm * 0.2) * depthFactor;
        const size = p.size * (1 - p.calm * 0.3);
        mainCtx.beginPath();
        mainCtx.arc(p.displayX, p.displayY, size, 0, Math.PI * 2);
        mainCtx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        mainCtx.fill();
    });

    const vignette = mainCtx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.3,
        width / 2, height / 2, Math.max(width, height) * 0.7
    );
    vignette.addColorStop(0, `rgba(${bg.r},${bg.g},${bg.b},0)`);
    vignette.addColorStop(1, `rgba(${bg.r},${bg.g},${bg.b},0.45)`);
    mainCtx.fillStyle = vignette;
    mainCtx.fillRect(0, 0, width, height);
}

// ── Draw fragments + network lines ────────────────────────────────

function drawFragments() {
    fragmentsCtx.clearRect(0, 0, width, height);
    const textColor = getTextColor();
    const highlight = getHighlightColor();

    const visible = fragments.filter(f => f.visibility > 0.1);
    for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
            const f1 = visible[i], f2 = visible[j];
            const dx = f2.currentX - f1.currentX;
            const dy = f2.currentY - f1.currentY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const distFactor = Math.max(0, 1 - dist / 550);
            const linePhase = (i * 7 + j * 13) * 0.1;
            const pulse = 0.5 + 0.5 * Math.sin(time * 2 + linePhase);
            const alpha = distFactor * (0.06 + pulse * 0.1) * params.networkIntensity * Math.min(f1.visibility, f2.visibility);
            if (alpha < 0.01) continue;
            const avgDepth = (f1.depth + f2.depth) / 2;
            const r = lerp(textColor.r, highlight.r, avgDepth * 0.5);
            const g = lerp(textColor.g, highlight.g, avgDepth * 0.5);
            const b = lerp(textColor.b, highlight.b, avgDepth * 0.5);
            fragmentsCtx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            fragmentsCtx.lineWidth = 0.5 + pulse * 0.8;
            fragmentsCtx.beginPath();
            fragmentsCtx.moveTo(f1.currentX, f1.currentY);
            fragmentsCtx.lineTo(f2.currentX, f2.currentY);
            fragmentsCtx.stroke();
        }
    }

    const sorted = [...fragments].sort((a, b) => a.depth - b.depth);
    sorted.forEach(f => {
        const vis = f.visibility * params.fragmentVisibility;
        if (vis < 0.02) return;

        const isHovered = hoveredFragment === f;
        const depthScale = 0.65 + f.depth * 0.55;
        const fontSize = (22 + vis * 10) * depthScale * params.fragmentSize;

        fragmentsCtx.font = `${300 + vis * 200} ${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
        fragmentsCtx.textAlign = 'center';
        fragmentsCtx.textBaseline = 'middle';

        const depthDim = 0.45 + f.depth * 0.55;
        const flashBoost = f.clickFlash * 0.5;
        const r = lerp(textColor.r * 0.25 * depthDim, textColor.r * depthDim, vis) + flashBoost * highlight.r;
        const g = lerp(textColor.g * 0.25 * depthDim, textColor.g * depthDim, vis) + flashBoost * highlight.g;
        const b = lerp(textColor.b * 0.25 * depthDim, textColor.b * depthDim, vis) + flashBoost * highlight.b;

        const glowStrength = isHovered ? 0.7 : f.clickFlash > 0.1 ? f.clickFlash : (vis > 0.5 ? (vis - 0.5) * 0.3 : 0);

        if (glowStrength > 0.01) {
            fragmentsCtx.shadowColor = `rgba(${highlight.r},${highlight.g},${highlight.b},${glowStrength})`;
            fragmentsCtx.shadowBlur = isHovered ? 32 : 20 + f.clickFlash * 40;
        } else {
            fragmentsCtx.shadowColor = 'transparent';
            fragmentsCtx.shadowBlur = 0;
        }

        fragmentsCtx.fillStyle = `rgba(${Math.min(255,r)},${Math.min(255,g)},${Math.min(255,b)},${vis * 0.92})`;
        fragmentsCtx.fillText(f.text, f.currentX, f.currentY);
    });

    fragmentsCtx.shadowColor = 'transparent';
    fragmentsCtx.shadowBlur = 0;
}

// ── Main loop ─────────────────────────────────────────────────────

function draw(now) {
    if (canvasPaused) {
        requestAnimationFrame(draw);
        return;
    }

    time += 0.008 * params.breathSpeed;
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;

    const moveDist = Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY);
    dwellTime = moveDist < 5 ? Math.min(dwellTime + 0.015, 1) : Math.max(dwellTime - 0.025, 0);
    lastMouseX = mouseX;
    lastMouseY = mouseY;

    if (particles.length !== params.targetParticleCount) {
        const diff = params.targetParticleCount - particles.length;
        const step = Math.sign(diff) * Math.min(Math.abs(diff), 5);
        if (step > 0) {
            for (let i = 0; i < step; i++) {
                const depth = 0.2 + Math.random() * 0.8;
                particles.push({
                    x: Math.random() * width, y: Math.random() * height, depth,
                    size: 2 + depth * 4, phase: Math.random() * Math.PI * 2,
                    speedX: (Math.random() - 0.5) * 0.3, speedY: (Math.random() - 0.5) * 0.3,
                    orbitRadius: 10 + Math.random() * 30, orbitSpeed: 0.2 + Math.random() * 0.5,
                    opacity: 0.15 + depth * 0.3, calm: 0,
                });
            }
        } else {
            particles.length = Math.max(0, particles.length + step);
        }
    }

    updateParticles();
    updateFragments(now);
    updateClickTrails();
    drawMain();
    drawFragments();
    drawClickTrails();
    requestAnimationFrame(draw);
}

// ── Fragment click → chat ─────────────────────────────────────────

function triggerFragmentClick(fragment) {
    if (!fragment) return;
    fragment.clickFlash = 1;
    spawnClickTrail(fragment.currentX, fragment.currentY);
    playClickSound();
    fragmentTooltip.classList.remove('visible');
    setTimeout(() => {
        const question = fragment.question;
        appendMessage(question, 'user');
        triggerBotReply(fragment.text);
    }, 500);
    lastInteractionTime = performance.now();
    nudgeActive = false;
}

mainCanvas.addEventListener('click', () => {
    if (hoveredFragment) triggerFragmentClick(hoveredFragment);
});
mainCanvas.addEventListener('touchstart', () => {
    if (hoveredFragment) triggerFragmentClick(hoveredFragment);
});

// ── Ambient Sound ─────────────────────────────────────────────────

let audioCtx = null;
let ambientNodes = null;

function createAmbientSound() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const master = audioCtx.createGain();
    master.gain.value = 0;
    master.connect(audioCtx.destination);

    const osc1 = audioCtx.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = 110;
    const gain1 = audioCtx.createGain(); gain1.gain.value = 0.08;
    osc1.connect(gain1); gain1.connect(master);

    const osc2 = audioCtx.createOscillator(); osc2.type = 'sine'; osc2.frequency.value = 164.81;
    const gain2 = audioCtx.createGain(); gain2.gain.value = 0.05;
    osc2.connect(gain2); gain2.connect(master);

    const osc3 = audioCtx.createOscillator(); osc3.type = 'sine'; osc3.frequency.value = 220;
    const gain3 = audioCtx.createGain(); gain3.gain.value = 0.03;
    osc3.connect(gain3); gain3.connect(master);

    const lfo = audioCtx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.08;
    const lfoGain = audioCtx.createGain(); lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain); lfoGain.connect(master.gain);

    osc1.start(); osc2.start(); osc3.start(); lfo.start();
    ambientNodes = { master, osc1, osc2, osc3, lfo };
}

function toggleSound(on) {
    if (on) {
        createAmbientSound();
        ambientNodes.master.gain.cancelScheduledValues(audioCtx.currentTime);
        ambientNodes.master.gain.setValueAtTime(ambientNodes.master.gain.value, audioCtx.currentTime);
        ambientNodes.master.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 1.5);
    } else if (ambientNodes) {
        ambientNodes.master.gain.cancelScheduledValues(audioCtx.currentTime);
        ambientNodes.master.gain.setValueAtTime(ambientNodes.master.gain.value, audioCtx.currentTime);
        ambientNodes.master.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.0);
    }
}

function playClickSound() {
    if (!settings.soundOn || !audioCtx) return;
    const osc = audioCtx.createOscillator(); osc.type = 'sine'; osc.frequency.value = 880;
    const env = audioCtx.createGain(); env.gain.value = 0.06;
    env.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    osc.connect(env); env.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.15);
}

function playCrashSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const sweep = ctx.createOscillator(); sweep.type = 'sawtooth';
    sweep.frequency.setValueAtTime(800, ctx.currentTime);
    sweep.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.0);
    const sweepGain = ctx.createGain();
    sweepGain.gain.setValueAtTime(0.12, ctx.currentTime);
    sweepGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    sweep.connect(sweepGain); sweepGain.connect(ctx.destination);
    sweep.start(); sweep.stop(ctx.currentTime + 1.2);

    const bufferSize = ctx.sampleRate * 0.8;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    const noise = ctx.createBufferSource(); noise.buffer = noiseBuffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    const lpf = ctx.createBiquadFilter(); lpf.type = 'lowpass';
    lpf.frequency.setValueAtTime(2000, ctx.currentTime);
    lpf.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.8);
    noise.connect(lpf); lpf.connect(noiseGain); noiseGain.connect(ctx.destination);
    noise.start();

    const thud = ctx.createOscillator(); thud.type = 'sine';
    thud.frequency.setValueAtTime(80, ctx.currentTime);
    thud.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.5);
    const thudGain = ctx.createGain();
    thudGain.gain.setValueAtTime(0.2, ctx.currentTime);
    thudGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    thud.connect(thudGain); thudGain.connect(ctx.destination);
    thud.start(); thud.stop(ctx.currentTime + 0.5);
}

// ── Settings UI ───────────────────────────────────────────────────

const toggle   = document.getElementById('toggle');
const controls = document.getElementById('controls');
toggle.addEventListener('click', () => controls.classList.toggle('visible'));

function moodLabel(v) { return v < 20 ? 'ruhig' : v < 40 ? 'gelassen' : v < 60 ? 'balanciert' : v < 80 ? 'lebendig' : 'dynamisch'; }
function depthLabel(v) { return v < 25 ? 'flach' : v < 50 ? 'subtil' : v < 75 ? 'mittel' : 'tief'; }
function densityLabel(v) { return v < 25 ? 'minimal' : v < 50 ? 'leicht' : v < 75 ? 'mittel' : 'dicht'; }
function networkLabel(v) { return v < 10 ? 'aus' : v < 35 ? 'dezent' : v < 65 ? 'mittel' : 'stark'; }

function bindSetting(sliderId, settingKey, labelFn) {
    const el = document.getElementById(sliderId);
    const valEl = document.getElementById(sliderId + 'Value');
    el.addEventListener('input', () => {
        settings[settingKey] = parseInt(el.value);
        if (valEl && labelFn) valEl.textContent = labelFn(settings[settingKey]);
        recalcParams();
    });
}

bindSetting('mood', 'mood', moodLabel);
bindSetting('depth', 'depthOfField', depthLabel);
bindSetting('density', 'density', densityLabel);
bindSetting('network', 'network', networkLabel);

const soundToggle = document.getElementById('sound-toggle');
soundToggle.addEventListener('click', () => {
    settings.soundOn = !settings.soundOn;
    soundToggle.classList.toggle('active', settings.soundOn);
    toggleSound(settings.soundOn);
});

// ── Easter Egg ────────────────────────────────────────────────────

let crashActive = false;
const dontPressBtn = document.getElementById('dont-press');
const crashScreen = document.getElementById('crash-screen');
const crashText = document.getElementById('crash-text');

const crashLines = [
    '> SYSTEM INTERRUPT', '> Neural network destabilized...',
    '> Attempting recovery...', '> Restoring particle matrix [████████░░] 80%',
    '> Restoring particle matrix [██████████] 100%', '> Fragment coherence: OK',
    '> Cognitive layer: STABLE', '',
    '> Alles in Ordnung. Ich bin robust.', '> Hatte ich nicht gesagt: Bitte nicht drücken?',
];

async function typeCrashLine(text, container, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = 'crash-line';
            line.style.animationDelay = '0s';
            line.innerHTML = text === '' ? '&nbsp;' : text;
            container.appendChild(line);
            resolve();
        }, delay);
    });
}

dontPressBtn.addEventListener('click', async () => {
    if (crashActive) return;
    crashActive = true;
    controls.classList.remove('visible');
    const savedSpeeds = particles.map(p => ({ speedY: p.speedY, speedX: p.speedX }));
    const savedFragmentY = fragments.map(f => f.baseY);

    playCrashSound();
    document.body.classList.add('glitching');
    particles.forEach(p => { p.speedY = 3 + Math.random() * 5; p.speedX = (Math.random() - 0.5) * 3; });
    fragments.forEach(f => { f.baseY = height + 300; });

    await new Promise(r => setTimeout(r, 1200));
    document.body.classList.remove('glitching');
    document.body.classList.add('blackout');

    await new Promise(r => setTimeout(r, 800));
    crashText.innerHTML = '';
    crashScreen.classList.add('visible');

    for (let i = 0; i < crashLines.length; i++) {
        const delay = i === 0 ? 300 : (i < 3 ? 500 : (i < 5 ? 400 : (i < 7 ? 350 : 700)));
        await typeCrashLine(crashLines[i], crashText, delay);
    }

    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor-blink';
    crashText.lastElementChild.appendChild(cursorSpan);

    await new Promise(r => setTimeout(r, 2500));
    crashScreen.classList.remove('visible');
    document.body.classList.remove('blackout');

    particles.forEach((p, i) => {
        p.speedY = savedSpeeds[i].speedY; p.speedX = savedSpeeds[i].speedX;
        p.y = Math.random() * height; p.x = Math.random() * width;
    });
    fragments.forEach((f, i) => {
        f.baseY = savedFragmentY[i] !== undefined ? savedFragmentY[i] : f.y * height;
    });

    document.body.classList.add('recovering');
    setTimeout(() => appendMessage('Alles in Ordnung. Ich bin robust. Hatte ich nicht gesagt: Bitte nicht drücken?', 'bot'), 800);
    setTimeout(() => { document.body.classList.remove('recovering'); crashActive = false; }, 3000);
});

// ── Boot ──────────────────────────────────────────────────────────

recalcParams();
resize();
lastRotation = performance.now();
lastInteractionTime = performance.now();
targetMouseX = width / 2;
targetMouseY = height / 2;
requestAnimationFrame(draw);
