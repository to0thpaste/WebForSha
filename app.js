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
        });

        node.addEventListener('mouseleave', () => {
            node.classList.remove('glow-pulse');
        });

        // Mobile touch support
        node.addEventListener('touchstart', () => {
            node.classList.toggle('glow-pulse');
        });
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

function initQuizModal() {
    const quizOpen = document.getElementById('quiz-open-btn');
    const quizModal = document.getElementById('quiz-modal');
    const quizClose = document.getElementById('quiz-close-btn');
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result');

    if (!quizOpen || !quizModal || !quizClose || !quizContent || !quizResult) return;

    const questions = [
        {
            question: 'ඔයත් එක්ක Sunset බලන්න මං වැඩියෙන්ම ආස Time එක මොකක්ද? 🌅',
            options: ['Golden hour ✨', 'Midnight 🌙', 'Early morning ☀️'],
            correct: 0
        },
        {
            question: 'Movie night එකකට ඔයත් එක්ක Share කරගෙන කන්න මං ආසම Snack එක? 🍿',
            options: ['Popcorn 🍿', 'Chocolate 🍫', 'Fruit salad 🥗'],
            correct: 1
        },
        {
            question: 'අපි දෙන්නා පළවෙනිම Deep Talk එකක් දැම්මේ කොහෙදිද? 💬',
            options: ['Cafe එකක ☕', 'Beach එකේ 🏖️', 'Park එකේ 🌳'],
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

    function showSecretNote() {
        quizContent.innerHTML = '<div class="secret-note"><p style="font-weight:600; color:var(--accent-color); font-size:1.15rem; margin-bottom: 8px;">Secret Note for You 💕</p><p>Every single moment with you is the sweetest part of my day. You are my forever & always... I love you so much! 💖✨</p></div>';
        quizResult.textContent = 'You unlocked the secret note! 💖🎉';
    }

    function handleAnswer(answerIndex) {
        const current = questions[state.index];
        if (answerIndex === current.correct) {
            state.score += 1;
            state.index += 1;
            if (state.index === questions.length) {
                showSecretNote();
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

    quizOpen.addEventListener('click', () => {
        quizModal.classList.add('active');
        renderQuestion();
    });

    quizClose.addEventListener('click', () => {
        quizModal.classList.remove('active');
    });

    quizModal.addEventListener('click', (event) => {
        if (event.target === quizModal) {
            quizModal.classList.remove('active');
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

// Handle responsive changes
window.addEventListener('resize', handleResponsiveTheme);
handleResponsiveTheme();

console.log('💕 Ready to celebrate your love story!');