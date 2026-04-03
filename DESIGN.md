# Design System Strategy: Seismic Editorial

This document outlines the visual and structural logic for the earthquake tracking platform. As designers, your goal is to move beyond the "utility dashboard" trope. We are building a high-end, editorialized data experience that balances the urgency of seismic events with the sophisticated calm of a scientific monograph.

## 1. Overview & Creative North Star: "The Digital Observatory"

The Creative North Star for this system is **The Digital Observatory**. 

Unlike standard dashboards that clutter the screen with boxes and lines, this system treats data as a landscape. We use intentional asymmetry, expansive negative space, and a rigorous typographic scale to create an authoritative environment. The aesthetic is "Technical Elegance"—where high-precision data meets a premium, dark-mode editorial layout. We prioritize tonal depth over structural borders, creating a UI that feels layered and atmospheric rather than flat and grid-locked.

## 2. Color Theory: Tonal Depth & Seismic Distinction

Our palette is rooted in the deep void of `surface` (#0c1324), using light and transparency to define hierarchy.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning content. Boundaries must be defined through background color shifts or tonal transitions.
*   **Base:** The main background uses `surface`.
*   **Sections:** Use `surface_container_low` to define large content areas.
*   **Cards:** Nested elements use `surface_container` or `surface_container_high`. 
*   Physicality is achieved through the transition of these hex values, not by drawing lines between them.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets.
*   **Layer 0 (Background):** `surface` (#0c1324).
*   **Layer 1 (Navigation/Sidebar):** `surface_container_low` (#151b2d).
*   **Layer 2 (Primary Feed Cards):** `surface_container` (#191f31).
*   **Layer 3 (Modals/Overlays):** `surface_container_highest` (#2e3447) with a subtle `backdrop-blur`.

### Semantic Color Coding
We use two distinct primary arcs to separate data sources instantly:
*   **Global Data (USGS):** Driven by `primary` (#adc6ff). Use this for international seismic feeds.
*   **Local Data (Kandilli):** Driven by `secondary` (#ffb690). This warm orange provides a high-contrast focal point for Turkish users monitoring local activity.
*   **Intensity:** Use `tertiary` (#ffb3ad) and `error` (#ffb4ab) strictly for high-magnitude alerts (6.0+).

### The "Glass & Gradient" Rule
Floating elements (e.g., map controls, active magnitude indicators) should utilize Glassmorphism. Apply `surface_variant` at 60% opacity with a `20px` backdrop blur. Use a subtle linear gradient from `primary` to `primary_container` at 10% opacity as a background overlay to give "soul" to interactive elements.

## 3. Typography: Editorial Rhythm

The pairing of **Space Grotesk** and **Inter** creates a "Brutalist-Scientific" tension.

*   **Display & Headlines (Space Grotesk):** Used for magnitudes and city names (e.g., "6.4", "İZMİR"). The exaggerated width of Space Grotesk at `display-lg` scale conveys the weight of the data.
*   **Body & Labels (Inter):** Used for technical metadata (Depth, Coordinates, Time). Inter’s neutrality ensures readability in dense data environments.
*   **Turkish Focus:** Ensure all labels use `label-md` in uppercase with `0.05em` letter spacing for a "metadata" look. Example: `DERİNLİK: 7.2 KM`.

## 4. Elevation & Depth: Tonal Layering

Shadows and borders are replaced by light and opacity.

*   **The Layering Principle:** Depth is achieved by "stacking." A card (`surface_container_highest`) placed on a section (`surface_container_low`) creates a natural lift.
*   **Ambient Shadows:** For floating modals, use an extra-diffused shadow: `offset: 0 24px, blur: 48px, color: rgba(7, 13, 31, 0.5)`. This mimics natural light dissipation in a dark environment.
*   **The "Ghost Border" Fallback:** If a separation is visually required for accessibility, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.

## 5. Components

### Magnitude Markers (Markers)
The most critical UI element.
*   **Small (Mag < 3.0):** `outline` ring, no fill.
*   **Medium (Mag 3.0 - 5.0):** `primary` or `secondary` container fill with 40% opacity.
*   **Large (Mag > 5.0):** Solid `primary` or `secondary` fill, with a `surface_bright` "Ghost Border."

### Data Cards
*   **Layout:** Asymmetrical. Magnitude (`display-md`) flush left; Location (`title-lg`) and Time (`label-sm`) stacked right.
*   **Styling:** `surface_container` background, `xl` (0.75rem) roundedness.
*   **Interaction:** On hover, shift background to `surface_container_high`. No border change.

### Source Toggles (USGS vs. Kandilli)
*   Instead of standard radio buttons, use high-end segmented controls.
*   **Active State:** `primary_fixed` for USGS, `secondary_fixed` for Kandilli.
*   **Inactive State:** `surface_variant` with `on_surface_variant` text.

### Seismograph Sparklines
*   Use `surface_tint` for the line color. 
*   Fill the area under the line with a vertical gradient transitioning from `surface_tint` (20% opacity) to transparent.

## 6. Do's and Don'ts

### Do
*   **Do** use `display-lg` for magnitudes. The numbers are the heroes.
*   **Do** use Turkish characters (İ, ı, Ğ, ğ) correctly in Space Grotesk; check for kerning issues in "BÜYÜKLÜK."
*   **Do** lean into negative space. If a card feels crowded, increase the padding (`2rem` minimum for high-level summaries).
*   **Do** use `surface_container_lowest` for the background of the map interface to make the markers pop.

### Don't
*   **Don't** use 100% white (#FFFFFF). Always use `on_surface` (#dce1fb) for high-contrast text to reduce eye strain in dark mode.
*   **Don't** use standard "Drop Shadows" on cards. Stick to Tonal Layering.
*   **Don't** use dividers (`<hr>`). Use a `24px` or `32px` vertical gap to separate list items.
*   **Don't** use generic icons. Use high-stroke-weight, technical iconography that matches the geometry of Space Grotesk.