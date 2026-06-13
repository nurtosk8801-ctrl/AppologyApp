import React, { useState } from 'react';
import { MailOpen, Heart } from 'lucide-react';

interface EnvelopeProps {
  recipientName: string;
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ recipientName, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPulled, setIsPulled] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // After flap opens, pull letter out
    setTimeout(() => {
      setIsPulled(true);
      // Let the full transition complete before telling parent to switch view
      setTimeout(() => {
        onOpen();
      }, 1000);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="font-serif text-3xl md:text-4xl text-rose-600 font-bold mb-2">
          Hello {recipientName || 'My Love'}
        </h1>
        <p className="text-rose-500 font-medium text-sm md:text-base tracking-wide max-w-md mx-auto">
          You have a special letter waiting for you. Click the seal to open it.
        </p>
      </div>

      <div 
        onClick={handleOpen}
        className={`envelope-wrapper relative ${isOpen ? 'cursor-default' : 'cursor-pointer'} transform hover:scale-105 active:scale-95 transition-transform duration-300`}
      >
        {/* Back Flap (behind the letter) */}
        <div className="envelope-back"></div>

        {/* The Letter (slides up) */}
        <div className={`envelope-letter flex flex-col justify-center items-center ${isPulled ? 'pull-out' : ''}`}>
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500 animate-pulse-slow mb-2" />
          <p className="font-serif italic text-rose-700 text-center font-bold text-lg">My Apology</p>
          <div className="w-16 h-[2px] bg-rose-200 my-2"></div>
          <p className="text-xs text-rose-500 font-semibold tracking-wider uppercase">Open Letter</p>
        </div>

        {/* Flap (covers the top) */}
        <div className={`envelope-flap ${isOpen ? 'open' : ''}`}></div>

        {/* Front of Envelope (forms the pocket) */}
        <div className="envelope-front"></div>

        {/* Wax Seal (breaks when clicked) */}
        {!isPulled && (
          <div 
            className={`wax-seal flex items-center justify-center ${isOpen ? 'opacity-0 scale-75' : 'opacity-100'} transition-all duration-300`}
          ></div>
        )}
      </div>

      <div className="mt-12 flex items-center gap-2 text-rose-400 font-semibold text-sm animate-pulse">
        <MailOpen className="w-5 h-5" />
        <span>Click the wax seal to open</span>
      </div>
    </div>
  );
};
