const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// API endpoint for AI marketing assistance
app.post('/api/generate-marketing', async (req, res) => {
  try {
    const { productDescription } = req.body;
    
    if (!productDescription || productDescription.trim().length === 0) {
      return res.status(400).json({ error: 'Product description is required' });
    }

    // Mock AI response - In a real implementation, this would call an AI service like OpenAI
    const aiResponse = generateMockAIResponse(productDescription);
    
    res.json(aiResponse);
  } catch (error) {
    console.error('Error generating marketing content:', error);
    res.status(500).json({ error: 'Failed to generate marketing content' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Mock AI response generator
function generateMockAIResponse(productDescription) {
  const products = productDescription.toLowerCase();
  
  // Generate different responses based on keywords in the product description
  let marketingCopy, visualStrategy, targetAudience;
  
  if (products.includes('software') || products.includes('app') || products.includes('digital')) {
    marketingCopy = `Transform your digital experience with our cutting-edge ${productDescription}. Streamline your workflow, boost productivity, and stay ahead of the competition with innovative features designed for the modern user.`;
    visualStrategy = `Clean, modern interface with gradient backgrounds (blue to purple), minimalist icons, sleek typography (Open Sans or similar), screenshots showcasing key features, and tech-focused imagery with people using devices.`;
    targetAudience = `Tech-savvy professionals aged 25-45, small to medium business owners, remote workers, and early adopters who value efficiency and innovation in digital tools.`;
  } else if (products.includes('food') || products.includes('restaurant') || products.includes('culinary')) {
    marketingCopy = `Indulge in the extraordinary with our ${productDescription}. Crafted with passion and the finest ingredients, every bite tells a story of quality, tradition, and exceptional taste that will leave you craving for more.`;
    visualStrategy = `Warm, appetizing colors (golden yellows, rich browns, fresh greens), high-quality food photography with natural lighting, rustic or elegant table settings, and lifestyle imagery showing people enjoying meals.`;
    targetAudience = `Food enthusiasts aged 30-55, families looking for quality dining experiences, professionals seeking convenient meal solutions, and culinary adventurers interested in new flavors.`;
  } else if (products.includes('fitness') || products.includes('health') || products.includes('wellness')) {
    marketingCopy = `Unlock your potential with our ${productDescription}. Designed to support your wellness journey, our solution combines science-backed approaches with practical tools to help you achieve your health and fitness goals.`;
    visualStrategy = `Energetic color palette (vibrant oranges, fresh blues, natural greens), action shots of people exercising, clean and motivational typography, before/after transformations, and outdoor/gym environments.`;
    targetAudience = `Health-conscious individuals aged 20-50, fitness enthusiasts, busy professionals seeking work-life balance, and people starting their wellness journey.`;
  } else {
    marketingCopy = `Discover excellence with our ${productDescription}. Meticulously designed to exceed your expectations, our product combines quality, innovation, and value to deliver an exceptional experience that sets new standards in its category.`;
    visualStrategy = `Professional color scheme (navy blues, clean whites, accent colors), high-quality product photography, modern typography, lifestyle imagery showing the product in use, and testimonial-style visuals.`;
    targetAudience = `Quality-conscious consumers aged 25-55, professionals seeking reliable solutions, brand enthusiasts who value premium experiences, and informed buyers who research before purchasing.`;
  }
  
  return {
    marketingCopy,
    visualStrategy,
    targetAudience,
    timestamp: new Date().toISOString()
  };
}

app.listen(PORT, () => {
  console.log(`AI Marketing Assistant running on port ${PORT}`);
});

module.exports = app;