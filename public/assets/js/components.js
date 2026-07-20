/**
 * components.js
 * JavaScript functionality for RMIS Design System v2 UI Components.
 */

class UIComponents {
    constructor() {
        this.initModals();
        this.initDropdowns();
    }

    initModals() {
        const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
        const modalCloseBtns = document.querySelectorAll('[data-dismiss="modal"]');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = trigger.getAttribute('data-target');
                const modal = document.querySelector(targetId);
                if (modal) {
                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                }
            });
        });

        modalCloseBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = btn.closest('.modal-overlay');
                if (modal) {
                    modal.classList.remove('active');
                    modal.setAttribute('aria-hidden', 'true');
                }
            });
        });
    }

    initDropdowns() {
        // Placeholder for future dropdown component logic
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.uiComponents = new UIComponents();
});
