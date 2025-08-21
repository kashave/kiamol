# AI-Powered Marketing Assistant

A modern web application that uses AI to generate comprehensive marketing strategies for products and services.

## Features

✨ **Three Core Outputs:**
- **Marketing Copy**: Compelling headlines, taglines, descriptions, key benefits, and call-to-action
- **Visual Strategy**: Color palettes, imagery recommendations, design style, typography, and mood
- **Target Audience**: Primary and secondary audience profiles with demographics, psychographics, pain points, goals, and recommended marketing channels

🎨 **Modern Design:**
- Beautiful gradient-based UI
- Responsive design that works on all devices
- Smooth animations and hover effects
- Clean, professional layout

🤖 **AI-Powered Intelligence:**
- Context-aware content generation based on product description
- Industry-specific recommendations for tech, health, food, and general products
- Intelligent audience segmentation and channel recommendations

## How to Use

1. **Start the Application:**
   ```bash
   cd /home/runner/work/kiamol/kiamol/marketing-assistant/src
   npm install
   npm start
   ```

2. **Access the App:**
   Open your browser and navigate to `http://localhost:3000`

3. **Generate Marketing Strategy:**
   - Enter a detailed description of your product or service
   - Include key features, benefits, and target market information
   - Click "Generate Marketing Strategy"
   - Wait for the AI to analyze and generate your comprehensive strategy

4. **View Results:**
   The app will display three detailed sections:
   - Marketing copy with headlines, benefits, and call-to-action
   - Visual strategy with colors, imagery, and design recommendations
   - Target audience analysis with demographic and channel recommendations

5. **Copy Results:**
   Use the "Copy Results" button to copy the entire strategy to your clipboard for use in other applications.

## Example Input

```
A revolutionary AI-powered fitness app that creates personalized workout plans based on your goals, fitness level, and available equipment. The app includes real-time form correction using computer vision, nutrition tracking, and social features to connect with workout buddies.
```

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Custom CSS with modern gradients and animations
- **API**: RESTful endpoint for marketing content generation

## API Endpoint

**POST** `/api/generate-marketing`

**Request Body:**
```json
{
  "productDescription": "Your product or service description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "marketingCopy": { ... },
    "visualStrategy": { ... },
    "targetAudience": { ... }
  }
}
```

## File Structure

```
marketing-assistant/src/
├── server.js              # Express server and AI logic
├── index-simple.html      # Main HTML file
├── app-standalone.js      # Frontend JavaScript
├── style.css             # CSS styles
├── package.json          # Dependencies
└── sample-output.json    # Example API response
```

## Screenshots

![AI Marketing Assistant Interface](https://github.com/user-attachments/assets/ab5a5662-68c2-49db-8d91-f56fbaa48c1c)

The application features a modern, engaging interface with a beautiful purple gradient design that feels fresh and professional.

---

**Built with ❤️ for the KIAMOL project**