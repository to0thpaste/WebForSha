/**
 * ==========================================
 * PHASE 3: Particle Engine
 * ==========================================
 * 
 * HTML5 Canvas particles with:
 * - Custom heart shapes
 * - Physics (velocity, wind factor, random scaling)
 * - Responsive canvas
 */

class ParticleEngine {
    constructor(canvasId = 'particle-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.warn(`Canvas element #${canvasId} not found`);
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.spawnParticles();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    spawnParticles() {
        // Create 30-50 heart particles
        const particleCount = 35 + Math.random() * 15;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new HeartParticle(this.canvas));
        }
    }

    animate() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();
            particle.draw(this.ctx);

            // Remove particles that have left the screen
            if (particle.isOffScreen()) {
                this.particles.splice(i, 1);
                // Spawn a new one
                this.particles.push(new HeartParticle(this.canvas));
            }
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

class HeartParticle {
    constructor(canvas) {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.size = Math.random() * 20 + 8; // 8-28px
        this.speedY = -(Math.random() * 2 + 1); // -1 to -3 pixels/frame
        this.speedX = (Math.random() - 0.5) * 1; // Slight wind factor
        this.opacity = Math.random() * 0.6 + 0.4; // 0.4 to 1.0
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.wobble = Math.random() * 0.02;
        this.wobbleAmount = 0;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.wobbleAmount += this.wobble;
        this.speedX += Math.sin(this.wobbleAmount) * 0.01; // Subtle wobble
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#ff758f';

        // Draw heart shape
        this.drawHeart(ctx, 0, 0, this.size);

        ctx.restore();
    }

    drawHeart(ctx, x, y, size) {
        const scale = size / 10;
        ctx.beginPath();
        ctx.moveTo(x, y - 4 * scale);
        ctx.bezierCurveTo(
            x - 3 * scale, y - 7 * scale,
            x - 5 * scale, y - 5 * scale,
            x - 5 * scale, y - 2 * scale
        );
        ctx.bezierCurveTo(
            x - 5 * scale, y + 2 * scale,
            x - 2 * scale, y + 5 * scale,
            x, y + 8 * scale
        );
        ctx.bezierCurveTo(
            x + 2 * scale, y + 5 * scale,
            x + 5 * scale, y + 2 * scale,
            x + 5 * scale, y - 2 * scale
        );
        ctx.bezierCurveTo(
            x + 5 * scale, y - 5 * scale,
            x + 3 * scale, y - 7 * scale,
            x, y - 4 * scale
        );
        ctx.fill();
    }

    isOffScreen() {
        return this.y < -50 || this.opacity <= 0;
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ParticleEngine('particle-canvas'));
} else {
    new ParticleEngine('particle-canvas');
}
