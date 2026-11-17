<div align="center">
  <h1>⚡ PRAJWAL T RAJ — PROJECT2K25</h1>
  <p><b>A High-Performance, Dual-Mode 3D Canvas Scroll Experience</b></p>
  <p>
    <a href="https://github.com/Prajwaltraj/project2k25">GitHub Repository</a> •
    <a href="https://www.linkedin.com/in/prajwal-t-raj/">LinkedIn Profile</a> •
    <a href="mailto:prajwaltraj213@gmail.com">Contact Prajwal</a>
  </p>
</div>

---

## 🌌 Overview

**Project2k25** is an interactive, visual landing experience crafted by **Prajwal T Raj**. Bending the conventions of standard portfolio websites, it bridges high-fps momentum scrolling with an image-sequenced 3D avatar rendered onto an HTML5 2D canvas.

It features an instant **Dual-Theme Engine** offering:
* ☀️ **Light Mode (Default):** Clean, minimal, high-contrast brutalist aesthetic with smooth typographic loops and subtle monochromatic styling.
* ⚡ **Villain Dark Mode:** Corrupted cyber / dark overlord atmosphere featuring deep abyssal blacks (`#060608`), menacing neon crimson glows (`#ff003c`), atmospheric radial fog, cinematic edge vignettes, and a sinister avatar aura.

---

## ✨ Key Features

* **300-Frame Synchronized 3D Canvas:** Scrubbing through 300 sequential frames (`male0001.png` – `male0300.png`) with smooth aspect-ratio preservation (`scaleImage`), matching user scroll velocity.
* **Locomotive Scroll v3 + GSAP ScrollTrigger:** Custom `scrollerProxy` integration synchronizing virtual smooth momentum scrolling with pinned timeline triggers.
* **Dual-Mode Architecture:** Seamless theme switching persisted via `localStorage` and system `prefers-color-scheme` detection.
* **Atmospheric Villain Vibe:** Radial dark-red aura, glowing drop-shadow canvas filter, pulse indicators, and ruby-stroked marquee typography.
* **Zero-Dependency Procedural Preloader:** Dynamically loads and caches all 300 frames with zero hardcoded bloat.
* **Real-Time Clock Badge:** Live-ticking digital date and time pill built directly into the sticky navigation bar.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Structure** | Semantic HTML5, Canvas 2D API |
| **Styling** | Modern CSS3 (Variables, Backdrop-Filter, Keyframe Animations, Radial Overlays) |
| **Typography** | Syne, Space Grotesk, Gilroy fallback stack |
| **Smooth Scroll** | Locomotive Scroll v3.5.4 |
| **Animation Engine** | GSAP 3.11.5 + ScrollTrigger |
| **Deployment** | Static Web / GitHub Pages / Vercel / Netlify |

---

## 📂 Project Structure

```text
project2k25/
├── index.html          # Semantic structure, navigation, and story chapters
├── styles.css          # CSS Variables, dual-mode themes, and responsive design
├── scripts.js          # Locomotive Scroll, Canvas scrub engine, theme controller
├── male0001.png...     # 300 high-res frames for 3D avatar motion
├── male0300.png
└── README.md           # Documentation & project specifications
```

---

## 🚀 Running Locally

Because this project loads local image sequences onto a `<canvas>`, modern browsers require running it through a local HTTP server to avoid CORS/tainted canvas restrictions:

### Option A: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

### Option B: Python Simple Server
```bash
# In the project directory:
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

### Option C: Node.js (npx serve)
```bash
npx serve .
```

---

## 👤 Author

**Prajwal T Raj**
* **GitHub:** [@Prajwaltraj](https://github.com/Prajwaltraj)
* **LinkedIn:** [Prajwal T Raj](https://www.linkedin.com/in/prajwal-t-raj/)
* **Email:** [prajwaltraj213@gmail.com](mailto:prajwaltraj213@gmail.com)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
