# Sunday Production — Claude Code Context

## What this project is
A multi-tenant sound production dashboard for liturgical churches (Anglican, Catholic, Episcopal, Lutheran). Each church (tenant) logs in with a single shared account, completes a setup wizard on first login, and gets a fully branded run sheet and — in progress — a Run of Show tied to their prayer book and Planning Center service plan.

Live URL: **https://cca-production.vercel.app**
Repo: **https://github.com/Highamm-coder/CCA**

---

## Stack
- **Single-file app** — everything lives in `index.html`. No build step, no bundler, no framework.
- **Tailwind CSS** via CDN (`tailwind.config` is inline in the `<head>`). Runtime color changes use injected `<style id="org-theme">` with `!important` overrides — you cannot use `safelist` or rebuild at runtime.
- **Supabase** (`@supabase/supabase-js@2`) for auth, database, and realtime.
  - Project ref: `kjsywrmlkwptonunvxep`
  - URL: `https://kjsywrmlkwptonunvxep.supabase.co`
  - Anon key: `sb_publishable_mnr8Iyi6LXYut7l4qb-_Sg__QrpOQjO`
- **Fonts**: Manrope (headlines), Inter (body) — both via Google Fonts.
- **Icons**: Material Symbols Outlined via Google Fonts.
- **Deployment**: Vercel (auto-deploys from `main` branch).

---

## Database schema

### `run_sheets`
| Column | Type | Notes |
|--------|------|-------|
| `user_id` | `uuid` PK | = `auth.uid()` — one row per org |
| `data` | `jsonb` | Run sheet state (mic assignments, routing, notes) |
| `org_config` | `jsonb` | Church config (name, color, inputs, wireless, channels, prayer_book) |
| `run_of_show` | `jsonb` | Ordered array of ROS items *(column to be added)* |
| `pco_tokens` | `jsonb` | Planning Center OAuth tokens *(column to be added)* |
| `updated_at` | `timestamptz` | Auto-updated |

RLS: `user_id = auth.uid()` on all operations.
Realtime enabled via `supabase_realtime` publication.

---

## Key state variables
```js
let _data    = {};      // run sheet data (saved to data column)
let _config  = null;    // org config (saved to org_config column)
let _userId  = null;    // supabase auth uid
let _channel = null;    // realtime channel (must be cleaned up on logout)
```

---

## Multi-tenant architecture
- One Supabase Auth user = one church/org
- `auth.uid()` is the org key — no separate org table
- `_config` drives all rendering: church name, primary colour, input count/names, headset count, wireless count, console channel count, prayer book
- `applyTheme(hex)` injects CSS overrides for all `bg-primary`, `text-primary`, etc. Tailwind classes at runtime
- First login (no `org_config` row) → `showWizard()` — 4-step setup
- Subsequent logins → `applyTheme()` → `showApp()`

---

## `_config` shape
```js
{
  name: "Christ Church Anglican",
  color: "#15422e",
  console_channels: 24,
  prayer_book: "bcp2019",          // bcp2019 | bcp1979 | roman_missal | bcp1662 | bas | other
  denomination: "anglican_acna",   // drives service templates
  inputs: [
    { key: "i1", label: "Piano", role: "instrument" },
    // ... up to N inputs
  ],
  headsets: [
    { key: "hs1", label: "Celebrant" },
    { key: "hs2", label: "Deacon" },
  ],
  wireless: [
    { key: "w1", label: "Lector" },
    { key: "w2", label: "Cantor" },
    // ...
  ]
}
```

Data keys (`hs1`, `w1`, `i1r` etc.) must remain stable — they are the keys in `_data`.

---

## `_data` shape (run sheet)
Keys are derived from config: `hs1`, `hs2`, `w1`–`wN`, `i1r`–`iNm` (r = routing channel, m = mute state), plus `notes`.

---

## Design system
See `DESIGN.md` for full spec. Key rules:
- **No 1px borders for sectioning** — use background color shifts instead
- **Surface hierarchy**: `surface` → `surface-container-low` → `surface-container-lowest`
- **Typography**: Manrope for headlines/labels, Inter for data
- **Inputs**: underline style (`f-edit` class) — `surface-container-highest` bg + 2px bottom border on focus
- **Buttons**: pill shape (`rounded-full`), `bg-primary text-on-primary`
- **Shadows**: diffused only — `0 12px 32px rgba(25,28,28,0.06)`
- **Color tokens**: always use semantic names (`text-primary`, `bg-surface`, etc.), never raw hex in HTML

---

## Sections (nav)
- `overview` — Run Sheet (default)
- `run-of-show` — Run of Show *(to be built)*
- `settings` — Settings

Mobile: bottom nav bar. Desktop: left sidebar (256px). Both share `data-section` attribute for routing via `goTo(id)`.

---

## Feature roadmap (in progress)

### Phase 1 — Liturgical foundations
- [ ] Prayer book selector in setup wizard
- [ ] Liturgical role presets (Celebrant, Deacon, Lector, Cantor, Verger)
- [ ] Service type templates (Anglican Eucharist, Mass, Morning Prayer, Wedding, Funeral)
- [ ] Run of Show section with mic cue assignments
- [ ] BCP 2019 / BCP 1979 lectionary + Collect of the Day (embedded JSON, keyed off liturgical calendar)
- [ ] Supabase migration: `run_of_show jsonb` column

### Phase 2 — Planning Center
- [ ] Register PCO OAuth app at `api.planningcenteronline.com`
- [ ] PCO OAuth connect flow in Settings
- [ ] Import PCO plan → ROS items
- [ ] Supabase migration: `pco_tokens jsonb` column

### Phase 3 — Polish
- [ ] Live Mode (tap-to-advance during service)
- [ ] Print / export ROS as mic cue sheet

---

## Conventions
- All JS is vanilla, inline in `index.html` below the HTML
- Functions are global (no modules) — keep names descriptive and prefixed by domain (`cfg*`, `wiz*`, `ros*`, `pco*`)
- Never use `innerHTML` with user-supplied strings — use `textContent` or sanitize
- Supabase calls always `await`ed with destructured `{ data, error }`
- Always clean up realtime channels before creating new ones (`_channel` pattern)
- Don't add comments unless logic is non-obvious
- Don't add error handling for impossible states

---

## Liturgical calendar
The app already computes the current liturgical season (Advent, Christmas, Epiphany, Lent, Easter, Ordinary/Proper) and displays it in the header chip. The Collect of the Day feature will extend this to return the proper number (e.g. "Proper 12") and look it up in an embedded lectionary JSON object.

---

## Deployment notes
- Vercel auto-deploys on push to `main`
- No environment variables — Supabase credentials are public anon key (safe for client-side)
- When a custom domain is purchased: add it to Supabase Auth → URL Configuration alongside the Vercel URL
- PCO OAuth redirect URI will need updating to the new domain when purchased
