// --- 1. TWINKLING STARS GENERATOR (BACKGROUND) ---
function initTwinkleStars() {
    const container = document.getElementById('twinkle-container');
    if (!container) return;

    // Fewer, larger sparkle stars for the bg
    const starCount = 10;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('twinkle-star');

        // Random Position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random Size (Diamond Sparkles need to be visible)
        const size = Math.random() * 15 + 10; // 10px to 25px

        // Random Animation Delay and Duration
        const duration = Math.random() * 3 + 2; // 2s to 5s
        const delay = Math.random() * 5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);
    }
}
initTwinkleStars();

// --- 1.1 DISTANT STARS (DOTS) ---
function initDistantStars() {
    const container = document.getElementById('twinkle-container');
    if (!container) return;

    // Many small stars for depth
    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('distant-star');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        // Bigger dots to be visible
        const size = Math.random() * 5 + 3; // 3px to 8px

        // Very slow animation
        const duration = Math.random() * 5 + 5; // 5s to 10s
        const delay = Math.random() * 5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);
    }
}
initDistantStars();

// --- 1.2 FLOATING PARTICLES (Futuristic Effect) ---
function initFloatingParticles() {
    const container = document.getElementById('twinkle-container');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 4 + 2; // 2px to 6px

        const duration = Math.random() * 15 + 10; // 10s to 25s
        const delay = Math.random() * 5;

        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}
initFloatingParticles();


// --- 2. MOUSE SPARKLE TRAIL ---

let sparkleThrottle = 0;
document.addEventListener('mousemove', (e) => {
    // Trail Generation
    // Throttle creation to avoid lag
    sparkleThrottle++;
    // Show smooth, fewer stars (every 8th move event)
    if (sparkleThrottle % 8 !== 0) return;

    const sparkle = document.createElement('div');
    sparkle.classList.add('cursor-star');

    // Randomly choose between white and pink
    const isPink = Math.random() > 0.5;
    const color = isPink ? '#FF00D6' : '#FFFFFF';
    const glowColor = isPink ? 'rgba(255, 0, 214, 0.8)' : 'rgba(255, 255, 255, 0.8)';

    // Create star icon using Font Awesome
    sparkle.innerHTML = '<i class="fa-solid fa-star"></i>';

    // Make size bigger as requested (30px to 50px)
    const size = Math.random() * 20 + 30;

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    sparkle.style.color = color;
    sparkle.style.textShadow = `0 0 10px ${glowColor}, 0 0 20px ${glowColor}, 0 0 30px ${glowColor}`;
    sparkle.style.filter = `drop-shadow(0 0 8px ${glowColor})`;

    document.body.appendChild(sparkle);

    // Cleanup after animation
    setTimeout(() => {
        sparkle.remove();
    }, 3000);
});


// --- 3. CRAYON/NEON TRAIL EFFECT ---
const canvas = document.getElementById('trail-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let points = [];

    // Auto-resize
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Track mouse
    document.addEventListener('mousemove', (e) => {
        // Add point to queue
        points.push({ x: e.clientX, y: e.clientY });
    });

    // Animation Loop
    const animateTrail = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear frame

        // 1. Remove old points (fading tail effect)
        // Only remove if we have points. 
        // We remove points faster if there are many, slower if few.
        if (points.length > 0) {
            // Remove the oldest point
            points.shift();
            // If line is very long, remove another one to keep it from getting infinite
            if (points.length > 50) {
                points.shift();
            }
        }

        // 2. Draw
        if (points.length > 1) {
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = 20; // Thicker for visibility

            // Neon/Crayon Glow
            ctx.shadowBlur = 30; // Stronger glow
            ctx.shadowColor = '#FF00D6';
            ctx.strokeStyle = '#FF00D6';

            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            // Smooth curve
            for (let i = 1; i < points.length - 1; i++) {
                const xc = (points[i].x + points[i + 1].x) / 2;
                const yc = (points[i].y + points[i + 1].y) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
            }
            // Last point connection
            if (points.length > 2) {
                const last = points[points.length - 1];
                ctx.lineTo(last.x, last.y);
            }

            ctx.stroke();
        }

        requestAnimationFrame(animateTrail);
    };
    animateTrail();
}

// --- 4. ENHANCED GSAP ENTRANCE ANIMATIONS ---
window.addEventListener('load', () => {
    // Smooth fade-in for the entire page
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
    });

    // Left side - Sequential fade and slide
    gsap.from('.hero-overline', {
        opacity: 0,
        x: -60,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });

    gsap.from('.poster-headline', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out"
    });

    gsap.from('.poster-desc', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.7,
        ease: "power2.out"
    });

    gsap.from('.poster-form', {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.9,
        ease: "power2.out"
    });

    // Right side - Coordinated entrance
    gsap.from('.big-x', {
        scale: 0.8,
        opacity: 0,
        rotation: -15,
        duration: 1.2,
        ease: "back.out(1.4)",
        delay: 0.4
    });

    gsap.from('.massive-ayam', {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
    });

    gsap.from('.pink-ring-img', {
        opacity: 0,
        scale: 0.8,
        rotation: 180,
        duration: 1.2,
        delay: 1,
        ease: "back.out(1.2)"
    });

    gsap.from('.pink-bar-container', {
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        delay: 1.1,
        ease: "power2.out"
    });

    gsap.from('.star-icon', {
        scale: 0,
        opacity: 0,
        y: -30,
        duration: 0.8,
        delay: 1.3,
        ease: "back.out(2)"
    });

    gsap.from('.bottom-stats', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        delay: 1.2,
        ease: "power2.out"
    });

    gsap.from('.tagline', {
        opacity: 0,
        duration: 1,
        delay: 1.4,
        ease: "power2.out"
    });

    gsap.from('.ufo-mascot', {
        opacity: 0,
        y: 50,
        x: 50,
        rotation: 15,
        duration: 1.2,
        delay: 1.5,
        ease: "back.out(1.5)"
    });

    // Trusted By Section Entrance
    gsap.from('.trusted-section', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.6,
        ease: "power2.out"
    });


});

// --- 5. INPUT INTERACTION ---
const inputs = document.querySelectorAll('.input-skew');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, { x: 10, duration: 0.2 });
    });
    input.addEventListener('blur', () => {
        gsap.to(input, { x: 0, duration: 0.2 });
    });
});

// --- 5. ROTATING TEXT ANIMATION WITH CHARACTER FLIP ---
const rotatingTextElement = document.getElementById('rotatingText');
if (rotatingTextElement) {
    const words = [
        'INNOVATOR',
        'CREATOR',
        'BUILDER',
        'DEVELOPER',
        'ENGINEER',
        'ARCHITECT',
        'VISIONARY'
    ];

    let currentIndex = 0;

    // Function to wrap each character in a span
    function wrapCharacters(text) {
        return text.split('').map(char => {
            if (char === ' ') {
                return '<span class="char">&nbsp;</span>';
            }
            return `<span class="char">${char}</span>`;
        }).join('');
    }

    // Initialize with wrapped characters
    rotatingTextElement.innerHTML = wrapCharacters(words[currentIndex]);

    function flipToNewWord() {
        const currentWord = words[currentIndex];
        const nextIndex = (currentIndex + 1) % words.length;
        const nextWord = words[nextIndex];

        // Determine the maximum length to handle different word lengths
        const maxLength = Math.max(currentWord.length, nextWord.length);

        // Pad shorter word with spaces for smooth transition
        const paddedCurrentWord = currentWord.padEnd(maxLength, ' ');
        const paddedNextWord = nextWord.padEnd(maxLength, ' ');

        // Update HTML with padded current word
        rotatingTextElement.innerHTML = wrapCharacters(paddedCurrentWord);

        // Get all character spans
        const chars = rotatingTextElement.querySelectorAll('.char');

        // Flip each character one by one
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.classList.add('flip');

                // After half the animation (when char is invisible), change to next character
                setTimeout(() => {
                    const newChar = paddedNextWord[index];
                    char.textContent = newChar === ' ' ? '\u00A0' : newChar;
                }, 400); // Half of the 0.8s animation

                // Remove flip class after animation completes
                setTimeout(() => {
                    char.classList.remove('flip');
                }, 850); // Slightly longer to ensure smooth completion
            }, index * 60); // 60ms stagger for smoother wave effect
        });

        // After all animations complete, clean up and update index
        setTimeout(() => {
            currentIndex = nextIndex;
            // Re-render with actual word (trimmed)
            rotatingTextElement.innerHTML = wrapCharacters(words[currentIndex]);
        }, maxLength * 60 + 950);
    }

    // Start the rotation every 4 seconds (increased for better visibility)
    setInterval(flipToNewWord, 4000);
}

// --- 6. FOOTER SCROLL ANIMATION ---
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.footer-modern', {
        scrollTrigger: {
            trigger: '.footer-modern',
            start: 'top 90%', // When top of footer hits 90% of viewport height
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.footer-heading', {
        scrollTrigger: {
            trigger: '.footer-modern',
            start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2
    });
    
    // Stagger the contact cards
    gsap.from('.contact-card', {
        scrollTrigger: {
            trigger: '.footer-grid',
            start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1, // Stagger effect for each card
        ease: 'power2.out'
    });
});

// --- 7. MERCH CAROUSEL ANIMATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Stagger entrance for merch cards
    gsap.from('.merch-card', {
        scrollTrigger: {
            trigger: '.merch-section',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    });
    
    // Animate title
    gsap.from('.section-title', {
         scrollTrigger: {
            trigger: '.merch-section',
            start: 'top 85%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});
