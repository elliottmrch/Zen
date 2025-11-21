const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const boule = document.querySelector('.boule');
const tube = document.querySelector('.tube');

// Desktop
const modeGrossirBtn = document.getElementById('modeGrossir');
const modeTubeBtn = document.getElementById('modeTube');
const timeSlider = document.getElementById('timeSlider');
const timeValue = document.getElementById('timeValue');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const musicBtn = document.getElementById('musicBtn');
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.querySelector('.theme-icon');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');
const colorBtnsDesktop = document.querySelectorAll('.color-btn-desktop');

// Mobile
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const modeGrossirMobile = document.getElementById('modeGrossirMobile');
const modeTubeMobile = document.getElementById('modeTubeMobile');
const timeValueMobile = document.getElementById('timeValueMobile');
const decreaseBtnMobile = document.getElementById('decreaseBtnMobile');
const increaseBtnMobile = document.getElementById('increaseBtnMobile');
const musicBtnMobile = document.getElementById('musicBtnMobile');
const themeBtnMobile = document.getElementById('themeBtnMobile');
const colorBtnsMobile = document.querySelectorAll('.color-options-mobile .color-btn');

const ambientMusic = document.getElementById('ambientMusic');

let currentMode = 'grossir';
let breathTime = 5;
let isMusicPlaying = false;
let isLightTheme = false;
let currentColor = 'white';

// Palette de couleurs
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

// Fonction pour appliquer la couleur
function applyColor() {
    const theme = isLightTheme ? 'light' : 'dark';
    const selectedColor = colors[currentColor][theme];
    
    document.documentElement.style.setProperty('--primary-color', selectedColor.color);
    document.documentElement.style.setProperty('--primary-glow', selectedColor.glow);
}

// Menu mobile
if (menuBtn) {
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('open');
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
    });
}

// Gestion des paramètres desktop
if (settingsBtn) {
    settingsBtn.addEventListener('click', function() {
        if (settingsPanel.classList.contains('open')) {
            settingsPanel.classList.remove('open');
        } else {
            settingsPanel.classList.add('open');
        }
    });
}

if (closeSettings) {
    closeSettings.addEventListener('click', function() {
        settingsPanel.classList.remove('open');
    });
}

// Gestion des couleurs desktop
if (colorBtnsDesktop) {
    colorBtnsDesktop.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtnsDesktop.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentColor = this.getAttribute('data-color');
            applyColor();
            
            // Sync avec mobile
            syncColorSelection();
        });
    });
}

// Gestion des couleurs mobile
if (colorBtnsMobile) {
    colorBtnsMobile.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtnsMobile.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentColor = this.getAttribute('data-color');
            applyColor();
            
            // Sync avec desktop
            syncColorSelection();
        });
    });
}

// Synchroniser la sélection de couleur entre desktop et mobile
function syncColorSelection() {
    const allColorBtns = document.querySelectorAll('.color-btn');
    allColorBtns.forEach(btn => {
        if (btn.getAttribute('data-color') === currentColor) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Gestion du thème desktop
if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
}

// Gestion du thème mobile
if (themeBtnMobile) {
    themeBtnMobile.addEventListener('click', function() {
        toggleTheme();
        this.classList.toggle('active');
    });
}

function toggleTheme() {
    isLightTheme = !isLightTheme;
    
    if (isLightTheme) {
        document.body.classList.add('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        if (themeBtnMobile) {
            themeBtnMobile.querySelector('i').classList.remove('fa-sun');
            themeBtnMobile.querySelector('i').classList.add('fa-moon');
        }
    } else {
        document.body.classList.remove('light-theme');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        if (themeBtnMobile) {
            themeBtnMobile.querySelector('i').classList.remove('fa-moon');
            themeBtnMobile.querySelector('i').classList.add('fa-sun');
        }
    }
    
    applyColor();
}

// Gestion de la musique desktop
if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
}

// Gestion de la musique mobile
if (musicBtnMobile) {
    musicBtnMobile.addEventListener('click', function() {
        toggleMusic();
        this.classList.toggle('active');
    });
}

function toggleMusic() {
    if (isMusicPlaying) {
        ambientMusic.pause();
        if (musicBtn) musicBtn.classList.remove('active');
        if (musicBtnMobile) musicBtnMobile.classList.remove('active');
        isMusicPlaying = false;
    } else {
        ambientMusic.play();
        if (musicBtn) musicBtn.classList.add('active');
        if (musicBtnMobile) musicBtnMobile.classList.add('active');
        isMusicPlaying = true;
    }
}

ambientMusic.volume = 0.3;

// Gestion du temps desktop
if (timeSlider) {
    timeSlider.addEventListener('input', function() {
        breathTime = parseInt(this.value);
        if (timeValue) timeValue.textContent = breathTime;
        if (timeValueMobile) timeValueMobile.textContent = breathTime;
        updateAnimationDuration();
    });
}

if (decreaseBtn) {
    decreaseBtn.addEventListener('click', function() {
        decreaseTime();
    });
}

if (increaseBtn) {
    increaseBtn.addEventListener('click', function() {
        increaseTime();
    });
}

// Gestion du temps mobile
if (decreaseBtnMobile) {
    decreaseBtnMobile.addEventListener('click', function() {
        decreaseTime();
    });
}

if (increaseBtnMobile) {
    increaseBtnMobile.addEventListener('click', function() {
        increaseTime();
    });
}

function decreaseTime() {
    if (breathTime > 3) {
        breathTime--;
        if (timeSlider) timeSlider.value = breathTime;
        if (timeValue) timeValue.textContent = breathTime;
        if (timeValueMobile) timeValueMobile.textContent = breathTime;
        updateAnimationDuration();
    }
}

function increaseTime() {
    if (breathTime < 8) {
        breathTime++;
        if (timeSlider) timeSlider.value = breathTime;
        if (timeValue) timeValue.textContent = breathTime;
        if (timeValueMobile) timeValueMobile.textContent = breathTime;
        updateAnimationDuration();
    }
}

function updateAnimationDuration() {
    const totalDuration = breathTime * 2;
    
    if (currentMode === 'grossir') {
        boule.style.animationDuration = totalDuration + 's';
    } else if (currentMode === 'tube') {
        boule.style.animationDuration = totalDuration + 's';
    }
}

// Gestion des modes desktop
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

// Gestion des modes mobile
if (modeGrossirMobile) {
    modeGrossirMobile.addEventListener('click', function() {
        setMode('grossir');
        modeGrossirMobile.classList.add('active');
        modeTubeMobile.classList.remove('active');
        if (modeGrossirBtn) modeGrossirBtn.classList.add('active');
        if (modeTubeBtn) modeTubeBtn.classList.remove('active');
    });
}

if (modeTubeMobile) {
    modeTubeMobile.addEventListener('click', function() {
        setMode('tube');
        modeTubeMobile.classList.add('active');
        modeGrossirMobile.classList.remove('active');
        if (modeTubeBtn) modeTubeBtn.classList.add('active');
        if (modeGrossirBtn) modeGrossirBtn.classList.remove('active');
    });
}

function setMode(mode) {
    currentMode = mode;
    
    boule.classList.remove('active', 'mode-tube', 'mode-grossir');
    tube.classList.remove('visible');
    
    if (mode === 'grossir') {
        boule.classList.add('mode-grossir');
        boule.style.width = '150px';
        boule.style.height = '150px';
        startBtn.classList.remove('mode-tube-btn');
        
        // Ajustement mobile
        if (window.innerWidth <= 768) {
            boule.style.width = '120px';
            boule.style.height = '120px';
        }
        if (window.innerWidth <= 480) {
            boule.style.width = '100px';
            boule.style.height = '100px';
        }
    } else if (mode === 'tube') {
        tube.classList.add('visible');
        boule.classList.add('mode-tube');
        boule.style.width = '90px';
        boule.style.height = '90px';
        startBtn.classList.add('mode-tube-btn');
        
        // Ajustement mobile
        if (window.innerWidth <= 768) {
            boule.style.width = '70px';
            boule.style.height = '70px';
        }
        if (window.innerWidth <= 480) {
            boule.style.width = '60px';
            boule.style.height = '60px';
        }
    }
    
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    
    resetAnimation();
}

// Bouton Start
startBtn.addEventListener('click', function() {
    boule.classList.add('active');
    updateAnimationDuration();
    startBtn.style.display = 'none';
    stopBtn.style.display = 'block';
    
    // Fermer le menu mobile si ouvert
    if (mobileMenu) {
        mobileMenu.classList.remove('open');
    }
});

// Bouton Stop
stopBtn.addEventListener('click', function() {
    boule.classList.remove('active');
    resetAnimation();
    
    stopBtn.style.display = 'none';
    startBtn.style.display = 'block';
});

function resetAnimation() {
    boule.style.animation = 'none';
    void boule.offsetWidth;
    setTimeout(function() {
        boule.style.animation = '';
    }, 10);
}

// Ajustement responsive au redimensionnement
window.addEventListener('resize', function() {
    setMode(currentMode);
});

// Initialisation
boule.classList.add('mode-grossir');
setMode('grossir');
