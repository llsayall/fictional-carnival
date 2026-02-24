const toastEl = document.getElementById("toast");
const modal = document.getElementById("modal");
const nsfwBtn = document.getElementById("nsfw");
const yes18 = document.getElementById("yes18");
const no18 = document.getElementById("no18");

function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(() => toastEl.classList.remove("show"), 1600);
}

/* ===== STATUS (slower) ===== */
const statuses = [
  "currently: missing shots 🎯",
  "currently: delusional 💕",
  "currently: pretending i’m mysterious",
  "currently: bottom frag but cute",
  "currently: chamber simp (allegedly)"
];

setInterval(() => {
  const el = document.getElementById("status");
  if (!el) return;
  el.textContent = statuses[Math.floor(Math.random() * statuses.length)];
}, 6000); // slower: 6s

/* ===== ROTATING HERO BANNER ===== */
const bannerImages = [
  "https://media.tenor.com/9aVn3p9d8mMAAAAC/anime-blush.gif",
  "https://media.tenor.com/8QKQ9hK0o7UAAAAC/anime-love.gif",
  "https://media.tenor.com/5b4vRZV2K9wAAAAC/anime-smile.gif"
  // replace these with your own later
];

const bannerImg = document.getElementById("bannerImg");
const bannerDots = document.getElementById("bannerDots");
let bannerIndex = 0;

function renderDots(){
  bannerDots.innerHTML = "";
  for (let i = 0; i < bannerImages.length; i++){
    const d = document.createElement("div");
    d.className = "dot" + (i === bannerIndex ? " active" : "");
    d.addEventListener("click", () => {
      bannerIndex = i;
      swapBanner(true);
    });
    bannerDots.appendChild(d);
  }
}

function swapBanner(userClicked = false){
  // zoom reset then re-apply
  bannerImg.classList.remove("zoom");
  setTimeout(() => {
    bannerImg.src = bannerImages[bannerIndex];
    bannerImg.classList.add("zoom");
    renderDots();
  }, 180);

  // optional little toast on click
  if (userClicked) toast("ok pookie 😭💗");
}

function rotateBanner(){
  bannerIndex = (bannerIndex + 1) % bannerImages.length;
  swapBanner(false);
}

renderDots();
bannerImg.classList.add("zoom");
setInterval(rotateBanner, 4500); // rotate every 4.5s

/* ===== NSFW modal ===== */
nsfwBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  toast("🔞 warning: silliness ahead");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
});

/* NO closes modal (no run away) */
no18.addEventListener("click", () => {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  toast("good choice pookie 😭💗");
});

/* wee-woo sound */
function playSirenBeep(){
  try{
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const beep = (freq, t) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = freq;
      g.gain.value = 0.04; // volume
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + t);
      o.stop(ctx.currentTime + t + 0.12);
    };

    beep(880, 0.00);
    beep(660, 0.14);
    beep(880, 0.30);
    beep(660, 0.44);

    setTimeout(() => ctx.close(), 900);
  } catch (e) {}
}

/* YES triggers FBI overlay */
yes18.addEventListener("click", () => {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  playSirenBeep();

  const fbi = document.createElement("div");
  fbi.className = "fbi";
  fbi.innerHTML = `<div class="inner">🚨 FBI OPEN UP 🚨<small>stop gooning. drink water.</small></div>`;
  document.body.appendChild(fbi);

  setTimeout(() => fbi.remove(), 2400);
});
