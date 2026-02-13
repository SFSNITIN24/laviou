'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
  };

  return (
    <AppLayout 
      variant="auth"
      title="Reset Password"
      subtitle="Enter your email to receive password reset instructions."
      authSwitchText="Don't have an account? Sign up"
      authSwitchLink="/register"
      authLeftTitle="Home"
      authLeftLink="/"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Reset Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
        >
          Send Reset Instructions
        </button>
      </form>
    </AppLayout>
  );
}
