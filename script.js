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

    gsap.from('.massive-aayam', {
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

// --- 10. FUTURISTIC MERCHANDISE LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // Data for products
    const merchData = {
        tshirt: [
            {
                title: 'ABYSS DRIFT',
                desc: 'Binary print tee for the ultimate coder.',
                price: '₹369',
                image: 'assets/merch-tshirt.png'
            },
            {
                title: 'CYBER CORE',
                desc: 'Neon circuit patterns on premium cotton.',
                price: '₹399',
                image: 'assets/merch-tshirt-2.png' // Ensure this asset exists or use placeholder
            }
        ],
        hoodie: [
            {
                title: 'NEON SHROUD',
                desc: 'Oversized hoodie with glow-in-dark sigils.',
                price: '₹899',
                image: 'assets/merch-hoodie.png'
            },
            {
                title: 'VOID WALKER',
                desc: 'All-black minimalist hoodie for stealth mode.',
                price: '₹949',
                image: 'assets/merch-hoodie-2.png'
            }
        ],
        zipper: [
            {
                title: 'TECH FLEECE',
                desc: 'Tactical zipper with utility pockets.',
                price: '₹1099',
                image: 'assets/merch-zipper.png'
            }
        ]
    };

    // State
    let currentCategory = 'tshirt';
    let currentProductIndex = 0;

    // Elements
    const titleEl = document.getElementById('merch-title');
    const descEl = document.getElementById('merch-desc');
    const priceEl = document.getElementById('merch-price');
    const imgEl = document.querySelector('.merch-img.main-img');

    // Tab Elements
    const tabs = document.querySelectorAll('.merch-tab');
    const indicator = document.querySelector('.merch-tab-indicator');

    // Arrow Elements
    const prevBtn = document.querySelector('.merch-arrow.prev-product');
    const nextBtn = document.querySelector('.merch-arrow.next-product');

    // Function to update UI
    function updateMerchUI() {
        const categoryData = merchData[currentCategory];
        // Safety check
        if (!categoryData || categoryData.length === 0) return;

        // Ensure index is within bounds (looping)
        if (currentProductIndex >= categoryData.length) currentProductIndex = 0;
        if (currentProductIndex < 0) currentProductIndex = categoryData.length - 1;

        const product = categoryData[currentProductIndex];

        // Animate Out
        gsap.to([titleEl, descEl, priceEl], {
            y: -10,
            opacity: 0,
            duration: 0.2,
            stagger: 0.05,
            onComplete: () => {
                // Update Content
                titleEl.textContent = product.title;
                descEl.textContent = product.desc;
                priceEl.textContent = `Price: ${product.price}`;

                // Animate In
                gsap.to([titleEl, descEl, priceEl], {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.1
                });
            }
        });

        // Image Animation
        gsap.to(imgEl, {
            scale: 0.8,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                imgEl.src = product.image;
                // Handle missing image
                imgEl.onerror = () => { imgEl.src = 'assets/merch-tshirt.png'; };

                gsap.to(imgEl, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'back.out(1.2)'
                });
            }
        });
    }

    // Tab Logic
    function moveIndicator(activeTab) {
        if (!activeTab) return;
        const width = activeTab.offsetWidth;
        const left = activeTab.offsetLeft;

        indicator.style.width = `${width}px`;
        indicator.style.left = `${left}px`;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update Active State
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Move Indicator
            moveIndicator(tab);

            // Update Category
            currentCategory = tab.dataset.category;
            currentProductIndex = 0; // Reset index for new category

            updateMerchUI();
        });
    });

    // Initialize Indicator Position
    const initialActiveTab = document.querySelector('.merch-tab.active');
    setTimeout(() => moveIndicator(initialActiveTab), 100); // Slight delay for layout

    // Arrow Logic
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentProductIndex--;
            updateMerchUI();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentProductIndex++;
            updateMerchUI();
        });
    }

    // Window Resize - Adjust Indicator
    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('.merch-tab.active');
        moveIndicator(activeTab);
    });
});

// --- 9. INTERACTIVE EVENT CALENDAR (ANTI-GRAVITY) ---
document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) return;

    // --- EVENT DATA ---
    const eventData = {
        0: [
            { id: 1, title: 'Inauguration', time: '9:00 AM – 10:30 AM', category: 'Talk', desc: 'Grand inauguration of AAYAM 2026. S.V. Seminar Hall', location: 'S.V. Seminar Hall' },
            { id: 2, title: 'Defence Exhibition', time: '10:30 AM – 12:00 PM', category: 'Exhibition', desc: 'Showcasing defense technology. RNT Ground', location: 'RNT Ground' },
            { id: 3, title: 'MUN Day 1 (Begins)', time: '10:30 AM – 12:00 PM', category: 'Tech', desc: 'Model United Nations session 1. MB-100', location: 'MB-100' },
            { id: 4, title: 'Aayam Cinematica (Theme Reveal)', time: '10:30 AM – 12:00 PM', category: 'Cultural', desc: 'Cinematic theme reveal. Online', location: 'Online' },
            { id: 5, title: 'Guesstimate', time: '10:30 AM – 12:00 PM', category: 'Tech', desc: 'Estimation competition. Online', location: 'Online' },
            { id: 6, title: 'On Campus 2D Workshop', time: '11:30 AM – 1:00 PM', category: 'Workshop', desc: '2D design workshop. Virtual Classroom', location: 'Virtual Classroom' },
            { id: 7, title: 'Technothon', time: '11:30 AM – 1:00 PM', category: 'Tech', desc: 'Technical marathon. Electrical Seminar Hall', location: 'Electrical Seminar Hall' },
            { id: 8, title: 'Reverse Shark Tank', time: '11:30 AM – 1:00 PM', category: 'Tech', desc: 'Entrepreneurship competition. CE 201', location: 'CE 201' },
            { id: 9, title: 'AI/ML Workshop', time: '2:00 PM – 3:30 PM', category: 'Workshop', desc: 'Artificial Intelligence workshop. CE 201', location: 'CE 201' },
            { id: 10, title: 'Phewsion’s Gaming Stall', time: '2:00 PM – 7:00 PM', category: 'Exhibition', desc: 'Gaming experience zone. RNT Ground', location: 'RNT Ground' },
            { id: 11, title: 'DSAI Exhibition', time: '2:00 PM – 7:00 PM', category: 'Exhibition', desc: 'Data Science & AI exhibition.', location: 'RNT Ground' },
            { id: 12, title: 'CITC Exhibition', time: '2:00 PM – 7:00 PM', category: 'Exhibition', desc: 'CITC Project showcase.', location: 'RNT Ground' },
            { id: 13, title: 'MUN Day 1 (Ends)', time: '2:00 PM – 7:00 PM', category: 'Tech', desc: 'Conclusion of Day 1 MUN. MB-100', location: 'MB-100' },
            { id: 14, title: 'Star Gazing', time: '6:30 PM – 7:30 PM', category: 'Cultural', desc: 'Astronomy session. SAC Rooftop', location: 'SAC Rooftop' },
            { id: 15, title: 'Speaker Session', time: '7:30 PM – 9:30 PM', category: 'Talk', desc: 'Guest speakers and insights. RNT Ground (Main Stage)', location: 'RNT Ground (Main Stage)' }
        ],
        1: [
            { id: 16, title: 'Women Panel', time: '9:00 AM – 10:30 AM', category: 'Talk', desc: 'Discussion on women in tech. S.V. Seminar Hall', location: 'S.V. Seminar Hall' },
            { id: 17, title: 'Pixels Workshop', time: '10:30 AM – 12:00 PM', category: 'Workshop', desc: 'Design and creativity workshop. CSE G-07', location: 'CSE G-07' },
            { id: 18, title: 'MUN Day 2 (Begins)', time: '10:30 AM – 12:00 PM', category: 'Tech', desc: 'Day 2 of Model United Nations. MB-100', location: 'MB-100' },
            { id: 19, title: 'Automobile Expo', time: '11:30 AM – 1:00 PM', category: 'Exhibition', desc: 'Automotive technology showcase. RNT Ground', location: 'RNT Ground' },
            { id: 20, title: 'Baja Roadshow', time: '11:30 AM – 1:00 PM', category: 'Exhibition', desc: 'Baja SAE vehicle display. RNT Ground', location: 'RNT Ground' },
            { id: 21, title: 'Glider Competition', time: '11:30 AM – 1:00 PM', category: 'Tech', desc: 'Glider flying competition. RNT Ground', location: 'RNT Ground' },
            { id: 22, title: 'Baja Design Competition', time: '2:00 PM – 3:30 PM', category: 'Tech', desc: 'Vehicle design challenge. Electrical Seminar Hall', location: 'Electrical Seminar Hall' },
            { id: 23, title: 'Case Study (Day 1)', time: '2:00 PM – 6:30 PM', category: 'Tech', desc: 'Business case study competition. Virtual Classroom', location: 'Virtual Classroom' },
            { id: 24, title: 'Hackathon Day 1', time: '2:00 PM – 6:30 PM', category: 'Tech', desc: 'Coding hackathon begins. CE-201', location: 'CE-201' },
            { id: 25, title: 'Anarc Sumo War', time: '2:00 PM – 6:30 PM', category: 'Tech', desc: 'Robot sumo wrestling. RNT Ground', location: 'RNT Ground' },
            { id: 26, title: 'Phewsion’s Gaming Stall', time: '2:00 PM – 6:30 PM', category: 'Exhibition', desc: 'Gaming zone. RNT Ground', location: 'RNT Ground' },
            { id: 27, title: 'Designathon', time: '2:00 PM – 6:30 PM', category: 'Tech', desc: 'Design marathon. CSE G07', location: 'CSE G07' },
            { id: 28, title: 'MUN Day 2 (Ends)', time: '2:00 PM – 6:30 PM', category: 'Tech', desc: 'Conclusion of Day 2 MUN. MB-100', location: 'MB-100' },
            { id: 29, title: 'IPL Auction', time: '4:00 PM – 6:30 PM', category: 'Tech', desc: 'Mock IPL Auction. Visvesvaraya Auditorium', location: 'Visvesvaraya Auditorium' },
            { id: 30, title: 'Star Gazing', time: '6:30 PM – 7:30 PM', category: 'Cultural', desc: 'Astronomy session. SAC Rooftop', location: 'SAC Rooftop' },
            { id: 31, title: 'Prom and DJ Night', time: '8:00 PM – 9:30 PM', category: 'Cultural', desc: 'Musical night. RNT Ground Main Stage', location: 'RNT Ground Main Stage' }
        ],
        2: [
            { id: 32, title: 'Creator’s Conclave', time: '9:00 AM – 10:00 AM', category: 'Talk', desc: 'Meet the creators. S.V. Seminar Hall', location: 'S.V. Seminar Hall' },
            { id: 33, title: 'Anima Drone Race', time: '10:00 AM – 11:30 AM', category: 'Tech', desc: 'Drone racing competition. RNT Ground', location: 'RNT Ground' },
            { id: 34, title: 'Hackathon Day 2', time: '11:00 AM – 1:00 PM', category: 'Tech', desc: 'Hackathon coding continues. CE 201', location: 'CE 201' },
            { id: 35, title: 'Case Study Day 2', time: '11:00 AM – 1:00 PM', category: 'Tech', desc: 'Case study finals. Virtual Classroom', location: 'Virtual Classroom' },
            { id: 36, title: 'Capture the Flag', time: '11:00 AM – 1:00 PM', category: 'Tech', desc: 'Cybersecurity competition. RNT Ground', location: 'RNT Ground' },
            { id: 37, title: 'Hackathon/Winner Announcement', time: '2:00 PM – 3:00 PM', category: 'Talk', desc: 'Prize distribution ceremony. Visvesvaraya Auditorium', location: 'Visvesvaraya Auditorium' },
            { id: 38, title: 'Debate on Tech', time: '2:00 PM – 3:00 PM', category: 'Tech', desc: 'Technology debate. Civil Gallery', location: 'Civil Gallery' },
            { id: 39, title: 'CAD Workshop', time: '3:00 PM – 4:30 PM', category: 'Workshop', desc: 'Computer Aided Design workshop. Electrical Seminar Hall', location: 'Electrical Seminar Hall' },
            { id: 40, title: 'Aayam Cinematica Screening', time: '5:00 PM – 6:30 PM', category: 'Cultural', desc: 'Short film screening. S.V. Auditorium', location: 'S.V. Auditorium' },
            { id: 41, title: 'Cultural Event / Artist Night', time: '7:00 PM – 9:30 PM', category: 'Cultural', desc: 'Grand finale artist performance. RNT Ground Main Stage', location: 'RNT Ground Main Stage' }
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

            // Inner HTML structure
            item.innerHTML = `
                <div class="event-time-wrapper">
                    <div class="event-time">${event.time}</div>
                    <div class="event-category">${event.category}</div>
                </div>
                <div class="timeline-dot"></div>
                <div class="event-card-wrapper" style="--i: ${index}">
                    <div class="anti-gravity-card" onclick="openEventModal(${event.id})">
                        <div class="card-content">
                            <h3>${event.title}</h3>
                            <p>${event.desc}</p>
                            <div class="card-meta">
                                <span class="meta-item"><i class="fa-solid fa-location-dot"></i> ${event.location}</span>
                            </div>
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

    // Make modal function global so onclick works
    window.openEventModal = function (id) {
        const modalOverlay = document.getElementById('eventModalOverlay');
        const modalTitle = document.getElementById('modalTitle');
        const modalTime = document.getElementById('modalTime');
        const modalDesc = document.getElementById('modalDesc');

        // Find event
        let event = null;
        Object.values(eventData).forEach(day => {
            const found = day.find(e => e.id === id);
            if (found) event = found;
        });

        if (event) {
            modalTitle.textContent = event.title;
            modalTime.textContent = `${event.time} | ${event.location}`;
            modalDesc.textContent = event.desc;
            modalOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent bg scroll
        }
    };

    // Close Modal Logic
    const closeBtn = document.querySelector('.close-modal');
    const modalOverlay = document.getElementById('eventModalOverlay');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
});
