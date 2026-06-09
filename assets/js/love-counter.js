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
            
            if (isNaN(this.firstSeen) || isNaN(this.relationshipStart) || isNaN(this.firstKiss)) {
                throw new Error('Invalid milestone date format.');
            }

            this.init();
        } catch (error) {
            console.warn('LoveCounter initialization failed:', error);
        }
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

    updateCounters() {
        try {
            const firstSeenDiff = this.calculateTimeDiff(this.firstSeen);
            this.updateDOM('first-seen-counter', firstSeenDiff);

            const relationshipDiff = this.calculateTimeDiff(this.relationshipStart);
            this.updateDOM('relationship-counter', relationshipDiff);

            const firstKissDiff = this.calculateTimeDiff(this.firstKiss);
            this.updateDOM('first-kiss-counter', firstKissDiff);
        } catch (error) {
            console.warn('LoveCounter update failed:', error);
            clearInterval(this.interval);
        }
    }

    updateDOM(elementId, timeDiff) {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.innerHTML = `
            <div class="counter-item">
                <span class="counter-value">${timeDiff.days}</span>
                <span class="counter-label">Days</span>
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
