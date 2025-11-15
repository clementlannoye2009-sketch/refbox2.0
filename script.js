const grid = document.getElementById("grid-cris");
const globalCounterDiv = document.getElementById("global-counter");
const img = document.getElementById("cry-image");

// --- Sons ---
const sons = [];
sons[1] = new Audio("sons/cri1.mp3"); // Premier son

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

            // Joue le son du cri1 pour tester
            if (sons[1]) sons[1].play();

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
    if (sons[1]) sons[1].play();
};
