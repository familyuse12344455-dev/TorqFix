import React, { useState } from 'react';
import { X, Phone, KeyRound, ShieldCheck, Sparkles, UserCheck, ArrowRight } from 'lucide-react';
import { User } from '@shared/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState<string>('+923001234567');
  const [devOtpCode, setDevOtpCode] = useState<string>('769123');
  const [inputOtp, setInputOtp] = useState<string>('');
  const [name, setName] = useState<string>('Hamza Khan');
  const [city, setCity] = useState<string>('Islamabad');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setDevOtpCode(data.devOtp || '769123');
      setStep('otp');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          otp: inputOtp,
          name,
          role: 'customer'
        })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid OTP code');
      }

      onLoginSuccess(data.user, data.token);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#071426] border border-[#263B5C] rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#0B1B3A] to-[#102445] border-b border-[#263B5C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/20 border border-[#FFD700]/50 flex items-center justify-center text-[#FFD700]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white font-display">
                Torqfix Customer Access
              </h3>
              <p className="text-xs text-[#D4AF37]">Pakistan Phone Authentication</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#102445] text-slate-400 hover:text-white flex items-center justify-center border border-[#263B5C]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Development Mode Notice Banner */}
        <div className="bg-[#FFD700]/10 border-b border-[#FFD700]/20 px-5 py-2 flex items-center gap-2 text-xs text-[#FFD700]">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span>Dev Simulation Mode: Real SMS disabled. Test code provided.</span>
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs">
              {error}
            </div>
          )}

          {/* STEP 1: Phone Number */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">
                  Pakistani Mobile Number:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-bold text-[#FFD700] font-mono">
                    🇵🇰
                  </span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+92 300 1234567 or 03001234567"
                    className="w-full pl-10 pr-3 py-3 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] text-xs text-white font-mono focus:outline-none focus:border-[#FFD700]"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Enter your Jazz, Zong, Telenor, or Ufone number.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold py-3 rounded-2xl text-xs font-bold shadow-gold-sm flex items-center justify-center gap-2"
              >
                {loading ? 'Sending Dev OTP...' : 'Get Instant Verification Code'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {/* Highlighted Dev OTP Code Box */}
              <div className="p-4 rounded-2xl bg-[#102445] border border-[#FFD700]/50 text-center space-y-2 shadow-gold-sm">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Simulated Development OTP Code
                </div>
                <div className="text-3xl font-black font-mono tracking-widest text-[#FFD700]">
                  {devOtpCode}
                </div>
                <button
                  type="button"
                  onClick={() => setInputOtp(devOtpCode)}
                  className="text-xs text-[#FFD700] underline hover:text-white font-semibold"
                >
                  ⚡ Click to Auto-Fill Test OTP
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 mb-1.5 block">
                  Enter 6-Digit OTP:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={inputOtp}
                  onChange={(e) => setInputOtp(e.target.value)}
                  placeholder="769123"
                  className="w-full text-center py-3 rounded-2xl bg-[#0B1B3A] border border-[#263B5C] text-lg font-mono font-bold tracking-widest text-white focus:outline-none focus:border-[#FFD700]"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="flex-1 py-2.5 rounded-xl bg-[#102445] text-xs font-bold text-slate-300 border border-[#263B5C]"
                >
                  Change Number
                </button>
                <button
                  type="submit"
                  disabled={loading || inputOtp.length < 6}
                  className="flex-1 btn-gold py-2.5 rounded-xl text-xs font-bold shadow-gold-sm disabled:opacity-40"
                >
                  {loading ? 'Verifying...' : 'Verify & Enter'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
