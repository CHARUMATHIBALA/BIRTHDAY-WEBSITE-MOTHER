/**
 * Birthday Cake Cutting Animation
 * Pure JavaScript interactions (no libraries)
 * -------------------------------------------
 * - Handles:
 *   - Candle flame visibility
 *   - Knife appearance and movement
 *   - Slice line
 *   - Cake splitting
 *   - Confetti and sparkles
 *   - Glowing birthday text
 */

// DOM references
const cutButton = document.getElementById('cutButton');
const cakeOriginal = document.getElementById('cakeOriginal');
const cakeLeft = document.getElementById('cakeLeft');
const cakeRight = document.getElementById('cakeRight');
const cuttingLine = document.getElementById('cuttingLine');
const knife = document.getElementById('knife');
const confettiContainer = document.getElementById('confettiContainer');
const sparkleContainer = document.getElementById('sparkleContainer');
const birthdayMessage = document.getElementById('birthdayMessage');
const flames = document.querySelectorAll('.flame');

// Colors used for confetti pieces
const CONFETTI_COLORS = [
    '#ff8fab', // soft pink
    '#ffb3c6', // rose
    '#ffd3b6', // peach
    '#ffe082', // soft yellow
    '#c5e1a5', // pastel green
    '#b39ddb', // lavender
    '#f48fb1'  // bright pink
];

// Animation timings (ms)
const TIMING = {
    KNIFE_SHOW: 300,
    KNIFE_MOVE: 600,
    SLICE_LINE: 1500,
    CAKE_SPLIT: 1900,
    CONFETTI: 2200,
    SPARKLES: 2500,
    MESSAGE: 3100
};

/**
 * Show candle flames on load
 */
function initFlames() {
    flames.forEach((flame) => {
        flame.classList.add('visible');
    });
}

/**
 * Create confetti elements and animate them
 * @param {number} count - number of confetti particles
 */
function createConfetti(count) {
    confettiContainer.innerHTML = '';

    for (let i = 0; i < count; i += 1) {
        const el = document.createElement('div');
        el.className = 'confetti';

        const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        const left = Math.random() * 100; // percentage
        const delay = Math.random() * 0.5;
        const duration = 2 + Math.random() * 1.5;

        el.style.left = `${left}%`;
        el.style.top = '-20px';
        el.style.backgroundColor = color;
        el.style.animationDelay = `${delay}s`;
        el.style.animationDuration = `${duration}s`;

        if (Math.random() > 0.5) {
            el.classList.add('round');
        }

        confettiContainer.appendChild(el);

        // Clean up after animation
        setTimeout(() => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        }, (duration + delay) * 1000);
    }
}

/**
 * Create sparkle elements around the cake
 * @param {number} count - number of sparkles
 */
function createSparkles(count) {
    sparkleContainer.innerHTML = '';

    const rect = cakeOriginal.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < count; i += 1) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        const angle = (Math.PI * 2 * i) / count;
        const radius = 80 + Math.random() * 100;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const delay = Math.random() * 0.3;
        const duration = 1 + Math.random() * 0.7;

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.animationDelay = `${delay}s`;
        sparkle.style.animationDuration = `${duration}s`;

        sparkleContainer.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, (duration + delay) * 1000);
    }
}

/**
 * Orchestrates the full cutting sequence
 */
function runCakeCuttingSequence() {
    // Disable the button while animation plays
    cutButton.disabled = true;
    cutButton.textContent = 'Cutting...';

    // 1) Show knife
    setTimeout(() => {
        knife.classList.add('visible');
    }, TIMING.KNIFE_SHOW);

    // 2) Move knife
    setTimeout(() => {
        knife.classList.add('moving');
    }, TIMING.KNIFE_MOVE);

    // 3) Show slice line
    setTimeout(() => {
        cuttingLine.classList.add('visible');
    }, TIMING.SLICE_LINE);

    // 4) Split cake and fade flames
    setTimeout(() => {
        cakeOriginal.classList.add('hidden');
        cakeLeft.classList.add('split');
        cakeRight.classList.add('split');

        flames.forEach((flame) => {
            // Gently fade flames as cake is cut
            const flameElement = flame;
            flameElement.style.transition = 'opacity 0.5s ease';
            flameElement.style.opacity = '0';
        });
    }, TIMING.CAKE_SPLIT);

    // 5) Confetti
    setTimeout(() => {
        createConfetti(60);
    }, TIMING.CONFETTI);

    // 6) Sparkles
    setTimeout(() => {
        createSparkles(40);
    }, TIMING.SPARKLES);

    // 7) Glowing message
    setTimeout(() => {
        birthdayMessage.classList.add('visible');
    }, TIMING.MESSAGE);
}

/**
 * Optional reset function (not wired to UI)
 * Can be used if you later add a "Replay" button.
 */
function resetCakeScene() {
    cakeOriginal.classList.remove('hidden');
    cakeLeft.classList.remove('split');
    cakeRight.classList.remove('split');
    cuttingLine.classList.remove('visible');
    knife.classList.remove('visible', 'moving');
    birthdayMessage.classList.remove('visible');
    confettiContainer.innerHTML = '';
    sparkleContainer.innerHTML = '';

    flames.forEach((flame) => {
        const flameElement = flame;
        flameElement.style.transition = '';
        flameElement.style.opacity = '1';
        flameElement.classList.add('visible');
    });

    cutButton.disabled = false;
    cutButton.innerHTML = '<span class="button-icon">🎂</span><span class="button-text">Cut the Cake</span>';
}

// Wire up main button
if (cutButton) {
    cutButton.addEventListener('click', () => {
        runCakeCuttingSequence();
    });
}

// Initialize flames when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initFlames();
});


