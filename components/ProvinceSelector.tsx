
import React from 'react';
import { PROVINCES } from '../constants';

interface ProvinceSelectorProps {
  selectedProvince: string | null;
  onSelect: (province: string) => void;
  disabled: boolean;
}

const ProvinceSelector: React.FC<ProvinceSelectorProps> = ({ selectedProvince, onSelect, disabled }) => {
  return (
    <div id="provinces" className="w-full pt-16 pb-16">
      {/* Header Scaling - Refined for smaller footprint */}
      <div className="text-center mb-10">
        <h3 className="text-[24px] font-serif font-bold text-ink-black tracking-[1.5px] leading-tight mb-2">
          目的地名录
        </h3>
        <p className="text-stone-300 text-[12px] uppercase tracking-[0.25em] font-medium">
          Browse by administrative divisions
        </p>
      </div>
      
      {/* Container Layout - 85% width limit, higher density */}
      <div className="flex flex-wrap justify-center gap-3 max-w-[85%] mx-auto">
        {PROVINCES.map((province) => (
          <button
            key={province}
            onClick={() => onSelect(province)}
            disabled={disabled}
            className={`
              /* Downsized Button & Font Styling */
              px-5 py-2 rounded-xl text-[15px] font-medium transition-all duration-300
              border
              
              /* Conditional Styling - Flattened shadow */
              ${selectedProvince === province 
                ? 'bg-china-red text-white border-china-red shadow-sm scale-105 z-10' 
                : 'bg-white text-stone-500 border-stone-100 hover:border-stone-200 hover:bg-[#FDFBF5] hover:text-china-red'
              }
              
              /* Interaction States */
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
            `}
          >
            {province}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProvinceSelector;
