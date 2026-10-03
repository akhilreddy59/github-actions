const name = "AKHIL REDDY";
const line = document.getElementById("name-line");

name.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.className = char === " " ? "letter letter-space" : "letter";
  span.textContent = char === " " ? "\u00a0" : char;
  span.style.setProperty("--i", i);
  line.appendChild(span);
});

const phrases = [
  "Developer & Creative Coder",
  "Building delightful interfaces",
  "Motion, pixels & clean code"
];
const typed = document.getElementById("typed");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  typed.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(typeLoop, 70);
    return;
  }

  if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(typeLoop, 1600);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 35);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  setTimeout(typeLoop, 400);
}

setTimeout(typeLoop, 1200);

const spotlight = document.getElementById("spotlight");
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let currentX = targetX;
let currentY = targetY;

window.addEventListener("pointermove", (event) => {
  targetX = event.clientX;
  targetY = event.clientY;
});

function followSpotlight() {
  currentX += (targetX - currentX) * 0.12;
  currentY += (targetY - currentY) * 0.12;
  spotlight.style.setProperty("--mx", `${currentX}px`);
  spotlight.style.setProperty("--my", `${currentY}px`);
  requestAnimationFrame(followSpotlight);
}

followSpotlight();

document.querySelectorAll(".magnetic").forEach((el) => {
  el.addEventListener("pointermove", (event) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });

  el.addEventListener("pointerleave", () => {
    el.style.transform = "";
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.addEventListener("click", (event) => {
  const ripple = document.createElement("span");
  ripple.style.position = "fixed";
  ripple.style.left = `${event.clientX}px`;
  ripple.style.top = `${event.clientY}px`;
  ripple.style.width = "12px";
  ripple.style.height = "12px";
  ripple.style.marginLeft = "-6px";
  ripple.style.marginTop = "-6px";
  ripple.style.border = "2px solid #6ee7ff";
  ripple.style.borderRadius = "50%";
  ripple.style.pointerEvents = "none";
  ripple.style.zIndex = "999";
  ripple.style.animation = "ripple-out 0.6s ease-out forwards";
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});
