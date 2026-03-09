# Sonaris Website-Konzept
## Architektur für eine preisgekrönte Dual-Experience-Website
### Stand: 03. März 2026

---

## 1. Leitidee: Zwei Welten, ein Erlebnis

Die Sonaris-Website operiert auf zwei Ebenen, die ineinander übergehen:

**Ebene 1 – „Der Denkraum" (Chat-First, bestehender Prototyp)**
Das immersive Canvas-Erlebnis mit Partikel-Netzwerk, schwebenden Begriffen und Chat als primärem Interaktionspunkt. Dieses Interface bleibt das Herzstück – es IST Sonaris. Es demonstriert die Haltung: Beziehung vor Information, Frage vor Antwort, Erleben vor Erklären.

**Ebene 2 – „Die Substanz" (Klassische Content-Architektur)**
Scrollbare Content-Blöcke unterhalb des Denkraums – sichtbar durch Scroll oder durch einen sanften visuellen Hinweis. Diese Ebene bedient drei Zielgruppen gleichzeitig: den analytischen Entscheider, der strukturierte Information braucht; Google (SEO/SEM); und den Wiederkehrenden, der gezielt sucht.

**Die Verbindung beider Welten:** Der Denkraum nimmt den gesamten Viewport ein (100vh). Erst durch Scrollen oder einen subtilen Scroll-Indikator (animierter Chevron am unteren Rand) öffnet sich die klassische Welt darunter – wie ein Vorhang, der sich hebt.

---

## 2. Informationsarchitektur

### 2.1 Gesamtstruktur (Single-Page mit Sektionen)

```
┌─────────────────────────────────────────────┐
│  VIEWPORT 1: DER DENKRAUM (100vh)           │
│  ┌─────────────────────────────────────────┐ │
│  │  Canvas + Partikel + Fragmente          │ │
│  │  Chat-Interface (zentral)               │ │
│  │  Logo | Badge | Footer-Links            │ │
│  └─────────────────────────────────────────┘ │
│           ▼ Scroll-Indikator ▼               │
├─────────────────────────────────────────────┤
│  TRANSITION: Visueller Übergang             │
│  (Canvas faded zu 10% Opazität,             │
│   wird zum subtilen Hintergrund)            │
├─────────────────────────────────────────────┤
│  SEKTION 1: DER REALITY GAP                 │
│  (Einstieg: Schmerzpunkt + Provokation)     │
├─────────────────────────────────────────────┤
│  SEKTION 2: DIE METHODE                     │
│  (KI-Dolmetscher 180 Tage)                  │
├─────────────────────────────────────────────┤
│  SEKTION 3: WAS WIR TUN                     │
│  (Alle Produkte als Card-Grid)              │
├─────────────────────────────────────────────┤
│  SEKTION 4: ERGEBNISSE, DIE SPRECHEN        │
│  (Kundenprojekte als Case-Storys)           │
├─────────────────────────────────────────────┤
│  SEKTION 5: DER KNOWLEDGE LAYER             │
│  (Konzept-Erklärung mit Visualisierung)     │
├─────────────────────────────────────────────┤
│  SEKTION 6: DSGVO & DATENHOHEIT             │
│  (Europa-Argument + Langdock)               │
├─────────────────────────────────────────────┤
│  SEKTION 7: WIR LEBEN, WAS WIR VERKAUFEN   │
│  (Interner Showcase)                        │
├─────────────────────────────────────────────┤
│  SEKTION 8: DAS TEAM                        │
│  (Vier Köpfe + Elysium Echo)               │
├─────────────────────────────────────────────┤
│  SEKTION 9: VIRTUELLER ESPRESSO (CTA)       │
│  (Abschluss-Sektion mit Buchung)            │
├─────────────────────────────────────────────┤
│  FOOTER: Impressum, Datenschutz, Kontakt    │
└─────────────────────────────────────────────┘
```

### 2.2 Navigationskonzept

**Im Denkraum:** Keine klassische Navigation. Der Chat und die schwebenden Begriffe SIND die Navigation. Die Footer-Links (Team, Über Sonaris, Impressum) bleiben als Overlays.

**In der Substanz-Ebene:** Eine schwebende Mini-Navigation erscheint beim Scrollen – eine schmale, transparente Leiste mit:
- Logo „sonaris" (Klick = zurück zum Denkraum)
- Dot-Navigation (vertikale Punkte rechts, zeigt aktive Sektion)
- „Chat öffnen"-Button (öffnet den Chat als Overlay über jeder Sektion)
- CTA „Virtueller Espresso" (persistent)

---

## 3. Die Sektionen im Detail

### SEKTION 1: DER REALITY GAP
**Funktion:** Aufmerksamkeit. Relevanz herstellen. Schmerzpunkt aktivieren.

**Layout:** Fullscreen-Sektion mit reduziertem Partikel-Hintergrund (10% Opazität), dunkler Hintergrund bleibt.

**Inhalt:**

*Headline (groß, zentriert):*
> Zwischen dem, was KI heute kann – und dem, was Ihr Unternehmen davon nutzt, liegt eine Lücke.

*Subtext:*
> In den USA fahren Robotaxis 250.000 Kunden pro Woche. In Deutschland diskutieren wir, ob autonomes Fahren möglich ist. Diese Lücke gibt es auch in Ihrem Unternehmen. Sonaris hilft, sie zu schließen.

*Drei Zahlen-Blöcke (horizontal, animiert beim Scrollen):*
- „250.000 Fahrten/Woche" – Was autonomes Fahren heute schon leistet
- „2,20 €/Monat" – Was ein KI-gestützter Sales-Prozess kosten kann
- „180 Tage" – Vom ersten Gespräch zur KI-Autonomie

*Micro-CTA:* „Was bedeutet das für mein Unternehmen?" → Scrollt zur nächsten Sektion oder öffnet Chat

**SEO-Keywords:** KI-Strategie Mittelstand, KI-Integration Unternehmen, Reality Gap KI, KI-Beratung Deutschland

---

### SEKTION 2: DIE METHODE – KI-DOLMETSCHER
**Funktion:** Das Hauptprodukt erklären. Vertrauen aufbauen durch Struktur.

**Layout:** Horizontale Timeline mit 5 Phasen, die beim Scrollen nacheinander einblenden. Jede Phase als Karte mit Nummer, Name, Kernfrage und einem Satz Erklärung.

**Inhalt:**

*Headline:*
> Wir übersetzen KI in Ihre Sprache – nicht umgekehrt.

*Subtext:*
> Der KI-Dolmetscher ist ein strukturiertes 180-Tage-Programm. Fünf Phasen führen Ihr Unternehmen von der Orientierung zur eigenständigen KI-Nutzung. Jeder Schritt liefert für sich bereits Mehrwert.

*Die 5 Phasen als animierte Karten:*

| # | Name | Zeitraum | Kernfrage | Beschreibung |
|---|------|----------|-----------|--------------|
| 1 | Zuhören | Woche 1–4 | Welche Sprachen sprechen wir hier? | Wir verstehen Ihre Arbeitsrealität, bevor wir über Technologie sprechen. |
| 2 | Wörterbuch | Woche 5–8 | Welche Vokabeln brauchen wir zuerst? | Erste KI-Anwendungen, die sofort Entlastung bringen. |
| 3 | Satzbau | Woche 9–16 | Wie verbinden wir zu sinnvollen Sätzen? | KI wird in bestehende Prozesse eingebettet. |
| 4 | Kontext | Woche 17–22 | Wie versteht die KI Ihr Unternehmen? | Das Unternehmenswissen wird zugänglich gemacht. |
| 5 | Muttersprachler | Woche 23–26 | Wie wird KI selbstverständlich? | Ihr Team nutzt KI eigenständig und souverän. |

*Design-Detail:* Die Sprachmetapher zieht sich visuell durch – jede Phase baut linguistisch aufeinander auf.

**SEO-Keywords:** KI-Einführung Mittelstand, KI-Dolmetscher, KI-Programm 180 Tage, strukturierte KI-Integration

---

### SEKTION 3: WAS WIR TUN
**Funktion:** Produktportfolio zeigen. Verschiedene Einstiegspunkte sichtbar machen.

**Layout:** Card-Grid (2x2 auf Desktop, 1-spaltig mobil) mit Hover-Effekt. Jede Karte zeigt Titel, einen Satz, Zielgruppe und einen „Mehr erfahren"-Link, der ein Accordion-Detail öffnet.

**Produkt-Karten:**

**Karte 1: KI-Dolmetscher (180 Tage)**
> Strukturierte KI-Integration für Ihr gesamtes Unternehmen. Von der Orientierung zur Autonomie in 26 Wochen.
> *Für:* Mittelständische Unternehmen mit 50–500 Mitarbeitenden

**Karte 2: CEO-KI-Coaching**
> Monatliches 1:1-Sparring für Geschäftsführer. Echte Use Cases aus Ihrem Alltag, sofortige Ergebnisse.
> *Für:* Geschäftsführer, die selbst verstehen wollen
> *Detail:* Wöchentliche Sessions à 90–120 Min. | 30-Tage-Zyklen | 3.500 €/Monat

**Karte 3: KI-Strategie**
> Systematische Analyse Ihrer Organisation. Wo steht Ihr Team? Was ist der wirkungsvollste nächste Schritt?
> *Für:* Unternehmen, die vor einer strategischen KI-Entscheidung stehen

**Karte 4: Gesprächsintelligenz**
> Ihre wichtigsten Gespräche werden zu strukturierten Arbeitsdokumenten. Kein Protokoll – eine Arbeitsgrundlage.
> *Für:* Führungskräfte, Sales-Teams, Beratung

*Unter dem Grid:*

**Einstiegsformat: Der Virtuelle Espresso**
> Ein unverbindliches Kennenlerngespräch. Kein Pitch, sondern Orientierung. Als Ergebnis erhalten Sie ein Gesprächsintelligenz-Dossier – Ihr erstes Proof of Concept.
> [CTA: Virtuellen Espresso buchen]

**SEO-Keywords:** KI-Coaching CEO, KI-Strategie Unternehmen, Gesprächsintelligenz KI, KI-Beratung Mittelstand

---

### SEKTION 4: ERGEBNISSE, DIE SPRECHEN
**Funktion:** Social Proof. Greifbare Beispiele. Storytelling.

**Layout:** Horizontaler Scroller (Swipe-Cards auf Mobile, Horizontal-Scroll auf Desktop) mit 4–6 Case-Cards. Jede Card zeigt: Branche (Icon), Projekttyp, ein Kernzitat, Ergebnis.

**Case-Cards:**

**Case 1: Circunomics – Circular Economy**
- *Typ:* KI-Strategie für die gesamte Organisation
- *Ergebnis:* 100% Teilnahme der Führungskräfte, Silo-Strukturen als Hauptproblem identifiziert, erste Agenten-Workflows bereits live
- *Takeaway:* „KI-Strategie beginnt mit Zuhören – bei jeder einzelnen Führungskraft."

**Case 2: Aurora-EOS – CEO-Coaching**
- *Typ:* Monatliches KI-Coaching für den Geschäftsführer
- *Ergebnis:* Langdock als kaufmännische Entscheidung (nicht IT) durchgesetzt, Ausweitung aufs gesamte Team geplant
- *Takeaway:* „KI beginnt beim Geschäftsführer – und strahlt von dort ins Unternehmen."

**Case 3: BFA – Architektur**
- *Typ:* KI-Orientierung für ein Architekturbüro
- *Zitat:* „Uns wird im Moment eher das Schöne weggenommen – nicht das Langweilige."
- *Takeaway:* „KI soll nicht Gestaltung ersetzen, sondern Raum dafür schaffen."

**Case 4: Familienunternehmen – Generationenübergabe**
- *Typ:* Virtueller Espresso + Gesprächsintelligenz
- *Kontext:* Vater übergibt an Sohn, operative Last bündelt sich
- *Takeaway:* „Der Engpass ist nicht fehlende Kompetenz – sondern kognitive Überlastung."

**Case 5: German Air Logistics – Luftfracht**
- *Typ:* KI-Integration im Operations-Management
- *Ansatz:* Eingehende Anfragen automatisch auslesen, Parameter extrahieren, Vorschläge mit menschlicher Freigabe
- *Takeaway:* „Enablement von Führung und Schlüsselrollen – das ist unser Ansatz."

**Case 6: Mittelständischer Unternehmer**
- *Typ:* Virtueller Espresso
- *Kontext:* KI-Wissen 1–2 von 10, hohe operative Auslastung, gesunde Skepsis
- *Takeaway:* „Der Engpass liegt nicht im fehlenden Willen – sondern in der Überlastung."

*Hinweis:* Ob Kundennamen namentlich genannt werden dürfen, ist noch offen (Teil K). Alternativ: Anonymisierte Branchenbezeichnungen. Empfehlung: Soweit möglich Freigaben einholen – namentliche Referenzen sind deutlich wirkungsvoller.

**SEO-Keywords:** KI-Projekt Mittelstand Erfahrung, KI-Beratung Referenzen, KI Case Study Deutschland

---

### SEKTION 5: DER KNOWLEDGE LAYER
**Funktion:** Das tiefste Konzept erklären. Differenzierung zu Tool-Anbietern.

**Layout:** Links Text, rechts eine animierte Visualisierung (schematisch: Gespräche → Dossier → Arbeitsgedächtnis → Zugang). Alternativ: Lottie-Animation oder SVG-Animation.

**Inhalt:**

*Headline:*
> Ihr Wissen entsteht jeden Tag. Wir machen es zugänglich.

*Text:*
> Gespräche, Meetings, E-Mails, Entscheidungen – täglich entsteht wertvolles Wissen in Ihrem Unternehmen. Die Herausforderung: Es bleibt in Köpfen, in Dateisystemen, in E-Mail-Postfächern. Der Knowledge Layer ist die Brücke zwischen dem, was Sie wissen, und dem, was Ihre Organisation daraus machen kann.

*Drei Anwendungsfelder als Icons mit Kurztext:*
- **Search & Find** – Informationsflut beherrschen, statt in ihr unterzugehen
- **Entscheidungsvorbereitung** – Kontextualisierte Information statt roher Daten
- **Gesprächsintelligenz** – Implizites Wissen sichern, bevor es verloren geht

*Zitat-Block:*
> „Dieses Erinnerungsvermögen ersetzt kein Wissen – es organisiert Zugang dazu."

**SEO-Keywords:** Knowledge Management KI, Unternehmenswissen KI, Wissensmanagement Mittelstand, Knowledge Layer

---

### SEKTION 6: DSGVO & EUROPÄISCHE DATENHOHEIT
**Funktion:** Einwandbehandlung. Sicherheitsbedenken adressieren.

**Layout:** Zweispaltig. Links: Klartext. Rechts: Schematische Darstellung „Daten bleiben im Unternehmen" vs. „Daten fließen zu US-Anbietern".

**Inhalt:**

*Headline:*
> Wir holen KI ins Unternehmen, ohne Ihr Wissen hinauszutragen.

*Text:*
> Sonaris arbeitet mit Langdock – einem europäischen KI-Layer, der DSGVO als Architekturprinzip versteht. Kein Vendor-Lock-in, keine impliziten Datenabflüsse, volle Kontrolle über Ihr Unternehmenswissen.

*FAQ-Accordion (SEO-relevant):*

**„Ist Microsoft Copilot nicht DSGVO-konform?"**
> Formal ja. Architektonisch bleibt die Datenhoheit beim Anbieter. Der Unterschied: Mit Langdock sind Sie System-Eigentümer, nicht Tool-Nutzer.

**„Was ist Langdock?"**
> Ein europäischer KI-Orchestrator. Langdock verbindet verschiedene KI-Modelle (Claude, GPT u.a.) in einer DSGVO-konformen Umgebung – ohne Vendor-Lock-in.

**„Wo liegen meine Daten?"**
> In Europa. Langdock verarbeitet Daten ausschließlich auf europäischen Servern. Ihr Unternehmenswissen verlässt nie den europäischen Rechtsraum.

*Logo-Leiste:* Langdock, Claude/Anthropic (als Technologie-Partner, dezent)

**SEO-Keywords:** DSGVO KI, KI DSGVO-konform, Langdock KI, europäische KI-Lösung, Datenschutz KI Unternehmen

---

### SEKTION 7: WIR LEBEN, WAS WIR VERKAUFEN
**Funktion:** Glaubwürdigkeit. Proof of Practice. Differenzierung.

**Layout:** Dunkler Hintergrund, Terminal-Ästhetik (Monospace-Font-Akzente), um die technische Praxis zu unterstreichen.

**Inhalt:**

*Headline:*
> Unsere eigene Arbeitsweise ist unser stärkstes Argument.

*Zwei Showcase-Blöcke:*

**Block 1: Sales-Automatisierung mit Claude Code**
> Oliver nutzt ein KI-gestütztes Produktivitätssystem für seinen gesamten Sales-Prozess: automatische Call-Transkription, KI-generierte Follow-up-E-Mails, automatische Angebotsentwürfe. Monatliche Kosten: 2,20 €.
>
> Das ist kein theoretisches Versprechen. Das ist der Alltag, aus dem heraus wir beraten.

**Block 2: Gesprächsintelligenz als Produkt**
> Jedes Kundengespräch wird zu einem strukturierten Dossier verdichtet. Dieses Dossier ist gleichzeitig unser Arbeitswerkzeug, ein Proof of Concept für den Kunden und das Verkaufsargument für die Methode.

*Visuelle Idee:* Stilisiertes Code-Terminal mit angedeuteten Skill-Commands (`/sales-1-transcribe-calls`, `/sales-2-generate-emails`) – keine echten Daten, nur Atmosphäre.

**SEO-Keywords:** KI im Vertrieb, Sales Automatisierung KI, KI-Praxis Beispiel, Claude Code Anwendung

---

### SEKTION 8: DAS TEAM
**Funktion:** Vertrauen durch Personen. Komplementäre Expertise sichtbar machen.

**Layout:** Vier Karten in einer Reihe (Desktop), übereinander (Mobil). Jede Karte: Initialen-Kreis (wie im Prototyp), Name, Rolle, ein Satz. Hover zeigt erweiterte Info.

**Karten:**

**Oliver Andrees – Gründer & Sales**
> 35 Jahre Vertrieb und Führungskräfteentwicklung. Zeigt Unternehmen, wo sich KI-Investitionen wirklich rechnen – ehrlich, beziehungsorientiert und mit Bodenhaftung.

**Lukas Sontheimer – KI-Stratege**
> Baut die Brücke zwischen organisationalen Strukturen und KI-Möglichkeiten – pragmatisch, bedarfsorientiert und mit Blick auf das Wesentliche.

**Christian Pessing – Training & Coaching**
> Kommunikationsexperte. Verantwortlich für KI-Trainings und Gesprächsintelligenz-Dossiers. Verfasser der strategischen Ausrichtung.

**Lorenz Surkemper – Technologie-Experte**
> Betreibt seit 2016 remotesourcing.de. Weltweites Netzwerk vorgeprüfter Entwickler. Wenn es eine technische Lösung braucht, setzt er seinen Ehrgeiz an – und liefert.
> *Link:* remotesourcing.de

*Optional (als fünfte Karte, visuell abgesetzt):*

**Elysium Echo – KI-Kommunikationsschnittstelle**
> Forschungspartner, Denkraum und Gesprächspartner. Eine gestaltete Figur an der Schnittstelle zwischen zwei Arten des Denkens.

**SEO-Keywords:** Sonaris Team, KI-Berater Deutschland, Oliver Andrees, Lukas Sontheimer

---

### SEKTION 9: VIRTUELLER ESPRESSO (CTA-Abschluss)
**Funktion:** Conversion. Alle Fäden zusammenführen.

**Layout:** Zentriert, viel Weißraum (bzw. Dunkelraum), maximal reduziert.

**Inhalt:**

*Headline:*
> Bereit für ein Gespräch?

*Subtext:*
> Der Virtuelle Espresso ist ein unverbindliches Kennenlerngespräch. Kein Pitch, sondern Orientierung. Als Ergebnis erhalten Sie ein Gesprächsintelligenz-Dossier – Ihr erstes Proof of Concept, kostenlos.

*CTA-Button:* „Virtuellen Espresso buchen" → Calendly / HubSpot Meeting Link (Entscheidung offen, Teil K)

*Darunter:* „Oder schreiben Sie uns: kontakt@sonaris.de"

**SEO-Keywords:** KI-Beratung Erstgespräch, KI-Beratung kostenlos, Sonaris Kontakt

---

## 4. Design-System

### 4.1 Farbwelt

Die bestehende Farbwelt des Prototyps wird beibehalten und auf die klassischen Sektionen übertragen:

| Kontext | Palette | Verwendung |
|---------|---------|------------|
| Primär (KI/Denkraum) | Blau: `#6E91B4`, `#8CB4DC`, `#A0C8E8` | Chat, Navigation, Buttons |
| Sekundär (Mensch/Kontakt) | Warm-Rot: `#A0555F`, `#DC8C96` | CTAs, Kontakt-Elemente |
| Tertiär (Kontext/Wissen) | Warm: `#AA7D55`, `#E1B991` | Overlays, Zitate, Akzente |
| Hintergrund | Dunkel: `#121820`, `#0C121A` | Sektionen, Flächen |
| Text | Hell: `#A0B9D7`, `#C8DCF0` | Fließtext, Headlines |

### 4.2 Typografie

| Element | Font | Größe | Gewicht |
|---------|------|-------|---------|
| Headlines (H1) | System Sans-Serif | 36–48px | 300 (Light) |
| Sub-Headlines (H2) | System Sans-Serif | 22–28px | 400 (Regular) |
| Fließtext | System Sans-Serif | 15–16px | 400 |
| Zitate | System Sans-Serif | 18–20px | 300 (Light, Italic) |
| Labels/Badges | System Sans-Serif | 11–12px | 500 |
| Code/Terminal | Courier New / Monospace | 13px | 400 |

### 4.3 Animationen

| Element | Animation | Trigger |
|---------|-----------|---------|
| Sektions-Inhalte | Fade-up + leichter Parallax | Scroll (IntersectionObserver) |
| Zahlen-Blöcke (S1) | Count-up Animation | Viewport-Eintritt |
| Timeline-Phasen (S2) | Sequential Reveal | Scroll-Position |
| Case-Cards (S4) | Horizontal Swipe/Scroll | User-Interaktion |
| FAQ-Accordion (S6) | Smooth Expand | Click |
| Canvas-Hintergrund | Opacity-Reduktion auf 10% | Beim Verlassen des Denkraums |

---

## 5. Technische Architektur

### 5.1 Grundstruktur

```
sonaris-website/
├── index.html          (Single Page, alle Sektionen)
├── css/
│   ├── denkraum.css    (Canvas-Layer, Chat, Fragmente)
│   ├── content.css     (Klassische Sektionen)
│   └── responsive.css  (Breakpoints)
├── js/
│   ├── canvas.js       (Partikel, Netzwerk, Fragmente)
│   ├── chat.js         (Chat-Logik, Bot-Antworten)
│   ├── scroll.js       (Scroll-Animationen, Section-Tracking)
│   └── navigation.js   (Floating Nav, Dot-Navigation)
├── assets/
│   ├── icons/          (SVG-Icons)
│   └── og-image.png    (Social Sharing)
└── api/
    └── (zukünftig: Chat-API-Anbindung)
```

### 5.2 SEO-Strategie

**Technisch:**
- Semantisches HTML5 (`<article>`, `<section>`, `<nav>`, `<aside>`)
- Meta-Tags pro logischer Sektion (Title, Description, OG)
- Schema.org Markup (Organization, Service, FAQ, Review)
- Preload für kritische Ressourcen
- Lazy Loading für Below-the-fold-Inhalte
- Core Web Vitals optimiert (CLS, LCP, FID)

**Inhaltlich:**
- Jede Sektion hat eine H2-Headline mit Keyword
- FAQ-Sektion (S6) liefert Featured-Snippet-Potenzial
- Alt-Texte für alle visuellen Elemente
- Interne Verlinkung zwischen Sektionen

**Keyword-Cluster (Priorität):**

| Cluster | Primär-Keyword | Sekundär |
|---------|---------------|----------|
| Hauptseite | KI-Beratung Mittelstand | KI-Strategie Unternehmen, KI-Integration |
| Methode | KI-Dolmetscher | KI-Einführung 180 Tage, strukturierte KI |
| DSGVO | KI DSGVO-konform | europäische KI, Langdock, Datenschutz KI |
| CEO | KI-Coaching Geschäftsführer | CEO KI, Führung KI |
| Gespräche | Gesprächsintelligenz KI | Meeting KI, CRM Alternative |
| Wissen | Knowledge Management KI | Unternehmenswissen KI |

### 5.3 SEM-Landingpages (Optional, Phase 2)

Für Google Ads empfehle ich dedizierte Landingpages pro Kernprodukt:
- `/ki-dolmetscher` – Für den Keyword-Cluster „KI-Einführung Mittelstand"
- `/ceo-coaching` – Für „KI-Coaching Geschäftsführer"
- `/ki-strategie` – Für „KI-Strategie Unternehmen"

Diese können die Substanz-Sektionen als eigenständige Pages extrahieren – gleiche Inhalte, fokussierter CTA, eigene Meta-Tags.

---

## 6. Content-Tonalität

### 6.1 Sprachliche Leitlinien (aus dem Dossier übernommen)

- **Hin-zu-Formulierungen** statt Defizit-Ton
- **Additive Sprache:** „und", „außerdem", „darüber hinaus" statt „nicht nur...sondern", „im Gegensatz zu"
- **Sachlich, ruhig, lösungsorientiert**
- **Keine Buzzwords:** Kein „maßgeschneidert", kein „ganzheitlich", kein „Synergien"
- **Keine Übertreibungen:** Keine Superlative, keine leeren Versprechen
- **Beziehungsorientiert:** Direkte Ansprache, respektvoll, auf Augenhöhe
- **Du-Form im Chat, Sie-Form auf der Website** (Empfehlung: konsistent Sie-Form in den klassischen Sektionen, Du-Form bleibt im Chat)

### 6.2 Zitate als Strukturelement

Zitate werden als visuelle Unterbrechung in den Sektionen eingesetzt – in der warmen Farbpalette, leicht abgesetzt, mit Quellenangabe:

- „Das Problem ist nicht fehlende Kompetenz – das Problem ist kognitive Überlastung."
- „Uns wird im Moment eher das Schöne weggenommen – nicht das Langweilige." – Architekturbüro
- „KI ist kein Technologie-Thema, sondern ein Organisations- und Führungshebel."
- „Wir holen KI ins Unternehmen, ohne unser Wissen aus dem Unternehmen zu tragen."

---

## 7. Interaktion zwischen Denkraum und Substanz

### 7.1 Der Chat als roter Faden

Der Chat verschwindet nicht beim Scrollen – er transformiert sich:

**Im Denkraum:** Vollformat, zentriert, dominante Position.
**In der Substanz:** Minimiert zu einem schwebenden Chat-Icon (unten rechts), das bei Klick ein Overlay öffnet. Der Chat-Verlauf bleibt erhalten.

### 7.2 Fragment-zu-Sektion-Verknüpfung

Wenn ein Besucher im Denkraum auf einen Begriff klickt (z.B. „Orientierung"), kann die Bot-Antwort neben der Gegenfrage einen Deeplink zur relevanten Sektion enthalten:

> „Wo stehe ich mit KI – und was wäre ein guter nächster Schritt? Wenn Sie strukturiert einsteigen möchten, schauen Sie sich unsere KI-Dolmetscher-Methode an." [→ Zur Methode]

### 7.3 Scroll-Trigger für Chat-Hinweise

Optionaler Mechansimus: Wenn ein Besucher bei einer bestimmten Sektion verweilt (>15 Sekunden), kann der Chat-Icon subtil pulsieren und bei Öffnung eine kontextuelle Frage stellen:

> [Besucher ist bei Sektion 6 – DSGVO]
> Chat: „Haben Sie Fragen zur Datensicherheit? Ich kann Ihnen erklären, wie Langdock funktioniert."

---

## 8. Mobile Strategie

### 8.1 Denkraum (Mobile)

- Canvas-Partikel reduziert (max. 200)
- Fragmente: 3 statt 6 sichtbar
- Chat: Fullwidth, Nachrichten-Bereich reduzierte Höhe
- Scroll-Indikator deutlicher

### 8.2 Substanz (Mobile)

- Einspaltiges Layout
- Timeline (S2) wird vertikal statt horizontal
- Case-Cards: Swipe-Carousel
- FAQ: Touch-Accordion
- Floating Navigation: Kompakte Version (Logo + Chat-Icon + CTA)

### 8.3 Breakpoints

| Breakpoint | Verhalten |
|------------|-----------|
| > 1200px | Volle Desktop-Ansicht |
| 768–1200px | Tablet: 2-spaltige Grids werden 1-spaltig |
| < 768px | Mobile: Kompakte Navigation, vertikale Timeline |
| < 480px | Small Mobile: Reduzierte Typografie-Größen |

---

## 9. Tooltip-Glossar (SEO-Booster)

Die 20 Fragment-Begriffe aus dem Denkraum werden zusätzlich als interaktives Glossar in der Substanz-Ebene verfügbar gemacht – entweder als eigene Sektion oder als durchgehender Mechanismus:

Jedes Mal, wenn einer der 20 Begriffe im Fließtext der Sektionen vorkommt, wird er als Tooltip-Link dargestellt (dezente Unterstreichung, Hover zeigt Erklärung). Das schafft eine semantische Brücke zwischen Denkraum und Substanz und liefert zusätzlichen SEO-Wert durch interne Verlinkung und Begriffsklärung.

---

## 10. Performance-Konzept

| Maßnahme | Effekt |
|----------|--------|
| Canvas-Rendering nur im Viewport | GPU-Last reduzieren beim Scrollen |
| Content-Sektionen lazy laden | Initiales Laden: nur Denkraum |
| CSS: Critical Path inline | First Paint < 1s |
| Keine externen Fonts | System-Stack reicht, spart 200ms+ |
| Bilder: WebP/AVIF | Falls Bilder dazukommen |
| Intersection Observer für Animationen | Performant, kein Scroll-Jank |

---

## 11. Offene Entscheidungen (Empfehlungen)

| # | Entscheidung | Empfehlung |
|---|-------------|------------|
| 1 | API-Wahl Chat | **Langdock als Middleware.** Konsistent mit der eigenen Botschaft (europäischer KI-Layer). |
| 2 | KI-Anamnese | **Zunächst intern.** Als Qualifikations-Tool nutzen, später ggf. öffentlich als Self-Assessment. |
| 3 | Booking-Integration | **Calendly oder HubSpot Meetings.** HubSpot wäre konsistenter mit dem bestehenden CRM-Stack. |
| 4 | Domain/Hosting | **Vercel.** Schnell, Edge-Rendering, gute DX, kostenlos für den Start. |
| 5 | Preiskommunikation | **CEO-Coaching-Preis auf der Website** (3.500 €/Monat signalisiert Qualität). KI-Dolmetscher nur im Gespräch (zu komplex für pauschale Angabe). |
| 6 | Kundennamen | **Freigaben einholen.** Namentliche Cases sind 5x wirkungsvoller als anonyme. Mindestens BFA und Aurora-EOS anfragen. |

---

## 12. Umsetzungs-Roadmap

### Phase 1: Foundation (Woche 1–2)
- HTML-Grundgerüst mit allen 9 Sektionen
- CSS-Design-System (Farben, Typografie, Spacing)
- Scroll-Mechanik (Denkraum → Substanz-Übergang)
- Floating Navigation
- Responsive Grundstruktur

### Phase 2: Content & Animation (Woche 3–4)
- Texte finalisieren (alle Sektionen)
- Scroll-Animationen implementieren
- Timeline-Komponente (S2)
- Case-Card-Carousel (S4)
- FAQ-Accordion (S6)

### Phase 3: Integration (Woche 5–6)
- Chat-Overlay für Substanz-Ebene
- Fragment-zu-Sektion-Deeplinks
- Tooltip-Glossar
- SEO-Markup (Schema.org, Meta-Tags)
- Performance-Optimierung

### Phase 4: Launch (Woche 7)
- Booking-Integration (Calendly/HubSpot)
- Analytics (Plausible oder ähnlich, DSGVO-konform)
- Lighthouse-Audit
- Cross-Browser-Testing
- Soft Launch

### Phase 5: Erweiterung (nach Launch)
- Chat-API-Anbindung (Claude via Langdock)
- SEM-Landingpages
- Blog/Content-Hub für Themen-Cluster
- A/B-Testing der CTAs

---

## 13. Zusammenfassung

Die Sonaris-Website wird zu einer einzigartigen Erfahrung: Der Denkraum als emotionaler Einstieg, die Substanz als rationale Vertiefung. Beide Ebenen arbeiten zusammen – der Chat als verbindendes Element, die 20 Begriffe als semantische Brücke, die Farbwelt als visueller Anker.

Die klassischen Content-Blöcke liefern alles, was SEO und SEM brauchen: semantisches HTML, Keyword-optimierte Headlines, FAQ-Sektionen für Featured Snippets, Schema.org-Markup. Gleichzeitig bleiben sie der Sonaris-Haltung treu: sachlich, ruhig, beziehungsorientiert, frei von Buzzwords.

Das Ergebnis: Eine Website, die erlebt werden will – und trotzdem gefunden wird.
