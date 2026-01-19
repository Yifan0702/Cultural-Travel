import React, { useState, useMemo, useEffect } from 'react';
import { Filter, ChevronLeft, MapPin, Search, ArrowRight, Loader2, Landmark, Sparkles, Compass, History, Palette, Cpu, ExternalLink, AlertCircle } from 'lucide-react';
import { Museum, LoadingState } from '../types';
import MuseumCard from './MuseumCard';
import { PROVINCES, PROVINCE_PREVIEWS, PROVINCE_BANNERS } from '../constants';
import ImageWithFallback from './ImageWithFallback';
import { normalizeProvinceName, getProvinceId } from '../utils/provinceUtils';
import { getImagePath } from '../utils/imageUtils';

interface ProvinceIndexPageProps {
  province: string | null;
  museums: Museum[];
  loadingState: LoadingState;
  onBack: () => void;
  onProvinceCardClick: (province: string) => void;
  onMuseumSelect: (museum: Museum) => void;
}

const THEMED_DESTINATIONS = [
  {
    id: 'history',
    title: '历史 · 岁月回响',
    subtitle: 'Echoes of Time',
    icon: History,
    color: 'text-heritage-cinnabar',
    bg: 'bg-heritage-cinnabar/5',
    img: getImagePath('images/destinations/themed/history-echoe.jpg'),
    museums: [
      { name: '故宫博物院', city: '北京' },
      { name: '陕西历史博物馆', city: '西安' },
      { name: '南京博物院', city: '南京' },
      { name: '中国国家博物馆', city: '北京' }
    ]
  },
  {
    id: 'art',
    title: '艺术 · 匠心流光',
    subtitle: 'Craftsmanship',
    icon: Palette,
    color: 'text-gold-accent',
    bg: 'bg-gold-accent/5',
    img: getImagePath('images/destinations/themed/art-craftsmanship.jpg'),
    museums: [
      { name: '苏州博物馆', city: '苏州' },
      { name: '上海博物馆', city: '上海' },
      { name: '敦煌研究院', city: '敦煌' },
      { name: '中国美术馆', city: '北京' }
    ]
  },
  {
    id: 'tech',
    title: '科技 · 未来之光',
    subtitle: 'Future Light',
    icon: Cpu,
    color: 'text-jade-green',
    bg: 'bg-jade-green/5',
    img: getImagePath('images/destinations/themed/tech-future.jpg'),
    museums: [
      { name: '上海科技馆', city: '上海' },
      { name: '自贡恐龙博物馆', city: '自贡' },
      { name: '中国航海博物馆', city: '上海' },
      { name: '广东科学中心', city: '广州' }
    ]
  }
];

const ProvinceIndexPage: React.FC<ProvinceIndexPageProps> = ({ 
  province, 
  museums, 
  loadingState, 
  onBack, 
  onProvinceCardClick,
  onMuseumSelect 
}) => {
  const [filterType, setFilterType] = useState<'rating' | 'popular'>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [internalLoadingState, setInternalLoadingState] = useState<LoadingState>(LoadingState.IDLE);

  // 移除自动触发数据加载的useEffect，避免重复调用

  // 监听外部loadingState变化
  useEffect(() => {
    setInternalLoadingState(loadingState);
  }, [loadingState]);

  const filteredMuseums = useMemo(() => {
    let result = museums.filter(m => m.name.includes(searchQuery) || m.city.includes(searchQuery));
    if (filterType === 'rating') {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return result;
  }, [museums, searchQuery, filterType]);

  const normalizedProvince = province ? normalizeProvinceName(province) : '';
  const provinceId = normalizedProvince ? getProvinceId(normalizedProvince) : '';
  const provinceGradient = normalizedProvince && PROVINCE_BANNERS[normalizedProvince] 
    ? PROVINCE_BANNERS[normalizedProvince] 
    : 'linear-gradient(135deg, #8B2323 0%, #D4AF37 50%, #009080 100%)';

  if (internalLoadingState === LoadingState.LOADING) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="w-12 h-12 text-heritage-cinnabar animate-spin mb-4" />
        <p className="text-stone-400 font-serif italic">正在为您展开江山图卷...</p>
      </div>
    );
  }

  if (!province) {
    return (
      <div className="animate-fade-in w-full pb-12 md:pb-32">
        {/* Page Title */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-black mb-2">探索目的地</h2>
          <p className="text-stone-400 text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold">Discover museums and cultural sites across China</p>
        </div>
        
        {/* Search Bar - Left Aligned */}
        <div className="mb-12 md:mb-20 relative group">
          <div className="absolute inset-y-0 left-4 md:left-6 flex items-center pointer-events-none">
            <Search className="text-stone-300 group-focus-within:text-heritage-cinnabar transition-colors" size={18} />
          </div>
          <input 
            type="text" 
            placeholder="搜寻地区、主题或场馆瑰宝..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-100 shadow-sm rounded-2xl md:rounded-[2rem] py-3 md:py-5 pl-12 md:pl-16 pr-6 md:pr-8 text-sm outline-none focus:ring-2 focus:ring-heritage-cinnabar/10 focus:border-heritage-cinnabar/20 transition-all placeholder:text-stone-300"
          />
        </div>

        {/* 1. Provincial Directory - Dense Grid (8-10 per row) */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
            <span className="text-[9px] md:text-[10px] font-bold text-stone-300 uppercase tracking-[0.3em] md:tracking-[0.4em]">目的地</span>
            <div className="h-[1px] flex-1 bg-stone-100"></div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 md:gap-3">
            {PROVINCES.map((p, idx) => (
              <button 
                key={p}
                onClick={() => onProvinceCardClick(p)}
                className="group relative bg-[#F9F8F4] py-4 px-2 rounded-xl border border-transparent hover:border-heritage-cinnabar/40 hover:bg-white transition-all duration-300 text-center animate-fade-in-up"
                style={{ animationDelay: `${idx * 10}ms` }}
              >
                <div className="text-base font-serif font-bold text-ink-black group-hover:text-heritage-cinnabar transition-colors">{p}</div>
                <div className="text-[8px] text-stone-300 font-bold uppercase tracking-widest mt-0.5">
                  {PROVINCE_PREVIEWS[p]?.length || '3'} 家
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Seasonal Featured - Themed Destination (3 Vertical Cards) */}
        <div className="pt-12 md:pt-20 border-t border-stone-100">
          <div id="hot-destinations" className="text-center mb-10 md:mb-16">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-ink-black mb-2 flex items-center justify-center gap-2 md:gap-3">
              <Sparkles className="text-gold-accent fill-current" size={18} />
              本季热门文化目的地
            </h3>
            <p className="text-[9px] md:text-[10px] text-stone-400 font-bold uppercase tracking-[0.25em] md:tracking-[0.3em]">Season's Curated Heritage Themes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {THEMED_DESTINATIONS.map((theme, idx) => {
              const Icon = theme.icon;
              return (
                <div 
                  key={theme.id} 
                  className="bg-white rounded-2xl md:rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden flex flex-col group animate-fade-in-up" 
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Styled Header Image */}
                  <div className="relative h-36 md:h-48 overflow-hidden">
                    <img src={theme.img} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" alt={theme.title} />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className={`p-3 md:p-4 rounded-full bg-white/90 backdrop-blur shadow-xl mb-2 md:mb-3 ${theme.color}`}>
                        <Icon size={20} className="md:w-6 md:h-6" />
                      </div>
                      <h4 className="text-lg md:text-xl font-serif font-bold text-white tracking-widest px-4 text-center">{theme.title}</h4>
                      <p className="text-[7px] md:text-[8px] text-white/80 font-bold uppercase tracking-[0.2em]">{theme.subtitle}</p>
                    </div>
                  </div>

                  {/* Representative Museums List */}
                  <div className="p-6 md:p-10 flex-1 flex flex-col">
                    <div className="space-y-6 mb-10">
                      {theme.museums.map((m, mi) => (
                        <button 
                          key={mi}
                          onClick={() => {/* Functionality for themed deep link if needed */}}
                          className="w-full flex items-center justify-between group/item text-left"
                        >
                          <div>
                            <div className="text-sm font-serif font-bold text-ink-black group-hover/item:text-heritage-cinnabar transition-colors">{m.name}</div>
                            <div className="text-[10px] text-stone-300 tracking-widest">{m.city}</div>
                          </div>
                          <ArrowRight size={14} className="text-stone-200 opacity-0 group-hover/item:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>

                    <button className="mt-auto w-full py-4 border border-dashed border-stone-100 rounded-2xl text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] hover:bg-stone-50 hover:text-heritage-cinnabar hover:border-heritage-cinnabar/30 transition-all flex items-center justify-center gap-2">
                      查看更多主题馆舍 <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in w-full pb-32">
      {/* Back Button Above Banner */}
      <div className="mb-6 flex items-center">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-heritage-cinnabar transition-colors text-xs font-bold tracking-widest uppercase group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          返回名录网格
        </button>
      </div>

      <div 
        className="relative w-full h-80 rounded-[3rem] overflow-hidden mb-16 shadow-2xl"
        style={{ background: provinceGradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/60 via-transparent to-transparent"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(255, 255, 255, 0.03) 35px,
            rgba(255, 255, 255, 0.03) 70px
          )`
        }}></div>
        <div className="absolute bottom-12 left-12">
          <div className="flex items-end gap-6">
            <h2 className="text-6xl font-serif font-bold text-white tracking-widest">{normalizedProvince}</h2>
            <div className="flex items-center gap-2 pb-2 text-white/80">
              <MapPin size={18} />
              <span className="text-sm font-medium tracking-widest uppercase">Province Archive</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm">
        <div className="flex gap-4">
          <button 
            onClick={() => setFilterType('popular')}
            className={`px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all ${
              filterType === 'popular' ? 'bg-heritage-cinnabar text-white' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'
            }`}
          >
            热门排序
          </button>
          <button 
            onClick={() => setFilterType('rating')}
            className={`px-6 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all ${
              filterType === 'rating' ? 'bg-heritage-cinnabar text-white' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'
            }`}
          >
            评分最高
          </button>
        </div>

        <div className="relative group w-full md:w-96">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-heritage-cinnabar transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="在 {province} 中搜索场馆..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm outline-none focus:ring-1 focus:ring-heritage-cinnabar/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      {internalLoadingState === LoadingState.ERROR ? (
        <div className="py-32 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-red-400" size={40} />
          </div>
          <h3 className="text-xl font-serif font-bold text-ink-black mb-2">数据加载失败</h3>
          <p className="text-stone-400 text-sm mb-8">抱歉，无法获取{normalizedProvince}的场馆信息</p>
          <button 
            onClick={() => province && onProvinceCardClick(normalizeProvinceName(province))}
            className="px-8 py-3 bg-heritage-cinnabar text-white rounded-xl font-bold hover:bg-china-red transition-all"
          >
            重试
          </button>
        </div>
      ) : filteredMuseums.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredMuseums.map((museum, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <MuseumCard museum={museum} index={index} onSelect={onMuseumSelect} />
            </div>
          ))}
        </div>
      ) : internalLoadingState !== LoadingState.LOADING ? (
        <div className="py-32 text-center">
          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Landmark className="text-stone-300" size={40} />
          </div>
          <h3 className="text-xl font-serif font-bold text-ink-black mb-2">暂无场馆数据</h3>
          <p className="text-stone-400 text-sm mb-8">该省份的场馆信息正在筹备中</p>
          <button 
            onClick={onBack}
            className="px-8 py-3 bg-stone-100 text-stone-600 rounded-xl font-bold hover:bg-stone-200 transition-all"
          >
            返回列表
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProvinceIndexPage;
