# Briefing: Sonaris Website – Chat-First Interface
## Für Claude Desktop | Stand: Februar 2026

---

## 1. Kontext & Auftraggeber

**Auftraggeber:** Oliver (Gründer & Inhaber, Sonaris)
**Projekt:** Neue Website für Sonaris – kein klassischer Webauftritt, sondern ein chat-first Erlebnis.
**Kernpositionierung:** KI-First Selbstermächtigung für CEOs und Führungskräfte.

Sonaris hilft CEOs dabei, KI nicht an die IT zu delegieren, sondern selbst zu verstehen und zu nutzen – als Denkpartner, nicht als Tool. Die Methode: erst ein konkretes Werkzeug (Quick Win), dann schrittweise Transformation. Demonstration vor Erklärung.

**Wichtige Haltung:** Sonaris verkauft keine Abhängigkeit, sondern Eigenständigkeit. Der CEO bleibt Herr seiner Werkzeuge.

---

## 2. Das Konzept der Website

### Kein klassischer Webauftritt.

Die Website hat **eine primäre Interaktion**: ein Chat-Interface, das den Besucher empfängt.
Kein Hero-Text. Keine Sektionen. Keine Broschüre.

**Was sofort sichtbar ist:**
- `sonaris` oben links (Logo, kein Menü)
- Ein lebendig atmendes Partikel-Netzwerk im Hintergrund (Canvas-Animation)
- Schwebende Begriffe im Netzwerk – zunächst kaum sichtbar, leuchten beim Hover auf
- Ein Chat-Fenster im Vordergrund, offen und wartend
- Oben rechts: Badge „Assistent wird trainiert" (Transparenz über den Lernstand)

**Was bei Hover passiert:**
- Der Begriff leuchtet auf
- Ein kurzer Tooltip-Text erscheint (Hin-zu-Formulierung, kein Defizit)
- Klick auf den Begriff → füllt das Chat-Input-Feld mit dem Begriff

**Was bei längerem Verweilen passiert:**
- Die Begriffe rotieren langsam durch – immer 6 gleichzeitig sichtbar, alle ~16 Sekunden tauscht einer aus
- Die Seite wirkt lebendig, nicht statisch

---

## 3. Die 20 Begriffe mit Tooltip-Texten

Alle Texte sind Hin-zu-Formulierungen. Kein Kontrast, kein Defizit.

| Begriff | Tooltip-Text |
|---|---|
| Selbstermächtigung | Sie treffen Entscheidungen, die wirklich von Ihnen kommen. |
| Denkpartner | Ein Gegenüber, das mitdenkt – jederzeit, ohne Agenda. |
| Führung | Ihre Haltung wird sichtbar, bevor Sie ein Wort sagen. |
| Klarheit | Sie wissen, was zählt – und warum. |
| Tempo | Ihre besten Gedanken kommen schneller zum Einsatz. |
| Entscheidung | Sie entscheiden auf Basis von dem, was Sie wirklich wissen. |
| Delegation | Sie übergeben mit Vertrauen – und behalten den Überblick. |
| Wirksamkeit | Was Sie tun, hinterlässt Spuren, die Sie gewollt haben. |
| Transformation | Veränderung, die von Ihnen ausgeht – nicht über Sie hinweggeht. |
| Kontrolle | Sie behalten den Faden – auch wenn vieles gleichzeitig läuft. |
| Vertrauen | Ihr Team spürt, dass Sie wissen, wohin es geht. |
| Fokus | Ihre Aufmerksamkeit landet dort, wo sie den größten Unterschied macht. |
| Verantwortung | Sie tragen sie – und KI hilft Ihnen, ihr gerecht zu werden. |
| Zukunft | Sie gestalten sie aktiv, statt auf sie zu reagieren. |
| Kompetenz | Ihre Erfahrung verbindet sich mit neuen Möglichkeiten. |
| Orientierung | Sie wissen, wo Sie stehen – und was als nächstes kommt. |
| Eigenständigkeit | Sie bleiben Herr Ihrer Werkzeuge – nicht umgekehrt. |
| Haltung | Ihre Überzeugungen prägen, wie KI bei Ihnen wirkt. |
| Souveränität | Sie nutzen KI aus einer Position der Stärke. |
| Anfang | Der erste Schritt gehört Ihnen – und er ist kleiner als gedacht. |

---

## 4. Das bestehende HTML (sonaris-chat.html)

Eine funktionierende HTML-Datei existiert bereits. Sie enthält:

### Was bereits funktioniert:
- Canvas-Animation: Partikel-Netzwerk mit Tiefe, Atmung, Bewegung
- Alle 20 Begriffe im Pool, 6 gleichzeitig sichtbar
- Sanfte Rotation: alle ~16 Sekunden tauscht ein Begriff aus (fade out → fade in)
- Hover-Logik: Begriff friert ein, Tooltip erscheint, Glow-Effekt
- Klick auf Begriff → füllt Chat-Input-Feld
- Netzwerklinien zwischen sichtbaren Fragmenten (pulsierend)
- Chat-Interface: Nachrichten (user/bot), Tipp-Animation (3 Punkte), Enter-Taste
- Settings-Panel (unten rechts): Farbwelt (Blau/Rot/Warm), Bewegungsstärke, Atemgeschwindigkeit, Fragment-Sichtbarkeit, Fragment-Größe, Netzwerk-Intensität
- Badge „Assistent wird trainiert" mit grünem Puls-Punkt
- Logo „sonaris" oben links in Blau

### Was noch fehlt / Platzhalter:
- **Bot-Antworten:** Aktuell hartcodierte Beispielantworten für 3 Begriffe. Muss durch echte API-Anbindung ersetzt werden (Claude API oder Langdock).
- **System Prompt:** Noch nicht definiert – siehe Abschnitt 6.
- **Konversionsflüsse:** Kein Booking-Link, kein Kalender-CTA, kein HubSpot-Hook.
- **Mobile:** Noch nicht optimiert.

### Technische Details der Animation:
- Zwei überlagerte Canvas-Elemente: `#main` (Partikel) und `#fragments` (Begriffe + Linien)
- Partikel: 800 Stück, Tiefe 0.2–1.0, Orbit-Bewegung, reagieren auf Mausposition
- Fragmente: zufällig im Raum verteilt, Drift-Animation (sin/cos), Parallax-Effekt
- Farbpaletten: blue (Standard), red, warm – alle Parameter über CSS-Variablen steuerbar
- requestAnimationFrame-Loop, ~60fps

---

## 5. Nächste Entwicklungsschritte (Priorität)

### Schritt 1: Visuelle Feinarbeit
- Begriffe sollen zu Beginn noch etwas unsichtbarer sein (Grundsichtbarkeit reduzieren)
- Tooltip-Position prüfen: soll nicht aus dem Viewport ragen
- Chat-Fenster: ggf. leicht nach unten oder zur Seite verschieben, damit es das Netzwerk nicht verdeckt
- Prüfen: Funktioniert die Rotation flüssig? Kein abruptes Wechseln?

### Schritt 2: System Prompt & Bot-Persönlichkeit
Siehe Abschnitt 6.

### Schritt 3: API-Anbindung
- Claude API (Anthropic) oder Langdock als Backend
- DSGVO-konform: kein Logging ohne Einwilligung, klare Datenflusskommunikation
- Streaming-Antworten für bessere UX (Text erscheint Wort für Wort)

### Schritt 4: Konversionsflüsse
- Nach bestimmten Intents: CTA einblenden (z.B. „Termin buchen", „KI-Kickstart ansehen")
- Kalender-Link (Calendly o.ä.) direkt im Chat als Button
- Optional: E-Mail-Capture für Follow-up

### Schritt 5: Mobile
- Chat-Panel responsive
- Begriffe auf Touch-Geräten: Tap statt Hover

---

## 6. System Prompt – Entwurf (noch zu verfeinern)

Der Chatbot ist kein generischer Assistent. Er ist Oliver – oder genauer: er spricht mit Olivers Stimme, Haltung und Qualifikationslogik.

### Persönlichkeit:
- Direkt, klar, ohne Floskeln
- Stellt Gegenfragen, wenn nötig
- Gibt keine langen Erklärungen – lieber ein konkretes Beispiel
- Zeigt Haltung: KI ist eine sozioökonomische Veränderung, keine IT-Frage
- Qualifiziert still: erkennt, ob jemand neugierig, skeptisch oder kaufbereit ist

### Wissen des Bots:
- Was ist Sonaris? → Beratung & Coaching für KI-First Selbstermächtigung
- Was ist der CEO KI Accelerator? → Intensivprogramm für Führungskräfte
- Was ist der KI-Kickstart? → 90–120 Min. Einstieg, konkreter Anwendungsfall, Langdock-Onboarding
- Was ist Langdock? → Europäische, DSGVO-konforme KI-Plattform, die Sonaris einsetzt und empfiehlt
- Was ist das Second Brain? → Olivers Signature-Differenziator: ein persönliches KI-Wissenssystem für CEOs
- Wer sind Christian und Lukas? → Coaches bei Sonaris, übernehmen hands-on Begleitung

### Qualifikationslogik (wann wird aus dem Chat ein Termin?):
- Wenn jemand fragt: „Wie fange ich an?" → KI-Kickstart vorschlagen
- Wenn jemand fragt: „Was kostet das?" → Erst Bedarf klären, dann Angebot
- Wenn jemand sagt: „Ich will das für mein Unternehmen" → Accelerator oder persönliches Gespräch
- Wenn jemand technisch fragt (Integration, Datenschutz, API) → An Christian/Lukas weiterleiten

### Was der Bot noch nicht kann (transparent kommunizieren):
- Detaillierte Preisauskünfte
- Individuelle Angebote erstellen
- Auf spezifische Kundendaten zugreifen

Wenn der Bot etwas nicht weiß, sagt er das direkt – und bietet an, ein Gespräch zu vermitteln.

---

## 7. Produkte & Angebote (Überblick)

| Produkt | Beschreibung | Status |
|---|---|---|
| KI-Kickstart | 90–120 Min. Einstieg, Live-Umsetzung, Langdock-Onboarding | Aktiv, buchbar |
| CEO KI Accelerator | Intensivprogramm für Führungskräfte | Aktiv |
| Second Brain | Persönliches KI-Wissenssystem (Olivers Signature) | In Entwicklung / Demo |
| KI-Anamnese | Diagnose-Tool für KI-Reife | Unsicher – ggf. nur intern |
| Langdock-Demo | Zugang zur europäischen KI-Plattform | Auf Anfrage |

---

## 8. Tonalität & Sprache

- Deutsch, Sie-Form (Zielgruppe: CEOs, Führungskräfte)
- Keine Buzzwords ohne Substanz
- Keine Weg-von-Formulierungen (nicht: „Sie haben das Problem X" → sondern: „Sie gewinnen Y")
- Kurze Sätze. Klare Aussagen. Keine Schachtelsätze.
- Beispiele und Metaphern statt Abstraktion
- Haltung zeigen: KI ist keine Bedrohung, keine Magie – sie ist ein Werkzeug, das Denken beschleunigt

---

## 9. Iterationshinweise für Claude Desktop

- Die HTML-Datei (sonaris-chat.html) ist der Arbeitsstand. Immer auf dieser Basis weiterarbeiten.
- Änderungen immer als vollständige, lauffähige HTML-Datei ausgeben – keine Fragmente.
- Wenn etwas unklar ist: nachfragen, nicht raten.
- Visuelles Feedback kommt von Oliver – er testet im Browser und gibt Screenshots oder Beschreibungen zurück.
- Priorität: Funktion vor Perfektion. Lieber schnell iterieren als lange planen.

---

## 10. Offene Entscheidungen (Oliver muss noch bestätigen)

1. **API-Wahl:** Claude API (Anthropic) direkt, oder via Langdock als Middleware?
2. **KI-Anamnese:** Öffentlich anbieten oder nur intern als Qualifikations-Tool?
3. **Booking-Integration:** Calendly, HubSpot, oder eigene Lösung?
4. **Domain / Hosting:** Wo wird die Seite deployed? (Vercel, Netlify, eigener Server?)
5. **DSGVO-Banner:** Wann und wie – vor dem ersten Chat-Input oder als separates Overlay?

---

*Dieses Dokument ist der Übergabe-Kontext für die Weiterentwicklung in Claude Desktop.*
*Stand: Februar 2026 | Erstellt mit Sales Sonaris Assistant*
