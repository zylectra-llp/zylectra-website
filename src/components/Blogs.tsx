import React from "react";
import { BookOpen, Clock, X } from "lucide-react";

interface ComingSoonPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonPopup: React.FC<ComingSoonPopupProps> = ({ isOpen, onClose }) => {
  // Prevent body scroll when popup is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed z-[9999] flex items-center justify-center p-4" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        height: '100vh',
        width: '100vw'
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      ></div>
      
      {/* Popup */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full transform animate-popup" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Content */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Zylectra Blog
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            We're working on something amazing for you.
          </p>
          
          {/* Launch Date */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-2 border-emerald-200 rounded-2xl">
            <Clock className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold text-gray-800">Launching In Feb 2026</span>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes popup {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-popup {
          animation: popup 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ComingSoonPopup;