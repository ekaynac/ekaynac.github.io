# Canon Backlog

Material that belongs to Enes's canon (confirmed, sourced) but is **deliberately not yet**
in the generated outputs (`content/*.ts` → CV / README / site / LinkedIn pack).

Nothing here is lost: when an item is promoted, move it into `content/` and delete its
entry below. Each item records where it came from so it can be re-verified.

---

## Creative / performance

### Ethnic Music Concert — poetry recitation (Bilkent, May 2024)

- **What:** "Ethnical Music Concert" at İhsan Doğramacı Bilkent University, **2024-05-14**.
- **Role:** **Poetry recitation / spoken word.** Enes came on between the musical pieces, in a
  narrator's slot, and **read poetry** — the spoken thread holding the concert together.
  He did not play an instrument at this event.
- **Recording:** <https://www.youtube.com/watch?v=utKGep8f1yI>
  ("Ethnical Music Concert Bilkent University TMT I 14.05.2024")
- **Also:** <https://www.linkedin.com/posts/enes-kaynakci_ethnical-music-concert-bilkent-university-activity-7242824457394786305-WpuY>
  (LinkedIn post, 2024-09-20)
- **Framing note (owner):** no need to name the organizing society — frame this as a
  **poetry performance at a concert**, not as a society membership.
- **Status:** **parked.** Owner wants it in canon now and will decide later whether it lands on the
  technical CV or in a separate **artist portfolio** (see below).
- **Fit if promoted:** `content/leadership.ts`, `category: "creative"` — sits naturally beside
  METU Voicing Society (theatrical poetry moderator), Polemik Yayınları and the poetry books;
  it is the same thread: **poetry performed aloud, on a stage, for an audience.**

---

## Standing idea: separate artist portfolio

Owner has floated splitting the creative track — poetry (*Uyandı Uyudu*, *Sarhoş*), Polemik
Yayınları editing/typesetting, "Raw Şiir", bağlama, theatrical poetry moderation, concert
recitation — out of the technical CV into its own **artist portfolio** surface, rather than
compressing it into the CV's one-line "Leadership & Interests".

Not scoped, not scheduled. Relevant because the master's direction under consideration is
**audio-visual interactive systems / creative tech**, where the artist track is an asset, not a
digression — so this decision is best made together with the master's-target decision.

---

## Technical / publishing (parked 2026-11-10)

Seen in the 2026-11 GitHub sync; owner chose to add only Küre Dizgi for now. All three repos are private.

- **polemik-dizgi-standardi** — Polemik Yayınları prose and fanzine (MDF) typesetting standard as a
  Claude Code skill + scripts: extraction, InDesign/Scribus typesetting, audit, print PDF. A local
  Qwen3.8-27B picks the credits block (künye) by JSON-schema choice over candidates; live measurement:
  **137 files, 0 wrong**. Strongest candidate if a publishing-automation entry is wanted.
- **turkce-ocr** — local Turkish handwriting/print transcription with llama.cpp VLMs (Qwen3-VL-8B,
  PaddleOCR-VL-1.5, Qwen3.6-27B tried), CER/WER eval that keeps Turkish characters. README itself says
  no measured winner was declared — do not claim accuracy numbers.
- **wotne (W.O.T.N.E)** — e-ink belt buckle prototype: portless, wireless charging, shows a
  procedurally generated sigil; parametric build123d CAD. Status P0. Fits the artist-portfolio idea.

Not worth a surface: `dtcfz3` (school library catalog, Supabase + Vercel), `cognec` (Cognex camera
feasibility report), the homelab game server.
