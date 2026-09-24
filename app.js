/**
 * ==========================================
 * Main App Initialization
 * ==========================================
 * 
 * Shalani's Memory Lane
 * A liquid-interactive web experience celebrating our love story
 */

console.log('💖 Shalani\'s Memory Lane - Loading...');

/**
 * Initialize all interactive features on page load
 */
function initializeApp() {
    console.log('✨ App Initialized Successfully');

    // Add scroll reveal animations
    observeScrollElements();

    // Start the terminal-style welcome loader and on-scroll typewriter effects
    initTerminalLoader();
    initTypewriterOnScroll();
    initQuizModal();
}

/**
 * Intersection Observer for scroll-triggered animations
 */
function observeScrollElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-animation');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe memory nodes
    document.querySelectorAll('.memory-node').forEach(node => {
        observer.observe(node);
    });
}

/**
 * Add interactive hover effects to memory nodes
 */
function initMemoryNodeInteractions() {
    document.querySelectorAll('.memory-node').forEach(node => {
        node.addEventListener('mouseenter', () => {
            node.classList.add('glow-pulse');
        }, { passive: true });

        node.addEventListener('mouseleave', () => {
            node.classList.remove('glow-pulse');
        }, { passive: true });

        // Mobile touch support
        node.addEventListener('touchstart', () => {
            node.classList.toggle('glow-pulse');
        }, { passive: true });
    });
}

/**
 * Smooth scroll enhancement
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initGallery() {
    sessionStorage.setItem('sml_lastPage', 'gallery.html');
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    const galleryImages = [
        'WhatsApp Image 2026-06-06 at 6.11.59 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.11.59 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.00 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.06 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.07 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.07 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.08 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.09 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.09 PM (2).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.09 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.10 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.10 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.11 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.11 PM (2).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.11 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.12 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.13 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.13 PM (2).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.13 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.14 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.14 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.12.15 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.24 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.30 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.42 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.43 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.45 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.46 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.47 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.47 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.51 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.51 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.52 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.53 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.53 PM (2).jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.53 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.54 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.58 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.59 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.14.59 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.02 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.03 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.03 PM (2).jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.03 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.04 PM (2).jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.05 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.05 PM (2).jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.05 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.06 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.06 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.07 PM (1).jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.07 PM (2).jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.07 PM.jpeg',
        'WhatsApp Image 2026-06-06 at 6.15.09 PM.jpeg'
    ];

    galleryImages.forEach((filename, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item fade-in stagger-${(index % 5) + 1}`;
        galleryItem.innerHTML = `
            <img src="assets/images/${filename}" alt="${filename.replace(/^(WhatsApp Image 2026-06-06 at |\.jpeg|\(\d+\))/g, '').trim()}" loading="lazy" decoding="async">
            <div class="gallery-overlay"></div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

function preloadImage(src) {
    return new Promise((resolve) => {
        const image = new Image();
        image.src = src;
        image.onload = () => resolve(src);
        image.onerror = () => resolve(src);
    });
}

function preloadAudioAsset(src) {
    return new Promise((resolve) => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = src;
        audio.addEventListener('canplaythrough', () => resolve(src));
        audio.addEventListener('error', () => resolve(src));
        audio.load();
    });
}

function updateTerminalProgress(percent) {
    const progressBar = document.getElementById('terminal-progress');
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }
}

function typeLogLine(logText) {
    const logContainer = document.getElementById('log-container');
    return new Promise((resolve) => {
        if (!logContainer) {
            resolve();
            return;
        }

        const line = document.createElement('div');
        line.className = 'log-line';
        logContainer.appendChild(line);

        let index = 0;
        const speed = 18;
        const interval = setInterval(() => {
            if (index < logText.length) {
                line.textContent += logText[index++];
                logContainer.scrollTop = logContainer.scrollHeight;
            } else {
                clearInterval(interval);
                setTimeout(resolve, 300);
            }
        }, speed);
    });
}

async function runTerminalStartup() {
    const logs = [
        "[INFO] Establishing secure connection to Menula's heart... Connected. ❤️",
        '[INFO] Loading precious memories with Shalani... [100%]',
        '[INFO] Initializing affection & sweet vibes...',
        '[WARN] Warning: Love levels exceeding max capacity! Overclocking...',
        '[INFO] Syncing heartbeats and romantic moments...',
        '[SUCCESS] Heart sync complete! Welcome baby 💕'
    ];

    const assets = [
        'assets/images/WhatsApp Image 2026-06-06 at 6.14.24 PM.jpeg',
        'assets/images/WhatsApp Image 2026-06-06 at 6.12.08 PM (1).jpeg',
        'assets/audio/numbawa_soya.mp3'
    ];

    const assetPromises = assets.map((src) => {
        if (src.endsWith('.mp3')) {
            return preloadAudioAsset(src).catch(() => src);
        }
        return preloadImage(src).catch(() => src);
    });

    const totalSteps = logs.length + assets.length;
    let currentStep = 0;

    const incrementProgress = () => {
        currentStep += 1;
        updateTerminalProgress(Math.round((currentStep / totalSteps) * 100));
    };

    const assetPromisesWithTracking = assetPromises.map((promise) => {
        return promise.then(() => {
            incrementProgress();
        }).catch(() => {
            incrementProgress();
        });
    });

    for (let i = 0; i < logs.length; i += 1) {
        await typeLogLine(logs[i]);
        incrementProgress();
    }

    await Promise.all(assetPromisesWithTracking);
    showEnterAction();
}

function showEnterAction() {
    const enterAction = document.getElementById('enter-action');
    if (!enterAction) return;

    const button = document.createElement('button');
    button.className = 'enter-button';
    button.id = 'enter-lane-btn';
    button.textContent = 'Enter Memory Lane ✨';
    button.type = 'button';
    button.addEventListener('click', () => {
        const overlay = document.getElementById('loading-screen');
        const audio = document.getElementById('love-audio');

        if (audio) {
            audio.play().catch(() => {
                console.warn('Autoplay blocked; user can press play to continue.');
            });
            // Save playing state so other pages can resume music
            sessionStorage.setItem('sml_audioPlaying', 'true');
            sessionStorage.setItem('sml_audioTime', '0');
        }

        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }
    });

    enterAction.appendChild(button);
    document.body.classList.add('on-ready');
}

function skipLoadingScreen() {
    const overlay = document.getElementById('loading-screen');
    if (overlay) {
        overlay.style.display = 'none';
        overlay.remove();
    }
    document.body.classList.add('on-ready');
}

function isPageReload() {
    try {
        const navEntries = performance.getEntriesByType('navigation');
        if (navEntries && navEntries.length > 0) {
            return navEntries[0].type === 'reload';
        }
        if (performance.navigation) {
            return performance.navigation.type === performance.navigation.TYPE_RELOAD;
        }
    } catch (e) {
        console.warn('Error detecting reload status:', e);
    }
    return false;
}

function initTerminalLoader() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    // Check if the current page load is a browser reload/refresh
    const isReload = isPageReload();

    // Check if user is returning back from gallery.html
    const lastPage = sessionStorage.getItem('sml_lastPage');
    const isFromGallery = (document.referrer && document.referrer.includes('gallery.html')) || lastPage === 'gallery.html';

    // Remove legacy localStorage item if present
    localStorage.removeItem('sml_hasVisited');

    // Skip the terminal loading screen ONLY if it's NOT a reload and user is returning from gallery.html
    if (!isReload && isFromGallery) {
        skipLoadingScreen();
        sessionStorage.setItem('sml_lastPage', 'index.html');
        return;
    }

    // Set lastPage to index.html for future navigation checks
    sessionStorage.setItem('sml_lastPage', 'index.html');

    if (document.readyState === 'complete') {
        runTerminalStartup();
    } else {
        window.addEventListener('load', runTerminalStartup);
    }
}

function initAudioControlWidget() {
    const audio = document.getElementById('love-audio');
    const playToggle = document.getElementById('widget-play-pause');
    const muteToggle = document.getElementById('widget-mute');
    const trackTitle = document.getElementById('widget-track-title');
    const trackStatus = document.getElementById('widget-track-status');
    const audioTitle = document.querySelector('.audio-title');

    if (!audio || !playToggle || !muteToggle) return;

    playToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    muteToggle.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteToggle.textContent = audio.muted ? '🔇' : '🔊';
    });

    audio.addEventListener('play', () => {
        playToggle.textContent = '⏸';
        trackStatus.textContent = 'Playing';
    });

    audio.addEventListener('pause', () => {
        playToggle.textContent = '▶';
        trackStatus.textContent = 'Paused';
    });

    audio.addEventListener('loadeddata', () => {
        trackTitle.textContent = audioTitle ? audioTitle.textContent : 'Our soundtrack';
        trackStatus.textContent = 'Ready to play';
    });
}

function initTypewriterOnScroll() {
    const targets = document.querySelectorAll('.typewriter-text');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.dataset.text || element.textContent || '';
                element.textContent = '';
                let index = 0;
                const interval = setInterval(() => {
                    if (index >= text.length) {
                        clearInterval(interval);
                        return;
                    }
                    element.textContent += text.charAt(index);
                    index += 1;
                }, 40);
                obs.unobserve(element);
            }
        });
    }, {
        threshold: 0.25
    });

    targets.forEach((target) => observer.observe(target));
}

/**
 * ==========================================
 * Festive Canvas Firecrackers & Confetti Engine
 * ==========================================
 */
class CelebrationEngine {
    constructor(canvasId = 'celebration-canvas') {
        this.canvasId = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.ctx = null;
        this.particles = [];
        this.fireworks = [];
        this.animationId = null;
        this.isRunning = false;
        this.stopTimer = null;
        this.colors = ['#ff758f', '#ff4d6d', '#ffb3c1', '#ffd166', '#a18cd1', '#fbc2eb', '#ffffff', '#ff9a9e'];
        this.isMobile = window.innerWidth <= 768;

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isRunning) {
                this.stop();
            }
        });
    }

    initCanvas() {
        if (!this.canvas) {
            this.canvas = document.getElementById(this.canvasId);
        }
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = this.canvasId;
            this.canvas.className = 'celebration-canvas';
            document.body.appendChild(this.canvas);
        }
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.resize();

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.isMobile = window.innerWidth <= 768;
                this.resize();
            }, 150);
        }, { passive: true });
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start(durationMs = 6000) {
        this.initCanvas();
        if (!this.canvas || !this.ctx) return;

        this.canvas.classList.add('active');
        this.isRunning = true;
        this.particles = [];
        this.fireworks = [];

        // Launch staggered fireworks bursts
        this.launchBurstSequence();

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.animate();

        if (this.stopTimer) clearTimeout(this.stopTimer);
        this.stopTimer = setTimeout(() => {
            this.isRunning = false;
        }, durationMs);
    }

    launchBurstSequence() {
        const bursts = [
            { x: window.innerWidth * 0.5, y: window.innerHeight * 0.35, delay: 0 },
            { x: window.innerWidth * 0.25, y: window.innerHeight * 0.45, delay: 300 },
            { x: window.innerWidth * 0.75, y: window.innerHeight * 0.4, delay: 600 },
            { x: window.innerWidth * 0.4, y: window.innerHeight * 0.25, delay: 1100 },
            { x: window.innerWidth * 0.65, y: window.innerHeight * 0.3, delay: 1600 },
            { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5, delay: 2200 },
            { x: window.innerWidth * 0.3, y: window.innerHeight * 0.35, delay: 2800 },
            { x: window.innerWidth * 0.7, y: window.innerHeight * 0.38, delay: 3400 }
        ];

        bursts.forEach(({ x, y, delay }) => {
            setTimeout(() => {
                if (this.isRunning) {
                    this.createFirecrackerBurst(x, y);
                    this.spawnConfettiRain(this.isMobile ? 10 : 20);
                }
            }, delay);
        });
    }

    createFirecrackerBurst(x, y) {
        const particleCount = this.isMobile ? (22 + Math.floor(Math.random() * 10)) : (45 + Math.floor(Math.random() * 20));
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 / particleCount) * i + (Math.random() - 0.5) * 0.3;
            const speed = Math.random() * 5 + 2.5;
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            const isHeart = Math.random() < 0.25;

            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color,
                alpha: 1,
                decay: Math.random() * 0.018 + 0.014,
                size: isHeart ? Math.random() * 10 + 6 : Math.random() * 3 + 2,
                gravity: 0.12,
                isHeart,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });
        }
    }

    spawnConfettiRain(count = 20) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -20,
                vx: (Math.random() - 0.5) * 2.5,
                vy: Math.random() * 2.5 + 1.8,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                alpha: 1,
                decay: Math.random() * 0.006 + 0.004,
                size: Math.random() * 7 + 5,
                gravity: 0.05,
                isHeart: false,
                isConfetti: true,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.08
            });
        }
    }

    drawHeart(ctx, x, y, size, color, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.translate(x, y);
        const s = size / 10;
        ctx.beginPath();
        ctx.moveTo(0, -4 * s);
        ctx.bezierCurveTo(-3 * s, -7 * s, -5 * s, -5 * s, -5 * s, -2 * s);
        ctx.bezierCurveTo(-5 * s, 2 * s, -2 * s, 5 * s, 0, 8 * s);
        ctx.bezierCurveTo(2 * s, 5 * s, 5 * s, 2 * s, 5 * s, -2 * s);
        ctx.bezierCurveTo(5 * s, -5 * s, 3 * s, -7 * s, 0, -4 * s);
        ctx.fill();
        ctx.restore();
    }

    animate() {
        if (!this.ctx || !this.canvas) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.alpha -= p.decay;
            p.rotation += p.rotationSpeed;

            if (p.alpha <= 0 || p.y > this.canvas.height + 50) {
                this.particles.splice(i, 1);
                continue;
            }

            if (p.isHeart) {
                this.drawHeart(this.ctx, p.x, p.y, p.size, p.color, p.alpha);
            } else if (p.isConfetti) {
                this.ctx.save();
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fillStyle = p.color;
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rotation);
                this.ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size / 1.5);
                this.ctx.restore();
            } else {
                this.ctx.save();
                this.ctx.globalAlpha = p.alpha;
                this.ctx.fillStyle = p.color;
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.restore();
            }
        }

        if (this.particles.length > 0 || this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else {
            this.canvas.classList.remove('active');
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
        }
    }

    stop() {
        this.isRunning = false;
        this.particles = [];
        if (this.canvas) {
            this.canvas.classList.remove('active');
            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

// Global celebration instance
const celebrationEngine = new CelebrationEngine();

function triggerCelebration() {
    celebrationEngine.start(6000);
}

/**
 * ==========================================
 * Quiz Modal & Secret Note Surprise Flow
 * ==========================================
 */
function initQuizModal() {
    const quizOpen = document.getElementById('quiz-open-btn');
    const quizModal = document.getElementById('quiz-modal');
    const quizClose = document.getElementById('quiz-close-btn');
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result');

    const secretModal = document.getElementById('secret-note-modal');
    const secretClose = document.getElementById('secret-note-close-btn');
    const secretAccept = document.getElementById('secret-note-accept-btn');

    if (!quizOpen || !quizModal || !quizClose || !quizContent || !quizResult) return;

    const questions = [
        {
            question: 'අපි දෙන්නා සින්දුවක් අහද්දි මගේ හිත ඇතුලෙන් මම වැඩියෙන්ම හිතන්නේ මොකක්ද? 🎧',
            options: ['මෙහෙම නිදහසේ ඉන්න ලැබුණු එක කොච්චර දෙයක්ද කියලා 🍃', 'ලස්සන පද පේළියක් ආවම ඒක ඔයාට ගැලපෙනවා කියලා ❤️', 'නිකන්ම Music එක එන්ජෝයි කරන එක 🎵'],
            correct: 1
        },
        {
            question: 'අපිට එක පාරටම Trip එකක් යන්න හම්බුණොත් මම තෝරගන්නේ මොන වගේ තැනක්ද? 🗺️',
            options: ['කන්දක් උඩ, සීතල නිදහස් තැනක් 🏔️', 'මුහුද අයිනේ, හවසට ඉර බහිනවා බලන තැනක් 🌅', 'වැඩිය සෙනඟ නැති Calm Hotel එකක් 🏨'],
            correct: 0
        },
        {
            question: 'මම ඔයත් එක්ක ඉද්දි මට වෙලාව යනවා තේරෙන්නේ නැත්තේ ඇයි කියලා ඔයා හිතන්නේ? ⏳',
            options: ['ඔයා කතා කරන විදිහ අහන් ඉන්න ආස නිසා 🗣️', 'අපේ තියෙන Vibe එක සමාන නිසා ⚡', 'මගේ ඔළුවේ තියෙන ප්‍රශ්න ඔක්කොම අමතක වෙන නිසා 🧠'],
            correct: 2
        }
    ];

    const state = { index: 0, score: 0 };

    function renderQuestion() {
        const current = questions[state.index];
        quizResult.textContent = '';
        quizContent.innerHTML = `
            <div class="quiz-question">
                <p>${current.question}</p>
            </div>
            <div class="quiz-btn-group"></div>
        `;
        const buttonGroup = quizContent.querySelector('.quiz-btn-group');
        current.options.forEach((option, idx) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'quiz-button';
            button.textContent = option;
            button.addEventListener('click', () => handleAnswer(idx));
            buttonGroup.appendChild(button);
        });
    }

    function closeQuizModal(callback) {
        quizModal.classList.add('closing');
        setTimeout(() => {
            quizModal.classList.remove('active', 'closing');
            if (callback) callback();
        }, 320);
    }

    function openSecretNoteModal() {
        if (!secretModal) return;
        secretModal.classList.remove('closing');
        secretModal.classList.add('active');
        secretModal.setAttribute('aria-hidden', 'false');
    }

    function closeSecretNoteModal() {
        if (!secretModal) return;
        secretModal.classList.add('closing');
        setTimeout(() => {
            secretModal.classList.remove('active', 'closing');
            secretModal.setAttribute('aria-hidden', 'true');
            celebrationEngine.stop();
        }, 350);
    }

    function handleQuizCompletion() {
        quizResult.textContent = 'Correct! Unlocking something magical for you... 💖✨';

        // 1. Smoothly close/fade out Question Quiz modal
        setTimeout(() => {
            closeQuizModal(() => {
                // 2. Trigger festive firecrackers & confetti particle animation
                triggerCelebration();

                // 3. Open brand new Surprise Secret Note Popup with smooth fade & scale-up transition
                setTimeout(() => {
                    openSecretNoteModal();
                }, 380);
            });
        }, 400);
    }

    function handleAnswer(answerIndex) {
        const current = questions[state.index];
        if (answerIndex === current.correct) {
            state.score += 1;
            state.index += 1;
            if (state.index === questions.length) {
                handleQuizCompletion();
                return;
            }
            renderQuestion();
        } else {
            quizResult.textContent = 'Not quite — try again from the start! 😜';
            state.index = 0;
            state.score = 0;
            setTimeout(renderQuestion, 1200);
        }
    }

    // Open Quiz Modal
    quizOpen.addEventListener('click', () => {
        state.index = 0;
        state.score = 0;
        quizModal.classList.remove('closing');
        quizModal.classList.add('active');
        quizModal.setAttribute('aria-hidden', 'false');
        renderQuestion();
    });

    // Close Quiz Modal via button
    quizClose.addEventListener('click', () => {
        closeQuizModal();
    });

    // Close Quiz Modal via backdrop click
    quizModal.addEventListener('click', (event) => {
        if (event.target === quizModal) {
            closeQuizModal();
        }
    });

    // Secret Note Modal Close Handlers
    if (secretClose) {
        secretClose.addEventListener('click', closeSecretNoteModal);
    }
    if (secretAccept) {
        secretAccept.addEventListener('click', closeSecretNoteModal);
    }
    if (secretModal) {
        secretModal.addEventListener('click', (event) => {
            if (event.target === secretModal || event.target.classList.contains('secret-note-backdrop')) {
                closeSecretNoteModal();
            }
        });
    }

    // ESC key closes any open modal
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (quizModal.classList.contains('active')) {
                closeQuizModal();
            }
            if (secretModal && secretModal.classList.contains('active')) {
                closeSecretNoteModal();
            }
        }
    });
}

function initAudioPlayer() {
    const audioElement = document.getElementById('love-audio');
    const audioStatus = document.getElementById('audio-status');

    if (!audioElement) return;

    audioElement.addEventListener('play', () => {
        if (audioStatus) audioStatus.textContent = 'Now playing...';
        // Persist playing state across page navigations
        sessionStorage.setItem('sml_audioPlaying', 'true');
        sessionStorage.setItem('sml_audioTime', String(audioElement.currentTime));
    });

    audioElement.addEventListener('pause', () => {
        if (audioStatus) audioStatus.textContent = 'Paused';
        sessionStorage.setItem('sml_audioPlaying', 'false');
        sessionStorage.setItem('sml_audioTime', String(audioElement.currentTime));
    });

    audioElement.addEventListener('timeupdate', () => {
        // Keep the stored time fresh so page transitions resume accurately
        if (!audioElement.paused) {
            sessionStorage.setItem('sml_audioTime', String(audioElement.currentTime));
        }
    });

    audioElement.addEventListener('ended', () => {
        if (audioStatus) audioStatus.textContent = 'Song ended';
        sessionStorage.setItem('sml_audioPlaying', 'false');
    });

    if (audioStatus) audioStatus.textContent = 'Ready to play';

    // Auto-resume if music was playing when user navigated away
    const wasPlaying = sessionStorage.getItem('sml_audioPlaying') === 'true';
    const savedTime = parseFloat(sessionStorage.getItem('sml_audioTime') || '0');
    if (wasPlaying) {
        audioElement.addEventListener('canplay', function resumeOnce() {
            audioElement.removeEventListener('canplay', resumeOnce);
            audioElement.currentTime = savedTime || 0;
            audioElement.play().catch(() => {
                console.warn('Auto-resume blocked by browser autoplay policy.');
            });
        }, { once: true });
    }
}

function initNavToggle() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');

    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
        });
    });
}

/**
 * Responsive theme adjustment
 */
function handleResponsiveTheme() {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        document.body.classList.add('mobile-layout');
    } else {
        document.body.classList.remove('mobile-layout');
    }
}

// Clean up legacy localStorage flag if it exists
localStorage.removeItem('sml_hasVisited');

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Additional initialization
window.addEventListener('load', () => {
    initMemoryNodeInteractions();
    initSmoothScroll();
    initGallery();

    if (document.getElementById('love-audio')) {
        initAudioPlayer();
    }

    initAudioControlWidget();
    initNavToggle();
});

// Handle responsive changes with debouncing
let themeResizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(themeResizeTimer);
    themeResizeTimer = setTimeout(handleResponsiveTheme, 150);
}, { passive: true });
handleResponsiveTheme();

console.log('💕 Ready to celebrate your love story!');