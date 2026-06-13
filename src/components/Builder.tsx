import React, { useState } from 'react';
import { Copy, Check, Heart, ExternalLink } from 'lucide-react';

interface BuilderProps {
  onPreview: (data: {
    recipientName: string;
    senderName: string;
    reason: string;
    message: string;
    offering: string;
  }) => void;
}

export const Builder: React.FC<BuilderProps> = ({ onPreview }) => {
  const [recipientName, setRecipientName] = useState('Sofia');
  const [senderName, setSenderName] = useState('Alex');
  const [reason, setReason] = useState('forgetting our dinner date');
  const [message, setMessage] = useState(
    "I am so sorry, my love. I got completely caught up with work and lost track of time. It was incredibly selfish of me, and I hate knowing that I disappointed you. I promise to make it up to you."
  );
  const [offering, setOffering] = useState('Candlelit dinner at your favorite restaurant 🕯️');
  const [copied, setCopied] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');

  const generateLink = () => {
    const data = {
      r: recipientName,
      s: senderName,
      re: reason,
      m: message,
      o: offering,
    };
    
    // Convert JSON to string and encode to base64
    const base64Data = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    const url = `${window.location.origin}${window.location.pathname}?d=${base64Data}`;
    setGeneratedUrl(url);
    
    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePreviewClick = () => {
    onPreview({
      recipientName,
      senderName,
      reason,
      message,
      offering,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 animate-fade-in relative z-20">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 md:p-8 border border-rose-200 shadow-xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-100 rounded-full mb-3 text-rose-600">
            <Heart className="w-6 h-6 fill-rose-100 animate-pulse-slow" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-rose-600 font-bold mb-1">
            Apology Card Generator
          </h2>
          <p className="text-slate-500 text-xs md:text-sm">
            Customize a romantic interactive letter for your fiancée and share the link!
          </p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Fiancée's Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Sofia"
                className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-white/70 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-700 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Alex"
                className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-white/70 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-700 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Reason (Brief)</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="forgetting our dinner date"
              className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-white/70 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-700 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Apology Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Write your custom apology here..."
              className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-white/70 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-700 font-medium text-sm leading-relaxed resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Peace Offering (The Reward!)</label>
            <input
              type="text"
              value={offering}
              onChange={(e) => setOffering(e.target.value)}
              placeholder="Dinner date, chocolate box, backrub..."
              className="w-full px-4 py-3 rounded-xl border border-rose-100 bg-white/70 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-700 font-medium"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handlePreviewClick}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-rose-400 hover:bg-rose-50 text-rose-600 font-bold py-3.5 px-6 rounded-full transition-all duration-200"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Preview Card</span>
          </button>
          
          <button
            onClick={generateLink}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3.5 px-6 rounded-full shadow-md shadow-rose-100 hover:shadow-rose-200 transition-all duration-200"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? 'Copied Link!' : 'Generate & Copy Link'}</span>
          </button>
        </div>

        {generatedUrl && (
          <div className="mt-6 p-4 bg-rose-50/50 border border-rose-100 rounded-2xl flex flex-col gap-2">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Shareable URL</span>
            <span className="text-xs text-slate-500 break-all font-mono bg-white/80 p-2.5 rounded-lg border border-rose-50">
              {generatedUrl}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
