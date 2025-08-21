# AI-Powered Marketing Assistant

A modern web application that uses artificial intelligence to generate comprehensive marketing strategies for products and services.

## Features

- **Modern, Engaging UI**: Clean, responsive design with gradient backgrounds and interactive elements
- **AI-Powered Content Generation**: Generates three key marketing components:
  - Persuasive marketing copy
  - Visual strategy recommendations  
  - Target audience analysis
- **Interactive Copy Function**: One-click copying of generated content to clipboard
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Feedback**: Loading states and success notifications

## Technology Stack

- **Backend**: Node.js with Express
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with Bootstrap components
- **Icons**: Emoji-based icons for universal compatibility
- **Containerization**: Docker with health checks

## Usage

1. Enter a description of your product or service in the text area
2. Click "Generate Marketing Strategy" 
3. The AI will analyze your input and generate:
   - Compelling marketing copy
   - Visual design recommendations
   - Target audience insights
4. Use the copy buttons to save any section to your clipboard

## API Endpoints

- `GET /` - Main application interface
- `POST /api/generate-marketing` - Generate marketing content (requires `productDescription` in JSON body)
- `GET /health` - Health check endpoint

## Running the Application

### Local Development
```bash
cd src
npm install
npm start
```

### Docker
```bash
docker build -t marketing-assistant .
docker run -p 3000:3000 marketing-assistant
```

The application will be available at `http://localhost:3000`

## Mock AI Implementation

The current implementation uses a mock AI service that generates contextual responses based on keywords in the product description. In a production environment, this would integrate with services like:

- OpenAI GPT API
- Anthropic Claude
- Google Gemini
- Azure OpenAI Service

## Architecture

The application follows a simple client-server architecture:

- **Frontend**: Single-page application with vanilla JavaScript
- **Backend**: Express.js server with RESTful API
- **AI Integration**: Modular design for easy integration with real AI services
- **Containerization**: Production-ready Docker setup with security best practices

## Security Features

- Non-root user in Docker container
- Input validation and sanitization
- CORS enabled for cross-origin requests
- Health checks for container orchestration