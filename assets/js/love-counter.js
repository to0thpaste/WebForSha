/**
 * ==========================================
 * PHASE 4: Real-Time Love Counter (High Performance)
 * ==========================================
 * 
 * Displays live countdown of:
 * Days, Hours, Minutes, Seconds since key moments
 * Optimized: Cached DOM nodes, textContent-only updates, Visibility API pause
 */

class LoveCounter {
    constructor() {
        try {
            // Key dates in our love story
            this.firstSeen = new Date('2024-10-13');
            this.relationshipStart = new Date('2025-03-17');
            this.firstKiss = new Date('2025-08-19');
            this.nextAnniversary = this.getNextAnniversary();

            if (isNaN(this.firstSeen) || isNaN(this.relationshipStart) || isNaN(this.firstKiss)) {
                throw new Error('Invalid milestone date format.');
            }

            // Update the anniversary date label in the DOM
            const label = document.getElementById('anniversary-date-label');
            if (label) {
                const opts = { year: 'numeric', month: 'long', day: 'numeric' };
                label.textContent = this.nextAnniversary.toLocaleDateString('en-US', opts);
            }

            this.domNodes = {};
            this.interval = null;

            this.init();
        } catch (error) {
            console.warn('LoveCounter initialization failed:', error);
        }
    }

    getNextAnniversary() {
        const now = new Date();
        const thisYear = now.getFullYear();
        // Relationship anniversary is March 17
        let anniversary = new Date(thisYear, 2, 17); // Month is 0-indexed, so 2 = March
        if (now >= anniversary) {
            anniversary = new Date(thisYear + 1, 2, 17);
        }
        return anniversary;
    }

    init() {
        this.updateCounters();
        this.startTimer();

        // Pause interval when tab is inactive to save battery on mobile
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopTimer();
            } else {
                this.updateCounters();
                this.startTimer();
            }
        });
    }

    startTimer() {
        if (!this.interval) {
            this.interval = setInterval(() => this.updateCounters(), 1000);
        }
    }

    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    calculateTimeDiff(targetDate) {
        const now = new Date();
        const diff = Math.max(0, now - targetDate);
        
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
    }

    calculateCountdown(targetDate) {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            this.nextAnniversary = this.getNextAnniversary();
            const label = document.getElementById('anniversary-date-label');
            if (label) {
                const opts = { year: 'numeric', month: 'long', day: 'numeric' };
                label.textContent = this.nextAnniversary.toLocaleDateString('en-US', opts);
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
    }

    updateCounters() {
        try {
            const firstSeenDiff = this.calculateTimeDiff(this.firstSeen);
            this.updateDOM('first-seen-counter', firstSeenDiff);

            const relationshipDiff = this.calculateTimeDiff(this.relationshipStart);
            this.updateDOM('relationship-counter', relationshipDiff);

            const firstKissDiff = this.calculateTimeDiff(this.firstKiss);
            this.updateDOM('first-kiss-counter', firstKissDiff);

            const anniversaryCountdown = this.calculateCountdown(this.nextAnniversary);
            this.updateDOM('anniversary-counter', anniversaryCountdown, true);
        } catch (error) {
            console.warn('LoveCounter update failed:', error);
            this.stopTimer();
        }
    }

    updateDOM(elementId, timeDiff, isCountdown = false) {
        let cached = this.domNodes[elementId];

        if (!cached) {
            const container = document.getElementById(elementId);
            if (!container) return;

            // Render static structure only once
            container.innerHTML = `
                <div class="counter-item">
                    <span class="counter-value" data-unit="days">${timeDiff.days}</span>
                    <span class="counter-label">Days</span>
                </div>
                <div class="counter-item">
                    <span class="counter-value" data-unit="hours">${timeDiff.hours}</span>
                    <span class="counter-label">Hours</span>
                </div>
                <div class="counter-item">
                    <span class="counter-value" data-unit="minutes">${timeDiff.minutes}</span>
                    <span class="counter-label">Minutes</span>
                </div>
                <div class="counter-item">
                    <span class="counter-value" data-unit="seconds">${timeDiff.seconds}</span>
                    <span class="counter-label">Seconds</span>
                </div>
            `;

            cached = {
                days: container.querySelector('[data-unit="days"]'),
                hours: container.querySelector('[data-unit="hours"]'),
                minutes: container.querySelector('[data-unit="minutes"]'),
                seconds: container.querySelector('[data-unit="seconds"]')
            };
            this.domNodes[elementId] = cached;
            return;
        }

        // High performance in-place textContent update: 0 layout re-parse
        if (cached.days.textContent !== String(timeDiff.days)) cached.days.textContent = timeDiff.days;
        if (cached.hours.textContent !== String(timeDiff.hours)) cached.hours.textContent = timeDiff.hours;
        if (cached.minutes.textContent !== String(timeDiff.minutes)) cached.minutes.textContent = timeDiff.minutes;
        if (cached.seconds.textContent !== String(timeDiff.seconds)) cached.seconds.textContent = timeDiff.seconds;
    }
}

function safelyInitializeLoveCounter() {
    try {
        new LoveCounter();
    } catch (error) {
        console.warn('LoveCounter failed to start:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safelyInitializeLoveCounter);
} else {
    safelyInitializeLoveCounter();
}
