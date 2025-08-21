FROM node:18-alpine

LABEL maintainer="KIAMOL"
LABEL description="AI-Powered Marketing Assistant"

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY src/package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application code
COPY src/ .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S kiamol -u 1001

# Change ownership of the app directory
RUN chown -R kiamol:nodejs /usr/src/app
USER kiamol

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["npm", "start"]