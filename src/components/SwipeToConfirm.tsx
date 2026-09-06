import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Check, Lock, Sparkles } from 'lucide-react';

interface SwipeToConfirmProps {
  label: string;
  onConfirm: () => void;
  disabled?: boolean;
  colorScheme?: 'gold' | 'green';
}

export const SwipeToConfirm: React.FC<SwipeToConfirmProps> = ({
  label,
  onConfirm,
  disabled = false,
  colorScheme = 'gold'
}) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    if (disabled || isConfirmed) return;
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !trackRef.current || disabled || isConfirmed) return;

    const rect = trackRef.current.getBoundingClientRect();
    const handleWidth = 56;
    const maxDrag = rect.width - handleWidth;
    const currentDrag = Math.max(0, Math.min(clientX - rect.left - handleWidth / 2, maxDrag));

    setSliderPosition(currentDrag);

    // Trigger confirmation when threshold reached (90%)
    if (currentDrag >= maxDrag * 0.9) {
      setIsDragging(false);
      setSliderPosition(maxDrag);
      setIsConfirmed(true);

      // Trigger Web Haptic Vibration if supported
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([40, 60, 100]);
        } catch (e) {
          // ignore
        }
      }

      setTimeout(() => {
        onConfirm();
      }, 350);
    }
  };

  const handleEnd = () => {
    if (!isConfirmed) {
      setIsDragging(false);
      setSliderPosition(0);
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };
    const onTouchEnd = () => handleEnd();

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  const handleWidth = 56;
  const progressPercent = trackRef.current
    ? (sliderPosition / (trackRef.current.clientWidth - handleWidth)) * 100
    : 0;

  return (
    <div className="w-full select-none">
      <div
        ref={trackRef}
        className={`relative h-14 w-full rounded-2xl overflow-hidden flex items-center p-1.5 transition-colors border ${
          isConfirmed
            ? 'bg-emerald-950/80 border-emerald-500/80 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
            : 'bg-[#0B1B3A] border-[#263B5C]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {/* Fill Track Background behind the slider */}
        <div
          className={`absolute left-0 top-0 bottom-0 transition-all duration-75 ${
            isConfirmed
              ? 'bg-emerald-600/30'
              : 'bg-gradient-to-r from-[#FFD700]/20 via-[#FFD700]/30 to-[#FFE247]/40'
          }`}
          style={{ width: `${Math.max(sliderPosition + handleWidth / 2, 0)}px` }}
        />

        {/* Track Center Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-bold uppercase tracking-wider text-slate-300">
          {isConfirmed ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold animate-pulse">
              <Check className="w-4 h-4" /> Action Confirmed
            </span>
          ) : (
            <span
              className="transition-opacity duration-150"
              style={{ opacity: Math.max(0.2, 1 - progressPercent / 60) }}
            >
              {label}
            </span>
          )}
        </div>

        {/* Draggable Handle */}
        <div
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          style={{ transform: `translateX(${sliderPosition}px)` }}
          className={`relative z-10 w-12 h-11 rounded-xl flex items-center justify-center font-bold shadow-lg transition-transform duration-75 active:scale-95 ${
            isConfirmed
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(34,197,94,0.6)]'
              : 'bg-gradient-to-br from-[#FFE247] via-[#FFD700] to-[#D4AF37] text-[#071426] shadow-gold-sm hover:brightness-105'
          }`}
        >
          {isConfirmed ? (
            <Check className="w-5 h-5 stroke-[2.5]" />
          ) : (
            <div className="flex items-center">
              <ChevronRight className="w-5 h-5 -mr-1 animate-pulse" />
              <ChevronRight className="w-5 h-5 -ml-2 opacity-50" />
            </div>
          )}
        </div>
      </div>

      {/* Accessible fallback button for accessibility & quick desktop testing */}
      <button
        type="button"
        disabled={disabled || isConfirmed}
        onClick={() => {
          setIsConfirmed(true);
          onConfirm();
        }}
        className="w-full text-center text-[10px] text-slate-400 hover:text-[#FFD700] mt-1.5 transition-colors underline cursor-pointer"
      >
        Or click here to instantly confirm
      </button>
    </div>
  );
};
