const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const boule = document.querySelector('.boule');
const tube = document.querySelector('.tube');
const modeGrossirBtn = document.getElementById('modeGrossir');
const modeTubeBtn = document.getElementById('modeTube');
const timeSlider = document.getElementById('timeSlider');
const timeValue = document.getElementById('timeValue');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const musicBtn = document.getElementById('musicBtn');
const ambientMusic = document.getElementById('ambientMusic');
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.querySelector('.theme-icon');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');
const colorBtns = document.querySelectorAll('.color-btn');

let currentMode = 'grossir';
let breathTime = 5;
let isMusicPlaying = false;
let isLightTheme = false;
let currentColor = 'white';

// Palette de couleurs avec versions sombre et claire (6 couleurs)
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

// Fonction pour appliquer la couleur selon le thème
function applyColor() {
    const theme = isLightTheme ? 'light' : 'dark';
    const selectedColor = colors[currentColor][theme];
    
    document.documentElement.style.setProperty('--primary-color', selectedColor.color);
    document.documentElement.style.setProperty('--primary-glow', selectedColor.glow);
}

// Gestion des paramètres
settingsBtn.addEventListener('click', function() {
    settingsPanel.classList.add('open');
});

closeSettings.addEventListener('click', function() {
    settingsPanel.classList.remove('open');
});

// Gestion des couleurs
colorBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        colorBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        currentColor = this.getAttribute('data-color');
        applyColor();
    });
});

// Gestion du thème
themeBtn.addEventListener('click', function() {
    isLightTheme = !isLightTheme;
    
    if (isLightTheme) {
        document.body.classList.add('light-theme');
        themeIcon.textContent = '☾';
    } else {
        document.body.classList.remove('light-theme');
        themeIcon.textContent = '☀';
    }
    
    // Réappliquer la couleur avec le nouveau thème
    applyColor();
});

// Gestion de la musique
musicBtn.addEventListener('click', function() {
    if (isMusicPlaying) {
        ambientMusic.pause();
        musicBtn.classList.remove('active');
        isMusicPlaying = false;
    } else {
        ambientMusic.play();
        musicBtn.classList.add('active');
        isMusicPlaying = true;
    }
});

ambientMusic.volume = 0.3;

// Gestion du slider
timeSlider.addEventListener('input', function() {
    breathTime = parseInt(this.value);
    timeValue.textContent = breathTime;
    updateAnimationDuration();
});

// Bouton -
decreaseBtn.addEventListener('click', function() {
    if (breathTime > 3) {
        breathTime--;
        timeSlider.value = breathTime;
        timeValue.textContent = breathTime;
        updateAnimationDuration();
    }
});

// Bouton +
increaseBtn.addEventListener('click', function() {
    if (breathTime < 8) {
        breathTime++;
        timeSlider.value = breathTime;
        timeValue.textContent = breathTime;
        updateAnimationDuration();
    }
});

// Mise à jour de la durée d'animation
function updateAnimationDuration() {
    const totalDuration = breathTime * 2;
    
    if (currentMode === 'grossir') {
        boule.style.animationDuration = totalDuration + 's';
    } else if (currentMode === 'tube') {
        boule.style.animationDuration = totalDuration + 's';
    }
}

// Mode Grossir
modeGrossirBtn.addEventListener('click', function() {
    switchMode('grossir');
    modeGrossirBtn.classList.add('active');
    modeTubeBtn.classList.remove('active');
    
    boule.style.width = '150px';
    boule.style.height = '150px';
    
    startBtn.classList.remove('mode-tube-btn');
});

// Mode Tube
modeTubeBtn.addEventListener('click', function() {
    switchMode('tube');
    modeTubeBtn.classList.add('active');
    modeGrossirBtn.classList.remove('active');
    
    boule.style.width = '90px';
    boule.style.height = '90px';
    
    startBtn.classList.add('mode-tube-btn');
});

function switchMode(mode) {
    currentMode = mode;
    
    boule.classList.remove('active', 'mode-tube', 'mode-grossir');
    tube.classList.remove('visible');
    
    if (mode === 'grossir') {
        boule.classList.add('mode-grossir');
    } else if (mode === 'tube') {
        tube.classList.add('visible');
        boule.classList.add('mode-tube');
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

boule.classList.add('mode-grossir');
