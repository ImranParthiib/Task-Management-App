import { useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../utils/supabaseClient';

const AuthForm = ({ onAuth, setAlert }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      if (authMode === 'signin') {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }

      const { data, error } = result;

      if (error) throw error;

      if (authMode === 'signup') {
        if (data.user && !data.session) {
          setAlert({ message: 'Check your email for the confirmation link!', type: 'success' });
        } else {
          onAuth(data.session);
          setAlert({ message: 'Successfully signed up and logged in!', type: 'success' });
        }
      } else {
        onAuth(data.session);
        setAlert({ message: 'Successfully signed in!', type: 'success' });
      }
    } catch (error) {
      console.error('Auth error:', error);
      if (error.message.includes('Invalid login credentials')) {
        setAlert({ message: 'Invalid email or password. Please try again.', type: 'error' });
      } else if (error.message.includes('Email not confirmed')) {
        setAlert({ message: 'Please confirm your email before signing in.', type: 'error' });
      } else if (error.message.includes('User already registered')) {
        setAlert({ message: 'This email is already registered. Try signing in instead.', type: 'error' });
      } else {
        setAlert({ message: `Error: ${error.message}`, type: 'error' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
      </h2>
      <form onSubmit={handleAuth}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
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
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : authMode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p className="mt-4 text-center">
        {authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
          className="ml-1 text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  );
};

AuthForm.propTypes = {
  onAuth: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default AuthForm;
