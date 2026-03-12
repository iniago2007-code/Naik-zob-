import React, { useState } from 'react';

interface SignInProps {
  onSignIn: () => void;
}

export default function SignIn({ onSignIn }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      onSignIn();
    }, 800);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 min-h-screen bg-gradient-to-br from-farming-bg to-white">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 relative overflow-hidden animate-fade-in shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-farming-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-farming-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-tr from-farming-primary to-farming-accent rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl transform transition-transform hover:rotate-6">
              <span className="text-4xl text-white">🌾</span>
            </div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-farming-dark to-farming-primary tracking-tight">
              AgriPredict
            </h1>
            <p className="text-gray-500 mt-3 text-sm font-medium">Enterprise Agricultural Intelligence</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 ml-1" htmlFor="email">
                Professional Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-white/40 border border-gray-200 focus:border-farming-primary focus:ring-4 focus:ring-farming-primary/10 transition-all outline-none backdrop-blur-sm"
                placeholder="analyst@farmcorp.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 ml-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-white/40 border border-gray-200 focus:border-farming-primary focus:ring-4 focus:ring-farming-primary/10 transition-all outline-none backdrop-blur-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center text-sm text-gray-600 cursor-pointer group">
                <input type="checkbox" className="mr-2 rounded text-farming-primary focus:ring-farming-primary/20 border-gray-300 transition-colors" />
                <span className="group-hover:text-farming-dark transition-colors">Keep me signed in</span>
              </label>
              <a href="#" className="text-sm font-semibold text-farming-primary hover:text-farming-dark transition-colors">
                Recover access
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-farming-primary hover:bg-farming-dark text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-farming-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-8 group"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <span>Initialize Dashboard</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
          
          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 font-medium">
              &copy; 2026 AgriPredict Intelligence Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
