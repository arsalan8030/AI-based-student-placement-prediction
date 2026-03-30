import { useState } from 'react';
import { predictPlacement } from '../services/api';

export function usePrediction() {
  const [formData, setFormData] = useState({
    cgpa: '',
    internships: '',
    aptitude: '',
    projects: '',
    communication: ''
  });
  const [result, setResult] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      // Validate inputs
      const cgpa = parseFloat(formData.cgpa);
      const internships = parseInt(formData.internships);
      const aptitude = parseFloat(formData.aptitude);
      const projects = parseInt(formData.projects);
      const communication = parseFloat(formData.communication);

      if (cgpa < 0 || cgpa > 10) {
        throw new Error('CGPA must be between 0 and 10');
      }
      if (internships < 0) {
        throw new Error('Internships must be a non-negative number');
      }
      if (aptitude < 0 || aptitude > 100) {
        throw new Error('Aptitude score must be between 0 and 100');
      }
      if (projects < 0) {
        throw new Error('Projects must be a non-negative number');
      }
      if (communication < 0 || communication > 10) {
        throw new Error('Communication skills must be between 0 and 10');
      }

      const response = await predictPlacement({
        cgpa,
        internships,
        aptitude,
        projects,
        communication
      });

      setResult(response.data.prediction);
      setSuggestions(response.data.improvementSuggestions || []);
      setMessage(response.data.message || '');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'An error occurred during prediction');
      setResult('');
      setSuggestions([]);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    result,
    suggestions,
    message,
    loading,
    error,
    handleChange,
    handleSubmit
  };
}