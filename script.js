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
  "currently: hi pookies.exe running…"
];

setInterval(() => {
  const el = document.getElementById("status");
  if (!el) return;
  el.textContent = statuses[Math.floor(Math.random() * statuses.length)];
}, 6000);

/* ===== HUSBANDS: spotlight rotation + gentle position swap =====
   Replace image URLs with real ones later.
*/
const husbands = [
  { name: "Chamber (my lawyer)", img: "" },
  { name: "random fav", img: "https://media.tenor.com/another-gif.gif" },
  { name: "emotionally unavailable", img: "https://media.tenor.com/another.gif" }
];

let order = [0, 1, 2];     // display order indices
let spotlight = 0;         // which position is spotlighted (0/1/2)

const grid = document.getElementById("husbandGrid");
const dots = document.getElementById("husbandDots");
const shuffleBtn = document.getElementById("shuffleBtn");

function renderDots(){
  dots.innerHTML = "";
  for (let i = 0; i < 3; i++){
    const d = document.createElement("div");
    d.className = "dot-ind" + (i === spotlight ? " active" : "");
    dots.appendChild(d);
  }
}

function renderHusbands(){
  grid.innerHTML = "";

  for (let pos = 0; pos < 3; pos++){
    const idx = order[pos];
    const item = husbands[idx];

    const card = document.createElement("div");
    card.className = "husband-card" + (pos === spotlight ? " spotlight" : "");

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;

    const name = document.createElement("div");
    name.className = "husband-name";
    name.textContent = item.name;

    card.appendChild(img);
    card.appendChild(name);
    grid.appendChild(card);
  }

  renderDots();
}

/* gentle swap: rotate order and move spotlight */
function tickRotate(){
  // rotate the displayed order (gentle swap)
  order = [order[2], order[0], order[1]];

  // move spotlight to next position
  spotlight = (spotlight + 1) % 3;

  renderHusbands();
}

/* shuffle button */
function fisherYatesShuffle(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

shuffleBtn.addEventListener("click", () => {
  order = fisherYatesShuffle(order);
  spotlight = Math.floor(Math.random() * 3);
  renderHusbands();
  toast("re-rolling my type 🎀😭");
});

/* initial render + auto rotate */
renderHusbands();
setInterval(tickRotate, 5000);

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

/* NO closes modal */
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
      g.gain.value = 0.04;
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
