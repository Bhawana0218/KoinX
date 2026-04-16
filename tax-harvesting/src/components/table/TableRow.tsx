import React from 'react';
import { type Holding } from '../../types/index';
import { Checkbox } from '../common/Checkbox';
import { formatCurrency, formatNumber } from '../../utils/calculations';

interface TableRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: (checked: boolean) => void;
  isDarkMode: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({ 
  holding, 
  isSelected, 
  onToggle,
  isDarkMode 
}) => {
  const totalCurrentValue = holding.totalHolding * holding.currentPrice;

  return (
    <tr className={`
      border-b transition-colors duration-200
      ${isDarkMode 
        ? 'border-gray-700 hover:bg-gray-800' 
        : 'border-gray-200 hover:bg-gray-50'
      }
      ${isSelected ? (isDarkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50') : ''}
    `}>
      <td className="py-4 px-4">
        <Checkbox 
          checked={isSelected} 
          onChange={onToggle}
        />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <img 
            src={holding.logo} 
            alt={holding.coinName}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32';
            }}
          />
          <div>
            <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {holding.coinName}
            </div>
            <div className="text-sm text-gray-500">{holding.coin}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {formatNumber(holding.totalHolding)} {holding.coin}
        </div>
        <div className="text-sm text-gray-500">
          @ {formatCurrency(holding.averageBuyPrice)}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {formatCurrency(totalCurrentValue)}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className={`font-medium ${holding.stcg.gain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {holding.stcg.gain >= 0 ? '+' : ''}{formatCurrency(holding.stcg.gain)}
        </div>
        <div className="text-sm text-gray-500">
          {formatNumber(holding.stcg.balance)} {holding.coin}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className={`font-medium ${holding.ltcg.gain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {holding.ltcg.gain > 0 ? '+' : ''}{formatCurrency(holding.ltcg.gain)}
        </div>
        <div className="text-sm text-gray-500">
          {formatNumber(holding.ltcg.balance)} {holding.coin}
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        {isSelected ? (
          <span className="text-blue-500 font-medium">
            {formatNumber(holding.totalHolding)} {holding.coin}
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
    </tr>
  );
};