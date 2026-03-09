# Sonaris Website – Arbeitsstand

**Datum:** 2026-02-26
**Aktuelle Version:** sonaris-v4.html (~2028 Zeilen, Single-File HTML)
**Status:** Prototyp in aktiver Entwicklung

---

## Architektur

Single-File HTML mit Inline-CSS und Inline-JS. Keine externen Dependencies.
Triple-Canvas-Rendering: `#main` (Partikel), `#fragments` (Begriffe + Netzwerk), `#fx` (Click-Trail).
Chat-Panel zentriert, fixiert am unteren Bildschirmrand.

## Implementierte Features (v4)

### Kern
- ~800 Partikel mit Tiefe, Parallax, Orbit-Bewegung, Calm/Influence-Zonen
- 20 rotierende Konzept-Fragmente (6 gleichzeitig sichtbar, Rotation alle 16s)
- Unabhängiges sinusförmiges Pulsing pro Fragment
- Hover-Erkennung via Canvas-Distanzberechnung
- Klick auf Fragment → generiert Frage als User-Message → Bot-Antwort mit Gegenfrage
- Partikel-Trail-FX bei Klick (12 Partikel mit kubischer Interpolation)
- Inaktivitäts-Nudge nach 30s
- Geglättetes Mouse-Tracking (targetMouseX/Y → mouseX/Y mit 0.06 Lerp)
- Vignette Radial-Gradient Overlay
- Du-Form durchgehend

### Farbsystem (funktional verteilt)
- **Blau** (#6ec6ff, #3a7bd5, #1a2a4a): Chat-UI, Partikel, Fragmente
- **Rot/Korall** (#ff6b6b, #e74c3c, #ff4757): Kontakt-CTAs, Telefon-Icon
- **Warm/Gold** (#f39c12, #e67e22, #d4a574): Overlays (Team, Über uns, Impressum)

### Settings-Panel
- **Stimmung** (Master-Slider): Steuert breathSpeed (0.4–2.2) + movementIntensity (0.6–3.0)
- **Tiefenschärfe**: Steuert parallaxStrength (0.1–1.9)
- **Partikelzahl**: Steuert targetParticleCount (200–1200), smooth adjustment 5/Frame
- **Netzwerk**: Steuert networkIntensity (0–2)
- **Ton Toggle**: Ambient Drone (A2-E3-A3 mit LFO) + Click-Sounds
- **"Bitte nicht drücken" Button**: Easter Egg (siehe unten)

### Chat-System
- Willkommensnachricht + Folgefragen
- Fragment-Klick erzeugt kontextuelle Fragen + Antworten
- 20 Frage-Mappings für alle Fragmente
- Fallback-Antworten bei freier Texteingabe
- **Clean-Up Button**: Sichtbar ab 2+ Nachrichten, löscht Chat
- **Kontakt-CTA Doppelstrategie:**
  - Persistent: Telefon-Icon in Input-Row (immer sichtbar)
  - Kontextuell: CTA-Buttons in Bot-Replies bei Themen (Transformation, Orientierung, Anfang)
  - Auto: Nach 4+ Nachrichten in Fallback-Replies

### Easter Egg ("Bitte nicht drücken")
4-Phasen Crash-Simulation:
1. **Glitch** (1.2s): playCrashSound() + CSS skewX + Scanlines + hue-rotate
2. **Blackout** (0.8s): Alle UI-Elemente opacity 0
3. **Terminal** (typewriter): 10 Zeilen Terminal-Output mit blinkendem Cursor
4. **Recovery**: Partikel respawnen, Fragmente zurück, Fade-In, Bot-Message im Chat
- **Crash-Sound**: Web Audio API (Sawtooth Sweep 800→40Hz + Noise Burst + Deep Thud)

### Footer
- Position: `fixed, left: 45px, bottom: 44px, z-index: 21`
- Drei Links: Team, Über Sonaris, Impressum → öffnen Overlays

### Overlay-System
- Warm-Palette Styling (Gold/Amber Farbwelt)
- **Team**: 4 Mitglieder mit Initialen-Circles (OA, CP, LS, LS) und Rollen
- **Über Sonaris**: Beschreibung, Werte, Zielgruppe
- **Impressum**: Platzhalter (Adresse fehlt)
- **Kontakt Mini-Dialog** (3 Phasen):
  1. Frage: "Was ist gerade dein dringendstes Thema?" + Input
  2. Bestätigung mit Thema + E-Mail-Feld + optionales Telefon
  3. Checkmark + "Danke. Wir melden uns."

### Mobile
- Responsive Breakpoints für Chat-Panel, Footer, Overlays
- Touch-Events für Canvas-Interaktion
- Chat-Panel: padding-bottom 120px (Mobile) vs 190px (Desktop)

---

## Bekannte offene Punkte

### Zu testen/bestätigen
- [ ] Footer-Links: Sichtbarkeit und Klickbarkeit nach z-index Fix prüfen
- [ ] Easter Egg: Effekt und Crash-Sound verifizieren
- [ ] Overlay-Seiten: Sichtbarkeit und Darstellung
- [ ] Kontakt Mini-Dialog: Funktionalität
- [ ] Team-Rollen bestätigen (OA=Kontaktarchitekt, CP=Strategische Umsetzung, LS=KI-Architektur, LS=Technologie & Integration)

### Noch zu implementieren
- [ ] Impressum: Echte Adressdaten ergänzen
- [ ] Kontakt-Formular: Backend/API-Anbindung (aktuell rein Frontend)
- [ ] Fragment-Basis-Sichtbarkeit: Anpassung noch undecided
- [ ] API-Integration (Claude API / Langdock) für echten Chat
- [ ] Booking-Integration
- [ ] DSGVO-Konformität
- [ ] Hosting-Entscheidung

---

## Gelöste Bugs (Referenz)

| Bug | Ursache | Fix |
|-----|---------|-----|
| Fragmente nicht klickbar | pointer-events:none auf fragmentsCanvas | Click-Handler auf mainCanvas verschoben |
| Footer unsichtbar/nicht klickbar | z-index 18 unter Chat z-index 20, mittig positioniert | z-index 21, left 45px, bottom 44px |
| Easter Egg zu subtil | Nur CSS-Effekt | Terminal-Crash-Screen mit Typewriter + Sound |
| Kontakt-Overlay generisch | Standard-Formular | 3-Phasen Mini-Dialog |

---

## Technische Eckdaten

```
CSS z-index Hierarchie:
  1  - #main Canvas (Partikel)
  2  - #fragments Canvas (Begriffe)
  3  - #fx Canvas (Trail-Effekte)
  10 - Controls/Settings Panel
  15 - Overlays
  20 - Chat Panel
  21 - Footer
  50 - Easter Egg Terminal Screen

Chat Panel Positionierung:
  Desktop: padding-bottom 190px (~4cm vom unteren Rand)
  Mobile:  padding-bottom 120px

Partikel-System:
  Default: ~800 Partikel
  Range: 200–1200 (via Density Slider)
  Adjustment: 5 Partikel pro Frame add/remove

Animation: requestAnimationFrame (~60fps)
```

---

## Dateien

```
_code/
├── sonaris-v4.html    # AKTUELLE VERSION (89KB)
├── sonaris-v3.html    # Vorversion (Referenz)
├── sonaris-v2.html    # Ältere Version (Referenz)
└── ARBEITSSTAND.md    # Diese Datei

_data/
├── denkraum-dreischritt.html   # Original 3-Phasen-Konzept
└── sonaris-v1.html             # Original aus Langdock

_cowork/Briefings/
└── Sonaris_Website_Briefing_Claude_Desktop.md
```
