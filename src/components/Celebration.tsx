import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send } from 'lucide-react';

interface CelebrationProps {
  recipientName: string;
  senderName: string;
  offering: string;
}

export const Celebration: React.FC<CelebrationProps> = ({
  recipientName,
  senderName,
  offering,
}) => {
  useEffect(() => {
    // Immediate confetti blast
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, animate a bit higher than they would
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleShareForgiveness = () => {
    const message = `Hey ${senderName}, I saw your apology and I forgive you! ❤️ Ready for my ${offering || 'peace offering'}!`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-fade-in relative z-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex justify-center items-center">
        {/* Floating large hearts in background */}
        <div className="w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow delay-75"></div>
      </div>

      <div className="glass-panel-dark max-w-lg w-full rounded-3xl p-8 md:p-12 text-center relative z-10 border-2 border-rose-300">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 scale-125 bg-rose-200 rounded-full animate-ping opacity-30"></div>
          <div className="w-20 h-20 bg-gradient-to-tr from-rose-500 to-pink-400 rounded-full flex items-center justify-center shadow-lg relative">
            <Heart className="w-10 h-10 text-white fill-white animate-heartbeat" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin" />
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-rose-600 font-bold mb-4">
          Yay! Forgiven! ❤️
        </h1>
        
        <p className="font-sans text-rose-500 font-medium text-lg mb-6 tracking-wide">
          Thank you, {recipientName}! You have made {senderName} the happiest person ever!
        </p>

        <div className="bg-white/80 border border-rose-100 rounded-2xl p-6 mb-8 shadow-sm">
          <p className="text-slate-600 text-sm font-medium uppercase tracking-wider mb-2">Your Peace Offering is Unlocked 🎁</p>
          <p className="font-serif text-2xl text-rose-700 font-bold italic">
            {offering || "Endless Hugs & Kisses"}
          </p>
          <p className="text-slate-400 text-xs mt-2 italic">
            {senderName} is legally obligated to fulfill this offering immediately.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleShareForgiveness}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-base"
          >
            <Send className="w-5 h-5" />
            <span>Tell {senderName} on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
