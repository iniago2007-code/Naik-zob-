import { useState } from 'react';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-farming-light via-white to-farming-bg overflow-hidden relative">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-farming-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] bg-farming-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <main className="relative z-10 w-full h-full min-h-screen flex flex-col">
        {isAuthenticated ? (
          <Dashboard onSignOut={() => setIsAuthenticated(false)} />
        ) : (
          <SignIn onSignIn={() => setIsAuthenticated(true)} />
        )}
      </main>
    </div>
  );
}

export default App;
