// Simple Vue.js-like reactive framework for demonstration
class SimpleApp {
    constructor(selector, options) {
        this.el = document.querySelector(selector);
        this.data = options.data();
        this.methods = options.methods || {};
        
        this.init();
    }
    
    init() {
        this.makeReactive();
        this.bindEvents();
        this.render();
    }
    
    makeReactive() {
        const self = this;
        
        function makeReactive(obj, property) {
            let value = obj[property];
            
            Object.defineProperty(obj, property, {
                get() {
                    return value;
                },
                set(newValue) {
                    value = newValue;
                    self.render();
                }
            });
        }
        
        Object.keys(this.data).forEach(key => {
            makeReactive(this.data, key);
        });
    }
    
    bindEvents() {
        // Bind form submission
        const form = this.el.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.methods.generateMarketing) {
                    this.methods.generateMarketing.call(this);
                }
            });
        }
        
        // Bind other button clicks
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('@click')) {
                const methodName = e.target.getAttribute('@click');
                if (this.methods[methodName]) {
                    this.methods[methodName].call(this);
                }
            }
        });
        
        // Bind textarea input
        const textarea = this.el.querySelector('textarea');
        if (textarea) {
            textarea.addEventListener('input', (e) => {
                this.data.productDescription = e.target.value;
            });
        }
    }
    
    render() {
        // Simple template rendering
        const template = this.el.innerHTML;
        
        // Replace v-if directives
        this.handleConditionalRendering();
        
        // Replace text interpolations
        this.replaceTextInterpolations();
        
        // Update form values
        this.updateFormValues();
        
        // Update button states
        this.updateButtonStates();
    }
    
    handleConditionalRendering() {
        // Show/hide loading section
        const loadingSection = this.el.querySelector('.loading-section');
        if (loadingSection) {
            loadingSection.style.display = this.data.isLoading ? 'block' : 'none';
        }
        
        // Show/hide results section
        const resultsSection = this.el.querySelector('.results-section');
        if (resultsSection) {
            resultsSection.style.display = (this.data.marketingResult && !this.data.isLoading) ? 'block' : 'none';
        }
        
        // Show/hide error section
        const errorSection = this.el.querySelector('.error-section');
        if (errorSection) {
            errorSection.style.display = this.data.error ? 'block' : 'none';
        }
    }
    
    replaceTextInterpolations() {
        if (!this.data.marketingResult) return;
        
        const result = this.data.marketingResult;
        
        // Update marketing copy
        const headlines = this.el.querySelectorAll('.headline-section h4');
        headlines.forEach(h => h.textContent = result.marketingCopy.headline);
        
        const taglines = this.el.querySelectorAll('.tagline');
        taglines.forEach(t => t.textContent = result.marketingCopy.tagline);
        
        const descriptions = this.el.querySelectorAll('.description-section p');
        descriptions.forEach(d => d.textContent = result.marketingCopy.description);
        
        const ctaButtons = this.el.querySelectorAll('.cta-button');
        ctaButtons.forEach(c => c.textContent = result.marketingCopy.callToAction);
        
        // Update benefits list
        const benefitsList = this.el.querySelector('.benefits-list');
        if (benefitsList) {
            benefitsList.innerHTML = result.marketingCopy.keyBenefits
                .map(benefit => `<li>${benefit}</li>`)
                .join('');
        }
        
        // Update color swatches
        const colorSwatches = this.el.querySelector('.color-swatches');
        if (colorSwatches) {
            colorSwatches.innerHTML = Object.entries(result.visualStrategy.colorPalette)
                .map(([name, color]) => {
                    const colorCode = color.split(' - ')[0];
                    return `
                        <div class="color-swatch">
                            <div class="color-circle" style="background-color: ${colorCode}"></div>
                            <span>${color}</span>
                        </div>
                    `;
                })
                .join('');
        }
        
        // Update imagery list
        const imageryList = this.el.querySelector('.imagery-list');
        if (imageryList) {
            imageryList.innerHTML = result.visualStrategy.imagery
                .map(image => `<li>${image}</li>`)
                .join('');
        }
        
        // Update visual strategy details
        const designStyle = this.el.querySelector('.style-section p');
        if (designStyle) {
            designStyle.textContent = result.visualStrategy.designStyle;
        }
        
        // Update target audience
        const primaryTitle = this.el.querySelector('.audience-segment h6');
        if (primaryTitle) {
            primaryTitle.textContent = result.targetAudience.primary.title;
        }
        
        const audienceDetails = this.el.querySelectorAll('.audience-detail p');
        if (audienceDetails.length >= 4) {
            audienceDetails[0].textContent = result.targetAudience.primary.demographics;
            audienceDetails[1].textContent = result.targetAudience.primary.psychographics;
            audienceDetails[2].textContent = result.targetAudience.primary.painPoints;
            audienceDetails[3].textContent = result.targetAudience.primary.goals;
        }
        
        // Update channels list
        const channelsList = this.el.querySelector('.channels-list');
        if (channelsList) {
            channelsList.innerHTML = result.targetAudience.channels
                .map(channel => `<li>${channel}</li>`)
                .join('');
        }
        
        // Update error message
        if (this.data.error) {
            const errorMessage = this.el.querySelector('.error-card p');
            if (errorMessage) {
                errorMessage.textContent = this.data.error;
            }
        }
    }
    
    updateFormValues() {
        const textarea = this.el.querySelector('textarea');
        if (textarea) {
            textarea.value = this.data.productDescription || '';
        }
    }
    
    updateButtonStates() {
        const submitButton = this.el.querySelector('button[type="submit"]');
        if (submitButton) {
            const isDisabled = this.data.isLoading || !this.data.productDescription.trim();
            submitButton.disabled = isDisabled;
            
            const buttonText = submitButton.querySelector('span');
            if (buttonText) {
                buttonText.textContent = this.data.isLoading 
                    ? '⏳ Generating Marketing Content...' 
                    : '✨ Generate Marketing Strategy';
            }
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.app = new SimpleApp('#app', {
        data() {
            return {
                productDescription: '',
                marketingResult: null,
                isLoading: false,
                error: null
            };
        },
        methods: {
            async generateMarketing() {
                if (!this.data.productDescription.trim()) {
                    this.data.error = 'Please enter a product or service description';
                    return;
                }

                this.data.isLoading = true;
                this.data.error = null;
                this.data.marketingResult = null;

                try {
                    const response = await fetch('/api/generate-marketing', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            productDescription: this.data.productDescription
                        })
                    });

                    const responseData = await response.json();

                    if (!response.ok) {
                        throw new Error(responseData.error || 'Failed to generate marketing content');
                    }

                    this.data.marketingResult = responseData.data;
                    
                    // Smooth scroll to results
                    setTimeout(() => {
                        const resultsSection = document.querySelector('.results-section');
                        if (resultsSection) {
                            resultsSection.scrollIntoView({ 
                                behavior: 'smooth', 
                                block: 'start' 
                            });
                        }
                    }, 100);

                } catch (error) {
                    console.error('Error generating marketing content:', error);
                    this.data.error = error.message || 'An unexpected error occurred. Please try again.';
                } finally {
                    this.data.isLoading = false;
                }
            },

            generateNewStrategy() {
                this.data.marketingResult = null;
                this.data.error = null;
                this.data.productDescription = '';
                
                // Scroll back to input section
                setTimeout(() => {
                    const inputSection = document.querySelector('.input-section');
                    if (inputSection) {
                        inputSection.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 100);
            },

            clearError() {
                this.data.error = null;
            },

            copyResults() {
                if (!this.data.marketingResult) return;

                const textToCopy = this.formatResultsForCopy();
                
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        this.showSuccessMessage('Results copied to clipboard!');
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        this.fallbackCopyTextToClipboard(textToCopy);
                    });
                } else {
                    this.fallbackCopyTextToClipboard(textToCopy);
                }
            },

            formatResultsForCopy() {
                const result = this.data.marketingResult;
                
                return `
AI-GENERATED MARKETING STRATEGY
================================

MARKETING COPY
--------------
Headline: ${result.marketingCopy.headline}
Tagline: ${result.marketingCopy.tagline}

Description:
${result.marketingCopy.description}

Key Benefits:
${result.marketingCopy.keyBenefits.map(benefit => `• ${benefit}`).join('\n')}

Call to Action: ${result.marketingCopy.callToAction}

VISUAL STRATEGY
---------------
Color Palette:
${Object.entries(result.visualStrategy.colorPalette).map(([name, color]) => `• ${name}: ${color}`).join('\n')}

Suggested Imagery:
${result.visualStrategy.imagery.map(image => `• ${image}`).join('\n')}

Design Style: ${result.visualStrategy.designStyle}
Typography: ${result.visualStrategy.typography}
Overall Mood: ${result.visualStrategy.mood}

TARGET AUDIENCE
---------------
Primary Audience: ${result.targetAudience.primary.title}
Demographics: ${result.targetAudience.primary.demographics}
Psychographics: ${result.targetAudience.primary.psychographics}
Pain Points: ${result.targetAudience.primary.painPoints}
Goals: ${result.targetAudience.primary.goals}

Secondary Audience: ${result.targetAudience.secondary.title}
Demographics: ${result.targetAudience.secondary.demographics}
Focus: ${result.targetAudience.secondary.psychographics}

Recommended Marketing Channels:
${result.targetAudience.channels.map(channel => `• ${channel}`).join('\n')}

Generated by AI Marketing Assistant
                `.trim();
            },

            showSuccessMessage(message) {
                alert(message); // Simple alert for demonstration
            }
        }
    });
});