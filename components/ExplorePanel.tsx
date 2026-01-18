import React from 'react';
import { Loader2, AlertCircle, Sparkles, MapPin, ArrowRight, X, Star, Landmark, History, ChevronRight } from 'lucide-react';
import { Museum, LoadingState } from '../types';

interface ExplorePanelProps {
  loadingState: LoadingState;
  selectedProvince: string;
  museums: Museum[];
  errorMsg: string | null;
  onRetry: () => void;
  onBack: () => void;
  onMuseumSelect: (museum: Museum) => void;
  onExploreMore: () => void;
}

const ExplorePanel: React.FC<ExplorePanelProps> = ({
  loadingState,
  selectedProvince,
  museums,
  errorMsg,
  onRetry,
  onBack,
  onMuseumSelect,
  onExploreMore
}) => {
  const getSmallImageUrl = (name: string, index: number) => {
    if (name.includes('故宫')) return 'https://images.unsplash.com/photo-1547984609-4458535048d0?q=80&w=400&auto=format&fit=crop';
    if (name.includes('兵马俑')) return 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=400&auto=format&fit=crop';
    if (name.includes('敦煌')) return 'https://images.unsplash.com/photo-1524292332409-30588e273146?q=80&w=400&auto=format&fit=crop';
    return `https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=400&auto=format&fit=crop&sig=${index}`;
  };

  if (loadingState === LoadingState.LOADING) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12">
        <Loader2 className="w-12 h-12 animate-spin text-heritage-cinnabar mb-6" />
        <h3 className="text-2xl font-serif font-bold text-ink-black">降落 {selectedProvince}...</h3>
        <p className="text-stone-400 mt-2 font-serif italic">正在为您连接当地文化枢纽</p>
      </div>
    );
  }

  if (loadingState === LoadingState.ERROR) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-12 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-6" />
        <h3 className="text-xl font-bold mb-2">探索信号中断</h3>
        <p className="mb-8 text-red-600/70 max-w-xs">{errorMsg}</p>
        <div className="flex gap-4">
          <button onClick={onRetry} className="px-8 py-3 bg-heritage-cinnabar text-white rounded-xl font-bold text-xs tracking-widest uppercase">重试</button>
          <button onClick={onBack} className="px-8 py-3 bg-stone-100 text-stone-600 rounded-xl font-bold text-xs tracking-widest uppercase">返回</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in relative">
      {/* 装饰性侧边大字 (只在宽屏显示) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] hidden lg:block">
        <div className="calligraphy text-[12rem] font-serif font-bold text-ink-black">{selectedProvince}</div>
      </div>

      {/* 头部固定 */}
      <div className="px-8 lg:px-16 pt-10 lg:pt-14 pb-8 flex items-start justify-between bg-[#FDFBF5]/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-heritage-cinnabar flex items-center justify-center text-white shadow-lg">
              <Landmark size={18} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-ink-black tracking-widest">{selectedProvince}</h2>
          </div>
          <p className="text-stone-500 font-serif leading-relaxed italic text-sm border-l-2 border-heritage-cinnabar/20 pl-4 max-w-lg">
            “江山千里，在此交汇。这片古老的土地承载着千年的历史脉络，每一处馆舍都是一段文明的见证。”
          </p>
        </div>
        <button 
          onClick={onBack}
          className="p-4 bg-white hover:bg-heritage-cinnabar text-stone-300 hover:text-white rounded-full transition-all border border-stone-100 shadow-sm group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* 滚动内容区 */}
      <div className="flex-1 overflow-y-auto px-8 lg:px-16 pb-12 custom-scrollbar">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em]">
            <Sparkles size={12} className="text-heritage-cinnabar" /> 精选场馆 · Cultural Highlights
          </div>
          <button 
            onClick={onExploreMore}
            className="text-xs font-bold text-heritage-cinnabar hover:text-china-red flex items-center gap-2 transition-colors tracking-widest uppercase border-b border-heritage-cinnabar/20 pb-0.5"
          >
            探索更多场馆 <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {museums.map((museum, index) => (
            <div 
              key={index} 
              onClick={() => onMuseumSelect(museum)}
              className="group flex gap-5 p-5 bg-white hover:bg-heritage-cinnabar/5 rounded-[2rem] border border-stone-100 hover:border-heritage-cinnabar/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-[1.5rem] overflow-hidden flex-shrink-0 bg-stone-100">
                <img src={getSmallImageUrl(museum.name, index)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={museum.name} />
              </div>
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-[9px] font-bold text-heritage-cinnabar uppercase tracking-widest flex items-center gap-1">
                    <MapPin size={10} /> {museum.city}
                  </div>
                  <Star size={10} className="text-gold-accent fill-current" />
                </div>
                <h4 className="text-lg font-serif font-bold text-ink-black mb-1.5 truncate group-hover:text-heritage-cinnabar transition-colors">{museum.name}</h4>
                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 italic font-serif opacity-80">
                  {museum.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 底部引导 */}
        <div className="mt-16 p-10 bg-white rounded-[3rem] border border-stone-100 text-center">
          <History className="mx-auto text-stone-200 mb-4" size={32} />
          <h4 className="text-lg font-serif font-bold text-ink-black mb-2">更多文明轨迹</h4>
          <p className="text-sm text-stone-400 font-serif italic mb-8">在这里，每一处历史的回响都值得被聆听</p>
          <button onClick={onBack} className="text-[10px] font-bold text-heritage-cinnabar uppercase tracking-[0.4em] border-b border-heritage-cinnabar/20 pb-1">
            返回寰宇视角
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplorePanel;
