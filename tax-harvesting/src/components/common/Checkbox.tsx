import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  onChange, 
  indeterminate = false,
  className = '' 
}) => {
  return (
    <label className={`relative flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className={`
        w-5 h-5 border-2 rounded transition-all duration-200
        flex items-center justify-center
        ${indeterminate && !checked ? 'bg-blue-500 border-blue-500' : ''}
        ${checked ? 'bg-blue-500 border-blue-500' : 'border-gray-400 dark:border-gray-500'}
        peer-hover:border-blue-400
      `}>
        {checked && (
          <svg 
            className="w-3.5 h-3.5 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        )}
        {indeterminate && !checked && (
          <div className="w-2.5 h-0.5 bg-white rounded" />
        )}
      </div>
    </label>
  );
};