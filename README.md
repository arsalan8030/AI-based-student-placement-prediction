# AI Placement Predictor

An intelligent placement prediction system that uses machine learning to analyze student data and predict placement chances based on academic performance, skills, and experience.

## 🚀 Features

- **AI-Powered Predictions**: Machine learning model trained on placement data
- **User-Friendly Interface**: Clean, professional React frontend
- **Real-time Validation**: Input validation with helpful error messages
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **RESTful API**: Well-documented backend API

## 📁 Project Structure

```
ai-placement-predictor/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── services/
│   ├── package.json
│   └── vite.config.js
├── backend/           # Node.js/Express API server
│   ├── index.js
│   └── package.json
├── ml-model/          # Machine learning components
│   ├── dataset.csv    # Training data
│   ├── train_model.py # Model training script
│   ├── predict.py     # Prediction script
│   └── model.pkl      # Trained model (generated)
├── package.json       # Root package.json for convenience
└── start.bat          # Windows batch script to start both servers
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **Python 3.x** with pip
- **Git** (optional)

### Step 1: Install Dependencies

**Option A: Install all at once**
```bash
npm run install:all
```

**Option B: Install manually**
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..

# Frontend dependencies
cd frontend
npm install
cd ..

# Python dependencies
pip install pandas scikit-learn joblib
```

### Step 2: Train the ML Model

```bash
npm run train:model
# or manually: cd ml-model && python train_model.py
```

This will create `model.pkl` in the `ml-model/` directory.

### Step 3: Start the Application

**Option A: Start both servers**
```bash
npm start
```

**Option B: Start individually**
```bash
# Terminal 1: Backend
npm run start:backend

# Terminal 2: Frontend
npm run start:frontend
```

**Option C: Windows batch script**
```bash
start.bat
```

### Step 4: Access the Application

- **Frontend**: http://localhost:5174
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 📊 API Documentation

### POST /predict

Predict placement chances based on student data.

**Request:**
```json
{
  "cgpa": 8.5,
  "internships": 2,
  "aptitude": 85,
  "projects": 5,
  "communication": 7.5
}
```

**Response:**
```json
{
  "prediction": "High Chance of Placement",
  "success": true
}
```

**Validation:**
- `cgpa`: 0-10 (float)
- `internships`: ≥0 (integer)
- `aptitude`: 0-100 (float)
- `projects`: ≥0 (integer)
- `communication`: 0-10 (float)

### GET /health

Health check endpoint.

### GET /

API information.

## 🔧 Development

### Frontend (React + Vite)

```bash
cd frontend
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### Backend (Node.js + Express)

```bash
cd backend
npm start        # Production server
npm run dev      # Development with nodemon
```

### ML Model

```bash
cd ml-model
python train_model.py    # Train model
python predict.py 8.5 2 85 5 7.5  # Test prediction
```

## 📈 Model Training

The ML model uses Logistic Regression trained on placement data with the following features:
- CGPA (0-10)
- Number of internships
- Aptitude test score (0-100)
- Number of projects
- Communication skills rating (0-10)

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build:frontend
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment
- Set `NODE_ENV=production`
- Configure proper environment variables
- Use a process manager like PM2
- Ensure Python and ML dependencies are installed on the server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License

## 🙏 Acknowledgments

- Built with React, Express, and scikit-learn
- Styled with Tailwind CSS
- Icons from Heroicons