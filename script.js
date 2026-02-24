const toastEl = document.getElementById("toast");
const modal = document.getElementById("modal");
const nsfwBtn = document.getElementById("nsfw");
const yes18 = document.getElementById("yes18");
const no18 = document.getElementById("no18");
const modalRow = document.getElementById("modalRow");

function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  setTimeout(()=>toastEl.classList.remove("show"), 1600);
}

// rotating goofy status
const statuses = [
  "currently: missing shots 🎯",
  "currently: delusional 💕",
  "currently: pretending i’m mysterious",
  "currently: bottom frag but cute",
  "currently: chamber simp (allegedly)"
];
setInterval(()=>{
  const el = document.getElementById("status");
  if (!el) return;
  el.textContent = statuses[Math.floor(Math.random()*statuses.length)];
}, 2500);

// open modal
nsfwBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  toast("🔞 warning: silliness ahead");
});
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

    // wee-woo wee-woo
    beep(880, 0.00);
    beep(660, 0.14);
    beep(880, 0.30);
    beep(660, 0.44);

    setTimeout(()=>ctx.close(), 900);
  } catch(e){
    // if browser blocks audio, just ignore
  }
}
// close modal if you click outside the box
modal.addEventListener("click", (e)=>{
  if (e.target === modal) modal.style.display = "none";
});

// NO runs away (inside the modal row)
function runAway(){
  const r = modalRow.getBoundingClientRect();
  const pad = 6;

  const maxX = r.width - no18.offsetWidth - pad*2;
  const maxY = r.height - no18.offsetHeight - pad*2;

  const x = Math.max(pad, Math.random()*maxX + pad);
  const y = Math.max(pad, Math.random()*maxY + pad);

  no18.style.position = "absolute";
  no18.style.left = x + "px";
  no18.style.top = y + "px";

  toast("nice try 😭");
}

no18.addEventListener("click", () => {
  modal.style.display = "none";
  toast("good choice pookie 😭💗");
});

playSirenBeep();
// YES triggers FBI overlay
yes18.addEventListener("click", () => {
  modal.style.display = "none";

  const fbi = document.createElement("div");
  fbi.className = "fbi";
  fbi.innerHTML = `🚨 FBI OPEN UP 🚨<small>stop gooning. drink water.</small>`;
  document.body.appendChild(fbi);

  setTimeout(()=>fbi.remove(), 2400);
});
