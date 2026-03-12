export interface PredictionData {
  country: string;
  region: string;
  main_fruits_produced: string;
  production_rating: number;
  production_season: string;
  notes: string;
  detailed_production: Record<string, number>;
}

interface PredictionCardProps {
  data: PredictionData;
}

export default function PredictionCard({ data }: PredictionCardProps) {
  return (
    <div className="bg-white rounded-4xl p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-10 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <span className="text-3xl filter drop-shadow-sm">🌍</span>
             <h2 className="text-4xl font-black text-gray-900 tracking-tight">{data.country}</h2>
          </div>
          <p className="text-sm font-bold text-farming-primary uppercase tracking-[0.2em] ml-11">{data.region} / Territory Intelligence</p>
        </div>
        <div className="bg-linear-to-br from-farming-dark to-farming-primary p-1 rounded-2xl shadow-lg shadow-farming-primary/20">
          <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl flex items-center gap-4">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Yield<br/>Rating</span>
            <span className="text-4xl font-black text-farming-primary tracking-tighter">{data.production_rating}/10</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#F8FAF8] p-6 rounded-2xl border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <svg className="w-12 h-12 text-farming-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
          <h3 className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-4">Primary Cultivation</h3>
          <p className="text-gray-900 font-bold text-lg leading-snug">{data.main_fruits_produced}</p>
        </div>
        
        <div className="bg-[#F8FAF8] p-6 rounded-2xl border border-gray-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <svg className="w-12 h-12 text-farming-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
          </div>
          <h3 className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-4">Seasonal Cycle</h3>
          <p className="text-gray-900 font-bold text-lg leading-snug">{data.production_season}</p>
        </div>

        <div className="bg-linear-to-br from-farming-bg to-white p-6 rounded-2xl border border-farming-primary/10 shadow-inner md:col-span-1">
          <h3 className="text-[10px] uppercase tracking-widest font-black text-farming-primary mb-4">Strategic Insights</h3>
          <p className="text-gray-700 text-sm font-medium leading-relaxed italic">"{data.notes}"</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-gray-50 pb-4">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Production Volume Analysis</h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase border border-gray-200 rounded-full px-3 py-1">Metric: Metric Tonnes (t)</span>
        </div>
        
        {Object.keys(data.detailed_production).length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Object.entries(data.detailed_production).map(([fruit, amount], idx) => (
              <div 
                key={fruit} 
                className="group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-farming-primary to-farming-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300 pointer-events-none drop-shadow-sm">
                  {getFruitEmoji(fruit)}
                </div>
                <div className="space-y-1 relative z-10">
                  <div className="text-xs font-black text-gray-400 uppercase tracking-tighter truncate" title={fruit}>{fruit}</div>
                  <div className="text-lg font-black text-gray-900 tracking-tighter">
                    {amount >= 1000000 
                      ? `${(amount / 1000000).toFixed(1)}M` 
                      : amount.toLocaleString()}
                    <span className="text-[10px] ml-1 text-farming-primary">t</span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 text-6xl opacity-[0.03] pointer-events-none grayscale group-hover:grayscale-0 transition-all">
                   {getFruitEmoji(fruit)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 bg-gray-50 rounded-3xl text-center border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold italic">Detailed production metrics unavailable for this region.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getFruitEmoji(name: string) {
  const map: Record<string, string> = {
    'Mangoes': '🥭',
    'Bananas': '🍌',
    'Pineapple': '🍍',
    'Papaya': '🥭',
    'Watermelon': '🍉',
    'Citrus': '🍊',
    'Oranges': '🍊',
    'Grapes': '🍇',
    'Apples': '🍎',
    'Avocados': '🥑',
    'Pears': '🍐',
    'Berries': '🍓',
    'Strawberry': '🍓'
  };
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(map)) {
    if (lower.includes(key.toLowerCase())) return emoji;
  }
  return '🌱';
}
