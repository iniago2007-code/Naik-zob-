import React, { useState, useEffect } from 'react';
import PredictionCard from './PredictionCard';
import type { PredictionData } from './PredictionCard';

interface DashboardProps {
  onSignOut: () => void;
}

interface AgriculturalData {
  country: string;
  region: string;
  main_fruits_produced: string;
  production_rating: number;
  production_season: string;
  notes: string;
  detailed_production: Record<string, number>;
}

export default function Dashboard({ onSignOut }: DashboardProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allData, setAllData] = useState<Record<string, AgriculturalData>>({});
  const [result, setResult] = useState<PredictionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countriesRes, dataRes] = await Promise.all([
          fetch('/data/countries.json'),
          fetch('/data/fruit_data.json')
        ]);

        if (!countriesRes.ok || !dataRes.ok) {
          throw new Error('Failed to fetch agricultural data');
        }

        const [countriesData, agriculturalData]: [string[], Record<string, AgriculturalData>] = await Promise.all([
          countriesRes.json(),
          dataRes.json()
        ]);

        setCountries(countriesData.sort());
        setAllData(agriculturalData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to initialize territory intelligence. Using fallback list.');
        setCountries(['Nigeria', 'Ghana', 'South Africa', 'Kenya', 'Ethiopia']);
      } finally {
        setIsLoadingCountries(false);
      }
    };
    fetchData();
  }, []);

  const handlePredict = async (countryName: string) => {
    if (!countryName) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const countryData = allData[countryName];
    
    if (countryData) {
      setResult(countryData);
    } else {
      setError(`Data trace for "${countryName}" not found in our current model.`);
    }
    setIsLoading(false);
  };

  const onCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedCountry(val);
    if (val) {
      handlePredict(val);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#FAFBFA]">
      {/* Top Navbar */}
      <header className="w-full bg-white/70 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-default">
            <div className="w-10 h-10 bg-linear-to-tr from-farming-primary to-farming-accent rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <span className="text-white text-xl">🌾</span>
            </div>
            <div>
              <span className="font-black text-2xl text-farming-dark tracking-tighter block leading-none">AgriPredict</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Intelligence Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-farming-light flex items-center justify-center border border-farming-primary/20">
                <span className="text-xs font-bold text-farming-primary">AS</span>
              </div>
              <div className="text-xs">
                <p className="font-bold text-gray-900 leading-none">Senior Analyst</p>
                <p className="text-gray-400 mt-0.5">Verified Access</p>
              </div>
            </div>
            <button 
              onClick={onSignOut}
              className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-red-50"
            >
              <span>Sign Out</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 lg:py-20">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-farming-primary/10 border border-farming-primary/20 text-farming-primary text-xs font-bold uppercase tracking-widest animate-fade-in">
            Regional Analysis Engine v4.0.2
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Agricultural <span className="text-transparent bg-clip-text bg-linear-to-r from-farming-primary to-farming-accent">Yield Prediction</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Select a territory to analyze regional production capacities across the African continent.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-20 group">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
              <svg className="h-6 w-6 text-gray-300 group-hover:text-farming-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <select
              value={selectedCountry}
              onChange={onCountryChange}
              disabled={isLoadingCountries}
              className="block w-full pl-16 pr-10 py-6 rounded-3xl border-0 ring-1 ring-gray-200 bg-white shadow-2xl shadow-gray-200/50 focus:ring-4 focus:ring-farming-primary/10 transition-all outline-none text-gray-800 text-xl font-black appearance-none cursor-pointer disabled:opacity-50"
            >
              <option value="" disabled>{isLoadingCountries ? 'Loading Intelligence...' : 'Select Target Territory'}</option>
              {countries.map(c => (
                <option key={c} value={c} className="font-bold py-2">{c}</option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400 group-hover:text-farming-primary transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Quick suggestions */}
          <div className="flex items-center gap-4 mt-8 px-4">
            <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">Priority Segments</span>
            <div className="flex flex-wrap gap-2">
              {['Nigeria', 'Ghana', 'South Africa'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(c);
                    handlePredict(c);
                  }}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-tight border transition-all shadow-sm ${
                    selectedCountry === c 
                    ? 'bg-farming-primary border-farming-primary text-white scale-110 shadow-lg shadow-farming-primary/20' 
                    : 'bg-white border-gray-100 text-gray-500 hover:border-farming-primary hover:text-farming-primary hover:bg-farming-primary/5'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="min-h-[500px] relative">
          {error && (
            <div className="glass-card rounded-3xl p-8 border-l-8 border-l-red-500 max-w-2xl mx-auto flex items-start gap-6 animate-fade-in shadow-xl">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-2xl shrink-0">⚠️</div>
              <div>
                <h3 className="text-red-900 font-black text-lg uppercase tracking-tight">System Notification</h3>
                <p className="text-gray-600 mt-1 font-medium leading-relaxed">{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="mt-4 text-sm font-bold text-red-600 hover:text-red-800 transition-colors"
                >
                  Dismiss error
                </button>
              </div>
            </div>
          )}

          {isLoading && !error && (
            <div className="flex flex-col items-center justify-center py-24 space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-farming-primary/10 border-t-farming-primary rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-2xl">🌱</div>
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-gray-800 tracking-tight">Accessing ML Data Repository</p>
                <p className="text-gray-400 font-medium">Synthesizing regional yield metrics...</p>
              </div>
            </div>
          )}

          {result && !isLoading && !error && (
             <div className="animate-fade-in-up">
               <PredictionCard data={result} />
             </div>
          )}
          
          {!result && !isLoading && !error && (
            <div className="flex flex-col items-center justify-center py-32 opacity-20 filter grayscale">
              <div className="text-8xl mb-6">📉</div>
              <p className="text-2xl font-black text-farming-dark tracking-tighter uppercase italic">No Active Analysis</p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full py-12 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Enterprise Intelligence Solution</p>
          <div className="flex items-center justify-center gap-8 grayscale opacity-50 mb-8">
            <span className="font-black text-gray-700">AGRI-CORP</span>
            <span className="font-black text-gray-700">DATA-MATRICS</span>
            <span className="font-black text-gray-700">BIO-TECH</span>
          </div>
          <p className="text-xs text-gray-400 font-medium">Powered by AgriPredict ML Core v4.0.2</p>
        </div>
      </footer>
    </div>
  );
}
