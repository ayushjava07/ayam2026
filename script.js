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
    // Disable on mobile/tablet for better UX
    if (window.innerWidth <= 768) return;
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


// --- 3. SMOOTH NEON TRAIL EFFECT ---
const canvas = document.getElementById('trail-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // ── Config ──────────────────────────────────────────────
    const TRAIL_DURATION = 550;  // ms a point lives
    const MAX_POINTS = 60;   // max stored points
    const LERP_SPEED = 0.18; // how fast the cursor "catches up" (0-1)
    const MAX_WIDTH = 5;    // peak stroke width in px
    const GLOW_COLOR = 'rgba(255, 0, 214,';
    // ────────────────────────────────────────────────────────

    let points = [];
    let mouse = { x: -999, y: -999 };  // raw mouse
    let smooth = { x: -999, y: -999 };  // lerp'd mouse
    let lastSmooth = { x: -999, y: -999 };
    let raf;

    // Canvas resize
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Raw mouse capture
    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Catmull-Rom spline helper — draws a smooth curve through p1→p2
    // using p0 and p3 as control neighbours
    function catmullRomSegment(p0, p1, p2, p3, steps = 12) {
        for (let t = 0; t <= 1; t += 1 / steps) {
            const t2 = t * t, t3 = t2 * t;
            const x = 0.5 * (
                (2 * p1.x) +
                (-p0.x + p2.x) * t +
                (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
                (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
            );
            const y = 0.5 * (
                (2 * p1.y) +
                (-p0.y + p2.y) * t +
                (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
                (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
            );
            ctx.lineTo(x, y);
        }
    }

    const animateTrail = () => {
        raf = requestAnimationFrame(animateTrail);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const now = Date.now();

        // ── Lerp smooth position ──
        smooth.x += (mouse.x - smooth.x) * LERP_SPEED;
        smooth.y += (mouse.y - smooth.y) * LERP_SPEED;

        // Only push if we actually moved
        const dx = smooth.x - lastSmooth.x;
        const dy = smooth.y - lastSmooth.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1.5 && smooth.x > -900) {
            // Compute velocity-based width (faster → slightly wider)
            const speed = Math.min(dist, 30);
            const widthFactor = 0.3 + (speed / 30) * 0.7; // 0.3–1.0

            points.push({
                x: smooth.x,
                y: smooth.y,
                t: now,
                w: widthFactor * MAX_WIDTH
            });

            lastSmooth.x = smooth.x;
            lastSmooth.y = smooth.y;

            if (points.length > MAX_POINTS) points.shift();
        }

        // Expire old points
        while (points.length > 0 && now - points[0].t > TRAIL_DURATION) points.shift();

        if (points.length < 2) return;

        // ── Draw Catmull-Rom spline with per-segment style ──
        for (let i = 1; i < points.length; i++) {
            const progress = i / (points.length - 1);      // 0=tail, 1=head
            const ageFactor = 1 - (now - points[i].t) / TRAIL_DURATION; // 0–1

            const alpha = progress * ageFactor * 0.75;
            const width = points[i].w * progress;

            // Clamp neighbours to valid range for spline
            const p0 = points[Math.max(0, i - 2)];
            const p1 = points[i - 1];
            const p2 = points[i];
            const p3 = points[Math.min(points.length - 1, i + 1)];

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            catmullRomSegment(p0, p1, p2, p3);

            ctx.lineWidth = Math.max(0.5, width);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = `${GLOW_COLOR}${alpha})`;
            ctx.shadowColor = `${GLOW_COLOR}${alpha * 0.5})`;
            ctx.shadowBlur = 6 + progress * 10;
            ctx.stroke();
            ctx.restore();
        }
    };

    animateTrail();
}

// --- 4. DIRECTIONAL ROCKET CURSOR ---
(function () {
    // Only run on desktop with a real pointer
    if (window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches) return;

    // ── Create the cursor element ──────────────────────────
    const el = document.createElement('div');
    el.id = 'rocket-cursor-el';
    el.innerHTML = '<img src="assets/rocket-cursor.svg" alt="" draggable="false">';
    document.body.appendChild(el);

    // ── State ──────────────────────────────────────────────
    // SVG points straight UP. transform-origin = nose tip (16px, 3px).
    // CSS rotation 0° → pointing up, 90° → right, 180° → down, -90° → left.
    // Formula: targetAngle = atan2(dy, dx) * (180/π) + 90
    // (converts from standard math angle to CSS "from-top" rotation)

    let posX = -200, posY = -200;     // current screen position
    let prevX = -200, prevY = -200;   // last frame position
    let rawX = -200, rawY = -200;     // raw mouse (updated by event)

    let currentAngle = -90;           // start pointing up (−90° in atan2 space)
    let targetAngle = -90;

    const LERP_POS = 1.0;           // snap position directly to mouse (no lag)
    const LERP_ROT = 0.14;          // how fast the rocket rotates (0=instant snappy, lower=smoother)
    const MIN_DIST = 1.5;           // px movement threshold before updating angle

    // ── Mouse position (raw) ───────────────────────────────
    window.addEventListener('mousemove', (e) => {
        rawX = e.clientX;
        rawY = e.clientY;
    });

    // Hide when cursor leaves window
    document.addEventListener('mouseleave', () => {
        el.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        el.style.opacity = '1';
    });

    // ── Angle lerp with shortest-path wrap-around ─────────
    function lerpAngle(current, target, t) {
        let diff = target - current;
        // Clamp to [-180, +180] to always take the short arc
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        return current + diff * t;
    }

    // ── RAF loop ──────────────────────────────────────────
    const animate = () => {
        requestAnimationFrame(animate);

        // Snap position to mouse (no trailing lag on position)
        posX = rawX;
        posY = rawY;

        // Compute velocity from last frame position
        const dx = posX - prevX;
        const dy = posY - prevY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > MIN_DIST) {
            // atan2(dy, dx) gives angle from east in standard math terms.
            // Adding 90° converts to CSS "from-top" rotation.
            targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        }

        prevX = posX;
        prevY = posY;

        // Smooth rotation toward target direction
        currentAngle = lerpAngle(currentAngle, targetAngle, LERP_ROT);

        // Position: translate so nose tip (transform-origin 16px, 3px) sits at cursor
        // ⟹ offset element's top-left by (posX − 16, posY − 3)
        el.style.transform =
            `translate(${posX - 16}px, ${posY - 3}px) rotate(${currentAngle}deg)`;
    };
    animate();

    // Hide/show on resize
    window.addEventListener('resize', () => {
        el.style.display = window.innerWidth <= 768 ? 'none' : 'block';
    });
})();

// --- 5. ENHANCED GSAP ENTRANCE ANIMATIONS ---

gsap.config({ nullTargetWarn: false }); // suppress 'target not found' warnings

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

    gsap.fromTo('.pink-ring-img',
        { opacity: 0, scale: 0.8, rotation: 180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.2, delay: 1, ease: "back.out(1.2)" }
    );

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



    // Sponsors Page Entrance
    if (document.querySelector('.sponsors-section')) {
        gsap.from('.page-title', {
            y: -50,
            duration: 1.2,
            delay: 0.1,
            ease: "power3.out"
        });

        gsap.from('.page-subtitle', {
            y: 30,
            duration: 1,
            delay: 0.2,
            ease: "power2.out"
        });

        gsap.from('.sponsor-item', {
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.3,
            ease: "back.out(1.2)"
        });
    }

    // Refresh ScrollTrigger after everything is loaded
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
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

// // --- 7. MERCH CAROUSEL ANIMATION ---
// document.addEventListener('DOMContentLoaded', () => {
//     // Stagger entrance for merch cards
//     gsap.from('.merch-card', {
//         scrollTrigger: {
//             trigger: '.merch-section',
//             start: 'top 80%',
//         },
//         y: 50,
//         opacity: 0,
//         duration: 0.8,
//         stagger: 0.1,
//         ease: 'power2.out'
//     });

//     // Animate title
//     gsap.from('.section-title', {
//          scrollTrigger: {
//             trigger: '.merch-section',
//             start: 'top 85%',
//         },
//         x: -50,
//         opacity: 0,
//         duration: 1,
//         ease: 'power3.out'
//     });
// });

// --- 7. PRELOADER & SITE INITIALIZATION (SIMPLE) ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const percentText = document.getElementById('percent-text');
    const body = document.body;

    if (!preloader) return;

    // Check if we've already shown the loader this session
    if (sessionStorage.getItem('aayamLoaded')) {
        preloader.style.display = 'none';
        return;
    }

    // Disable scrolling
    body.style.overflow = 'hidden';

    let progress = 0;

    // Fast simple counter
    const interval = setInterval(() => {
        progress += 2; // Increment speed

        if (progress > 100) progress = 100;

        if (percentText) {
            percentText.innerText = `${progress}%`;
        }

        if (progress === 100) {
            clearInterval(interval);

            // Finish
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
                body.style.overflow = '';

                // Mark as loaded so it doesn't show again on refresh/nav
                sessionStorage.setItem('aayamLoaded', 'true');

                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 200);
        }
    }, 20); // 20ms * 50 steps = approx 1 second load time
});


// --- 8. EVENTS CAROUSEL (STABLE & CLEAN) ---
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');


    if (!track || track.children.length === 0) return;

    const slides = Array.from(track.children);

    // Robustly determine slide dimensions including margins
    const style = window.getComputedStyle(slides[0]);
    const marginLeft = parseFloat(style.marginLeft) || 0;
    const marginRight = parseFloat(style.marginRight) || 0;
    const fullSlideWidth = slides[0].offsetWidth + marginLeft + marginRight;
    const slideVisualWidth = slides[0].offsetWidth;

    let index = 1;
    let isAnimating = false;

    // ---- CLONE ONLY ONCE ----
    // We clone the first and last slide to create a buffer loop.
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.classList.add('clone');
    lastClone.classList.add('clone');

    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const allSlides = Array.from(track.children);

    // Function to center a specific index
    function setPosition(i, animate = false) {
        if (animate) {
            track.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        } else {
            track.style.transition = 'none';
        }

        const trackContainerWidth = track.parentElement.offsetWidth;

        // Calculate where the center of the 'i-th' slide is relative to the start of the full track content.
        // Each item takes fullSlideWidth. 
        // The 'visual' center of item 'i' is at distance: (i * fullSlideWidth) + marginLeft + (slideVisualWidth / 2)

        const centerOfSlideFromStart = (i * fullSlideWidth) + marginLeft + (slideVisualWidth / 2);

        // We want this point to be at the center of the viewport (trackContainerWidth / 2)
        // So we shift the track left by (CenterOfSlide - ViewportCenter)

        const shift = (trackContainerWidth / 2) - centerOfSlideFromStart;

        track.style.transform = `translateX(${shift}px)`;
        track.offsetHeight; // Force reflow if needed

        // Update visual states
        allSlides.forEach(slide => {
            slide.classList.remove('current-slide');
            slide.style.opacity = '0.4';
            slide.style.transform = 'scale(0.85) rotateY(15deg)';
            slide.style.filter = 'blur(2px) grayscale(60%)';
            slide.style.zIndex = '1';
        });

        if (allSlides[i]) {
            allSlides[i].classList.add('current-slide');
            allSlides[i].style.opacity = '1';
            allSlides[i].style.transform = 'scale(1.15) rotateY(0deg)';
            allSlides[i].style.filter = 'blur(0) grayscale(0)';
            allSlides[i].style.zIndex = '10';
        }
    }

    // Initial set (Index 1 is the first original slide)
    setPosition(index);

    function moveTo(newIndex) {
        if (isAnimating) return;
        isAnimating = true;
        index = newIndex;
        setPosition(index, true);
    }

    track.addEventListener('transitionend', () => {
        isAnimating = false;
        // Check if we landed on a clone
        if (allSlides[index].classList.contains('clone')) {
            track.style.transition = 'none';
            if (index === allSlides.length - 1) {
                // We are at the cloned First slide (end of list) -> jump to real First (index 1)
                index = 1;
            } else if (index === 0) {
                // We are at the cloned Last slide (start of list) -> jump to real Last (length - 2)
                index = allSlides.length - 2;
            }
            setPosition(index, false);
        }
    });

    if (nextBtn) nextBtn.addEventListener('click', () => moveTo(index + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => moveTo(index - 1));

    // ---- TOUCH / SWIPE ----
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    track.addEventListener('touchmove', e => {
        if (!isDragging) return;
        // Optional: Real-time drag feedback could go here
    });

    track.addEventListener('touchend', e => {
        if (!isDragging) return;
        isDragging = false;
        const diff = e.changedTouches[0].clientX - startX;
        if (diff > 50) moveTo(index - 1);
        if (diff < -50) moveTo(index + 1);
    });

    // Mouse Drag Support
    track.addEventListener('mousedown', e => {
        startX = e.clientX;
        isDragging = true;
        track.style.cursor = 'grabbing';
        e.preventDefault(); // Prevent text selection
    });

    track.addEventListener('mouseup', e => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        const diff = e.clientX - startX;
        if (diff > 50) moveTo(index - 1);
        if (diff < -50) moveTo(index + 1);
    });

    track.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            track.style.cursor = 'grab';
        }
    });

    // Recalculate on resize
    window.addEventListener('resize', () => {
        setPosition(index, false);
    });

    // --- 9. 3D TILT EFFECT FOR ACTIVE CARD ---
    function handleTilt(e) {
        if (!e.type.includes('mouse')) return;

        const currentSlide = allSlides[index]; // Use the main index variable
        if (!currentSlide) return;

        const rect = currentSlide.getBoundingClientRect();
        // Check bounds with some padding tolerance
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
            resetTilt();
            return;
        }

        const card = currentSlide.querySelector('.event-card');
        const poster = currentSlide.querySelector('.event-poster');

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        if (card) {
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                ease: 'power1.out',
                duration: 0.4
            });
        }
        if (poster) {
            gsap.to(poster, {
                x: (x - centerX) * 0.08,
                y: (y - centerY) * 0.08,
                scale: 1.1,
                ease: 'power1.out',
                duration: 0.4
            });
        }
    }

    function resetTilt() {
        // Reset the CURRENT slide (or all if safer, but current is efficient)
        const currentSlide = allSlides[index];
        if (!currentSlide) return;

        const card = currentSlide.querySelector('.event-card');
        const poster = currentSlide.querySelector('.event-poster');

        if (card) {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                ease: 'power2.out',
                duration: 0.5
            });
        }
        if (poster) {
            gsap.to(poster, {
                x: 0,
                y: 0,
                scale: 1,
                ease: 'power2.out',
                duration: 0.5
            });
        }
    }

    const trackContainer = document.querySelector('.carousel-track-container');
    if (trackContainer) {
        trackContainer.addEventListener('mousemove', handleTilt);
        trackContainer.addEventListener('mouseleave', resetTilt);
    }

    // Ensure correct positioning after full page load (images, fonts, etc.)
    window.addEventListener('load', () => {
        setPosition(index, false);
    });
});

// --- 10. FUTURISTIC MERCHANDISE LOGIC (REMOVED - MOVED TO GRID) ---
// Logic removed as we switched to a static grid layout for better UX.

// --- 9. INTERACTIVE EVENT CALENDAR (ANTI-GRAVITY) ---
document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;

    // --- EVENT DATA ---
    // registerLink: 'https://...'    → Live "Register Now" button (Unstop / GForm URL)
    // registerLink: 'COMING_SOON'    → "Registration Opening Soon" badge (no link yet)
    // no registerLink                → no button shown (non-competition events)
    const eventData = {
        0: [
            { id: 1, title: 'Keynote Session', time: '9:00 AM – 10:30 AM', category: 'Talk', desc: 'Opening keynote of AAYAM 2026.', location: 'S.V. Seminar Hall' },
            { id: 2, title: 'Defence Exhibition', time: '10:30 AM – 12:00 PM', category: 'Exhibition', desc: 'Showcasing defense technology.', location: 'Knowledge Park' },
            { id: 3, title: 'MUN Day 1 (Begins)', time: '10:30 AM – 12:00 PM', category: 'Tech', desc: 'Model United Nations session 1.', location: 'MB-100', registerLink: 'COMING_SOON' },
            { id: 4, title: 'Aayam Cinematica (Theme Reveal)', time: '10:30 AM – 12:00 PM', category: 'Cultural', desc: 'Cinematic theme reveal.', location: 'Online',registerLink: 'https://unstop.com/o/M2FtICx?lb=vSCXWVGx&utm_medium=Share&utm_source=sourasnata&utm_campaign=Events' },
            { id: 5, title: 'Guesstimate', time: '10:30 AM – 12:00 PM', category: 'Tech', desc: 'Estimation competition.', location: 'Online', registerLink: 'COMING_SOON' },
            { id: 6, title: 'On Campus 2D Workshop', time: '11:30 AM – 1:00 PM', category: 'Workshop', desc: '2D design workshop.', location: 'Virtual Classroom', registerLink: 'COMING_SOON' },
            { id: 7, title: 'Technothon', time: '11:30 AM – 1:00 PM', category: 'Tech', desc: 'Technical marathon.', location: 'Electrical Seminar Hall', registerLink: 'COMING_SOON' },
            { id: 8, title: 'Reverse Shark Tank', time: '11:30 AM – 1:00 PM', category: 'Tech', desc: 'Entrepreneurship competition.', location: 'CE 201', registerLink: 'https://forms.gle/ohtHbDvbmrE7tBKJ7' },
            { id: 9, title: 'AI/ML Workshop', time: '2:00 PM – 3:30 PM', category: 'Workshop', desc: 'Artificial Intelligence workshop.', location: 'CE 201', registerLink: 'COMING_SOON' },
            { id: 11, title: 'DSAI Exhibition', time: '2:00 PM – 7:00 PM', category: 'Exhibition', desc: 'Data Science & AI exhibition.', location: 'Knowledge Park' },
            { id: 12, title: 'CITC Exhibition', time: '2:00 PM – 7:00 PM', category: 'Exhibition', desc: 'CITC Project showcase.', location: 'Knowledge Park' },
            { id: 13, title: 'MUN Day 1 (Ends)', time: '2:00 PM – 7:00 PM', category: 'Tech', desc: 'Conclusion of Day 1 MUN.', location: 'MB-100',registerLink: 'https://unstop.com/conferences/world-security-council-2026-aayam-national-institute-of-technology-nit-agartala-1647617?lb=NiujaWDd&utm_medium=Share&utm_source=general_competition&utm_campaign=' },
            { id: 14, title: 'Star Gazing', time: '6:30 PM – 7:30 PM', category: 'Tech', desc: 'Explore astronomy, space technology, and celestial observation.', location: 'SAC Rooftop' },
            { id: 15, title: 'Inauguration & Speaker Session', time: '7:30 PM – 9:30 PM', category: 'Talk', desc: 'Grand inauguration ceremony followed by guest speakers and insights.', location: 'Knowledge Park' },
            { id: 157, title: 'CAD RUSH',category: 'Tech', desc: 'An individual CAD design challenge ', location: 'unstop'}
        ],
        1: [
            { id: 16, title: 'Creator\'s Conclave', time: '9:30 AM – 10:30 AM', category: 'Talk', desc: 'Meet the creators.', location: 'S.V. Seminar Hall' },
            { id: 17, title: 'Pixels Workshop', time: '10:30 AM – 12:00 PM', category: 'Workshop', desc: 'Design and creativity workshop.', location: 'CSE G-07', registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSf1uIaPKR6HGCY9uzEd2-2WPeJpHeqqAJinZ8MBWbnYJN0XaQ/viewform?usp=publish-editor' },
            { id: 18, title: 'MUN Day 2 (Begins)', time: '10:30 AM – 12:00 PM', category: 'Tech', desc: 'Day 2 of Model United Nations.', location: 'MB-100' },
            { id: 19, title: 'Automobile Expo', time: '11:30 AM – 1:00 PM', category: 'Exhibition', desc: 'Automotive technology showcase.', location: 'Knowledge Park' },
            { id: 199, title: 'Ideathon', time: '11:30 AM – 1:00 PM', category: 'Tech', desc: 'Brainstorm, build, and pitch impactful solutions to real-world problems.', location: 'Knowledge Park',registerLink: 'https://forms.gle/Qkuu6sKvKQLj3mbr8' },
            { id: 20, title: 'Baja Roadshow', time: '11:30 AM – 1:00 PM', category: 'Exhibition', desc: 'Baja SAE vehicle display.', location: 'Knowledge Park' },
            { id: 21, title: 'Glider Competition', time: '11:30 AM – 1:00 PM', category: 'Tech', desc: 'Glider flying competition.', location: 'Knowledge Park', registerLink: 'COMING_SOON' },
            { id: 22, title: 'Baja Design Competition', time: '2:00 PM – 3:30 PM', category: 'Tech', desc: 'Vehicle design challenge.', location: 'Electrical Seminar Hall', registerLink: 'COMING_SOON' },
            { id: 23, title: 'Case Study (Day 1)', time: '2:00 PM – 6:30 PM', category: 'Tech', desc: 'Business case study competition.', location: 'Virtual Classroom', registerLink: 'https://unstop.com/o/fJVNs9z' },
            { id: 24, title: 'Hackathon Day 1', time: '2:00 PM – 6:30 PM', category: 'Tech', desc: 'Coding hackathon begins.', location: 'CE-201', registerLink: 'COMING_SOON' },
            { id: 25, title: 'Anarc Sumo War', time: '2:00 PM – 6:30 PM', category: 'Tech', desc: 'Robot sumo wrestling.', location: 'Knowledge Park', registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSf4qtVpbhLcqN4nTBqIO1sk5be1GkYcpC5Z7m8L33bQSWFhEA/viewform?usp=header' },
            { id: 26, title: 'Phewsion\'s GRAND GAUNLET', time: '10:00 AM – 11:30 AM', category: 'Exhibition', desc: 'Gaming zone.', location: 'MB 200',registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdDQYvGl-Xqr-r2CfjnM5zO2Fsyy9dcbBY4UFgqOYxAgSIzdg/viewform' },
            { id: 27, title: 'Designathon', time: '2:00 PM – 6:30 PM', category: 'Tech', desc: 'Design marathon.', location: 'CSE G07', registerLink: 'COMING_SOON' },
            { id: 28, title: 'MUN Day 2 (Ends)', time: '2:00 PM – 6:30 PM', category: 'Tech', desc: 'Conclusion of Day 2 MUN.', location: 'MB-100',registerLink: 'https://unstop.com/conferences/world-security-council-2026-aayam-national-institute-of-technology-nit-agartala-1647617?lb=NiujaWDd&utm_medium=Share&utm_source=general_competition&utm_campaign='  },
            { id: 29, title: 'IPL Auction', time: '4:00 PM – 6:30 PM', category: 'Tech', desc: 'Mock IPL Auction.', location: 'Visvesvaraya Auditorium', registerLink: 'COMING_SOON' },
            { id: 30, title: 'Star Gazing', time: '6:30 PM – 7:30 PM', category: 'Tech', desc: 'Explore astronomy, space technology, and celestial observation.', location: 'SAC Rooftop' },
            { id: 31, title: 'Speaker Session', time: '8:00 PM – 9:30 PM', category: 'Talk', desc: 'Guest speakers and insights.', location: 'Knowledge Park' },
            { id: 311, title: 'Prom and DJ Night', time: '9:30 PM onwards', category: 'Cultural', desc: 'Musical night.', location: 'Knowledge Park' }
        ],
        2: [
            { id: 32, title: 'Tech Panel', time: '9:00 AM – 10:00 AM', category: 'Talk', desc: 'Expert panel discussion on technology and innovation.', location: 'S.V. Seminar Hall' },
            { id: 33, title: 'Anima Drone Race', time: '10:00 AM – 11:30 AM', category: 'Tech', desc: 'Drone racing competition.', location: 'Knowledge Park', registerLink: 'COMING_SOON' },
            { id: 263, title: 'Phewsion\'s EAFC 25 Tournament ', time: '10:00 AM – 12:00 PM', category: 'Exhibition', desc: 'Gaming zone.', location: 'MB 200',registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSe0jLsfTLwcK2LhzBWft8g469ohQSsoxzU8gBo55wNUqn50fQ/viewform?usp=header'},
            { id: 34, title: 'Hackathon Day 2', time: '11:00 AM – 1:00 PM', category: 'Tech', desc: 'Hackathon coding continues.', location: 'CE 201', registerLink: 'COMING_SOON' },
            { id: 35, title: 'Case Study Day 2', time: '11:00 AM – 1:00 PM', category: 'Tech', desc: 'Case study finals.', location: 'Virtual Classroom', registerLink: 'https://unstop.com/o/fJVNs9z' },
            { id: 36, title: 'Capture the Flag', time: '11:00 AM – 1:00 PM', category: 'Tech', desc: 'Cybersecurity competition.', location: 'Knowledge Park', registerLink: 'COMING_SOON' },
            { id: 37, title: 'Hackathon/Winner Announcement', time: '2:00 PM – 3:00 PM', category: 'Talk', desc: 'Prize distribution ceremony.', location: 'Visvesvaraya Auditorium' },
            { id: 265, title: 'Phewsion\'s MK11 KNOCKOUT', time: '02:00 PM – 04:00 PM', category: 'Exhibition', desc: 'Gaming zone.', location: 'RNT Ground',registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdDyyZJJD6tgOCev7cTQ9x7HiA5ydk6T3iPSq2zXc50hP3UKw/viewform'},
            { id: 38, title: 'Debate on Tech', time: '2:00 PM – 3:00 PM', category: 'Tech', desc: 'Technology debate.', location: 'Civil Gallery', registerLink: 'COMING_SOON' },
            { id: 39, title: 'CAD Workshop', time: '3:00 PM – 4:30 PM', category: 'Workshop', desc: 'Computer Aided Design workshop.', location: 'Electrical Seminar Hall', registerLink: 'COMING_SOON' },
            { id: 40, title: 'Aayam Cinematica Screening', time: '5:00 PM – 6:30 PM', category: 'Tech', desc: 'A tech-themed screening exploring the intersection of technology, filmmaking, and innovation.', location: 'S.V. Auditorium' },
            { id: 41, title: 'Cultural Event / Artist Night', time: '7:00 PM – 9:30 PM', category: 'Cultural', desc: 'Grand finale artist performance.', location: 'Knowledge Park' }
        ]
    };

    let currentDay = 0;
    let currentFilter = 'all';

    // --- RENDER TIMELINE ---
    function renderTimeline() {
        // Clear existing items (keep the line)
        const line = timelineContainer.querySelector('.timeline-line');
        timelineContainer.innerHTML = '';
        timelineContainer.appendChild(line);

        // Get data for day
        const dayEvents = eventData[currentDay] || [];

        // Application Filter
        const filteredEvents = dayEvents.filter(event => {
            if (currentFilter === 'all') return true;
            return event.category === currentFilter;
        });

        if (filteredEvents.length === 0) {
            const noEvents = document.createElement('div');
            noEvents.style.textAlign = 'center';
            noEvents.style.color = '#777';
            noEvents.style.padding = '3rem';
            noEvents.textContent = 'No events found for this category.';
            timelineContainer.appendChild(noEvents);
            return;
        }

        // Generate HTML
        filteredEvents.forEach((event, index) => {
            const item = document.createElement('div');
            item.classList.add('timeline-item');

            // Stagger animation delay
            item.style.transitionDelay = `${index * 0.1}s`;

            // Register button — two states:
            //   Live URL  → green "Register Now" button
            //   COMING_SOON → amber "Registration Opening Soon" badge (no link)
            let regBtn = '';
            if (event.registerLink && event.registerLink !== 'COMING_SOON') {
                regBtn = `<a href="${event.registerLink}" target="_blank" class="event-register-btn">⚡ REGISTER NOW</a>`;
            } else if (event.registerLink === 'COMING_SOON') {
                regBtn = `<span class="event-register-soon">🕐 Registration Opening Soon</span>`;
            }

            // Inner HTML structure
            item.innerHTML = `
                <div class="event-time-wrapper">
                    <div class="event-time">${event.time}</div>
                    <div class="event-category">${event.category}</div>
                </div>
                <div class="timeline-dot"></div>
                <div class="event-card-wrapper" style="--i: ${index}">
                    <div class="anti-gravity-card">
                        <div class="card-content">
                            <h3>${event.title}</h3>
                            <p>${event.desc}</p>
                            <div class="card-meta">
                                <span class="meta-item"><i class="fa-solid fa-location-dot"></i> ${event.location}</span>
                            </div>
                            ${regBtn}
                        </div>
                    </div>
                </div>
            `;

            timelineContainer.appendChild(item);

            // Trigger animation after append
            setTimeout(() => {
                item.classList.add('visible');
            }, 50);
        });
    }

    // --- TAB SWITCHING ---
    const tabs = document.querySelectorAll('.calendar-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update day
            currentDay = parseInt(tab.dataset.day);
            renderTimeline();
        });
    });

    // --- FILTER SWITCHING ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.dataset.filter;
            renderTimeline();
        });
    });

    // Initial Render
    renderTimeline();

});


// --- 9. MERCHANDISE CAROUSEL ---
// --- 9. MERCHANDISE GRID INTERACTIVITY (Added) ---
document.addEventListener('DOMContentLoaded', () => {
    // Add 3D Tilt Effect to Merch Cards
    const cards = document.querySelectorAll('.merch-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 10deg)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
});

// --- 11. MOBILE NAVIGATION HAMBURGER MENU ---
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const navOverlay = document.getElementById('nav-overlay');

    function closeMenu() {
        if (navMenu) navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.add('active');
            if (navOverlay) navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeMenu);
        }

        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link, .btn-nav-ticket, .mobile-btn-register');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});
