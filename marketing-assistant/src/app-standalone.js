// Standalone JavaScript for AI Marketing Assistant
document.addEventListener('DOMContentLoaded', function() {
    const app = {
        data: {
            productDescription: '',
            marketingResult: null,
            isLoading: false,
            error: null
        },

        async generateMarketing() {
            const textarea = document.querySelector('textarea');
            this.data.productDescription = textarea.value;

            if (!this.data.productDescription.trim()) {
                this.data.error = 'Please enter a product or service description';
                this.updateUI();
                return;
            }

            this.data.isLoading = true;
            this.data.error = null;
            this.data.marketingResult = null;
            this.updateUI();

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
                this.updateUI();
                
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
                this.updateUI();
            } finally {
                this.data.isLoading = false;
                this.updateUI();
            }
        },

        generateNewStrategy() {
            this.data.marketingResult = null;
            this.data.error = null;
            this.data.productDescription = '';
            
            const textarea = document.querySelector('textarea');
            if (textarea) textarea.value = '';
            
            this.updateUI();
            
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
            this.updateUI();
        },

        copyResults() {
            if (!this.data.marketingResult) return;

            const textToCopy = this.formatResultsForCopy();
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    alert('Results copied to clipboard!');
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

        fallbackCopyTextToClipboard(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            
            // Avoid scrolling to bottom
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.position = 'fixed';
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    alert('Results copied to clipboard!');
                } else {
                    alert('Failed to copy results');
                }
            } catch (err) {
                console.error('Fallback: Unable to copy', err);
                alert('Copy not supported in this browser');
            }
            
            document.body.removeChild(textArea);
        },

        updateUI() {
            // Show/hide loading section
            const loadingSection = document.querySelector('.loading-section');
            if (loadingSection) {
                loadingSection.style.display = this.data.isLoading ? 'block' : 'none';
            }
            
            // Show/hide results section
            const resultsSection = document.querySelector('.results-section');
            if (resultsSection) {
                resultsSection.style.display = (this.data.marketingResult && !this.data.isLoading) ? 'block' : 'none';
            }
            
            // Show/hide error section
            const errorSection = document.querySelector('.error-section');
            if (errorSection) {
                errorSection.style.display = this.data.error ? 'block' : 'none';
            }

            // Update button states
            const submitButton = document.querySelector('button[type="submit"]');
            if (submitButton) {
                const isDisabled = this.data.isLoading || !this.data.productDescription.trim();
                submitButton.disabled = isDisabled;
                
                const buttonText = this.data.isLoading 
                    ? '⏳ Generating Marketing Content...' 
                    : '✨ Generate Marketing Strategy';
                
                submitButton.innerHTML = `<span>${buttonText}</span>`;
            }

            // Update error message
            if (this.data.error) {
                const errorMessage = document.querySelector('.error-card p');
                if (errorMessage) {
                    errorMessage.textContent = this.data.error;
                }
            }

            // Update results if available
            if (this.data.marketingResult) {
                this.updateResults();
            }
        },

        updateResults() {
            const result = this.data.marketingResult;
            
            // Update marketing copy
            const headline = document.querySelector('.headline-section h4');
            if (headline) headline.textContent = result.marketingCopy.headline;
            
            const tagline = document.querySelector('.tagline');
            if (tagline) tagline.textContent = result.marketingCopy.tagline;
            
            const description = document.querySelector('.description-section p');
            if (description) description.textContent = result.marketingCopy.description;
            
            const ctaButton = document.querySelector('.cta-button');
            if (ctaButton) ctaButton.textContent = result.marketingCopy.callToAction;
            
            // Update benefits list
            const benefitsList = document.querySelector('.benefits-list');
            if (benefitsList) {
                benefitsList.innerHTML = result.marketingCopy.keyBenefits
                    .map(benefit => `<li>${benefit}</li>`)
                    .join('');
            }
            
            // Update color swatches
            const colorSwatches = document.querySelector('.color-swatches');
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
            const imageryList = document.querySelector('.imagery-list');
            if (imageryList) {
                imageryList.innerHTML = result.visualStrategy.imagery
                    .map(image => `<li>${image}</li>`)
                    .join('');
            }
            
            // Update visual strategy details
            const styleElements = document.querySelectorAll('.style-section p');
            if (styleElements.length >= 3) {
                styleElements[0].textContent = result.visualStrategy.designStyle;
                styleElements[1].textContent = result.visualStrategy.typography;
                styleElements[2].textContent = result.visualStrategy.mood;
            }
            
            // Update target audience
            const primaryTitle = document.querySelector('.audience-segment h6');
            if (primaryTitle) {
                primaryTitle.textContent = result.targetAudience.primary.title;
            }
            
            const audienceDetails = document.querySelectorAll('.audience-detail p');
            if (audienceDetails.length >= 6) {
                audienceDetails[0].textContent = result.targetAudience.primary.demographics;
                audienceDetails[1].textContent = result.targetAudience.primary.psychographics;
                audienceDetails[2].textContent = result.targetAudience.primary.painPoints;
                audienceDetails[3].textContent = result.targetAudience.primary.goals;
                audienceDetails[4].textContent = result.targetAudience.secondary.demographics;
                audienceDetails[5].textContent = result.targetAudience.secondary.psychographics;
            }
            
            // Update secondary audience title
            const secondaryTitle = document.querySelectorAll('.audience-segment h6')[1];
            if (secondaryTitle) {
                secondaryTitle.textContent = result.targetAudience.secondary.title;
            }
            
            // Update channels list
            const channelsList = document.querySelector('.channels-list');
            if (channelsList) {
                channelsList.innerHTML = result.targetAudience.channels
                    .map(channel => `<li>${channel}</li>`)
                    .join('');
            }
        }
    };

    // Bind form submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            app.generateMarketing();
        });
    }

    // Bind textarea input
    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', (e) => {
            app.data.productDescription = e.target.value;
            app.updateUI();
        });
    }

    // Bind button clicks using event delegation
    document.addEventListener('click', (e) => {
        if (e.target.closest('button[onclick="window.app.generateNewStrategy()"]') || 
            e.target.textContent.includes('Generate New Strategy')) {
            app.generateNewStrategy();
        } else if (e.target.closest('button[onclick="window.app.copyResults()"]') || 
                   e.target.textContent.includes('Copy Results')) {
            app.copyResults();
        } else if (e.target.closest('button[onclick="window.app.clearError()"]') || 
                   e.target.textContent.includes('Dismiss')) {
            app.clearError();
        }
    });

    // Make app globally available
    window.app = app;
    
    // Initial UI update
    app.updateUI();
});