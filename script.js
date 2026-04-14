const navLinks = document.querySelectorAll('.team-nav a[href^="#"]');
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const interactiveCards = document.querySelectorAll(".interactive-card, .interactive-lift");
const canvas = document.getElementById("node-canvas");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    const target = id ? document.querySelector(id) : null;

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 50, 220)}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

function applyInteractiveTilt(element, event, strength = 10) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * strength;
  const rotateX = (0.5 - (y / rect.height)) * strength;
  element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
}

interactiveCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => applyInteractiveTilt(card, event, 8));
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;
let parallaxTicking = false;

function renderParallax() {
  parallaxItems.forEach((item) => {
    const strength = Number(item.dataset.parallax || 8);
    const x = ((pointerX / window.innerWidth) - 0.5) * strength;
    const y = ((pointerY / window.innerHeight) - 0.5) * strength;
    item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
  parallaxTicking = false;
}

window.addEventListener("mousemove", (event) => {
  pointerX = event.clientX;
  pointerY = event.clientY;
  if (!parallaxTicking) {
    window.requestAnimationFrame(renderParallax);
    parallaxTicking = true;
  }
}, { passive: true });

if (canvas) {
  const context = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let rafId = 0;
  let mouse = { x: 0.5, y: 0.35 };

  const nodes = Array.from({ length: 34 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00055,
    vy: (Math.random() - 0.5) * 0.00055,
    size: Math.random() * 2.2 + 1.6,
  }));

  function resizeCanvas() {
    const shell = canvas.parentElement;
    if (!shell) return;
    width = shell.clientWidth;
    height = shell.clientHeight;
    canvas.width = Math.max(1, Math.floor(width * window.devicePixelRatio));
    canvas.height = Math.max(1, Math.floor(height * window.devicePixelRatio));
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  }

  function drawNetwork() {
    context.clearRect(0, 0, width, height);

    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];

      if (!prefersReducedMotion) {
        a.x += a.vx;
        a.y += a.vy;

        if (a.x <= 0.05 || a.x >= 0.95) a.vx *= -1;
        if (a.y <= 0.05 || a.y >= 0.95) a.vy *= -1;
      }

      const ax = a.x * width + (mouse.x - 0.5) * 34;
      const ay = a.y * height + (mouse.y - 0.5) * 26;

      for (let j = i + 1; j < nodes.length; j += 1) {
        const b = nodes[j];
        const bx = b.x * width + (mouse.x - 0.5) * 26;
        const by = b.y * height + (mouse.y - 0.5) * 18;
        const dx = ax - bx;
        const dy = ay - by;
        const distance = Math.sqrt((dx * dx) + (dy * dy));

        if (distance < 160) {
          const alpha = 1 - (distance / 160);
          context.strokeStyle = `rgba(122, 222, 167, ${alpha * 0.18})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(ax, ay);
          context.lineTo(bx, by);
          context.stroke();
        }
      }

      context.fillStyle = "rgba(164, 240, 196, 0.78)";
      context.beginPath();
      context.arc(ax, ay, a.size, 0, Math.PI * 2);
      context.fill();
    }

    if (!prefersReducedMotion) {
      rafId = window.requestAnimationFrame(drawNetwork);
    }
  }

  resizeCanvas();
  drawNetwork();

  window.addEventListener("resize", () => {
    resizeCanvas();
    if (prefersReducedMotion) {
      drawNetwork();
    }
  });

  window.addEventListener("mousemove", (event) => {
    mouse = {
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight,
    };

    if (prefersReducedMotion) {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(drawNetwork);
    }
  }, { passive: true });
}
