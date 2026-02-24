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

/* rotating goofy status */
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
}, 2500);

/* open modal */
nsfwBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  toast("🔞 warning: silliness ahead");
});

/* close modal if click outside */
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
});

/* NO = just close */
no18.addEventListener("click", () => {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  toast("good choice pookie 😭💗");
});

/* wee-woo beep using Web Audio */
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

    // wee-woo pattern
    beep(880, 0.00);
    beep(660, 0.14);
    beep(880, 0.30);
    beep(660, 0.44);

    setTimeout(() => ctx.close(), 900);
  } catch (e) {
  }
}

/* YES = FBI overlay + siren flash + sound */
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
