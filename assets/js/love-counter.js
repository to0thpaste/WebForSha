/**
 * ==========================================
 * PHASE 4: Real-Time Love Counter
 * ==========================================
 * 
 * Displays live countdown of:
 * Days, Hours, Minutes, Seconds since key moments
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
        // If this year's March 17 has already passed, use next year
        if (now >= anniversary) {
            anniversary = new Date(thisYear + 1, 2, 17);
        }
        return anniversary;
    }

    init() {
        this.updateCounters();
        this.interval = setInterval(() => this.updateCounters(), 1000);
    }

    calculateTimeDiff(targetDate) {
        const now = new Date();
        const diff = now - targetDate;
        
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
    }

    calculateCountdown(targetDate) {
        const now = new Date();
        const diff = targetDate - now; // future date minus now = countdown

        if (diff <= 0) {
            // Anniversary has arrived — refresh to show next year
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
            clearInterval(this.interval);
        }
    }

    updateDOM(elementId, timeDiff, isCountdown = false) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const label = isCountdown ? 'Until' : '';

        element.innerHTML = `
            <div class="counter-item">
                <span class="counter-value">${timeDiff.days}</span>
                <span class="counter-label">${isCountdown ? 'Days' : 'Days'}</span>
            </div>
            <div class="counter-item">
                <span class="counter-value">${timeDiff.hours}</span>
                <span class="counter-label">Hours</span>
            </div>
            <div class="counter-item">
                <span class="counter-value">${timeDiff.minutes}</span>
                <span class="counter-label">Minutes</span>
            </div>
            <div class="counter-item">
                <span class="counter-value">${timeDiff.seconds}</span>
                <span class="counter-label">Seconds</span>
            </div>
        `;
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
