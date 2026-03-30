const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Function to generate improvement suggestions
function generateImprovementSuggestions(cgpa, internships, aptitude, projects, communication) {
  const suggestions = [];

  // Define optimal thresholds
  const optimalCgpa = 7.5;
  const optimalInternships = 2;
  const optimalAptitude = 75;
  const optimalProjects = 3;
  const optimalCommunication = 7.0;

  if (cgpa < optimalCgpa) {
    suggestions.push({
      area: "Academic Performance (CGPA)",
      current: cgpa,
      target: optimalCgpa,
      suggestion: `Your CGPA is ${cgpa}. Aim to improve it to at least ${optimalCgpa} by focusing on consistent academic performance and seeking help in challenging subjects.`
    });
  }

  if (internships < optimalInternships) {
    suggestions.push({
      area: "Internship Experience",
      current: internships,
      target: optimalInternships,
      suggestion: `You have ${internships} internship${internships !== 1 ? 's' : ''}. Try to gain at least ${optimalInternships} internship experiences to build practical industry knowledge and networking opportunities.`
    });
  }

  if (aptitude < optimalAptitude) {
    suggestions.push({
      area: "Aptitude Skills",
      current: aptitude,
      target: optimalAptitude,
      suggestion: `Your aptitude score is ${aptitude}. Work on improving logical reasoning, quantitative skills, and problem-solving abilities to reach at least ${optimalAptitude}.`
    });
  }

  if (projects < optimalProjects) {
    suggestions.push({
      area: "Project Experience",
      current: projects,
      target: optimalProjects,
      suggestion: `You have ${projects} project${projects !== 1 ? 's' : ''}. Build a portfolio with at least ${optimalProjects} substantial projects to demonstrate your technical skills and creativity.`
    });
  }

  if (communication < optimalCommunication) {
    suggestions.push({
      area: "Communication Skills",
      current: communication,
      target: optimalCommunication,
      suggestion: `Your communication skills rating is ${communication}. Focus on improving verbal communication, presentation skills, and interpersonal abilities to reach at least ${optimalCommunication}.`
    });
  }

  return suggestions;
}

// Prediction endpoint
app.post('/predict', async (req, res) => {
  try {
    const { cgpa, internships, aptitude, projects, communication } = req.body;

    // Validate input data
    if (cgpa === undefined || internships === undefined || aptitude === undefined ||
        projects === undefined || communication === undefined) {
      return res.status(400).json({
        error: 'All fields are required: cgpa, internships, aptitude, projects, communication'
      });
    }

    // Validate data ranges
    if (cgpa < 0 || cgpa > 10) {
      return res.status(400).json({ error: 'CGPA must be between 0 and 10' });
    }
    if (internships < 0) {
      return res.status(400).json({ error: 'Internships must be a non-negative number' });
    }
    if (aptitude < 0 || aptitude > 100) {
      return res.status(400).json({ error: 'Aptitude score must be between 0 and 100' });
    }
    if (projects < 0) {
      return res.status(400).json({ error: 'Projects must be a non-negative number' });
    }
    if (communication < 0 || communication > 10) {
      return res.status(400).json({ error: 'Communication skills must be between 0 and 10' });
    }

    // Call Python prediction script
    const pythonProcess = spawn('python', [
      path.join(__dirname, '../ml-model/predict.py'),
      cgpa.toString(),
      internships.toString(),
      aptitude.toString(),
      projects.toString(),
      communication.toString()
    ], {
      cwd: path.join(__dirname, '../ml-model')  // Set working directory to ml-model folder
    });

    let predictionResult = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      predictionResult += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script error:', errorOutput);
        return res.status(500).json({
          error: 'Prediction failed. Please check if the ML model is properly trained.'
        });
      }

      const prediction = predictionResult.trim();

      // Determine if it's a high chance or low chance prediction
      let result;
      let suggestions = null;

      if (prediction.toLowerCase().includes('placed') && !prediction.toLowerCase().includes('not')) {
        result = 'High Chance of Placement';
      } else if (prediction.toLowerCase().includes('not placed') || prediction === 'Not Placed') {
        result = 'Low Chance of Placement';
        // Generate improvement suggestions for low chance predictions
        suggestions = generateImprovementSuggestions(cgpa, internships, aptitude, projects, communication);
      } else {
        result = prediction; // fallback to whatever the model returns
      }

      const response = {
        prediction: result,
        success: true
      };

      // Include suggestions if available
      if (suggestions && suggestions.length > 0) {
        response.improvementSuggestions = suggestions;
        response.message = `Based on your profile, here are some areas you can focus on to improve your placement chances.`;
      }

      res.json(response);
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      res.status(500).json({
        error: 'Failed to execute prediction. Please ensure Python is installed.'
      });
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error occurred during prediction.'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'AI Placement Predictor Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Placement Predictor API',
    version: '1.0.0',
    endpoints: {
      'POST /predict': 'Make a placement prediction',
      'GET /health': 'Health check'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `The requested path ${req.path} does not exist`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AI Placement Predictor Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔮 Prediction endpoint: POST http://localhost:${PORT}/predict`);
});

module.exports = app;