import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PredictionForm from '../components/PredictionForm';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-16">
        {/* Hero Section */}
        <section id="home" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              AI Placement Predictor
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover your placement potential with our advanced AI-powered prediction system.
              Get accurate insights based on your academic performance and skills.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-medium border border-indigo-200">
                🎯 AI-Powered Predictions
              </span>
              <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-medium border border-green-200">
                📊 Data-Driven Insights
              </span>
              <span className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full font-medium border border-purple-200">
                🚀 Career Guidance
              </span>
            </div>
          </div>
        </section>

        {/* Prediction Form Section */}
        <section id="predict" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <PredictionForm />
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="py-16 px-4 bg-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Our System?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Predictions</h3>
                <p className="text-gray-600">Our AI model analyzes thousands of placement records to provide reliable predictions.</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
                <p className="text-gray-600">Get your placement prediction in seconds with our optimized processing system.</p>
              </div>

              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Educational Insights</h3>
                <p className="text-gray-600">Learn what factors influence placement success and how to improve your chances.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;