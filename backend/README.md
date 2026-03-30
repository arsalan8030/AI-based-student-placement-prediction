# AI Placement Predictor Backend

A simple Node.js/Express backend API for the AI-powered placement prediction system with personalized improvement suggestions.

## Features

- **Placement Prediction API**: POST endpoint to predict placement chances based on student data
- **Input Validation**: Comprehensive validation for all input parameters
- **ML Integration**: Calls Python ML model for predictions
- **Improvement Suggestions**: AI-powered personalized recommendations for students with low placement chances
- **Error Handling**: Proper error responses and logging
- **CORS Support**: Cross-origin requests enabled for frontend integration

## Key Enhancement: Improvement Suggestions

When a student receives a "Low Chance of Placement" prediction, the system automatically analyzes their profile and provides targeted improvement suggestions. Each suggestion includes:

- **Specific Area**: Academic Performance, Internship Experience, Aptitude Skills, Project Experience, or Communication Skills
- **Current vs Target**: Shows current value and recommended target value
- **Actionable Advice**: Detailed, practical recommendations for improvement

This feature helps students understand exactly what they need to work on to improve their placement prospects.

## API Endpoints

### POST /predict
Predict placement chances based on student data.

**Request Body:**
```json
{
  "cgpa": 8.5,
  "internships": 2,
  "aptitude": 85,
  "projects": 5,
  "communication": 7.5
}
```

**Response (High Chance):**
```json
{
  "prediction": "High Chance of Placement",
  "success": true
}
```

**Response (Low Chance with Suggestions):**
```json
{
  "prediction": "Low Chance of Placement",
  "success": true,
  "improvementSuggestions": [
    {
      "area": "Academic Performance (CGPA)",
      "current": 5.5,
      "target": 7.5,
      "suggestion": "Your CGPA is 5.5. Aim to improve it to at least 7.5 by focusing on consistent academic performance and seeking help in challenging subjects."
    },
    {
      "area": "Internship Experience",
      "current": 0,
      "target": 2,
      "suggestion": "You have 0 internships. Try to gain at least 2 internship experiences to build practical industry knowledge and networking opportunities."
    }
  ],
  "message": "Based on your profile, here are some areas you can focus on to improve your placement chances."
}
```

**Validation Rules:**
- `cgpa`: 0-10 (float)
- `internships`: ≥0 (integer)
- `aptitude`: 0-100 (float)
- `projects`: ≥0 (integer)
- `communication`: 0-10 (float)

**Improvement Suggestions:**
When the prediction is "Low Chance of Placement", the API automatically provides personalized improvement suggestions based on the student's current values compared to optimal thresholds. Each suggestion includes:
- The area that needs improvement
- Current value vs target value
- Specific actionable advice

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "AI Placement Predictor Backend is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET /
API information endpoint.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Python 3.x with required ML libraries
- Trained ML model (`model.pkl`) in the `../ml-model/` directory

### Installation

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Ensure Python dependencies are installed:**
   The ML model requires:
   - pandas
   - scikit-learn
   - joblib

   Install them using:
   ```bash
   pip install pandas scikit-learn joblib
   ```

3. **Train the ML model (if not already done):**
   ```bash
   cd ../ml-model
   python train_model.py
   ```

### Running the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## Project Structure

```
backend/
├── index.js          # Main Express server with prediction logic and improvement suggestions
├── package.json      # Dependencies and scripts
└── README.md         # This documentation
```

## Improvement Suggestions Logic

The system uses predefined optimal thresholds to generate suggestions:

- **CGPA**: Target ≥ 7.5
- **Internships**: Target ≥ 2
- **Aptitude Score**: Target ≥ 75
- **Projects**: Target ≥ 3
- **Communication Skills**: Target ≥ 7.0

When a student's values fall below these thresholds, specific suggestions are provided with actionable advice for improvement.

## Integration with Frontend

The backend is designed to work with the React frontend. Make sure:

1. Backend runs on port 5000
2. Frontend API base URL points to `http://localhost:5000`
3. ML model is properly trained and `model.pkl` exists

## Error Handling

The API provides detailed error messages for:
- Missing required fields
- Invalid data ranges
- ML model execution failures
- Server errors

## Development

- Uses Express.js for the web framework
- CORS enabled for cross-origin requests
- Child process spawning for Python ML execution
- Comprehensive input validation
- Proper error logging

## License

ISC

## Features

- **Professional Architecture**: Modular design with separation of concerns
- **Placement Prediction API**: RESTful endpoints for ML-based predictions
- **Comprehensive Validation**: Input validation with detailed error messages
- **ML Integration**: Robust Python ML model integration with error handling
- **Security**: Helmet security headers, CORS configuration, rate limiting
- **Logging**: Winston-based logging with different log levels
- **Error Handling**: Custom error classes and global error middleware
- **Health Monitoring**: Multiple health check endpoints
- **API Documentation**: Self-documenting endpoints with detailed responses
- **Environment Configuration**: Environment-based configuration management

## API Endpoints

### General Endpoints

#### GET /
Get API information and available endpoints.

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "AI Placement Predictor API",
    "version": "1.0.0",
    "description": "Backend API for AI-powered placement prediction system",
    "environment": "development",
    "baseUrl": "http://localhost:5000",
    "endpoints": {
      "GET /": "API information",
      "GET /health": "Health check",
      "POST /api/v1/predict": "Make placement prediction",
      "GET /api/v1/predict/stats": "Prediction statistics",
      "GET /api/v1/predict/health": "ML model health check"
    },
    "documentation": "See README.md for detailed API documentation",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

#### GET /health
Comprehensive health check endpoint.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "OK",
    "message": "AI Placement Predictor Backend is running",
    "version": "1.0.0",
    "environment": "development",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "uptime": 123.456,
    "services": {
      "mlModel": "healthy",
      "database": "not configured"
    }
  }
}
```

#### GET /status
Detailed server status and metrics.

**Response:**
```json
{
  "success": true,
  "data": {
    "server": {
      "uptime": 123.456,
      "platform": "win32",
      "nodeVersion": "v18.17.0",
      "memory": {
        "rss": "50 MB",
        "heapTotal": "30 MB",
        "heapUsed": "25 MB",
        "external": "2 MB"
      }
    },
    "services": {
      "mlModel": {
        "status": "healthy",
        "lastChecked": "2024-01-01T12:00:00.000Z"
      }
    },
    "config": {
      "port": 5000,
      "environment": "development",
      "apiVersion": "v1"
    },
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

### Prediction Endpoints

#### POST /api/v1/predict
Make a placement prediction based on student data.

**Request Body:**
```json
{
  "cgpa": 8.5,
  "iq": 120,
  "profile_score": 85
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "prediction": "High Chance of Placement",
    "confidence": 0.85,
    "input": {
      "cgpa": 8.5,
      "iq": 120,
      "profile_score": 85
    },
    "timestamp": "2024-01-01T12:00:00.000Z",
    "processingTime": 150
  }
}
```

**Validation Rules:**
- `cgpa`: 0-10 (required, number)
- `iq`: 0-200 (required, integer)
- `profile_score`: 0-100 (required, number)

#### GET /api/v1/predict/stats
Get prediction statistics and usage metrics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPredictions": 1250,
    "predictionsToday": 45,
    "averageProcessingTime": 145,
    "successRate": 0.98,
    "popularRanges": {
      "cgpa": "7.0-9.0",
      "iq": "100-140",
      "profile_score": "70-90"
    },
    "lastUpdated": "2024-01-01T12:00:00.000Z"
  }
}
```

#### GET /api/v1/predict/health
Check ML model health and status.

**Response:**
```json
{
  "success": true,
  "data": {
    "modelStatus": "healthy",
    "modelPath": "../ml-model/model.pkl",
    "lastModified": "2024-01-01T10:30:00.000Z",
    "modelVersion": "1.0.0",
    "supportedFeatures": ["cgpa", "iq", "profile_score"],
    "testPrediction": {
      "input": { "cgpa": 8.0, "iq": 110, "profile_score": 80 },
      "output": "High Chance of Placement",
      "processingTime": 120
    },
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Python 3.x with required ML libraries
- Trained ML model (`model.pkl`) in the `../ml-model/` directory

### Installation

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Install Python dependencies:**
   The ML model requires:
   - pandas
   - scikit-learn
   - joblib
   - numpy

   Install them using:
   ```bash
   pip install pandas scikit-learn joblib numpy
   ```

3. **Environment Configuration:**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   LOG_LEVEL=info
   API_VERSION=v1
   ML_MODEL_PATH=../ml-model/model.pkl
   ML_SCRIPT_PATH=../ml-model/predict.py
   ```

4. **Train the ML model (if not already done):**
   ```bash
   cd ../ml-model
   python train_model.py
   ```

### Running the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on the configured port (default: 5000).

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── config.js          # Environment configuration
│   ├── controllers/
│   │   ├── generalController.js    # General API endpoints
│   │   └── predictionController.js # Prediction endpoints
│   ├── middleware/
│   │   ├── errorHandler.js    # Global error handling
│   │   ├── index.js           # Middleware exports
│   │   └── rateLimiter.js     # Rate limiting
│   ├── routes/
│   │   ├── generalRoutes.js   # General routes
│   │   └── predictionRoutes.js # Prediction routes
│   ├── services/
│   │   └── predictionService.js # ML prediction service
│   ├── utils/
│   │   ├── errors.js          # Custom error classes
│   │   ├── logger.js          # Winston logger
│   │   └── validation.js      # Input validation
│   └── app.js                 # Express app configuration
├── .env                       # Environment variables
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
├── index.js                   # Server entry point
├── package.json               # Dependencies and scripts
└── README.md                  # This documentation
```

## Integration with Frontend

The backend is designed to work seamlessly with the React frontend:

1. **CORS Configuration**: Backend allows requests from frontend origin
2. **API Versioning**: All endpoints are versioned under `/api/v1/`
3. **Consistent Response Format**: All responses follow a consistent JSON structure
4. **Error Handling**: Frontend receives detailed error information
5. **Rate Limiting**: Prevents abuse while allowing normal usage

## Security Features

- **Helmet**: Security headers for common vulnerabilities
- **CORS**: Configured cross-origin resource sharing
- **Rate Limiting**: Prevents API abuse (100 requests per 15 minutes per IP)
- **Input Validation**: Comprehensive validation using Joi schemas
- **Error Sanitization**: Sensitive information not exposed in production

## Logging

The application uses Winston for comprehensive logging:

- **Console Logging**: Development mode with colored output
- **File Logging**: Production logs saved to `logs/` directory
- **Log Levels**: error, warn, info, debug
- **Request Logging**: All API requests are logged with Morgan middleware

## Error Handling

- **Custom Error Classes**: Specific error types for different scenarios
- **Global Error Middleware**: Consistent error response format
- **Validation Errors**: Detailed field-level validation messages
- **ML Errors**: Specific handling for model execution failures
- **Development vs Production**: Different error detail levels

## Development

- **Modular Architecture**: Clean separation of concerns
- **ES6+ Features**: Modern JavaScript with async/await
- **Environment Config**: Flexible configuration management
- **Hot Reload**: Development server with auto-restart
- **Linting**: ESLint configuration for code quality

## Testing

Run tests with:
```bash
npm test
```

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in environment
2. Use a process manager like PM2
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Monitor logs and health endpoints

## License

ISC