const grid = document.getElementById("grid-cris");
const globalCounterDiv = document.getElementById("global-counter");

const couleurs = [
    "#ff3b30", "#007aff", "#ffcc00", "#34c759",
    "#ff2d55", "#ff9500", "#af52de", "#5ac8fa"
];

// --- Initialisation des sons ---
const sons = [];
sons[1] = new Audio("AJOUTER TON SON");
sons[2] = new Audio("AJOUTER TON SON");
sons[3] = new Audio("AJOUTER TON SON");
sons[4] = new Audio("AJOUTER TON SON");
sons[5] = new Audio("AJOUTER TON SON");
sons[6] = new Audio("AJOUTER TON SON");
sons[7] = new Audio("AJOUTER TON SON");
sons[8] = new Audio("AJOUTER TON SON");
sons[9] = new Audio("AJOUTER TON SON");
sons[10] = new Audio("AJOUTER TON SON");
sons[11] = new Audio("AJOUTER TON SON");
sons[12] = new Audio("AJOUTER TON SON");
sons[13] = new Audio("AJOUTER TON SON");
sons[14] = new Audio("AJOUTER TON SON");
sons[15] = new Audio("AJOUTER TON SON");
sons[16] = new Audio("AJOUTER TON SON");
sons[17] = new Audio("AJOUTER TON SON");
sons[18] = new Audio("AJOUTER TON SON");
sons[19] = new Audio("AJOUTER TON SON");
sons[20] = new Audio("AJOUTER TON SON");
sons[21] = new Audio("AJOUTER TON SON");
sons[22] = new Audio("AJOUTER TON SON");
sons[23] = new Audio("AJOUTER TON SON");
sons[24] = new Audio("AJOUTER TON SON");
sons[25] = new Audio("AJOUTER TON SON");
sons[26] = new Audio("AJOUTER TON SON");
sons[27] = new Audio("AJOUTER TON SON");
sons[28] = new Audio("AJOUTER TON SON");
sons[29] = new Audio("AJOUTER TON SON");
sons[30] = new Audio("AJOUTER TON SON");
sons[31] = new Audio("AJOUTER TON SON");
sons[32] = new Audio("AJOUTER TON SON");
sons[33] = new Audio("AJOUTER TON SON");
sons[34] = new Audio("AJOUTER TON SON");
sons[35] = new Audio("AJOUTER TON SON");
sons[36] = new Audio("AJOUTER TON SON");
sons[37] = new Audio("AJOUTER TON SON");
sons[38] = new Audio("AJOUTER TON SON");
sons[39] = new Audio("AJOUTER TON SON");
sons[40] = new Audio("AJOUTER TON SON");
sons[41] = new Audio("AJOUTER TON SON");
sons[42] = new Audio("AJOUTER TON SON");
sons[43] = new Audio("AJOUTER TON SON");
sons[44] = new Audio("AJOUTER TON SON");
sons[45] = new Audio("AJOUTER TON SON");
sons[46] = new Audio("AJOUTER TON SON");
sons[47] = new Audio("AJOUTER TON SON");
sons[48] = new Audio("AJOUTER TON SON");
sons[49] = new Audio("AJOUTER TON SON");
sons[50] = new Audio("AJOUTER TON SON");
sons[51] = new Audio("AJOUTER TON SON");
sons[52] = new Audio("AJOUTER TON SON");
sons[53] = new Audio("AJOUTER TON SON");
sons[54] = new Audio("AJOUTER TON SON");
sons[55] = new Audio("AJOUTER TON SON");
sons[56] = new Audio("AJOUTER TON SON");
sons[57] = new Audio("AJOUTER TON SON");
sons[58] = new Audio("AJOUTER TON SON");
sons[59] = new Audio("AJOUTER TON SON");
sons[60] = new Audio("AJOUTER TON SON");
sons[61] = new Audio("AJOUTER TON SON");
sons[62] = new Audio("AJOUTER TON SON");
sons[63] = new Audio("AJOUTER TON SON");
sons[64] = new Audio("AJOUTER TON SON");
sons[65] = new Audio("AJOUTER TON SON");
sons[66] = new Audio("AJOUTER TON SON");
sons[67] = new Audio("AJOUTER TON SON");
sons[68] = new Audio("AJOUTER TON SON");
sons[69] = new Audio("AJOUTER TON SON");
sons[70] = new Audio("AJOUTER TON SON");

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
    let nextToUnlock = cris.find(c => !c.unlocked);

    cris.forEach((cri, index) => {
        const div = document.createElement("div");
        div.classList.add("case");
        if (!cri.unlocked) div.classList.add("locked");
        div.style.background = couleurs[index % couleurs.length];

        if (nextToUnlock && cri.id === nextToUnlock.id) div.classList.add("unlocking");

        if (cri.unlocked) {
            div.innerHTML = `<div>${cri.nomDebloque}</div>`;
        } else {
            div.innerHTML = `<div class="lock-icon">🔒</div>`;
        }

        if (nextToUnlock && cri.id === nextToUnlock.id) {
            const compteurDiv = document.createElement("div");
            compteurDiv.classList.add("counter");
            compteurDiv.textContent = `${cri.compteur} / 100`;
            div.appendChild(compteurDiv);
        }

        div.onclick = () => {
            globalClicks++;

            // Jouer le son correspondant à la case cliquée
            if (sons[cri.id]) {
                sons[cri.id].currentTime = 0;
                sons[cri.id].play();
            }

            if (nextToUnlock) {
                nextToUnlock.compteur++;
                if (nextToUnlock.compteur >= 100) {
                    nextToUnlock.unlocked = true;
                    const popDiv = grid.children[index];
                    if (popDiv) {
                        popDiv.classList.add("pop");
                        setTimeout(() => popDiv.classList.remove("pop"), 300);
                    }
                }
            }

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
