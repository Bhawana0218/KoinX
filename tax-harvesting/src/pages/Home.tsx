import React, { useState, useEffect } from 'react';
import { type Theme } from '../types/index';
import { PreHarvestCard } from '../components/cards/PreHarvestCard';
import { PostHarvestCard } from '../components/cards/PostHarvestCard';
import { HoldingsTable } from '../components/table/HoldingsTable';
import { Disclaimer } from '../components/common/Disclaimer';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Tooltip } from '../components/common/Tooltip';
import { Loader, SkeletonCard } from '../components/common/Loader';
import { useHoldings } from '../hooks/useHoldings';
import { useCapitalGains } from '../hooks/useCapitalGains';

export const Home: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const { holdings, loading: holdingsLoading } = useHoldings();
  const { 
    preHarvestGains, 
    postHarvestGains, 
    selectedHoldings,
    loading: gainsLoading,
    toggleHolding,
    selectAllHoldings
  } = useCapitalGains();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const isLoading = holdingsLoading || gainsLoading;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md ${theme === 'dark' ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
  
  <img
    src="/Logo.png"
    alt="KoinX Logo"
    className="w-26 h-20 object-contain"
  />
</div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className='flex'>
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Tax Harvesting
          </h1>
          <div className="hidden sm:block m-4">
                <Tooltip theme={theme} />
          </div>
          </div>

           <div className="flex items-center gap-4">
              {/* Mobile Tooltip */}
              <div className="sm:hidden">
                <Tooltip theme={theme} />
              </div>
            </div>
        </div>

        {/* Disclaimer */}
        <Disclaimer theme={theme} />

        {/* Cards Section */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <PreHarvestCard gains={preHarvestGains} />
            <PostHarvestCard preGains={preHarvestGains} postGains={postHarvestGains} />
          </div>
        )}

        {/* Holdings Table */}
        {holdingsLoading ? (
          <div className="rounded-2xl shadow-lg p-8">
            <Loader />
          </div>
        ) : (
          <HoldingsTable
            holdings={holdings}
            selectedHoldings={selectedHoldings}
            onToggleHolding={toggleHolding}
            onSelectAll={(selectAll) => selectAllHoldings(holdings, selectAll)}
            theme={theme}
          />
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t mt-12 py-8 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2024 KoinX. All rights reserved. This is a demo application for tax harvesting education.
          </p>
        </div>
      </footer>
    </div>
  );
};