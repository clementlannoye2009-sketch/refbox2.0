const grid = document.getElementById("grid-cris");
const globalCounterDiv = document.getElementById("global-counter");
const img = document.getElementById("cry-image");

// --- Sons ---
// Exemple pour 70 sons : tu remplaces "AJOUTER TON SON" par tes fichiers MP3
const sons = [];
sons[1] = new Audio("sons/cri1.mp3");
sons[2] = new Audio("sons/cri2.mp3");
sons[3] = new Audio("sons/cri3.mp3");
sons[4] = new Audio("sons/cri4.mp3");
sons[5] = new Audio("sons/cri5.mp3");
sons[6] = new Audio("sons/cri6.mp3");
sons[7] = new Audio("sons/cri7.mp3");
sons[8] = new Audio("sons/cri8.mp3");
sons[9] = new Audio("sons/cri9.mp3");
sons[10] = new Audio("sons/cri10.mp3");
// ... continue jusqu'à 70

// --- Couleurs des cases ---
const couleurs = ["#ff3b30", "#007aff", "#ffcc00", "#34c759","#ff2d55", "#ff9500", "#af52de", "#5ac8fa"];

// --- Données des cris ---
let cris = [];
let globalClicks = 0;

for (let i = 1; i <= 70; i++) {
    cris.push({
        id: i,
        unlocked: i === 1,
        compteur: 0,
        nomDebloque: `debloc${i}`,
        nomBloque: `bloc${i}`
    });
}

// --- Affichage compteur global ---
function renderGlobalCounter() {
    globalCounterDiv.textContent = `${globalClicks} cris`;
}

// --- Affichage des cases ---
function render() {
    grid.innerHTML = "";
    cris.forEach((cri, index) => {
        const div = document.createElement("div");
        div.classList.add("case");
        if (!cri.unlocked) div.classList.add("locked");
        div.style.background = couleurs[index % couleurs.length];

        div.innerHTML = cri.unlocked ? `<div>${cri.nomDebloque}</div>` : `<div>🔒</div>`;

        div.onclick = () => {
            globalClicks++;
            cri.compteur++;

            // Relance le son du cri correspondant à la prochaine case à débloquer
            let nextId = cris.find(c => !c.unlocked)?.id || 1;
            if (sons[nextId]) {
                sons[nextId].currentTime = 0;
                sons[nextId].play();
            }

            // Déblocage basé sur le compteur global
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

// --- Initialisation ---
renderGlobalCounter();
render();

// --- Cliquer sur l’image joue aussi le son ---
img.onclick = () => {
    let nextId = cris.find(c => !c.unlocked)?.id || 1;
    if (sons[nextId]) {
        sons[nextId].currentTime = 0;
        sons[nextId].play();
    }
};
