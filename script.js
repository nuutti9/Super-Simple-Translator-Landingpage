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
  let mouse = { x: 0.5, y: 0.32 };

  const clusterNodes = Array.from({ length: 22 }, () => ({
    x: 0.18 + (Math.random() * 0.64),
    y: 0.06 + (Math.random() * 0.42),
    vx: (Math.random() - 0.5) * 0.00022,
    vy: (Math.random() - 0.5) * 0.00018,
    size: Math.random() * 1.8 + 1.8,
  }));

  const ambientStars = Array.from({ length: 20 }, () => ({
    x: Math.random(),
    y: Math.random() * 0.72,
    size: Math.random() * 1.5 + 1.1,
    alpha: 0.2 + (Math.random() * 0.28),
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

  function drawConstellation() {
    context.clearRect(0, 0, width, height);

    ambientStars.forEach((star) => {
      context.fillStyle = `rgba(182, 236, 208, ${star.alpha})`;
      context.beginPath();
      context.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
      context.fill();
    });

    const projected = clusterNodes.map((node) => {
      if (!prefersReducedMotion) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0.14 || node.x >= 0.86) node.vx *= -1;
        if (node.y <= 0.04 || node.y >= 0.5) node.vy *= -1;
      }

      const mx = (mouse.x - 0.5) * 58;
      const my = (mouse.y - 0.28) * 44;
      const px = (node.x * width) + mx;
      const py = (node.y * height) + my;
      return { px, py, size: node.size };
    });

    projected.forEach((point, index) => {
      const distances = projected
        .map((other, otherIndex) => ({
          other,
          otherIndex,
          distance: Math.hypot(point.px - other.px, point.py - other.py),
        }))
        .filter((entry) => entry.otherIndex !== index && entry.distance < 240)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      distances.forEach(({ other, distance, otherIndex }) => {
        if (otherIndex < index) return;
        const alpha = Math.max(0, 1 - (distance / 240)) * 0.12;
        context.strokeStyle = `rgba(152, 221, 187, ${alpha})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(point.px, point.py);
        context.lineTo(other.px, other.py);
        context.stroke();
      });
    });

    projected.forEach((point) => {
      context.fillStyle = "rgba(160, 231, 198, 0.7)";
      context.beginPath();
      context.arc(point.px, point.py, point.size, 0, Math.PI * 2);
      context.fill();
    });

    if (!prefersReducedMotion) {
      rafId = window.requestAnimationFrame(drawConstellation);
    }
  }

  resizeCanvas();
  drawConstellation();

  window.addEventListener("resize", () => {
    resizeCanvas();
    if (prefersReducedMotion) {
      drawConstellation();
    }
  });

  window.addEventListener("mousemove", (event) => {
    mouse = {
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight,
    };

    if (prefersReducedMotion) {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(drawConstellation);
    }
  }, { passive: true });
}
