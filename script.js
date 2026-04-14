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
  let pointer = { x: 0.5, y: 0.28 };
  let smoothPointer = { x: 0.5, y: 0.28 };

  const stars = Array.from({ length: Math.max(28, Math.floor(window.innerWidth / 68)) }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00018,
    vy: (Math.random() - 0.5) * 0.00016,
    radius: 1.1 + (Math.random() * 1.8),
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

    smoothPointer.x += (pointer.x - smoothPointer.x) * 0.06;
    smoothPointer.y += (pointer.y - smoothPointer.y) * 0.06;

    const positionX = (smoothPointer.x - 0.5) * 42;
    const positionY = (smoothPointer.y - 0.5) * 30;
    const starPositions = [];

    stars.forEach((star) => {
      if (!prefersReducedMotion) {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x <= 0 || star.x >= 1) star.vx *= -1;
        if (star.y <= 0 || star.y >= 1) star.vy *= -1;
      }

      const x = (star.x * width) + positionX;
      const y = (star.y * height) + positionY;
      starPositions.push({ x, y, radius: star.radius });
    });

    for (let i = 0; i < starPositions.length; i += 1) {
      const a = starPositions[i];

      for (let j = i + 1; j < starPositions.length; j += 1) {
        const b = starPositions[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt((dx * dx) + (dy * dy));

        if (distance > 0 && distance < 170) {
          const alpha = (1 - (distance / 170)) * 0.12;
          context.strokeStyle = `rgba(181, 225, 205, ${alpha})`;
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }
    }

    starPositions.forEach((star) => {
      context.fillStyle = "rgba(171, 224, 199, 0.72)";
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
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
    pointer = {
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight,
    };

    if (prefersReducedMotion) {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(drawConstellation);
    }
  }, { passive: true });
}
