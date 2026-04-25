# Design System Specification

## 1. Overview & Creative North Star
**Creative North Star: The Liturgical Ledger**
This design system moves away from the utilitarian constraints of a paper "run sheet" and into a high-end, editorial digital experience. It is designed to feel like a premium digital concierge for production teams—authoritative, serene, and immaculately organized. We achieve this by rejecting the "grid-of-lines" layout in favor of **Organic Layering**. 

The interface should feel like stacked sheets of heavy-stock paper resting on a polished stone surface. We prioritize breathability, using intentional asymmetry and significant whitespace to reduce the cognitive load of a high-pressure live production environment.

## 2. Colors
The color strategy utilizes a "Forest and Stone" palette. The deep forest green (`primary`) provides an anchor of tradition and stability, while the varied neutral tones provide modern architectural depth.

*   **Primary Roles:** Use `primary` (#15422e) for core identity and primary actions. Use `primary_container` (#2e5a44) for secondary emphasis.
*   **The "No-Line" Rule:** To achieve a premium editorial feel, **prohibit 1px solid borders for sectioning.** Boundaries between "Microphones" and "Stage Inputs" must be defined solely through background color shifts. For example, a `surface_container_low` section sitting on a `surface` background provides enough contrast to indicate a new region without the "visual noise" of lines.
*   **Surface Hierarchy & Nesting:** Use the `surface_container` tiers to create depth. 
    *   Main background: `surface` (#f9f9f8).
    *   Main content blocks: `surface_container_low` (#f3f4f3).
    *   Interactive cards (e.g., individual microphone inputs): `surface_container_lowest` (#ffffff).
*   **The "Glass & Gradient" Rule:** For floating navigation or "Now Playing" overlays, use Glassmorphism. Apply `surface` with 80% opacity and a `backdrop-blur`.
*   **Signature Textures:** For high-level status or hero sections, use a subtle linear gradient from `primary` (#15422e) to `primary_container` (#2e5a44) at a 135-degree angle.

## 3. Typography
We use a high-contrast typographic scale to differentiate between "Instruction" and "Data."

*   **Display & Headlines (Manrope):** Use Manrope for all structural labels and headers. It provides a geometric, modern architectural feel. `headline-lg` should be used for the main "Service Type" or "Date," ensuring the most vital information is unmistakable.
*   **Body & Labels (Inter):** Use Inter for technical data like "Microphone Assignment" or "Input Channel." It is designed for high legibility at small sizes.
*   **The Editorial Tilt:** Use `label-sm` in all caps with a tracking (letter-spacing) of 0.05rem for section headers (e.g., "STAGE INPUTS"). This mimics high-end magazine layout styles.

## 4. Elevation & Depth
In this system, depth is a function of light and tone, not lines.

*   **The Layering Principle:** Stack `surface_container_lowest` cards on top of a `surface_container_low` background to create a "lifted" effect. This replaces the need for table borders seen in paper forms.
*   **Ambient Shadows:** For floating elements (like a "Save" FAB or a "Filter" menu), use a diffused shadow: `box-shadow: 0 12px 32px rgba(25, 28, 28, 0.06);`. The shadow color is a low-opacity version of `on_surface`.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` (#c1c9c1) at 20% opacity. This creates a "whisper" of a line that defines space without cluttering it.
*   **Glassmorphism:** Use semi-transparent layers for elements that sit "above" the dashboard flow, allowing the forest green accents of the dashboard to bleed through softly.

## 5. Components

### Input Fields & Controls
*   **Modern Inputs:** Do not use four-sided boxes. Use a `surface_container_highest` background with a `md` (0.375rem) corner radius. Upon focus, transition the background to `surface_container_lowest` and add a `primary` 2px bottom-heavy indicator.
*   **Buttons:**
    *   *Primary:* `primary` background, `on_primary` text. Use `xl` (0.75rem) rounding for a "pill" feel that breaks the rigid rectangular layout.
    *   *Secondary:* `secondary_container` background with `on_secondary_container` text.
*   **Status Chips:** For "Mics Active" or "Assigned," use `secondary_fixed` (#d2e8d9) with `label-md` Inter typography. Rounding should be `full`.

### Dashboard Specifics
*   **Input Cards:** Replace the paper table rows with individual "cards." Each card uses `surface_container_lowest` and a spacing of `4` (0.9rem) between content blocks.
*   **Section Dividers:** Use vertical whitespace (spacing `10` or `12`) instead of horizontal lines. Let the "void" define the transition from "Headset Mics" to "Wireless Handhelds."
*   **Tonal Progress Bars:** For audio levels or battery life, use a `primary_fixed` track with a `primary` indicator. Avoid harsh neon greens; stay within the forest palette.

## 6. Do's and Don'ts

### Do
*   **Do** use the `20` (4.5rem) and `24` (5.5rem) spacing scales for "hero" margins to create an expensive, editorial feel.
*   **Do** use `headline-sm` for section titles, paired with a small `primary` colored square (0.5rem x 0.5rem) to the left to anchor the eye.
*   **Do** rely on `on_surface_variant` (#414943) for secondary text (like "Role" descriptions) to maintain a soft, sophisticated contrast.

### Don't
*   **Don't** use 100% black. Use `on_background` (#191c1c) for all "black" text to keep the interface feeling natural.
*   **Don't** use `DEFAULT` (0.25rem) rounding for large containers. Reserve it for small UI primitives; use `lg` or `xl` for main dashboard modules to soften the technical nature of the app.
*   **Don't** use standard table dividers. If content feels messy, increase the `spacing` scale rather than adding a line. 
*   **Don't** use high-contrast shadows. If you can clearly see where the shadow ends, it is too heavy. It should feel like a soft glow.