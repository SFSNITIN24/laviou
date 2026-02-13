'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Image from 'next/image';
import { images } from '@/constants/images';

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value[0] || '';
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('OTP Submitted:', otp.join(''));
    // Handle OTP verification logic here
  };

  return (
    <AppLayout 
      variant="auth"
      title="OTP Verification"
      subtitle="Please enter 6-digit OTP sent to debbie.baker@example.com"
      authSwitchText="Don't have an account? Sign up"
      authSwitchLink="/register"
      authLeftTitle="← Home"
      authLeftLink="/"
    >
      <div className="flex flex-col items-center justify-center mb-8">
        <Image
          src={images.logo}
          alt="Laviou Logo"
          width={64}
          height={64}
          className="mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">OTP Verification</h2>
        <p className="text-gray-600 text-center">Please enter 6-digit OTP sent to debbie.baker@example.com</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        {/* Resend Code Link */}
        <div className="text-center">
          <button type="button" className="text-green-600 hover:underline">
            Resend Code
          </button>
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
        >
          Verify
        </button>
      </form>
    </AppLayout>
  );
}
