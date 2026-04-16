import React, { useState } from 'react';
import { type Theme } from '../../types/index';

interface DisclaimerProps {
  theme: Theme;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isDarkMode = theme === 'dark';

  return (
    <div className={`rounded-xl mb-6 overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 flex items-center justify-between ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">Important Notes & Disclaimers</span>
        </div>
        <svg 
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className={`px-6 pb-4 space-y-2 text-[16px] ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <ul className="list-disc list-inside space-y-1">
            <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
            <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
            <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
            <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
            <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
          </ul>
        </div>
      )}
    </div>
  );
};