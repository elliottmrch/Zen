/* ========================================
   RESPI ZEN - JAVASCRIPT
   Application de respiration guidée
   Deux modes : Respiration (grossir/rétrécir) et Tube (monter/descendre)
======================================== */

/* ========================================
   SÉLECTION DES ÉLÉMENTS DOM
======================================== */

// --- Éléments communs (desktop et mobile) ---
const startBtn = document.getElementById('startBtn');          // Bouton démarrer l'animation
const stopBtn = document.getElementById('stopBtn');            // Bouton arrêter l'animation
const boule = document.querySelector('.boule');                // Élément principal animé
const tube = document.querySelector('.tube');                  // Tube vertical (mode Tube)
const ambientMusic = document.getElementById('ambientMusic');  // Élément audio

// --- Éléments DESKTOP uniquement ---
const modeGrossirBtn = document.getElementById('modeGrossir');      // Bouton mode Respiration
const modeTubeBtn = document.getElementById('modeTube');            // Bouton mode Tube
const timeSlider = document.getElementById('timeSlider');           // Slider de temps
const timeValue = document.getElementById('timeValue');             // Affichage valeur temps
const decreaseBtn = document.getElementById('decreaseBtn');         // Bouton diminuer temps
const increaseBtn = document.getElementById('increaseBtn');         // Bouton augmenter temps
const musicBtn = document.getElementById('musicBtn');               // Bouton musique
const themeBtn = document.getElementById('themeBtn');               // Bouton thème
const themeIcon = document.querySelector('.theme-icon');            // Icône du bouton thème
const settingsBtn = document.getElementById('settingsBtn');         // Bouton paramètres
const settingsPanel = document.getElementById('settingsPanel');     // Panneau paramètres
const closeSettings = document.getElementById('closeSettings');     // Bouton fermer paramètres
const colorBtnsDesktop = document.querySelectorAll('.color-btn-desktop');  // Boutons couleur desktop

// --- Éléments MOBILE uniquement ---
const menuBtn = document.getElementById('menuBtn');                 // Bouton menu burger
const mobileMenu = document.getElementById('mobileMenu');           // Panneau menu mobile
const closeMenu = document.getElementById('closeMenu');             // Bouton fermer menu
const modeGrossirMobile = document.getElementById('modeGrossirMobile');  // Mode Respiration mobile
const modeTubeMobile = document.getElementById('modeTubeMobile');        // Mode Tube mobile
const timeValueMobile = document.getElementById('timeValueMobile');      // Affichage temps mobile
const decreaseBtnMobile = document.getElementById('decreaseBtnMobile');  // Diminuer temps mobile
const increaseBtnMobile = document.getElementById('increaseBtnMobile');  // Augmenter temps mobile
const musicBtnMobile = document.getElementById('musicBtnMobile');        // Bouton musique mobile
const themeBtnMobile = document.getElementById('themeBtnMobile');        // Bouton thème mobile
const colorBtnsMobile = document.querySelectorAll('.color-options-mobile .color-btn');  // Boutons couleur mobile

/* ========================================
   VARIABLES D'ÉTAT
======================================== */

let currentMode = 'grossir';        // Mode actif : 'grossir' ou 'tube'
let breathTime = 5;                 // Durée d'un cycle (secondes) - de 3 à 8
let isMusicPlaying = false;         // État de la musique : true = joue, false = pause
let isLightTheme = false;           // État du thème : true = clair, false = sombre
let currentColor = 'white';         // Couleur active : 'white', 'blue', 'green', etc.

/* ========================================
   PALETTE DE COULEURS
   Chaque couleur a 2 versions : dark (thème sombre) et light (thème clair)
======================================== */

const colors = {
    white: { 
        dark: { color: '#ffffff', glow: 'rgba(255, 255, 255, 0.4)' },
        light: { color: '#1a1a1a', glow: 'rgba(26, 26, 26, 0.3)' }
    },
    blue: { 
        dark: { color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.4)' },
        light: { color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.3)' }
    },
    green: { 
        dark: { color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
        light: { color: '#059669', glow: 'rgba(5, 150, 105, 0.3)' }
    },
    yellow: { 
        dark: { color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.4)' },
        light: { color: '#d97706', glow: 'rgba(217, 119, 6, 0.3)' }
    },
    purple: { 
        dark: { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
        light: { color: '#9333ea', glow: 'rgba(147, 51, 234, 0.3)' }
    },
    pink: { 
        dark: { color: '#ec4899', glow: 'rgba(236, 72, 153, 0.4)' },
        light: { color: '#db2777', glow: 'rgba(219, 39, 119, 0.3)' }
    }
};

/* ========================================
   FONCTION : APPLIQUER LA COULEUR
   Met à jour les variables CSS avec la couleur sélectionnée
======================================== */

function applyColor() {
    // Détermine le thème actuel
    const theme = isLightTheme ? 'light' : 'dark';
    
    // Récupère la couleur correspondante
    const selectedColor = colors[currentColor][theme];
    
    // Applique les variables CSS (utilisées par la boule, le tube, etc.)
    document.documentElement.style.setProperty('--primary-color', selectedColor.color);
    document.documentElement.style.setProperty('--primary-glow', selectedColor.glow);
}

/* ========================================
   GESTION DU MENU MOBILE
======================================== */

// Ouvrir le menu mobile
if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('open');  // Ajoute la classe 'open' pour faire glisser le menu
    });
}

// Fermer le menu mobile
if (closeMenu) {
    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('open');  // Retire la classe 'open' pour cacher le menu
    });
}

/* ========================================
   GESTION DU PANNEAU PARAMÈTRES DESKTOP
======================================== */

if (settingsBtn) {
    settingsBtn.addEventListener('click', function() {
        // Toggle : ouvre si fermé, ferme si ouvert
        if (settingsPanel.classList.contains('open')) {
            settingsPanel.classList.remove('open');
        } else {
            settingsPanel.classList.add('open');
        }
    });
}

if (closeSettings) {
    closeSettings.addEventListener('click', function() {
        settingsPanel.classList.remove('open');  // Ferme le panneau
    });
}

/* ========================================
   GESTION DES COULEURS - DESKTOP
======================================== */

if (colorBtnsDesktop) {
    colorBtnsDesktop.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retire la classe 'active' de tous les boutons
            colorBtnsDesktop.forEach(b => b.classList.remove('active'));
            
            // Ajoute la classe 'active' au bouton cliqué
            this.classList.add('active');
            
            // Récupère la couleur choisie
            currentColor = this.getAttribute('data-color');
            
            // Applique la nouvelle couleur
            applyColor();
            
            // Synchronise avec mobile
            syncColorSelection();
        });
    });
}

/* ========================================
   GESTION DES COULEURS - MOBILE
======================================== */

if (colorBtnsMobile) {
    colorBtnsMobile.forEach(btn => {
        btn.addEventListener('click', function() {
            // Retire la classe 'active' de tous les boutons
            colorBtnsMobile.forEach(b => b.classList.remove('active'));
            
            // Ajoute la classe 'active' au bouton cliqué
            this.classList.add('active');
            
            // Récupère la couleur choisie
            currentColor = this.getAttribute('data-color');
            
            // Applique la nouvelle couleur
            applyColor();
            
            // Synchronise avec desktop
            syncColorSelection();
        });
    });
}

/* ========================================
   FONCTION : SYNCHRONISER LA SÉLECTION DE COULEUR
   S'assure que desktop et mobile affichent la même couleur active
======================================== */

function syncColorSelection() {
    // Sélectionne tous les boutons de couleur (desktop + mobile)
    const allColorBtns = document.querySelectorAll('.color-btn');
    
    allColorBtns.forEach(btn => {
        // Si le bouton correspond à la couleur active
        if (btn.getAttribute('data-color') === currentColor) {
            btn.classList.add('active');   // Marque comme actif
        } else {
            btn.classList.remove('active'); // Retire l'état actif
        }
    });
}

/* ========================================
   GESTION DU THÈME - DESKTOP
======================================== */

if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
}

/* ========================================
   GESTION DU THÈME - MOBILE
======================================== */

if (themeBtnMobile) {
    themeBtnMobile.addEventListener('click', function() {
        toggleTheme();
        this.classList.toggle('active');  // Toggle l'état visuel du bouton mobile
    });
}

/* ========================================
   FONCTION : BASCULER LE THÈME
   Passe de sombre à clair et vice-versa
======================================== */

function toggleTheme() {
    // Inverse l'état du thème
    isLightTheme = !isLightTheme;
    
    if (isLightTheme) {
        // --- MODE CLAIR ---
        document.body.classList.add('light-theme');
        
        // Change l'icône desktop : soleil → lune
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // Change l'icône mobile : soleil → lune
        if (themeBtnMobile) {
            themeBtnMobile.querySelector('i').classList.remove('fa-sun');
            themeBtnMobile.querySelector('i').classList.add('fa-moon');
        }
    } else {
        // --- MODE SOMBRE ---
        document.body.classList.remove('light-theme');
        
        // Change l'icône desktop : lune → soleil
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        // Change l'icône mobile : lune → soleil
        if (themeBtnMobile) {
            themeBtnMobile.querySelector('i').classList.remove('fa-moon');
            themeBtnMobile.querySelector('i').classList.add('fa-sun');
        }
    }
    
    // Réapplique la couleur avec le nouveau thème
    applyColor();
}

/* ========================================
   GESTION DE LA MUSIQUE - DESKTOP
======================================== */

if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
}

/* ========================================
   GESTION DE LA MUSIQUE - MOBILE
======================================== */

if (musicBtnMobile) {
    musicBtnMobile.addEventListener('click', function() {
        toggleMusic();
        this.classList.toggle('active');  // Toggle l'état visuel du bouton mobile
    });
}

/* ========================================
   FONCTION : BASCULER LA MUSIQUE
   Lance ou met en pause la musique d'ambiance
======================================== */

function toggleMusic() {
    if (isMusicPlaying) {
        // --- METTRE EN PAUSE ---
        ambientMusic.pause();
        if (musicBtn) musicBtn.classList.remove('active');
        if (musicBtnMobile) musicBtnMobile.classList.remove('active');
        isMusicPlaying = false;
    } else {
        // --- LANCER LA MUSIQUE ---
        ambientMusic.play();
        if (musicBtn) musicBtn.classList.add('active');
        if (musicBtnMobile) musicBtnMobile.classList.add('active');
        isMusicPlaying = true;
    }
}

// Régler le volume de la musique à 30%
ambientMusic.volume = 0.3;

/* ========================================
   GESTION DU TEMPS - DESKTOP SLIDER
======================================== */

if (timeSlider) {
    timeSlider.addEventListener('input', function() {
        // Récupère la valeur du slider (3 à 8)
        breathTime = parseInt(this.value);
        
        // Met à jour l'affichage desktop
        if (timeValue) timeValue.textContent = breathTime;
        
        // Met à jour l'affichage mobile
        if (timeValueMobile) timeValueMobile.textContent = breathTime;
        
        // Recalcule la durée de l'animation
        updateAnimationDuration();
    });
}

/* ========================================
   GESTION DU TEMPS - BOUTONS DESKTOP
======================================== */

if (decreaseBtn) {
    decreaseBtn.addEventListener('click', decreaseTime);
}

if (increaseBtn) {
    increaseBtn.addEventListener('click', increaseTime);
}

/* ========================================
   GESTION DU TEMPS - BOUTONS MOBILE
======================================== */

if (decreaseBtnMobile) {
    decreaseBtnMobile.addEventListener('click', decreaseTime);
}

if (increaseBtnMobile) {
    increaseBtnMobile.addEventListener('click', increaseTime);
}

/* ========================================
   FONCTION : DIMINUER LE TEMPS
   Min : 3 secondes
======================================== */

function decreaseTime() {
    if (breathTime > 3) {  // Ne descend pas en dessous de 3
        breathTime--;
        
        // Met à jour tous les affichages
        if (timeSlider) timeSlider.value = breathTime;
        if (timeValue) timeValue.textContent = breathTime;
        if (timeValueMobile) timeValueMobile.textContent = breathTime;
        
        updateAnimationDuration();
    }
}

/* ========================================
   FONCTION : AUGMENTER LE TEMPS
   Max : 8 secondes
======================================== */

function increaseTime() {
    if (breathTime < 8) {  // Ne monte pas au-dessus de 8
        breathTime++;
        
        // Met à jour tous les affichages
        if (timeSlider) timeSlider.value = breathTime;
        if (timeValue) timeValue.textContent = breathTime;
        if (timeValueMobile) timeValueMobile.textContent = breathTime;
        
        updateAnimationDuration();
    }
}

/* ========================================
   FONCTION : METTRE À JOUR LA DURÉE D'ANIMATION
   Calcule la durée totale (aller-retour) = breathTime * 2
======================================== */

function updateAnimationDuration() {
    const totalDuration = breathTime * 2;  // Ex: 5s * 2 = 10s (5s inspir + 5s expir)
    
    // Applique la durée à l'animation CSS de la boule
    if (currentMode === 'grossir') {
        boule.style.animationDuration = totalDuration + 's';
    } else if (currentMode === 'tube') {
        boule.style.animationDuration = totalDuration + 's';
    }
}

/* ========================================
   GESTION DES MODES - DESKTOP
======================================== */

if (modeGrossirBtn) {
    modeGrossirBtn.addEventListener('click', function() {
        setMode('grossir');
        modeGrossirBtn.classList.add('active');
        modeTubeBtn.classList.remove('active');
    });
}

if (modeTubeBtn) {
    modeTubeBtn.addEventListener('click', function() {
        setMode('tube');
        modeTubeBtn.classList.add('active');
        modeGrossirBtn.classList.remove('active');
    });
}

/* ========================================
   GESTION DES MODES - MOBILE
======================================== */

if (modeGrossirMobile) {
    modeGrossirMobile.addEventListener('click', function() {
        setMode('grossir');
        modeGrossirMobile.classList.add('active');
        modeTubeMobile.classList.remove('active');
        
        // Synchronise avec desktop
        if (modeGrossirBtn) modeGrossirBtn.classList.add('active');
        if (modeTubeBtn) modeTubeBtn.classList.remove('active');
    });
}

if (modeTubeMobile) {
    modeTubeMobile.addEventListener('click', function() {
        setMode('tube');
        modeTubeMobile.classList.add('active');
        modeGrossirMobile.classList.remove('active');
        
        // Synchronise avec desktop
        if (modeTubeBtn) modeTubeBtn.classList.add('active');
        if (modeGrossirBtn) modeGrossirBtn.classList.remove('active');
    });
}

/* ========================================
   FONCTION : DÉFINIR LE MODE
   Change entre mode Respiration et mode Tube
======================================== */

function setMode(mode) {
    currentMode = mode;
    
    // Nettoie toutes les classes d'animation
    boule.classList.remove('active', 'mode-tube', 'mode-grossir');
    tube.classList.remove('visible');
    
    if (mode === 'grossir') {
        // --- MODE RESPIRATION ---
        boule.classList.add('mode-grossir');
        boule.style.width = '150px';
        boule.style.height = '150px';
        startBtn.classList.remove('mode-tube-btn');
        
        // Ajustement pour mobile
        if (window.innerWidth <= 768) {
            boule.style.width = '120px';
            boule.style.height = '120px';
        }
        if (window.innerWidth <= 480) {
            boule.style.width = '100px';
            boule.style.height = '100px';
        }
        
    } else if (mode === 'tube') {
        // --- MODE TUBE ---
        tube.classList.add('visible');   // Affiche le tube
        boule.classList.add('mode-tube');
        boule.style.width = '90px';
        boule.style.height = '90px';
        startBtn.classList.add('mode-tube-btn');  // Repositionne le bouton Start
        
        // Ajustement pour mobile
        if (window.innerWidth <= 768) {
            boule.style.width = '70px';
            boule.style.height = '70px';
        }
        if (window.innerWidth <= 480) {
            boule.style.width = '60px';
            boule.style.height = '60px';
        }
    }
    
    // Réinitialise l'interface
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    
    // Réinitialise l'animation
    resetAnimation();
}

/* ========================================
   BOUTON START
   Démarre l'animation de respiration
======================================== */

startBtn.addEventListener('click', function() {
    boule.classList.add('active');           // Active l'animation CSS
    updateAnimationDuration();               // Applique la durée configurée
    startBtn.style.display = 'none';         // Cache le bouton Start
    stopBtn.style.display = 'block';         // Affiche le bouton Stop
    
    // Ferme le menu mobile automatiquement
    if (mobileMenu) {
        mobileMenu.classList.remove('open');
    }
});

/* ========================================
   BOUTON STOP
   Arrête l'animation de respiration
======================================== */

stopBtn.addEventListener('click', function() {
    boule.classList.remove('active');        // Désactive l'animation CSS
    resetAnimation();                        // Réinitialise l'animation
    
    stopBtn.style.display = 'none';          // Cache le bouton Stop
    startBtn.style.display = 'block';        // Affiche le bouton Start
});

/* ========================================
   FONCTION : RÉINITIALISER L'ANIMATION
   Force le recalcul de l'animation CSS
======================================== */

function resetAnimation() {
    boule.style.animation = 'none';          // Supprime l'animation
    void boule.offsetWidth;                  // Force un reflow (astuce CSS)
    setTimeout(function() {
        boule.style.animation = '';          // Restaure l'animation
    }, 10);
}

/* ========================================
   GESTION DU RESIZE
   Ajuste les tailles quand la fenêtre change de taille
======================================== */

window.addEventListener('resize', function() {
    setMode(currentMode);  // Recalcule les tailles selon le mode actif
});

/* ========================================
   INITIALISATION
   Configure l'état initial au chargement de la page
======================================== */

boule.classList.add('mode-grossir');  // Mode Respiration par défaut
setMode('grossir');                   // Initialise en mode Respiration