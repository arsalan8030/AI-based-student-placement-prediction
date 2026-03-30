import { usePrediction } from '../hooks/usePrediction';
import Input from './ui/Input';

function PredictionForm() {
  const { formData, result, suggestions, message, loading, error, handleChange, handleSubmit } = usePrediction();

  return (
    <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Check Your Placement Chances
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Enter your details below to get an AI-powered prediction of your placement probability.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700 mb-2">
              CGPA (0-10)
            </label>
            <Input
              id="cgpa"
              name="cgpa"
              type="number"
              step="0.01"
              min="0"
              max="10"
              placeholder="e.g., 8.5"
              value={formData.cgpa}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="internships" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Internships
            </label>
            <Input
              id="internships"
              name="internships"
              type="number"
              min="0"
              placeholder="e.g., 2"
              value={formData.internships}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="aptitude" className="block text-sm font-medium text-gray-700 mb-2">
              Aptitude Score (0-100)
            </label>
            <Input
              id="aptitude"
              name="aptitude"
              type="number"
              min="0"
              max="100"
              placeholder="e.g., 85"
              value={formData.aptitude}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="projects" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Projects
            </label>
            <Input
              id="projects"
              name="projects"
              type="number"
              min="0"
              placeholder="e.g., 5"
              value={formData.projects}
              onChange={handleChange}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="communication" className="block text-sm font-medium text-gray-700 mb-2">
              Communication Skills (0-10)
            </label>
            <Input
              id="communication"
              name="communication"
              type="number"
              step="0.1"
              min="0"
              max="10"
              placeholder="e.g., 7.5"
              value={formData.communication}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Your Data...
            </div>
          ) : (
            "Predict My Placement Chances"
          )}
        </button>
      </form>

      {result && (
        <div className={`mt-8 p-6 rounded-xl text-center shadow-lg border-2 ${
          result.toLowerCase().includes("placed") || result.toLowerCase().includes("high")
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}>
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            result.toLowerCase().includes("placed") || result.toLowerCase().includes("high")
              ? "bg-green-100"
              : "bg-red-100"
          }`}>
            {result.toLowerCase().includes("placed") || result.toLowerCase().includes("high") ? (
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            ) : (
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Prediction Result
          </h3>
          <p className={`text-3xl font-bold ${
            result.toLowerCase().includes("placed") || result.toLowerCase().includes("high")
              ? "text-green-700"
              : "text-red-700"
          }`}>
            {result}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            This prediction is based on historical data and AI analysis. Results may vary based on various factors.
          </p>
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-lg font-semibold text-blue-800">
              Improvement Suggestions
            </h3>
          </div>
          {message && (
            <p className="text-blue-700 mb-4 font-medium">{message}</p>
          )}
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{suggestion.area}</h4>
                  <span className="text-sm text-gray-500">
                    Current: {suggestion.current} → Target: {suggestion.target}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{suggestion.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;