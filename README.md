# Website Sonaris

**Projekt:** Chat-First Website für sonaris.de
**Status:** Prototyp v4 in aktiver Entwicklung
**Erstellt:** 2026-02-26

---

## Kontext

Sonaris – KI-Transformation Mittelstand.
Team: Oliver Arndt (Kontaktarchitekt), Christian Pessing (Strategische Umsetzung), Lukas Sontheimer (KI-Architektur), Lorenz Surkemper (Technologie & Integration).

Konzept: Kein klassisches Webdesign. Die gesamte Seite ist ein Chat-Interface mit lebendigem Partikel-Netzwerk und klickbaren Konzept-Fragmenten als Einstiegspunkte.

---

## Aktuelle Version: v4

Vollständiger Single-File HTML-Prototyp mit:
- Triple-Canvas Partikel-Netzwerk mit Parallax
- 20 klickbare Konzept-Fragmente → Chat-Dialog
- Settings-Panel (Stimmung, Tiefenschärfe, Partikelzahl, Netzwerk, Ton)
- Funktionales Farbsystem (Blau=Chat, Rot=Kontakt, Warm=Overlays)
- Kontakt-CTA Doppelstrategie (persistent + kontextuell)
- Footer mit Overlay-Seiten (Team, Über Sonaris, Impressum)
- Kontakt Mini-Dialog (3-Phasen)
- Easter Egg "Bitte nicht drücken" (Crash-Simulation mit Sound)
- Ambient Sound System (Drone + Click-Sounds)
- Mobile-responsive

**Detaillierter Arbeitsstand:** `_code/ARBEITSSTAND.md`

---

## Struktur

```
website-sonaris/
├── _cowork/Briefings/   # Briefings & Konzeption
├── _code/               # Implementation (v2, v3, v4 + Arbeitsstand)
├── _data/               # Original-Dateien (Langdock v1, Dreischritt)
└── README.md
```

---

## Nächste Schritte

- Testen: Footer-Sichtbarkeit, Easter Egg, Overlays, Kontakt-Dialog
- Impressum mit echten Daten befüllen
- Team-Rollen bestätigen
- Backend/API für Chat und Kontaktformular
- DSGVO, Hosting
