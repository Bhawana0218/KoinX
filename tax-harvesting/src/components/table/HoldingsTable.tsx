import React, { useState } from 'react';
import {type Holding } from '../../types/index';
import { Checkbox } from '../common/Checkbox';
import { type Theme } from '../../types/index';

interface HoldingsTableProps {
  holdings: Holding[];
  selectedHoldings: Holding[];
  onToggleHolding: (holding: Holding, isSelected: boolean) => void;
  onSelectAll: (selectAll: boolean) => void;
  theme: Theme;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  selectedHoldings,
  onToggleHolding,
  onSelectAll,
  theme
}) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const isDarkMode = theme === 'dark';

  const displayedHoldings = holdings.slice(0, visibleCount);
  const allVisible = visibleCount >= holdings.length;
  const allSelected = holdings.length > 0 && selectedHoldings.length === holdings.length;
  const someSelected = selectedHoldings.length > 0 && selectedHoldings.length < holdings.length;

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 4): string => {
    return value.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });
  };

  const handleSelectAll = (checked: boolean) => {
    onSelectAll(checked);
  };

  const handleViewMore = () => {
    setVisibleCount(prev => Math.min(prev + 5, holdings.length));
  };

  const handleViewLess = () => {
    setVisibleCount(5);
  };

  return (
    <div className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-850' : 'bg-white'}`}>
      <div className="p-6 pb-4">
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Holdings
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <tr>
              <th className="py-3 px-4 text-left w-12">
                <Checkbox 
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className={`py-3 px-4 text-left text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Asset
              </th>
              <th className={`py-3 px-4 text-center text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div>Holdings</div>
                <div className="text-xs font-normal mt-0.5">Current Market Rate</div>
              </th>
              <th className={`py-3 px-4 text-right text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Current Value
              </th>
              <th className={`py-3 px-4 text-right text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Short-term
              </th>
              <th className={`py-3 px-4 text-right text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Long-Term
              </th>
              <th className={`py-3 px-4 text-right text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {displayedHoldings.map((holding, index) => {
              const isSelected = selectedHoldings.some(h => 
                h.coin === holding.coin && Math.abs(h.totalHolding - holding.totalHolding) < 0.000001
              );
              const totalCurrentValue = holding.totalHolding * holding.currentPrice;

              return (
                <tr
                  key={`${holding.coin}-${index}`}
                  className={`
                    transition-colors duration-150
                    ${isSelected 
                      ? (isDarkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50') 
                      : (isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50')
                    }
                  `}
                >
                  <td className="py-4 px-4">
                    <Checkbox 
                      checked={isSelected}
                      onChange={(checked) => onToggleHolding(holding, checked)}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={holding.logo} 
                        alt={holding.coinName}
                        className="w-6 h-6 rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/24';
                        }}
                      />
                      <div>
                        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {holding.coinName}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {holding.coin}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formatNumber(holding.totalHolding)} {holding.coin}
                    </div>
                    <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatCurrency(holding.averageBuyPrice)}/{holding.coin}
                    </div>
                  </td>
                  <td className={`py-4 px-4 text-right text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(totalCurrentValue)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className={`text-sm font-medium ${holding.stcg.gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {holding.stcg.gain >= 0 ? '+' : ''}{formatCurrency(holding.stcg.gain)}
                    </div>
                    <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatNumber(holding.stcg.balance)} {holding.coin}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className={`text-sm font-medium ${holding.ltcg.gain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {holding.ltcg.gain > 0 ? '+' : ''}{formatCurrency(holding.ltcg.gain)}
                    </div>
                    <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatNumber(holding.ltcg.balance)} {holding.coin}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {isSelected ? (
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {formatNumber(holding.totalHolding)} {holding.coin}
                      </span>
                    ) : (
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        -
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
     {/* Pagination Controls */}
{holdings.length > 5 && (
  <div
    className={`p-4 border-t ${
      isDarkMode
        ? 'border-gray-700 bg-gray-850'
        : 'border-gray-200 bg-gray-50'
    } flex items-center justify-between`}
  >
    {/* LEFT - Button */}
    <button
      onClick={allVisible ? handleViewLess : handleViewMore}
      className={`
    text-sm font-medium flex items-center gap-1
    transition-colors duration-200
    ${isDarkMode 
      ? 'text-blue-400 hover:text-blue-300' 
      : 'text-blue-600 hover:text-blue-700'
    }
  `}
    >
      {allVisible ? (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          View Less
        </>
      ) : (
        <>
          View More
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </>
      )}
    </button>

    {/* RIGHT - Text */}
    <span
      className={`text-sm ${
        isDarkMode ? 'text-gray-400' : 'text-gray-600'
      }`}
    >
      Showing {displayedHoldings.length} of {holdings.length} holdings
    </span>
  </div>
)}
    </div>
  );
};