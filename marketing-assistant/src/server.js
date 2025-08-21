const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Mock AI service to generate marketing content
const generateMarketingContent = (productDescription) => {
  // Simulated AI responses based on the product description
  const responses = {
    marketingCopy: generateMarketingCopy(productDescription),
    visualStrategy: generateVisualStrategy(productDescription),
    targetAudience: generateTargetAudience(productDescription)
  };
  
  return responses;
};

const generateMarketingCopy = (description) => {
  const keywords = description.toLowerCase().split(' ');
  const hastech = keywords.some(k => ['app', 'software', 'tech', 'digital', 'ai', 'platform'].includes(k));
  const hashealth = keywords.some(k => ['health', 'fitness', 'wellness', 'medical', 'care'].includes(k));
  const hasfood = keywords.some(k => ['food', 'restaurant', 'cafe', 'dining', 'meal'].includes(k));
  
  if (hastech) {
    return {
      headline: "🚀 Transform Your World with Cutting-Edge Innovation",
      tagline: "Where Technology Meets Possibility",
      description: `Experience the future today with our revolutionary solution. Our advanced technology doesn't just meet your needs—it anticipates them. Join thousands of users who've already discovered the power of innovation at their fingertips.`,
      callToAction: "Start Your Digital Revolution Today",
      keyBenefits: [
        "⚡ Lightning-fast performance that saves you time",
        "🔒 Enterprise-grade security you can trust",
        "🎯 Intelligent features that adapt to your needs",
        "🌐 Seamless integration with your existing workflow"
      ]
    };
  } else if (hashealth) {
    return {
      headline: "💪 Your Journey to Better Health Starts Here",
      tagline: "Wellness. Simplified. Personalized.",
      description: `Take control of your health with our comprehensive approach to wellness. Our expert-backed solutions are designed to fit seamlessly into your lifestyle, making healthy choices easier than ever before.`,
      callToAction: "Begin Your Wellness Transformation",
      keyBenefits: [
        "🌟 Personalized plans tailored to your goals",
        "📊 Track progress with detailed insights",
        "👥 Connect with a supportive community",
        "🏆 Achieve lasting results with proven methods"
      ]
    };
  } else if (hasfood) {
    return {
      headline: "🍽️ Savor the Extraordinary, Every Single Day",
      tagline: "Where Flavor Meets Passion",
      description: `Indulge in an unforgettable culinary experience that awakens your senses. Our carefully crafted offerings blend traditional techniques with innovative approaches, creating moments that turn meals into memories.`,
      callToAction: "Taste the Difference Today",
      keyBenefits: [
        "👨‍🍳 Chef-crafted recipes with premium ingredients",
        "🚚 Fresh delivery straight to your door",
        "🌿 Sustainable and locally-sourced when possible",
        "💝 Perfect for special occasions or everyday indulgence"
      ]
    };
  } else {
    return {
      headline: "✨ Discover Excellence in Every Detail",
      tagline: "Quality That Speaks for Itself",
      description: `Experience the difference that attention to detail makes. Our commitment to excellence shines through in every aspect of what we do, delivering value that exceeds expectations and creates lasting satisfaction.`,
      callToAction: "Experience Excellence Today",
      keyBenefits: [
        "🎯 Precision-crafted for optimal performance",
        "💎 Premium quality that stands the test of time",
        "🤝 Exceptional customer service and support",
        "🌟 Trusted by customers who demand the best"
      ]
    };
  }
};

const generateVisualStrategy = (description) => {
  const keywords = description.toLowerCase().split(' ');
  const hastech = keywords.some(k => ['app', 'software', 'tech', 'digital', 'ai', 'platform'].includes(k));
  const hashealth = keywords.some(k => ['health', 'fitness', 'wellness', 'medical', 'care'].includes(k));
  const hasfood = keywords.some(k => ['food', 'restaurant', 'cafe', 'dining', 'meal'].includes(k));
  
  if (hastech) {
    return {
      colorPalette: {
        primary: "#0066CC - Electric Blue",
        secondary: "#00D4AA - Bright Teal", 
        accent: "#7B68EE - Modern Purple",
        background: "#F8FAFC - Clean White"
      },
      imagery: [
        "🖥️ Sleek device mockups showcasing the interface",
        "⚡ Dynamic graphics showing speed and efficiency",
        "🌐 Connected network visualizations",
        "👥 Diverse users successfully using the product"
      ],
      designStyle: "Modern minimalist with bold gradients",
      typography: "Clean, sans-serif fonts (Poppins, Inter, or Roboto)",
      mood: "Innovative, trustworthy, forward-thinking"
    };
  } else if (hashealth) {
    return {
      colorPalette: {
        primary: "#16A085 - Calming Teal",
        secondary: "#E8F5E8 - Soft Green",
        accent: "#FF6B6B - Energetic Coral",
        background: "#FFFFFF - Pure White"
      },
      imagery: [
        "🏃‍♀️ Active lifestyle shots with natural lighting",
        "🥗 Fresh, colorful nutrition imagery",
        "🧘‍♀️ Peaceful wellness and mindfulness scenes",
        "📈 Progress visualization and achievement moments"
      ],
      designStyle: "Clean and organic with natural elements",
      typography: "Friendly, readable fonts (Source Sans Pro, Open Sans)",
      mood: "Refreshing, motivational, peaceful"
    };
  } else if (hasfood) {
    return {
      colorPalette: {
        primary: "#D4A574 - Warm Gold",
        secondary: "#8B4513 - Rich Brown",
        accent: "#FF4500 - Vibrant Orange",
        background: "#FFF8DC - Cream"
      },
      imagery: [
        "📸 High-quality food photography with warm lighting",
        "👨‍🍳 Behind-the-scenes kitchen and chef imagery",
        "🌿 Fresh ingredients and artisanal preparation",
        "😊 Happy customers enjoying their experience"
      ],
      designStyle: "Warm and inviting with artisanal touches",
      typography: "Elegant serif for headers, clean sans-serif for body",
      mood: "Appetizing, sophisticated, welcoming"
    };
  } else {
    return {
      colorPalette: {
        primary: "#2C3E50 - Professional Navy",
        secondary: "#ECF0F1 - Light Gray",
        accent: "#E74C3C - Confident Red",
        background: "#FFFFFF - Clean White"
      },
      imagery: [
        "💼 Professional lifestyle and business imagery",
        "🎯 Success and achievement visualizations",
        "🤝 Trust and partnership representations",
        "⭐ Quality and excellence demonstrations"
      ],
      designStyle: "Professional and trustworthy with subtle elegance",
      typography: "Classic fonts that convey reliability",
      mood: "Confident, professional, dependable"
    };
  }
};

const generateTargetAudience = (description) => {
  const keywords = description.toLowerCase().split(' ');
  const hastech = keywords.some(k => ['app', 'software', 'tech', 'digital', 'ai', 'platform'].includes(k));
  const hashealth = keywords.some(k => ['health', 'fitness', 'wellness', 'medical', 'care'].includes(k));
  const hasfood = keywords.some(k => ['food', 'restaurant', 'cafe', 'dining', 'meal'].includes(k));
  
  if (hastech) {
    return {
      primary: {
        title: "Tech-Savvy Professionals",
        demographics: "Ages 25-45, College-educated, Urban/Suburban",
        psychographics: "Early adopters who value efficiency and innovation",
        painPoints: "Overwhelmed by inefficient tools, seeking streamlined solutions",
        goals: "Increase productivity, stay ahead of trends, work smarter"
      },
      secondary: {
        title: "Digital Entrepreneurs",
        demographics: "Ages 28-50, Business owners, Global reach",
        psychographics: "Results-driven, technology-forward, growth-minded",
        painPoints: "Need scalable solutions, limited time for complex setups",
        goals: "Scale their business, automate processes, competitive advantage"
      },
      channels: [
        "🔍 Google Ads (search & display)",
        "💼 LinkedIn targeted campaigns", 
        "📱 Tech blogs and industry publications",
        "🎙️ Podcasts and webinar sponsorships"
      ]
    };
  } else if (hashealth) {
    return {
      primary: {
        title: "Health-Conscious Millennials",
        demographics: "Ages 28-42, Middle to upper-middle income, Active lifestyle",
        psychographics: "Wellness-focused, goal-oriented, community-driven",
        painPoints: "Busy schedules, inconsistent routines, information overload",
        goals: "Maintain healthy lifestyle, achieve fitness goals, feel confident"
      },
      secondary: {
        title: "Wellness Beginners",
        demographics: "Ages 35-55, Various income levels, Seeking change",
        psychographics: "Motivated but overwhelmed, need guidance and support",
        painPoints: "Don't know where to start, fear of failure, time constraints",
        goals: "Improve health, build sustainable habits, gain confidence"
      },
      channels: [
        "📱 Instagram and fitness influencer partnerships",
        "🏃‍♀️ Health and wellness apps advertising",
        "📺 YouTube pre-roll on fitness content",
        "🥗 Partnerships with health food stores"
      ]
    };
  } else if (hasfood) {
    return {
      primary: {
        title: "Culinary Enthusiasts",
        demographics: "Ages 30-55, Disposable income, Urban areas",
        psychographics: "Food-lovers, experience-seekers, quality-focused",
        painPoints: "Hard to find authentic experiences, time to research options",
        goals: "Discover new flavors, memorable experiences, impress others"
      },
      secondary: {
        title: "Busy Professionals",
        demographics: "Ages 25-45, Higher income, Time-constrained",
        psychographics: "Convenience-focused but won't compromise on quality",
        painPoints: "Limited time for meal planning, delivery quality concerns",
        goals: "Convenient quality meals, stress-free dining, healthy options"
      },
      channels: [
        "📱 Food delivery app partnerships",
        "🍴 Instagram food influencer collaborations",
        "📍 Google My Business and local SEO",
        "📧 Email marketing to existing customers"
      ]
    };
  } else {
    return {
      primary: {
        title: "Quality-Conscious Consumers",
        demographics: "Ages 30-50, Middle to upper income, Value-driven",
        psychographics: "Research-oriented, brand-loyal, quality over quantity",
        painPoints: "Skeptical of marketing claims, past disappointments",
        goals: "Find reliable solutions, long-term value, peace of mind"
      },
      secondary: {
        title: "Practical Decision Makers",
        demographics: "Ages 35-65, Various backgrounds, Budget-conscious",
        psychographics: "Methodical, seek recommendations, risk-averse",
        painPoints: "Too many options, unclear benefits, trust concerns",
        goals: "Make informed decisions, avoid regret, find trusted brands"
      },
      channels: [
        "🔍 Google search advertising",
        "📰 Industry publications and trade magazines",
        "🤝 Word-of-mouth and referral programs",
        "📺 Targeted TV and radio advertising"
      ]
    };
  }
};

// API Routes
app.post('/api/generate-marketing', (req, res) => {
  try {
    const { productDescription } = req.body;
    
    if (!productDescription || productDescription.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Product description is required' 
      });
    }

    // Simulate AI processing time
    setTimeout(() => {
      const result = generateMarketingContent(productDescription);
      res.json({
        success: true,
        data: result
      });
    }, 1500); // 1.5 second delay to simulate AI processing

  } catch (error) {
    console.error('Error generating marketing content:', error);
    res.status(500).json({ 
      error: 'Failed to generate marketing content' 
    });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index-simple.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Marketing Assistant running on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} to view the app`);
});

module.exports = app;