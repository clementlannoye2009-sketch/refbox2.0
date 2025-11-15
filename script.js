const grid = document.getElementById("grid-cris");
const globalCounterDiv = document.getElementById("global-counter");
const img = document.getElementById("cry-image");

// --- Sons ---
const sons = [];
sons[1] = new Audio("sons/cri1.mp3"); // Premier son

// --- Couleurs des cases ---
const couleurs = [
    "#ff3b30", "#007aff", "#ffcc00", "#34c759",
    "#ff2d55", "#ff9500", "#af52de", "#5ac8fa"
];

// --- Chargement des données depuis le localStorage ---
let saved = localStorage.getItem("cris_data");
let cris = [];
let globalClicks = 0;

let savedGlobal = localStorage.getItem("global_clicks");
if (savedGlobal) globalClicks = parseInt(savedGlobal, 10);

if (saved) {
    cris = JSON.parse(saved);
} else {
    for (let i = 1; i <= 70; i++) {
        cris.push({
            id: i,
            unlocked: i === 1 ? true : false,
            compteur: 0,
            nomDebloque: `debloc${i}`,
            nomBloque: `bloc${i}`
        });
    }
    localStorage.setItem("cris_data", JSON.stringify(cris));
}

// --- Fonction de sauvegarde ---
function save() {
    localStorage.setItem("cris_data", JSON.stringify(cris));
    localStorage.setItem("global_clicks", globalClicks.toString());
}

// --- Affichage du compteur global ---
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

        if (cri.unlocked) {
            div.innerHTML = `<div>${cri.nomDebloque}</div>`;
        } else {
            div.innerHTML = `<div class="lock-icon">🔒</div>`;
        }

        div.onclick = () => {
            // Incrémente globalClicks et compteur de la case 1
            globalClicks++;
            cri.compteur++;

            // Joue le son si case 1
            if (sons[1]) sons[1].play();

            // Déblocage basé sur le compteur global
            cris.forEach(c => {
                const needed = (c.id - 1) * 100;
                if (globalClicks >= needed) c.unlocked = true;
            });

            save();
            renderGlobalCounter();
            render();
        };

        grid.appendChild(div);
    });
}

// --- Initialisation ---
renderGlobalCounter();
render();

// --- Exemple : cliquer sur l'image joue aussi le cri1 ---
img.onclick = () => {
    if (sons[1]) sons[1].play();
};
