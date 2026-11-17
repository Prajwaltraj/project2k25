/**
 * Project2k25 Engine
 * Author: Prajwal T Raj
 * Stack: Locomotive Scroll + GSAP ScrollTrigger + HTML5 Canvas 3D Sequence
 */

// ==========================================================================
// 1. Locomotive Scroll & GSAP ScrollTrigger Setup
// ==========================================================================
let locoScroll;

function initLocomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollContainer = document.querySelector("#main");
  if (!scrollContainer) return;

  locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    multiplier: 1,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

// ==========================================================================
// 2. Canvas & 300-Frame Image Sequence Engine (Fixed Background)
// ==========================================================================
const canvas = document.querySelector("#hero-canvas") || document.querySelector("canvas");
const context = canvas ? canvas.getContext("2d") : null;
const frameCount = 300;
const images = [];
const imageSeq = {
  frame: 0,
};

// Procedural, zero-padded asset resolver
function files(index) {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `./male${frameNumber}.png`;
}

// Preload all 300 frames
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

// Responsive canvas sizing
function setCanvasSize() {
  if (!canvas || !context) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}

window.addEventListener("resize", function () {
  setCanvasSize();
  if (locoScroll) {
    ScrollTrigger.refresh();
  }
});

// Aspect-ratio cover image scaling on 2D canvas (centered)
function scaleImage(img, ctx) {
  if (!img || !img.complete || img.naturalWidth === 0) return;
  const cvs = ctx.canvas;
  const hRatio = cvs.width / img.width;
  const vRatio = cvs.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (cvs.width - img.width * ratio) / 2;
  const centerShift_y = (cvs.height - img.height * ratio) / 2;

  ctx.clearRect(0, 0, cvs.width, cvs.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}

function render() {
  if (!context || !images[imageSeq.frame]) return;
  scaleImage(images[imageSeq.frame], context);
}

// Render first frame as soon as ready
if (images[0]) {
  if (images[0].complete && images[0].naturalWidth > 0) {
    render();
  } else {
    images[0].onload = render;
  }
}

// ==========================================================================
// 3. GSAP ScrollTrigger Sequence Scrubbing (Full Page Scroll)
// ==========================================================================
function initScrollAnimations() {
  // Scrub 300 frames across the entire journey from #page through #page3
  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.15,
      trigger: "#page",
      endTrigger: "#page3",
      start: "top top",
      end: "bottom bottom",
      scroller: "#main",
    },
    onUpdate: render,
  });

  // Smooth entrance reveals for chapter text
  const sections = [
    { trigger: "#page1", elements: "#page1 .chapter-col" },
    { trigger: "#page2", elements: "#page2 .chapter-col" },
    { trigger: "#page3", elements: "#page3 .chapter-col" },
  ];

  sections.forEach((sec) => {
    gsap.fromTo(
      sec.elements,
      { opacity: 0.2, y: 30 },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec.trigger,
          start: "top 75%",
          end: "top 25%",
          scrub: 0.2,
          scroller: "#main",
        },
      }
    );
  });
}

// ==========================================================================
// 4. Live Date & Time Engine
// ==========================================================================
function updateDateTime() {
  const datetimeEl = document.getElementById("datetime");
  if (!datetimeEl) return;

  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString("en-US", { month: "short" });
  const year = now.getFullYear();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  datetimeEl.innerHTML = `${day} ${month} ${year}<br><span class="time-string">${time}</span>`;
}

// ==========================================================================
// 5. Dual-Mode Theme Switcher (Light & Villain Dark)
// ==========================================================================
function applyTheme(theme, save = true) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);

  if (save) {
    try {
      localStorage.setItem("prajwal_theme", theme);
    } catch (e) {
      // Ignore storage access errors
    }
  }

  // Update theme toggle label
  const label = document.querySelector(".theme-label");
  if (label) {
    label.textContent = theme === "dark" ? "VILLAIN" : "LIGHT";
  }

  // Update mobile browser chrome color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute("content", theme === "dark" ? "#060608" : "#f1f1f1");
  }

  // Redraw canvas frame
  render();
}

function initTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("prajwal_theme");
  } catch (e) {
    savedTheme = null;
  }

  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  applyTheme(initialTheme, false);

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  }
}

// ==========================================================================
// 6. Application Lifecycle
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  setCanvasSize();
  initTheme();
  initLocomotive();
  initScrollAnimations();
  updateDateTime();
  setInterval(updateDateTime, 1000);
});
