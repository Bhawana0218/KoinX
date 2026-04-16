import React, { useState, useRef, useEffect } from 'react';
import { type Theme } from '../../types/index';

interface TooltipProps {
  theme: Theme;
}

export const Tooltip: React.FC<TooltipProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTooltip = () => setIsVisible(!isVisible);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close tooltip on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const isDarkMode = theme === 'dark';

  return (
    <div className="relative inline-block">
      {/* How it works? Link */}
      <button
        ref={buttonRef}
        onClick={toggleTooltip}
        className={`text-sm font-medium underline underline-offset-2 transition-colors duration-200 ${
          isDarkMode
            ? 'text-blue-400 hover:text-blue-300'
            : 'text-blue-600 hover:text-blue-700'
        }`}
        aria-expanded={isVisible}
        aria-haspopup="true"
      >
        How it works?
      </button>

      {/* Tooltip Content */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 w-80 mt-2 rounded-xl shadow-2xl
            transform transition-all duration-200 ease-out
            ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
            animate-fade-in
          `}
          style={{
            top: '100%',
            left: '0',
            marginTop: '8px',
          }}
        >
          {/* Tooltip Arrow */}
          <div
            className={`
              absolute w-4 h-4 transform rotate-45
              ${isDarkMode ? 'bg-gray-800 border-t border-l border-gray-700' : 'bg-white border-t border-l border-gray-200'}
            `}
            style={{
              top: '-8px',
              left: '20px',
            }}
          />

          {/* Tooltip Content */}
          <div className="p-4">
            <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>See your capital gains for FY 2024-25 in the left card</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Check boxes for assets you plan on selling to reduce your tax liability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Instantly see your updated tax liability in the right card</span>
              </li>
            </ul>

            {/* Pro Tip Section */}
            <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Pro tip:
              </p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Experiment with different combinations of your holdings to optimize your tax liability
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for mobile */}
      {isVisible && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsVisible(false)}
        />
      )}
    </div>
  );
};