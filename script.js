// script.js — version debug + relance fiable du son au clic

const grid = document.getElementById("grid-cris");
const globalCounterDiv = document.getElementById("global-counter");
const img = document.getElementById("cry-image");

// --- Sons : adapte les chemins selon ton dépôt (sons/cri1.mp3 etc.) ---
const sons = [];
// Exemple : si tu as cri1.mp3 dans /sons/, garde "sons/cri1.mp3"
for (let i = 1; i <= 70; i++) {
  // Remplace "sons/criX.mp3" par tes vrais fichiers si noms différents
  sons[i] = new Audio(`sons/cri${i}.mp3`);
  // Précharge et ajoute handler d'erreur réseau
  sons[i].preload = "auto";
  sons[i].addEventListener("error", (e) => {
    console.warn(`Audio load error for sons[${i}] (path: sons/cri${i}.mp3)`, e);
  });
}

// --- Couleurs ---
const couleurs = ["#ff3b30", "#007aff", "#ffcc00", "#34c759", "#ff2d55", "#ff9500", "#af52de", "#5ac8fa"];

// --- Données ---
let cris = [];
let globalClicks = 0;
for (let i = 1; i <= 70; i++) {
  cris.push({ id: i, unlocked: i === 1, compteur: 0, nomDebloque: `debloc${i}`, nomBloque: `bloc${i}` });
}

// --- UI ---
function renderGlobalCounter() {
  globalCounterDiv.textContent = `${globalClicks} cris`;
}

function getNextToUnlock() {
  return cris.find(c => !c.unlocked);
}

function tryPlaySound(id) {
  if (!id || !sons[id]) {
    console.warn("tryPlaySound: son introuvable, id =", id);
    return;
  }
  try {
    // reset and play; .play() renvoie une promesse
    sons[id].currentTime = 0;
    const p = sons[id].play();
    if (p && p.catch) {
      p.catch(err => {
        console.error(`Play rejected for sons[${id}]`, err);
      });
    }
  } catch (err) {
    console.error(`Erreur lors du play() pour sons[${id}]`, err);
  }
}

function render() {
  grid.innerHTML = "";
  const next = getNextToUnlock();
  cris.forEach((cri, index) => {
    const div = document.createElement("div");
    div.className = "case" + (cri.unlocked ? "" : " locked");
    div.style.background = couleurs[index % couleurs.length];
    div.innerHTML = cri.unlocked ? `<div>${cri.nomDebloque}</div>` : `<div>🔒</div>`;

    // affichage compteur uniquement pour celui en cours
    if (next && cri.id === next.id) {
      const compteurDiv = document.createElement("div");
      compteurDiv.className = "counter";
      compteurDiv.textContent = `${cri.compteur} / 100`;
      div.appendChild(compteurDiv);
      div.classList.add("unlocking");
    }

    div.onclick = () => {
      // clic utilisateur — doit autoriser la lecture audio
      globalClicks++;
      cri.compteur++;

      // choisir l'id du son à jouer : prochain à débloquer (next) si existe, sinon 1
      const nextNow = getNextToUnlock();
      const playId = nextNow ? nextNow.id : 1;
      console.log("Clic sur case id=", cri.id, "| nextToUnlock id=", playId, "| globalClicks=", globalClicks);

      // relancer le son correspondant
      tryPlaySound(playId);

      // déblocage simple (comme avant)
      cris.forEach(c => {
        const needed = (c.id - 1) * 100;
        if (globalClicks >= needed) c.unlocked = true;
      });

      renderGlobalCounter();
      render();
    };

    grid.appendChild(div);
  });
}

// --- initialisation ---
renderGlobalCounter();
render();

// cliquer sur l'image joue aussi le son du prochain à débloquer
img.addEventListener("click", () => {
  const nextNow = getNextToUnlock();
  const playId = nextNow ? nextNow.id : 1;
  console.log("Clic image -> playId =", playId);
  tryPlaySound(playId);
});
