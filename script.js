const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const boule = document.querySelector('.boule');
const tube = document.querySelector('.tube');
const modeGrossirBtn = document.getElementById('modeGrossir');
const modeTubeBtn = document.getElementById('modeTube');

let currentMode = 'grossir'; // Mode par défaut

// Gestion des boutons de mode
modeGrossirBtn.addEventListener('click', function() {
    currentMode = 'grossir';
    modeGrossirBtn.classList.add('active');
    modeTubeBtn.classList.remove('active');
    
    // Arrêter l'animation si elle tourne
    boule.classList.remove('active', 'mode-tube', 'mode-grossir');
    tube.classList.remove('visible');
    
    // Réinitialiser la boule
    boule.style.width = '150px';
    boule.style.height = '150px';
    boule.classList.add('mode-grossir');
    
    // Réafficher le bouton Start
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    
    resetAnimation();
});

modeTubeBtn.addEventListener('click', function() {
    currentMode = 'tube';
    modeTubeBtn.classList.add('active');
    modeGrossirBtn.classList.remove('active');
    
    // Arrêter l'animation si elle tourne
    boule.classList.remove('active', 'mode-tube', 'mode-grossir');
    
    // Afficher le tube
    tube.classList.add('visible');
    
    // Réinitialiser la boule (plus petite)
    boule.style.width = '50px';
    boule.style.height = '50px';
    boule.classList.add('mode-tube');
    
    // Réafficher le bouton Start
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    
    resetAnimation();
});

// Bouton Start
startBtn.addEventListener('click', function() {
    boule.classList.add('active');
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

// Fonction pour réinitialiser l'animation
function resetAnimation() {
    boule.style.animation = 'none';
    void boule.offsetWidth;
    setTimeout(function() {
        boule.style.animation = '';
    }, 10);
}

// Initialiser avec le mode Grossir
boule.classList.add('mode-grossir');
