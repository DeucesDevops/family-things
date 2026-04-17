# Design System Document: The Editorial Hearth

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Heirloom"**

This design system rejects the sterile, "software-as-a-service" aesthetic in favor of a high-end editorial experience. It is designed to feel like a premium family journal or a curated scrapbooked memory. We achieve this by breaking the rigid "app-grid" mentality through **intentional asymmetry**, **layered surfaces**, and **authoritative typography**. 

The goal is to move away from "functional utility" toward "emotional residence." We use generous breathing room (white space) and a sophisticated hierarchy to ensure that even the most chaotic family schedule feels like a calm, intentional narrative.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the earth (Forest Green) and accented by the warmth of domestic life (Coral and Golden Yellow).

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. 
Boundaries must be defined through:
1.  **Background Color Shifts:** Placing a `surface-container-low` component on a `surface` background.
2.  **Tonal Transitions:** Using the `surface-variant` to imply a change in context.
3.  **Vertical Space:** Utilizing the spacing scale to create mental boundaries.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. 
*   **Base:** `surface` (#e9ffed) – The foundation.
*   **The Well:** `surface-container-low` (#e1fae7) – Used for recessed areas like sidebars or secondary feeds.
*   **The Stage:** `surface-container-lowest` (#ffffff) – Reserved for the most important cards or active content areas to create a "lifted" feel.

### The "Glass & Gradient" Rule
To avoid a flat, "templated" look:
*   **Glassmorphism:** Use semi-transparent `surface` colors with a `backdrop-blur` (20px+) for floating navigation bars or overlays. This allows the lush forest tones to bleed through.
*   **Signature Textures:** Apply a subtle linear gradient from `primary` (#0f5238) to `primary_container` (#2d6a4f) for hero CTAs. This adds "soul" and depth that a flat hex code cannot achieve.

---

## 3. Typography
The system utilizes a high-contrast pairing to balance heritage with modern readability.

*   **Display & Headlines (The Serif):** `Newsreader` (or Fraunces). This is our editorial voice. Use `display-lg` (3.5rem) with tighter letter-spacing for a "Vogue-meets-National-Geographic" feel. It conveys authority and warmth.
*   **Body & Titles (The Sans):** `Plus Jakarta Sans` (or DM Sans). Chosen for its geometric clarity and friendly apertures. It keeps the "planning" aspect of the app feeling efficient and modern.

**Identity Tip:** Use `headline-sm` for family names or event titles, paired immediately with `label-md` in `secondary` (#9d4223) for metadata (dates/locations). The serif/sans contrast is our primary brand signifier.

---

## 4. Elevation & Depth
We eschew the "standard" Material shadow for a more organic, ambient light model.

*   **The Layering Principle:** Stacking `surface-container` tiers is the primary method of elevation. A `surface-container-lowest` card on a `surface-dim` background provides all the "lift" necessary.
*   **Ambient Shadows:** If a floating element (like a FAB) requires a shadow, use a blur of `32px` at `6%` opacity. The shadow color must be a tint of `on-surface` (#0b1f14), never pure black, to mimic natural light filtered through a forest canopy.
*   **The "Ghost Border" Fallback:** If a container requires definition for accessibility, use the `outline_variant` token at **15% opacity**. This creates a suggestion of a boundary without the "boxed-in" feeling of traditional UI.

---

## 5. Components

### Buttons
*   **Primary:** Rounded `full` (9999px) with the primary-to-container gradient. No shadow.
*   **Secondary:** `surface-container-highest` background with `on-surface` text.
*   **Interaction:** On hover, shift the gradient 15% or increase the `backdrop-blur`.

### Cards & Lists
*   **The No-Divider Rule:** Explicitly forbid horizontal lines between list items. Instead, use a `3.5rem` (spacing-10) vertical gap or alternating `surface-container` shifts.
*   **Radii:** Use `xl` (3rem) for large dashboard cards and `DEFAULT` (1rem) for internal elements (nested images or buttons).

### Input Fields
*   **Style:** Minimalist. No bottom line or box. Use a `surface-container-low` pill shape with `plusJakartaSans` body text. 
*   **Focus State:** Instead of a thick border, use a subtle `primary` glow (8px blur, 10% opacity).

### Specialized Components: "The Family Timeline"
*   A custom component that uses the `tertiary` (Golden Yellow) for milestones. 
*   Avoid a straight line; use an organic, slightly curved SVG path to connect events, reinforcing the "family-oriented" softness.

---

## 6. Do's and Don'ts

### Do:
*   **Asymmetry:** Place a large `display-lg` headline off-center to create an editorial layout.
*   **Layering:** Let a `secondary_container` (Coral) element slightly overlap the edge of a `primary` card.
*   **Breathability:** Use `spacing-16` (5.5rem) for section headers. White space is a luxury feature.

### Don't:
*   **Don't** use 100% opaque borders. They create visual noise and "grid-lock."
*   **Don't** use sharp corners. Every corner must be at least `sm` (0.5rem) to maintain the "approachable" brand promise.
*   **Don't** use "pure" grey. Every neutral in this system is tinted with green or cream to maintain warmth.

---

## 7. Token Reference Summary

| Token Type | Value | Intent |
| :--- | :--- | :--- |
| **Primary Base** | #0f5238 | Authority, Growth, Trust |
| **Accent (Coral)** | #9d4223 | Warmth, Energy, Action |
| **Corner (xl)** | 3rem | "The Softened Edge" / Safety |
| **Spacing (6)** | 2rem | Standard gutter for editorial flow |
| **Shadow** | 0 20px 40px rgba(11, 31, 20, 0.06) | Ambient, Natural Lift |