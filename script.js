// Change this to the secret code you want to share with the birthday girl.
const SECRET_CODE = "101106";

const gate = document.getElementById("gate");
const site = document.getElementById("site");
const codeInput = document.getElementById("secretCode");
const gateError = document.getElementById("gateError");
const heroTyping = document.getElementById("heroTyping");

document.getElementById("unlockForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (codeInput.value.trim() === SECRET_CODE) {
    gate.classList.add("gate-leaving");
    gate.style.display = "none";
    site.hidden = false;
    document.body.classList.add("unlocked");
    typeLine("Happiest birthday 🫂🥹");
    initReveal();
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 40);
  } else {
    gateError.textContent = "Aiyo 😂 Wrong code! Try again, birthday girl 💗";
    codeInput.value = "";
    codeInput.focus();
  }
});

function typeLine(message) {
  let i = 0;
  heroTyping.textContent = "";
  const timer = setInterval(() => {
    heroTyping.textContent += message.charAt(i);
    i++;
    if (i >= message.length) clearInterval(timer);
  }, 45);
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

document.getElementById("giftButton").addEventListener("click", () => {
  const reveal = document.getElementById("giftReveal");
  reveal.hidden = false;
  document.getElementById("giftButton").innerHTML = "<span>💝</span>";
  document.getElementById("giftButton").setAttribute("aria-label", "Birthday gift opened");
  reveal.scrollIntoView({ behavior: "smooth", block: "center" });
  launchConfetti(70);
});

document.getElementById("confettiButton").addEventListener("click", () => launchConfetti(120));

function launchConfetti(amount = 80) {
  const layer = document.getElementById("confettiLayer");
  const colors = ["#f5a9c9", "#e9c58d", "#fff5ec", "#cf91f5", "#ff7eb4"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--drift", (Math.random() * 220 - 110) + "px");
    piece.style.animationDuration = (2.2 + Math.random() * 3.2) + "s";
    piece.style.animationDelay = (Math.random() * .6) + "s";
    piece.style.opacity = String(.65 + Math.random() * .35);
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), 6500);
  }
}

// Background music is optional. Put an MP3 at audio/birthday-music.mp3.
// Browsers require a tap before audio can start, so the visitor controls it.
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
let musicOn = false;
musicToggle.addEventListener("click", async () => {
  if (!musicOn) {
    try {
      await music.play();
      musicOn = true;
      musicToggle.textContent = "Ⅱ";
      musicLabel.textContent = "Music on";
    } catch (error) {
      musicLabel.textContent = "Add your MP3";
    }
  } else {
    music.pause();
    musicOn = false;
    musicToggle.textContent = "♫";
    musicLabel.textContent = "Birthday mode";
  }
});

window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  document.getElementById("progress").style.width = progress + "%";
});
