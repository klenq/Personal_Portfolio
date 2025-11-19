import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-dark-secondary border-2 border-cream rounded-sm shadow-geometric-md p-8">
          <h2 className="font-mono text-3xl font-bold text-cream mb-6 text-center">
            Admin Login
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-accent/10 border border-red-accent rounded-sm">
              <p className="text-red-accent text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-tertiary border-2 border-slate-600 rounded-sm
                         text-cream font-medium
                         focus:border-teal-accent focus:outline-none
                         transition-colors"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-tertiary border-2 border-slate-600 rounded-sm
                         text-cream font-medium
                         focus:border-teal-accent focus:outline-none
                         transition-colors"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full font-mono text-base font-medium
                       px-8 py-4
                       bg-teal-accent text-dark-primary
                       border-2 border-cream rounded-sm
                       shadow-geometric-btn
                       transition-all duration-200
                       hover:translate-x-[4px] hover:-translate-y-[4px]
                       hover:shadow-geometric-btn-hover
                       active:translate-x-0 active:translate-y-0 active:shadow-none
                       active:bg-blue-active"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Default credentials: <span className="text-teal-accent font-medium">admin / admin123</span>
          </p>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-teal-accent transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
