import React from 'react';
import { type HarvestCalculation } from '../../types';

interface PreHarvestCardProps {
  gains: HarvestCalculation | null;
}

export const PreHarvestCard: React.FC<PreHarvestCardProps> = ({ gains }) => {
  if (!gains) return null;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(Math.abs(value));

  return (
    <div className="rounded-xl p-6 h-full bg-[#0f172a] dark:bg-[#0f172a] text-white">
      
      <h3 className="text-lg font-semibold mb-6 text-gray-200">
        Pre Harvesting
      </h3>

      <div className="grid grid-cols-2 gap-8">
        
        {/* LEFT */}
        <div>
          <p className="text-sm text-gray-400 text-right mb-4">Short-term</p>

          <div className="space-y-3">
            <Row label="Profits" value={gains.stcg.profits} />
            <Row label="Losses" value={gains.stcg.losses} isLoss />
            <Row label="Net Capital Gains" value={gains.stcg.netGain} border />
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <p className="text-sm text-gray-400 text-right mb-4">Long-term</p>

          <div className="space-y-3">
            <Row value={gains.ltcg.profits} />
            <Row value={gains.ltcg.losses} isLoss />
            <Row value={gains.ltcg.netGain} border />
          </div>
        </div>
      </div>

      {/* TOTAL */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-gray-200 font-medium">
            Realised Capital Gains:
          </span>

          <span className="text-2xl font-bold">
            {gains.realisedCapitalGains < 0 ? '-' : ''}$
            {formatCurrency(gains.realisedCapitalGains)}
          </span>
        </div>
      </div>
    </div>
  );
};

/* 🔹 Reusable Row */
const Row = ({
  label,
  value,
  isLoss,
  border,
}: {
  label?: string;
  value: number;
  isLoss?: boolean;
  border?: boolean;
}) => {
  return (
    <div
      className={`flex justify-between items-center ${
        border ? 'pt-3 border-t border-gray-700' : ''
      }`}
    >
      <span className="text-sm text-gray-400">{label || '\u00A0'}</span>

      <span
        className={`text-sm font-medium ${
          isLoss ? 'text-red-400' : 'text-green-400'
        }`}
      >
        {isLoss ? '-' : ''} ${Math.abs(value).toLocaleString()}
      </span>
    </div>
  );
};