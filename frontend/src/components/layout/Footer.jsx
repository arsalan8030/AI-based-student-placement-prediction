function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AI Placement Predictor</h3>
            <p className="text-gray-400 text-sm">
              Leveraging machine learning to help students predict their placement chances and improve their career prospects.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Career Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Interview Prep</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Resume Builder</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 AI Placement Prediction System. All rights reserved.</p>
          {/* <p className="mt-2">Built with ❤️ using React, Tailwind CSS, and Machine Learning</p> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;