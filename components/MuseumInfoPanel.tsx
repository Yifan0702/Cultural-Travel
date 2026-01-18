
import React from 'react';
import { Loader2, AlertCircle, Sparkles, MapPin, X, Star, Landmark, ArrowRight } from 'lucide-react';
import { Museum, LoadingState } from '../types';

interface MuseumInfoPanelProps {
  loadingState: LoadingState;
  selectedProvince: string | null;
  museums: Museum[];
  errorMsg: string | null;
  onRetry: () => void;
  onBack: () => void;
  onMuseumSelect: (museum: Museum) => void;
  onExploreMore?: () => void;
  isCompact?: boolean;
}

const MuseumInfoPanel: React.FC<MuseumInfoPanelProps> = ({
  loadingState,
  selectedProvince,
  museums,
  errorMsg,
  onRetry,
  onBack,
  onMuseumSelect,
  onExploreMore,
  isCompact = false
}) => {
  
  const getSmallImageUrl = (name: string, index: number) => {
    if (name.includes('故宫')) return 'https://images.unsplash.com/photo-1547984609-4458535048d0?q=80&w=400&auto=format&fit=crop';
    if (name.includes('兵马俑')) return 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=400&auto=format&fit=crop';
    if (name.includes('敦煌')) return 'https://images.unsplash.com/photo-1524292332409-30588e273146?q=80&w=400&auto=format&fit=crop';
    return `https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=400&auto=format&fit=crop&sig=${index}`;
  };

  if (loadingState === LoadingState.LOADING) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-heritage-cinnabar mb-4" />
        <h3 className="text-xl font-serif font-bold text-ink-black">寻访{selectedProvince}</h3>
        <p className="text-[10px] text-stone-300 font-bold uppercase tracking-widest mt-1">Connecting Heritage...</p>
      </div>
    );
  }

  if (loadingState === LoadingState.ERROR) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
        <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
        <h3 className="text-lg font-bold mb-1">加载失败</h3>
        <p className="text-xs text-stone-400 mb-6">{errorMsg}</p>
        <button onClick={onRetry} className="bg-heritage-cinnabar text-white px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest">重试</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-8 border-b border-stone-50 flex items-start justify-between sticky top-0 bg-white z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Landmark size={16} className="text-heritage-cinnabar" />
            <h2 className="text-2xl font-serif font-bold text-ink-black">{selectedProvince}</h2>
          </div>
          <p className="text-[9px] text-stone-300 font-bold uppercase tracking-[0.2em]">Province Insight</p>
        </div>
        <button onClick={onBack} className="p-2 hover:bg-stone-50 rounded-full text-stone-300 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        <div className="flex items-center gap-2 text-[10px] font-bold text-stone-300 uppercase tracking-widest mb-4">
           <Sparkles size={12} className="text-heritage-cinnabar" /> 精选场馆推荐
        </div>
        
        {museums.map((museum, index) => (
          <div 
            key={index} 
            onClick={() => onMuseumSelect(museum)}
            className="group cursor-pointer space-y-4"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden soft-shadow border border-stone-100">
               <img src={getSmallImageUrl(museum.name, index)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-heritage-cinnabar uppercase tracking-widest">{museum.city}</span>
                <div className="flex text-gold-accent"><Star size={10} fill="currentColor" /></div>
              </div>
              <h4 className="text-[15px] font-bold text-ink-black group-hover:text-heritage-cinnabar transition-colors">{museum.name}</h4>
              <p className="text-[11px] text-stone-400 mt-2 line-clamp-2 leading-relaxed italic font-serif">"{museum.description}"</p>
            </div>
            {index !== museums.length - 1 && <div className="h-[1px] w-8 bg-stone-50"></div>}
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div className="p-8 bg-stone-50/50">
        <button className="w-full bg-white border border-stone-200 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest text-stone-500 hover:border-heritage-cinnabar hover:text-heritage-cinnabar transition-all flex items-center justify-center gap-2 group">
          浏览全省名录 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default MuseumInfoPanel;
