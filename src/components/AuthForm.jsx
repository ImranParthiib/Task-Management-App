import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../utils/supabaseClient';

const AuthForm = ({ onAuth, setAlert }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    if (cooldown > 0) {
      setAlert({ message: `Please wait ${cooldown} seconds before trying again.`, type: 'warning' });
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      let result;
      if (type === 'signup') {
        result = await supabase.auth.signUp({ email, password });
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      if (result.error) throw result.error;
      onAuth(result.data.session);
      if (type === 'signup' && !result.error) {
        setAlert({ message: 'Signup successful! Please check your email to confirm your account.', type: 'success' });
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError(error.message);
      setAlert({ message: error.message, type: 'error' });
      if (error.message.includes('security purposes')) {
        const seconds = parseInt(error.message.match(/\d+/)[0]) || 30; // Default to 30 seconds if no number found
        setCooldown(seconds);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Welcome to Task Master</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {cooldown > 0 && (
          <p className="text-yellow-500 text-sm mb-4">
            Please wait {cooldown} seconds before trying again.
          </p>
        )}
        <div className="flex justify-between">
          <button
            onClick={(e) => handleSubmit(e, 'login')}
            disabled={isLoading || cooldown > 0}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              (isLoading || cooldown > 0) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Log In
          </button>
          <button
            onClick={(e) => handleSubmit(e, 'signup')}
            disabled={isLoading || cooldown > 0}
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              (isLoading || cooldown > 0) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  onAuth: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default AuthForm;
