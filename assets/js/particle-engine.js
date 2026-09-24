/**
 * ==========================================
 * PHASE 3: High-Performance Particle Engine
 * ==========================================
 * 
 * Optimized HTML5 Canvas particles with:
 * - Cached theme colors (zero getComputedStyle calls in render loop)
 * - Mobile-adaptive particle count (30-40% on mobile devices)
 * - Page Visibility API pausing (zero CPU/battery when tab is hidden)
 * - Debounced resize handler
 * - Reduced motion support
 */

class ParticleEngine {
    constructor(canvasId = 'particle-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            return;
        }

        this.ctx = this.canvas.getContext('2d', { alpha: true });
        if (!this.ctx) return;

        this.particles = [];
        this.animationId = null;
        this.isPaused = false;
        this.primaryColor = '#ff758f';
        this.isMobile = window.innerWidth <= 768;
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (this.reducedMotion) {
            return; // Skip particle engine if reduced motion is requested
        }

        this.updateThemeColor();
        this.resizeCanvas();
        this.bindEvents();
        this.spawnParticles();
        this.start();
    }

    updateThemeColor() {
        try {
            const computed = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            if (computed && computed.trim()) {
                this.primaryColor = computed.trim();
            }
        } catch (e) {
            this.primaryColor = '#ff758f';
        }
    }

    bindEvents() {
        // Debounced resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const wasMobile = this.isMobile;
                this.isMobile = window.innerWidth <= 768;
                this.resizeCanvas();
                if (wasMobile !== this.isMobile) {
                    this.spawnParticles();
                }
            }, 150);
        }, { passive: true });

        // Pause animation when tab is inactive to save mobile CPU & battery
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.resume();
            }
        });

        // Listen for theme changes from theme engine
        window.addEventListener('themechanged', () => {
            this.updateThemeColor();
        });
    }

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    spawnParticles() {
        this.particles = [];
        // Adaptive particle count: ~12-16 on mobile, ~30-40 on desktop
        const particleCount = this.isMobile ? (12 + Math.floor(Math.random() * 5)) : (28 + Math.floor(Math.random() * 10));
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new HeartParticle(this.canvas));
        }
    }

    animate() {
        if (this.isPaused || !this.ctx || !this.canvas) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const color = this.primaryColor;
        const len = this.particles.length;

        // Update and draw particles
        for (let i = 0; i < len; i++) {
            const particle = this.particles[i];
            particle.update();
            particle.draw(this.ctx, color);

            // Reset particle if it leaves the top of screen instead of splice+push
            if (particle.isOffScreen()) {
                particle.reset(this.canvas);
            }
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (!this.animationId) {
            this.isPaused = false;
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }

    pause() {
        this.isPaused = true;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }

    destroy() {
        this.pause();
        this.particles = [];
    }
}

class HeartParticle {
    constructor(canvas) {
        this.reset(canvas, true);
    }

    reset(canvas, initial = false) {
        const width = canvas ? canvas.width : window.innerWidth;
        const height = canvas ? canvas.height : window.innerHeight;

        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 30 + 10;
        this.size = Math.random() * 14 + 8; // 8-22px (lighter for mobile)
        this.speedY = -(Math.random() * 1.5 + 0.8); // Smooth upward drift
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.5 + 0.35; // 0.35 to 0.85
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.wobble = Math.random() * 0.02;
        this.wobbleAmount = Math.random() * Math.PI;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.wobbleAmount += this.wobble;
        this.speedX += Math.sin(this.wobbleAmount) * 0.01;
    }

    draw(ctx, color) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = color;

        // Draw heart shape
        const scale = this.size / 10;
        ctx.beginPath();
        ctx.moveTo(0, -4 * scale);
        ctx.bezierCurveTo(-3 * scale, -7 * scale, -5 * scale, -5 * scale, -5 * scale, -2 * scale);
        ctx.bezierCurveTo(-5 * scale, 2 * scale, -2 * scale, 5 * scale, 0, 8 * scale);
        ctx.bezierCurveTo(2 * scale, 5 * scale, 5 * scale, 2 * scale, 5 * scale, -2 * scale);
        ctx.bezierCurveTo(5 * scale, -5 * scale, 3 * scale, -7 * scale, 0, -4 * scale);
        ctx.fill();

        ctx.restore();
    }

    isOffScreen() {
        return this.y < -40 || this.opacity <= 0;
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.loveParticleEngine = new ParticleEngine('particle-canvas');
    });
} else {
    window.loveParticleEngine = new ParticleEngine('particle-canvas');
}
