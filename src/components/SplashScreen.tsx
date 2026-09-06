import React, { useEffect, useState } from 'react';
import { Shield, Wrench, Sparkles, ChevronRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#071426] text-white p-6 overflow-hidden select-none">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-[#102445]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Tag */}
      <div className="w-full flex justify-between items-center max-w-md pt-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-ping" />
          <span className="text-xs tracking-widest text-[#D4AF37] uppercase font-bold">
            PAKISTAN'S AUTOMOTIVE CONCIERGE
          </span>
        </div>
        <button
          onClick={onComplete}
          className="text-xs text-slate-400 hover:text-[#FFD700] flex items-center gap-1 transition-colors px-2 py-1 rounded bg-[#102445]/50 border border-[#263B5C]"
        >
          Skip <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Center Brand Hero */}
      <div className="flex flex-col items-center text-center my-auto max-w-sm">
        {/* Animated Brand Crest */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0B1B3A] to-[#102445] border-2 border-[#FFD700]/60 flex items-center justify-center shadow-gold-glow relative z-10">
            <div className="relative">
              <Wrench className="w-12 h-12 text-[#FFD700] transform -rotate-12" />
              <Shield className="w-7 h-7 text-[#D4AF37] absolute -bottom-1 -right-1" />
            </div>
          </div>
          {/* Animated decorative rings */}
          <div className="absolute -inset-3 rounded-3xl border border-[#FFD700]/30 animate-pulse" />
          <div className="absolute -inset-6 rounded-3xl border border-[#FFD700]/10" />
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-extrabold tracking-wider font-display text-white mb-2">
          TORQ<span className="text-[#FFD700]">FIX</span>
        </h1>

        {/* Tagline */}
        <p className="text-[#D4AF37] font-medium text-sm tracking-wide mb-3">
          Premium Car Care, Picked Up & Delivered.
        </p>

        {/* City Coverage Badges */}
        <div className="flex items-center gap-2 mt-2">
          {['Islamabad', 'Lahore', 'Karachi', 'Rawalpindi'].map((city) => (
            <span
              key={city}
              className="text-[10px] px-2 py-0.5 rounded-full bg-[#102445] text-slate-300 border border-[#263B5C]"
            >
              {city}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full max-w-xs mb-8 flex flex-col items-center">
        <div className="w-full bg-[#102445] h-1.5 rounded-full overflow-hidden border border-[#263B5C] mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#FFE247] rounded-full transition-all duration-100 ease-out shadow-gold-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[11px] text-slate-400 font-mono">
          <span>Initializing Workshop Bays...</span>
          <span className="text-[#FFD700]">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
