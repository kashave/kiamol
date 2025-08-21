// AI Marketing Assistant Frontend JavaScript

class MarketingAssistant {
    constructor() {
        this.form = document.getElementById('marketingForm');
        this.loadingState = document.getElementById('loadingState');
        this.resultsSection = document.getElementById('resultsSection');
        this.emptyState = document.getElementById('emptyState');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showEmptyState();
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Copy buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn') || e.target.parentElement.classList.contains('copy-btn')) {
                const button = e.target.classList.contains('copy-btn') ? e.target : e.target.parentElement;
                this.copyToClipboard(button);
            }
        });

        // Auto-resize textarea
        const textarea = document.getElementById('productDescription');
        textarea.addEventListener('input', this.autoResizeTextarea);
    }

    async handleFormSubmit() {
        const productDescription = document.getElementById('productDescription').value.trim();
        
        if (!productDescription) {
            this.showAlert('Please enter a product description.', 'warning');
            return;
        }

        this.showLoadingState();

        try {
            const response = await fetch('/api/generate-marketing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productDescription })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.displayResults(data);
            
        } catch (error) {
            console.error('Error:', error);
            this.showAlert('Failed to generate marketing content. Please try again.', 'danger');
            this.showEmptyState();
        }
    }

    showLoadingState() {
        this.hideAllStates();
        this.loadingState.classList.remove('d-none');
    }

    showEmptyState() {
        this.hideAllStates();
        this.emptyState.classList.remove('d-none');
    }

    hideAllStates() {
        this.loadingState.classList.add('d-none');
        this.resultsSection.classList.add('d-none');
        this.emptyState.classList.add('d-none');
    }

    displayResults(data) {
        // Populate results
        document.getElementById('marketingCopy').textContent = data.marketingCopy;
        document.getElementById('visualStrategy').textContent = data.visualStrategy;
        document.getElementById('targetAudience').textContent = data.targetAudience;

        // Show results with animation
        this.hideAllStates();
        this.resultsSection.classList.remove('d-none');
        this.resultsSection.classList.add('fade-in-up');

        // Remove animation class after animation completes
        setTimeout(() => {
            this.resultsSection.classList.remove('fade-in-up');
        }, 600);

        // Show success message
        this.showAlert('Marketing strategy generated successfully!', 'success', 3000);
    }

    async copyToClipboard(button) {
        const targetId = button.getAttribute('data-target');
        const textElement = document.getElementById(targetId);
        const text = textElement.textContent;

        try {
            await navigator.clipboard.writeText(text);
            
            // Visual feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check me-1"></i>Copied!';
            button.classList.add('btn-success');
            button.classList.remove('btn-outline-secondary');

            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('btn-success');
                button.classList.add('btn-outline-secondary');
            }, 2000);

        } catch (err) {
            console.error('Failed to copy text: ', err);
            this.showAlert('Failed to copy text to clipboard.', 'warning');
        }
    }

    autoResizeTextarea(event) {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 300) + 'px';
    }

    showAlert(message, type = 'info', duration = 5000) {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.alert-custom');
        existingAlerts.forEach(alert => alert.remove());

        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-custom alert-dismissible fade show position-fixed`;
        alert.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 1050;
            min-width: 300px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        `;
        
        alert.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${this.getAlertIcon(type)} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `;

        document.body.appendChild(alert);

        // Auto dismiss
        if (duration > 0) {
            setTimeout(() => {
                if (alert && alert.parentNode) {
                    alert.remove();
                }
            }, duration);
        }
    }

    getAlertIcon(type) {
        const icons = {
            success: 'check-circle',
            danger: 'exclamation-triangle',
            warning: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MarketingAssistant();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transition = 'opacity 1s ease-in-out';
        }, 500);
    }
});