// import React from 'react';
// import { type HarvestCalculation } from '../../types/index';

// interface PostHarvestCardProps {
//   preGains: HarvestCalculation | null;
//   postGains: HarvestCalculation | null;
// }

// export const PostHarvestCard: React.FC<PostHarvestCardProps> = ({ preGains, postGains }) => {
//   if (!postGains) return null;

//   const formatCurrency = (value: number): string => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(Math.abs(value));
//   };

//   const calculateSavings = (): number => {
//     if (!preGains) return 0;
//     const difference = preGains.realisedCapitalGains - postGains.realisedCapitalGains;
//     if (difference > 0) {
//       return difference * 0.30;
//     }
//     return 0;
//   };

//   const savings = calculateSavings();
//   const hasSavings = savings > 0;

//   return (
//     <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 h-full text-white">
//       <h3 className="text-lg font-semibold mb-6">After Harvesting</h3>
      
//       <div className="grid grid-cols-2 gap-8">
//         {/* Short-term Column */}
//         <div>
//           <p className="text-sm text-blue-100 text-right mb-4">Short-term</p>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-blue-100">Profits</span>
//               <span className="text-sm text-white font-medium">${formatCurrency(postGains.stcg.profits)}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-blue-100">Losses</span>
//               <span className="text-sm text-white font-medium">- ${formatCurrency(postGains.stcg.losses)}</span>
//             </div>
//             <div className="flex justify-between items-center pt-3 border-t border-blue-400">
//               <span className="text-sm text-blue-100">Net Capital Gains</span>
//               <span className="text-sm text-white font-medium">${formatCurrency(postGains.stcg.netGain)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Long-term Column */}
//         <div>
//           <p className="text-sm text-blue-100 text-right mb-4">Long-term</p>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-blue-100">&nbsp;</span>
//               <span className="text-sm text-white font-medium">${formatCurrency(postGains.ltcg.profits)}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-blue-100">&nbsp;</span>
//               <span className="text-sm text-white font-medium">- ${formatCurrency(postGains.ltcg.losses)}</span>
//             </div>
//             <div className="flex justify-between items-center pt-3 border-t border-blue-400">
//               <span className="text-sm text-blue-100">&nbsp;</span>
//               <span className="text-sm text-white font-medium">${formatCurrency(postGains.ltcg.netGain)}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Effective Capital Gains */}
//       <div className="mt-6 pt-4 border-t border-blue-400">
//         <div className="flex items-center justify-between">
//           <span className="text-base font-medium text-white">Effective Capital Gains:</span>
//           <span className="text-2xl font-bold text-white">
//             {postGains.realisedCapitalGains < 0 ? '-' : ''}${formatCurrency(postGains.realisedCapitalGains)}
//           </span>
//         </div>
//       </div>

//       {/* Savings Message */}
//       {hasSavings && (
//         <div className="mt-4 flex items-center gap-2 text-sm text-white">
//           <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
//             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//           </svg>
//           <span>You are going to save upto ${formatCurrency(savings)}</span>
//         </div>
//       )}
//     </div>
//   );
// };

import React from 'react';
import { type HarvestCalculation } from '../../types';

interface Props {
  preGains: HarvestCalculation | null;
  postGains: HarvestCalculation | null;
}

export const PostHarvestCard: React.FC<Props> = ({
  preGains,
  postGains,
}) => {
  if (!postGains) return null;

  const format = (v: number) => Math.abs(v).toLocaleString();

  const savings =
    preGains
      ? Math.max(
          0,
          (preGains.realisedCapitalGains -
            postGains.realisedCapitalGains) * 0.3
        )
      : 0;

  return (
    <div className="rounded-xl p-6 h-full text-white bg-linear-to-br from-blue-500 to-blue-700">
      
      <h3 className="text-lg font-semibold mb-6">
        After Harvesting
      </h3>

      <div className="grid grid-cols-2 gap-8">
        
        {/* LEFT */}
        <div>
          <p className="text-sm text-blue-100 text-right mb-4">
            Short-term
          </p>

          <div className="space-y-3">
            <Row label="Profits" value={postGains.stcg.profits} />
            <Row label="Losses" value={postGains.stcg.losses} isLoss />
            <Row label="Net Capital Gains" value={postGains.stcg.netGain} border />
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <p className="text-sm text-blue-100 text-right mb-4">
            Long-term
          </p>

          <div className="space-y-3">
            <Row value={postGains.ltcg.profits} />
            <Row value={postGains.ltcg.losses} isLoss />
            <Row value={postGains.ltcg.netGain} border />
          </div>
        </div>
      </div>

      {/* TOTAL */}
      <div className="mt-6 pt-4 border-t border-blue-300/40">
        <div className="flex justify-between items-center">
          <span className="font-medium">
            Effective Capital Gains:
          </span>

          <span className="text-2xl font-bold">
            {postGains.realisedCapitalGains < 0 ? '-' : ''}$
            {format(postGains.realisedCapitalGains)}
          </span>
        </div>
      </div>

      {/* SAVINGS */}
      {savings > 0 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
          
          <span className="text-yellow-300">🎉</span>

          <span>
            You are going to save upto $
            <span className="font-semibold text-white">
              {format(savings)}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

/* 🔹 Shared Row */
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
        border ? 'pt-3 border-t border-white/20' : ''
      }`}
    >
      <span className="text-sm text-blue-100">
        {label || '\u00A0'}
      </span>

      <span
        className={`text-sm font-medium ${
          isLoss ? 'text-red-200' : 'text-white'
        }`}
      >
        {isLoss ? '-' : ''} ${Math.abs(value).toLocaleString()}
      </span>
    </div>
  );
};