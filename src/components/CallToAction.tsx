import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Loader2 } from 'lucide-react';
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
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h2 id="cta-heading" className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Get Early Access to 
              <span className="block text-emerald-200 mt-2">Zylectra</span>
            </h2>
            
            <div className="w-24 h-1 bg-emerald-300 mx-auto mb-6 rounded-full"></div>
            
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Join the first fleet operators to predict battery failures weeks in advance. Know why they fail. Act today. Save thousands.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-2xl mx-auto border border-white/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
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
                type="submit"
                disabled={isSubmitted || isLoading}
                className="w-full bg-white text-emerald-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span>Successfully Added!</span>
                  </>
                ) : (
                  <>
                    <span>Request Early Access</span>
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Benefits */}
          <div className="mt-12">
            <p className="text-emerald-200 mb-6 text-lg">What you'll get:</p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-1">No Spam Policy</h4>
                  <p className="text-emerald-200 text-sm">Only important updates</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-1">Exclusive Updates</h4>
                  <p className="text-emerald-200 text-sm">Behind-the-scenes insights</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-white mb-1">Early Access Perks</h4>
                  <p className="text-emerald-200 text-sm">First to experience Zylectra</p>
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