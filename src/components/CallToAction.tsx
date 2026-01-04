import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Loader2, Calendar } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ENV_CONFIG } from '../config/env';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    { value: 'fleet_ops', label: 'Fleet Operator', icon: '🚛' },
    { value: 'fleet_manager', label: 'Fleet Manager', icon: '📊' },
    { value: 'logistics', label: 'Logistics Company', icon: '📦' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !userType) return;

    setIsLoading(true);

    const adminTemplateParams = {
      to_email: ENV_CONFIG.COMPANY.EMAIL,
      user_email: email,
      user_type: userType,
    };

    try {
      // Prepare parallel tasks: admin email, user confirmation email, Google Sheets append
      const adminEmailPromise = emailjs.send(
        ENV_CONFIG.EMAILJS.SERVICE_ID_CTA,
        ENV_CONFIG.EMAILJS.TEMPLATES.ADMIN,
        adminTemplateParams,
        ENV_CONFIG.EMAILJS.PUBLIC_KEYS.CTA
      );

      const userEmailPromise = emailjs.send(
        ENV_CONFIG.EMAILJS.SERVICE_ID_CTA,
        ENV_CONFIG.EMAILJS.TEMPLATES.USER_CONFIRMATION,
        { to_email: email, user_type: userType },
        ENV_CONFIG.EMAILJS.PUBLIC_KEYS.CTA
      );

      const sheetUrl = ENV_CONFIG.GOOGLE_SHEETS_URL;
      const sheetPromise = sheetUrl
        ? fetch(sheetUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: new URLSearchParams({
              email,
              user_type: userType,
              timestamp: new Date().toISOString(),
            }),
            keepalive: true,
          }).catch(() => undefined)
        : Promise.resolve(undefined);

      await Promise.all([adminEmailPromise, userEmailPromise, sheetPromise]);

      setIsSubmitted(true);
      setEmail('');
      setUserType('');
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      console.error('FAILED...', err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <pattern id="ctaPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="currentColor" className="text-white"/>
              <circle cx="0" cy="25" r="1" fill="currentColor" className="text-white"/>
              <circle cx="25" cy="0" r="1" fill="currentColor" className="text-white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaPattern)"/>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="text-white">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            
            <h2 id="cta-heading" className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Request a Demo
            </h2>
            
            <div className="w-24 h-1 bg-emerald-300 mx-auto mb-6 rounded-full"></div>
            
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              See how Zylectra predicts battery failures weeks in advance. Watch which batteries will fail, why they fail, and exactly what to do today to prevent it with clear cost savings attached to every decision.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl mx-auto border border-white/20 shadow-2xl">
            <div className="space-y-6" onSubmit={handleSubmit}>
              
              {/* User Type Selection */}
              <div>
                <label className="block text-left text-emerald-100 font-semibold mb-3 text-lg">
                  I am a:
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {userTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        userType === type.value
                          ? 'bg-white text-emerald-700 shadow-xl'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      } rounded-2xl p-4 border-2 ${
                        userType === type.value ? 'border-white' : 'border-transparent'
                      }`}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={type.value}
                        checked={userType === type.value}
                        onChange={(e) => setUserType(e.target.value)}
                        className="sr-only"
                        required
                      />
                      <div className="text-center">
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <div className="font-semibold text-sm leading-tight">
                          {type.label}
                        </div>
                      </div>
                      {userType === type.value && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-left text-emerald-100 font-semibold mb-3 text-lg">
                  Email Address:
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-14 pr-4 py-4 rounded-2xl text-gray-900 bg-white border-0 focus:ring-4 focus:ring-emerald-300 outline-none text-lg placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitted || isLoading}
                className="w-full bg-white text-emerald-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Scheduling Demo...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span>Demo Request Received!</span>
                  </>
                ) : (
                  <>
                    <span>Request a Demo</span>
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-12">
            <p className="text-emerald-200 mb-6 text-lg">What you'll see in the demo:</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-1">Failure Predictions</h4>
                  <p className="text-emerald-200 text-sm">See which batteries will fail weeks in advance</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-1">Root Cause Analysis</h4>
                  <p className="text-emerald-200 text-sm">Understand exactly why each failure will occur</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-1">Cost Savings Breakdown</h4>
                  <p className="text-emerald-200 text-sm">See exactly how much you'll save with each action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;