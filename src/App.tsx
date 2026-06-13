import { useState, useEffect } from 'react';
import { Envelope } from './components/Envelope';
import { ApologyCard } from './components/ApologyCard';
import { Celebration } from './components/Celebration';
import { Builder } from './components/Builder';
import { Heart, RotateCcw } from 'lucide-react';

interface CardData {
  recipientName: string;
  senderName: string;
  reason: string;
  message: string;
  offering: string;
}

type ViewState = 'builder' | 'envelope' | 'card' | 'celebration';

function App() {
  const [view, setViewState] = useState<ViewState>('builder');
  const [isPreview, setIsPreview] = useState(false);
  const [cardData, setCardData] = useState<CardData>({
    recipientName: '',
    senderName: '',
    reason: '',
    message: '',
    offering: '',
  });

  // Decode URL parameters on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('d');

    if (encodedData) {
      try {
        // Decode base64 data
        const decodedString = decodeURIComponent(escape(atob(encodedData)));
        const data = JSON.parse(decodedString);
        
        setCardData({
          recipientName: data.r || '',
          senderName: data.s || '',
          reason: data.re || '',
          message: data.m || '',
          offering: data.o || '',
        });
        setViewState('envelope');
        setIsPreview(false);
      } catch (e) {
        console.error('Failed to parse encoded card data', e);
        setViewState('builder');
      }
    }
  }, []);

  const handlePreview = (previewData: CardData) => {
    setCardData(previewData);
    setViewState('envelope');
    setIsPreview(true);
  };

  const handleBackToBuilder = () => {
    setViewState('builder');
  };

  return (
    <div className="relative min-h-screen pb-16 flex flex-col justify-between">
      
      {/* Decorative top header bar */}
      <header className="py-4 px-6 relative z-30 flex justify-between items-center bg-white/40 backdrop-blur-sm border-b border-rose-100/30">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="font-serif italic font-bold text-rose-600 tracking-wider">For You</span>
        </div>
        {view !== 'builder' && isPreview && (
          <button
            onClick={handleBackToBuilder}
            className="flex items-center gap-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-600 font-semibold px-4.5 py-1.5 rounded-full text-xs transition duration-200 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Back to Builder</span>
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center">
        {view === 'builder' && (
          <Builder onPreview={handlePreview} />
        )}
        {view === 'envelope' && (
          <Envelope 
            recipientName={cardData.recipientName} 
            onOpen={() => setViewState('card')} 
          />
        )}
        {view === 'card' && (
          <ApologyCard
            recipientName={cardData.recipientName}
            senderName={cardData.senderName}
            reason={cardData.reason}
            message={cardData.message}
            onForgiven={() => setViewState('celebration')}
          />
        )}
        {view === 'celebration' && (
          <Celebration
            recipientName={cardData.recipientName}
            senderName={cardData.senderName}
            offering={cardData.offering}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 relative z-30 text-xs text-rose-400 font-medium">
        {view !== 'builder' && !isPreview && (
          <div className="mb-4">
            <a
              href={window.location.origin + window.location.pathname}
              className="inline-flex items-center gap-1 bg-rose-100 hover:bg-rose-200 text-rose-700 px-4 py-2 rounded-full font-semibold transition"
            >
              <span>Create Your Own Apology Card 💖</span>
            </a>
          </div>
        )}
        <p>© {new Date().getFullYear()} Made with ❤️ for your special someone</p>
      </footer>
    </div>
  );
}

export default App;
