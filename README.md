<div align="center">

# M&S | 1st Anniversary

*A romantic digital keepsake and interactive web experience celebrating our love story.*

[![Live Demo](https://img.shields.io/badge/demo-online-ff758f?style=flat-square&logo=google-chrome&logoColor=white)](https://to0thpaste.github.io/WebForSha/)
[![GitHub Pages](https://img.shields.io/badge/deployment-GitHub%20Pages-2b2d42?style=flat-square&logo=github&logoColor=white)](https://to0thpaste.github.io/WebForSha/)
[![Frontend](https://img.shields.io/badge/stack-Vanilla%20JS%20%7C%20CSS3%20%7C%20HTML5-ffb3c1?style=flat-square&logo=javascript&logoColor=black)](https://github.com/to0thpaste/WebForSha)

<br />

[**Explore Live Website →**](https://to0thpaste.github.io/WebForSha/)

<br />

<p align="center">
  <a href="#about">About</a> &nbsp;•&nbsp;
  <a href="#features">Features</a> &nbsp;•&nbsp;
  <a href="#tech-stack">Tech Stack</a> &nbsp;•&nbsp;
  <a href="#project-structure">Structure</a> &nbsp;•&nbsp;
  <a href="#getting-started">Getting Started</a> &nbsp;•&nbsp;
  <a href="#performance-optimizations">Performance</a> &nbsp;•&nbsp;
  <a href="#the-story">The Story</a> &nbsp;•&nbsp;
  <a href="#credits">Credits</a>
</p>

</div>

---

<a id="about"></a>
## About

**M&S | 1st Anniversary (`WebForSha`)** is an anniversary website designed as a personal digital time capsule. Built entirely with vanilla web technologies, the project combines glassmorphic UI aesthetics, time-aware color themes, a canvas particle engine, responsive photo memories, and a relationship timeline with zero third-party framework overhead.

The interface is optimized for 60 FPS mobile rendering on Android and iOS while preserving an emotional, romantic atmosphere.

---

<a id="features"></a>
## Key Features

### 🖥️ Interactive Experience
* **Terminal Boot Loader**: An interactive retro CLI simulation that types out initialization logs, monitors asset preloading, and provides a smooth gate into the memory lane.
* **Love Quiz & Secret Note**: A 3-question relationship trivia modal that triggers a canvas celebration (confetti + fireworks) and unlocks a heartfelt personal letter.
* **Synchronized Audio Player**: Custom HTML5 audio player for *"නුඹව සොයා"* (Dilu Beats), paired with a persistent floating bottom control widget that maintains playback state across pages via `sessionStorage`.

### ⏳ Milestones & Storytelling
* **Real-Time Counters**: High-efficiency counters tracking milestones (First Met, Official Start Date, First Kiss) and computing the live countdown to the next anniversary.
* **Relationship Timeline**: Chronological vertical journey cards detailing core relationship milestones with custom glassmorphic panels and Sinhala typography.
* **Typewriter Love Notes**: Dynamic on-scroll cards featuring typewriter animations for romantic messages in Sinhala script.
* **Photo Gallery**: An interactive snapshots grid with modal-ready memory nodes and a dedicated standalone gallery page (`gallery.html`).

### 🎨 Visuals & Ambient Design
* **Canvas Particle Engine**: An ambient floating heart particle system built on HTML5 Canvas, featuring in-place element recycling and automatic density scaling on mobile devices.
* **Time-Reactive Theme Engine**: Dynamic palette shifting between Day (`#ff758f`) and Night (`#ff0055`) based on the client's local time, with manual override support stored in `localStorage`.
* **Liquid Morph Backgrounds**: Hardware-accelerated CSS gradient blobs animated purely on the GPU compositor thread.

---

<a id="tech-stack"></a>
## Technology Stack

The project prioritizes web standards and lightweight execution:

| Layer | Technologies & Tools |
| :--- | :--- |
| **Markup & Structure** | Semantic HTML5, ARIA modal dialog roles, HTML5 Audio, Canvas elements |
| **Styling & Design** | Vanilla CSS3, Design Tokens (CSS Variables), Glassmorphism (`backdrop-filter`), Flexbox, CSS Grid |
| **Client-Side Logic** | Vanilla JavaScript (ES6+ Classes), HTML5 Canvas 2D Context, Web Storage API, Intersection Observer API |
| **Typography** | Google Fonts: *Dancing Script*, *Poppins*, *Maname* (Sinhala script rendering) |
| **Hosting & CI/CD** | GitHub Pages static hosting |

---

<a id="live-demo"></a>
## Live Demo

The website is continuously deployed and accessible at:

> **Live URL:** [https://to0thpaste.github.io/WebForSha/](https://to0thpaste.github.io/WebForSha/)

---

<a id="project-structure"></a>
## Project Structure

```text
WebForSha/
├── index.html                  # Main interactive experience & storyline
├── gallery.html                # Dedicated responsive photo album page
├── style.css                   # Core design tokens, layout & glassmorphic styles
├── app.js                      # Main controller, quiz logic, celebration canvas & routing
├── script.js                   # Navigation & legacy utility handlers
├── favicon.ico                 # Multi-format favicons and touch icons
├── assets/
│   ├── audio/
│   │   └── Nubawa_Soya.mp3     # Featured anniversary soundtrack
│   ├── css/
│   │   ├── animations.css      # GPU-accelerated keyframe animations & reduced-motion rules
│   │   └── theme.css           # Day/Night palette tokens & transition definitions
│   ├── images/                 # Photo memories and responsive gallery assets
│   └── js/
│       ├── love-counter.js     # Milestone counters & anniversary countdown engine
│       ├── particle-engine.js  # Mobile-adaptive HTML5 Canvas heart particle system
│       └── theme-engine.js     # Time-reactive palette controller & event dispatcher
└── README.md                   # Project documentation
```

---

<a id="getting-started"></a>
## Getting Started

Because this project relies exclusively on vanilla web standards, no package installations or build steps are required.

### 1. Clone the repository
```bash
git clone https://github.com/to0thpaste/WebForSha.git
cd WebForSha
```

### 2. Launch locally
For the best experience with audio state persistence and canvas rendering, use a lightweight local HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx serve .
```

Then visit `http://localhost:8000` in your web browser.

---

<a id="performance-optimizations"></a>
## Performance Optimizations

To ensure smooth 60 FPS performance on mid-range mobile devices (Android Chrome / iOS Safari), the codebase includes several targeted architectural improvements:

* **Compositor-Only Transforms**: Morphing backgrounds and particle elements animate strictly via `transform: translate3d(...) rotate(...) scale3d(...)` with `will-change` hints, eliminating continuous layout reflows and CPU paint operations.
* **Zero-Allocation Particle Lifecycle**: Canvas particles recycle via in-place state resetting rather than continuous array allocations (`splice`/`push`), eliminating Garbage Collection stutter.
* **Cached Theme Synchronization**: Color tokens are cached during engine initialization and updated only via `themechanged` events, avoiding repeated `getComputedStyle()` lookups inside the 60 FPS animation loop.
* **Page Visibility Integration**: Timers and canvas animation loops automatically pause when the browser tab is hidden or backgrounded, eliminating idle CPU and battery drain.
* **DOM Update Throttling**: The milestone countdown engine builds DOM structures once and updates cached `textContent` properties on ticks rather than replacing inner HTML.
* **Mobile Density Scaling**: Particle counts automatically scale down (~30–40% count) on screen widths `≤ 768px` to preserve GPU fill rate.
* **Accessibility Support**: Full support for `prefers-reduced-motion: reduce`, gracefully collapsing continuous animations.

---

<a id="the-story"></a>
## The Story

> *"This website was built as a romantic digital keepsake — capturing our first meeting, our favorite songs, shared memories, and our journey together."*

Every date, photograph, song cue, and interactive note reflects a real moment in our love story.

---

<a id="credits"></a>
## Credits

* **Author**: [Menula](https://github.com/to0thpaste) for Shalani 💕
* **Featured Music**: *"නුඹව සොයා"* — Dilu Beats
* **Fonts**: [Google Fonts](https://fonts.google.com/) (*Dancing Script*, *Poppins*, *Maname*)

---

<div align="center">

Made with ❤️ for Shalani (2024 – 2026)

</div>
