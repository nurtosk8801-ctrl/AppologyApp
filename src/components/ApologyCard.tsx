import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';

interface ApologyCardProps {
  recipientName: string;
  senderName: string;
  reason: string;
  message: string;
  onForgiven: () => void;
}

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
}

export const ApologyCard: React.FC<ApologyCardProps> = ({
  recipientName,
  senderName,
  reason,
  message,
  onForgiven,
}) => {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonText, setNoButtonText] = useState('No');
  const [petals, setPetals] = useState<Petal[]>([]);
  const [showHug, setShowHug] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate initial falling petals
  useEffect(() => {
    generatePetals(15);
  }, []);

  const generatePetals = (count: number) => {
    const emojis = ['🌹', '❤️', '🌸', '💖', '✨'];
    const newPetals = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100, // percentage from left
      delay: Math.random() * 5, // start delay
      duration: 6 + Math.random() * 6, // fall speed
      size: 16 + Math.random() * 20, // font size
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setPetals((prev) => [...prev, ...newPetals].slice(-50)); // limit active to 50
  };

  const handleShowerRoses = () => {
    generatePetals(25);
  };

  const handleVirtualHug = () => {
    setShowHug(true);
    setTimeout(() => setShowHug(false), 2000);
  };

  const getPleadingText = (count: number) => {
    const texts = [
      'No',
      'Are you sure? 🥺',
      'Think again! 😭',
      'But I brought chocolates! 🍫',
      'Pretty please? 🥺',
      'I promise to do the dishes! 🧼',
      'And rub your shoulders! 💆‍♀️',
      'How about a dinner date? 🍽️',
      'I love you too much for No! ❤️',
      'No is disabled! 😉',
      'Just click YES! 😘',
    ];
    return texts[Math.min(count, texts.length - 1)];
  };

  const handleNoHover = () => {
    if (!containerRef.current) return;
    
    // Increment count and set next text
    const nextCount = noCount + 1;
    setNoCount(nextCount);
    setNoButtonText(getPleadingText(nextCount));

    // Get boundaries of card container to ensure it stays visible but runs away
    const rect = containerRef.current.getBoundingClientRect();
    
    // Button width/height is roughly 120px by 45px
    // Keep it safely inside container bounds
    const maxX = rect.width / 2 - 80;
    const maxY = rect.height / 2 - 50;
    const minX = -rect.width / 2 + 80;
    const minY = -rect.height / 2 + 50;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    setNoButtonPos({ x: randomX, y: randomY });
  };

  // Yes button style scales up based on noCount
  const yesScale = 1 + noCount * 0.18;
  const yesStyle = {
    transform: `scale(${yesScale})`,
    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl px-4 py-8 mx-auto min-h-[85vh] flex flex-col justify-center items-center overflow-hidden z-20">
      {/* Falling petals container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="petal"
            style={{
              left: `${petal.x}%`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              fontSize: `${petal.size}px`,
            }}
          >
            {petal.emoji}
          </span>
        ))}
      </div>

      {/* Floating Virtual Hug Overlay */}
      {showHug && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 animate-bounce-slow">
          <div className="bg-white/90 border-2 border-rose-300 rounded-full p-8 shadow-2xl flex flex-col items-center gap-2">
            <span className="text-7xl">🤗</span>
            <span className="font-serif text-lg text-rose-600 font-bold">Virtual Hug Sent!</span>
          </div>
        </div>
      )}

      {/* Main Apology Letter Card */}
      <div className="glass-panel w-full rounded-3xl p-6 md:p-10 relative z-10 border border-rose-200 shadow-xl flex flex-col justify-between">
        
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 text-rose-300">
          <Heart className="w-6 h-6 fill-rose-100" />
        </div>
        <div className="absolute top-4 right-4 text-rose-300">
          <Heart className="w-6 h-6 fill-rose-100" />
        </div>

        {/* Letter Content */}
        <div className="mb-8 font-serif">
          <h2 className="text-2xl md:text-3xl text-rose-600 font-bold border-b border-rose-100 pb-3 mb-6 italic">
            Dearest {recipientName || 'Fiancée'},
          </h2>
          
          <div className="space-y-4 text-slate-700 text-base md:text-lg leading-relaxed font-sans">
            {reason && (
              <div className="mb-4 bg-rose-50/50 border-l-4 border-rose-400 p-4 rounded-r-xl">
                <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block mb-1">Concerning</span>
                <span className="font-medium text-slate-800">{reason}</span>
              </div>
            )}
            <p className="whitespace-pre-line text-slate-600 italic">
              {message || "I am incredibly sorry for what happened. You mean the absolute world to me, and the last thing I ever want to do is hurt you or cause you distress. I hope you can find it in your beautiful heart to forgive me."}
            </p>
          </div>

          <div className="text-right mt-8">
            <p className="text-rose-400 text-xs uppercase tracking-wider">With all my love,</p>
            <p className="font-serif text-xl md:text-2xl text-rose-700 font-bold italic mt-1">{senderName || 'Your Love'}</p>
          </div>
        </div>

        {/* Interactive Interaction Tokens */}
        <div className="flex gap-4 justify-center mb-8 border-t border-rose-100/50 pt-6">
          <button
            onClick={handleShowerRoses}
            className="flex items-center gap-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-semibold px-4 py-2 rounded-full text-sm transition-colors duration-200"
          >
            <span>🌹 Shower with Roses</span>
          </button>
          <button
            onClick={handleVirtualHug}
            className="flex items-center gap-1.5 bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold px-4 py-2 rounded-full text-sm transition-colors duration-200"
          >
            <span>🤗 Send a Hug</span>
          </button>
        </div>

        {/* Decision Area */}
        <div className="flex flex-col items-center gap-6 relative min-h-[140px] justify-center">
          <p className="font-serif text-xl text-rose-600 font-bold text-center">Will you forgive me?</p>
          
          <div className="flex items-center justify-center gap-8 w-full relative">
            {/* YES BUTTON */}
            <button
              onClick={onForgiven}
              style={yesStyle}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-md shadow-emerald-100 hover:shadow-emerald-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-base z-30"
            >
              Yes! ❤️
            </button>

            {/* NO BUTTON (RUNAWAY) */}
            <button
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
              style={{
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                transition: 'all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              className="bg-rose-100 hover:bg-rose-200 text-rose-600 font-semibold py-3 px-6 rounded-full border border-rose-200 transition-colors duration-200 text-sm absolute z-40 whitespace-nowrap min-w-[80px]"
            >
              {noButtonText}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
