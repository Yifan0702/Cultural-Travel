
import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import ChinaMap from './components/ChinaMap';
import MuseumInfoPanel from './components/MuseumInfoPanel';
import PersonalCenterPage from './components/PersonalCenterPage';
import ShopPage from './components/ShopPage';
import EducationPage from './components/EducationPage';
import CommunityPage from './components/CommunityPage';
import ProvinceIndexPage from './components/ProvinceIndexPage';
import { fetchMuseumsForProvince } from './services/geminiService';
import { Museum, LoadingState } from './types';
import { PROVINCES, PROVINCE_PREVIEWS } from './constants';
import { normalizeProvinceName } from './utils/provinceUtils';
import { getImagePath } from './utils/imageUtils';
// Added Mountain to the imports from lucide-react
import { Compass, Map as MapIcon, Share2, ArrowRight, Calendar, Users, Star, ChevronRight, Mountain } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('首页');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cardPosition, setCardPosition] = useState<{ x: number; y: number } | null>(null);

  const calculateCardPosition = useCallback((clickX: number, clickY: number) => {
    const cardWidth = 380;
    const cardHeight = 500; // 预估卡片高度
    const padding = 20;
    const mapContainer = document.getElementById('map-region');
    
    if (!mapContainer) return { x: clickX, y: clickY };
    
    const containerRect = mapContainer.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    let finalX = clickX;
    let finalY = clickY;
    
    // 智能水平定位
    if (clickX < containerWidth / 2) {
      // 左侧点击，卡片显示在右侧
      finalX = Math.min(clickX + padding, containerWidth - cardWidth - padding);
    } else {
      // 右侧点击，卡片显示在左侧
      finalX = Math.max(clickX - cardWidth - padding, padding);
    }
    
    // 垂直边界检测
    const cardTop = clickY - cardHeight / 2;
    const cardBottom = clickY + cardHeight / 2;
    
    if (cardTop < padding) {
      // 超出顶部，向下移动
      finalY = cardHeight / 2 + padding;
    } else if (cardBottom > containerHeight - padding) {
      // 超出底部，向上移动
      finalY = containerHeight - cardHeight / 2 - padding;
    }
    
    return { x: finalX, y: finalY };
  }, []);

  // 将PROVINCE_PREVIEWS数据转换为Museum格式
  const convertToMuseums = useCallback((provinceMuseums: string[], provinceName: string): Museum[] => {
    const museumImages = [
      getImagePath('images/museums/museum-1.jpg'),
      getImagePath('images/museums/museum-2.jpg'),
      getImagePath('images/museums/museum-3.jpg')
    ];
    
    return provinceMuseums.map((name, index) => ({
      name,
      city: provinceName,
      description: `${name}是${provinceName}重要的文化场馆，收藏了丰富的历史文物和艺术珍品。`,
      highlight: index === 0 ? '省内顶级博物馆' : '特色文化场馆',
      tags: ['历史文化', '艺术展览', '文物保护'],
      rating: 4.5 + Math.random() * 0.5,
      reviewCount: Math.floor(Math.random() * 5000) + 1000,
      image: museumImages[index % 3]  // 循环使用3张图片
    }));
  }, []);

  const handleMapProvinceSelect = useCallback((province: string, position?: { x: number; y: number }) => {
    const normalized = normalizeProvinceName(province);
    console.log('[handleMapProvinceSelect] Original:', province, 'Normalized:', normalized);
    
    // 设置选中的省份
    setSelectedProvince(normalized);
    if (position) {
      const adjustedPosition = calculateCardPosition(position.x, position.y);
      setCardPosition(adjustedPosition);
    }
    
    // 立即使用静态数据
    const provinceMuseumNames = PROVINCE_PREVIEWS[normalized];
    if (provinceMuseumNames && provinceMuseumNames.length > 0) {
      const data = convertToMuseums(provinceMuseumNames, normalized);
      setMuseums(data);
      setLoadingState(LoadingState.SUCCESS);
      setErrorMsg(null);
      console.log('[handleMapProvinceSelect] Success (static data), museums:', data.length);
    } else {
      console.warn('[handleMapProvinceSelect] No museums found for:', normalized);
      setMuseums([]);
      setLoadingState(LoadingState.ERROR);
      setErrorMsg("该省份暂无场馆数据。");
    }
  }, [calculateCardPosition, convertToMuseums]);

  const handleRandomPick = () => {
    const randomProvince = PROVINCES[Math.floor(Math.random() * PROVINCES.length)];
    console.log('[handleRandomPick] Selected:', randomProvince);
    
    // 获取地图容器尺寸
    const mapContainer = document.getElementById('map-region');
    if (mapContainer) {
      const rect = mapContainer.getBoundingClientRect();
      // 在地图中心区域生成随机位置（避免边缘）
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const randomX = centerX + (Math.random() - 0.5) * rect.width * 0.4; // ±20% 范围
      const randomY = centerY + (Math.random() - 0.5) * rect.height * 0.4;
      
      handleMapProvinceSelect(randomProvince, { x: randomX, y: randomY });
    } else {
      // 降级方案：不传位置
    handleMapProvinceSelect(randomProvince);
    }
  };

  const renderHome = () => (
    <div className="max-w-[1360px] mx-auto px-4 py-12 flex flex-col gap-24">
      {/* --- HERO SECTION --- */}
      <section className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Left: Content */}
        <div className="lg:w-[45%] flex flex-col gap-10 animate-fade-in-up">
          <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-ink-black leading-tight">
              探索中华文明 · 发现文化之美
            </h1>
            <p className="text-stone-500 text-lg lg:text-xl font-serif leading-relaxed italic max-w-lg">
              以省份为入口，发现博物馆、非遗与城市故事。<br/>
              在数字图卷中，重逢华夏五千年文明。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Compass, title: '探索文化地图', desc: '点选省份，洞察历史宝藏', color: 'text-heritage-cinnabar' },
              { icon: MapIcon, title: '安排路线行程', desc: '定制化研学路径与专题收藏', color: 'text-jade-green' },
              { icon: Share2, title: '互动分享心得', desc: '寻迹社区，遇见志同道合的行者', color: 'text-gold-accent' },
            ].map((card, i) => (
              <div key={i} className="flex items-center gap-5 p-5 bg-white rounded-2xl border border-stone-100 soft-shadow group hover:border-heritage-cinnabar/20 transition-all cursor-default">
                <div className={`p-3 rounded-xl bg-stone-50 group-hover:scale-110 transition-transform ${card.color}`}>
                  <card.icon size={20} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-ink-black">{card.title}</h3>
                  <p className="text-[12px] text-stone-400 font-medium">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-4">
            <button 
               onClick={() => setActiveTab('探索目的地')}
               className="bg-heritage-cinnabar text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase flex items-center gap-2 hover:bg-china-red transition-all shadow-lg shadow-heritage-cinnabar/20"
            >
              开始探索 <ChevronRight size={16} />
            </button>
            <button 
              onClick={handleRandomPick}
              className="bg-white text-stone-600 border border-stone-200 px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-stone-50 transition-all"
            >
              随机省份
            </button>
          </div>
        </div>

        {/* Right: Map Card */}
        <div id="map-region" className="lg:w-[55%] relative w-full aspect-[1.1/1] bg-white rounded-[32px] soft-shadow border border-stone-100 overflow-hidden flex items-center justify-center p-4 group">
          <div className="w-full h-full flex items-center justify-center">
          <ChinaMap onSelect={handleMapProvinceSelect} selectedProvince={selectedProvince} />
          </div>
          
          {/* Stats Overlay */}
          <div className="absolute bottom-10 left-10 flex flex-col gap-6 bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/50 animate-fade-in">
            <div className="flex flex-col">
              <span className="text-3xl font-serif font-bold text-heritage-cinnabar">34</span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">省级行政区</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-serif font-bold text-heritage-cinnabar">5000+</span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">博物馆与文化场所</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-serif font-bold text-heritage-cinnabar">100+</span>
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">文化活动/路线</span>
            </div>
          </div>

          {/* Enhanced Province Info Card */}
          {selectedProvince && PROVINCE_PREVIEWS[selectedProvince] && cardPosition && (
            <div 
              className="absolute z-30 animate-fade-in pointer-events-none"
              style={{
                left: `${cardPosition.x}px`,
                top: `${cardPosition.y}px`,
                transform: 'translate(0, -50%)'
              }}
            >
              {/* Card */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden min-w-[340px] max-w-[380px] pointer-events-auto">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, #8B2323 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                  }}></div>
                </div>
                
                {/* Header */}
                <div className="relative">
                  <div className="px-8 pt-6 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-heritage-cinnabar rounded-full"></div>
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-ink-black tracking-wider">{selectedProvince}</h3>
                          <p className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-0.5">Province Archive</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedProvince(null);
                          setCardPosition(null);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-400 hover:text-heritage-cinnabar transition-all active:scale-95"
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M12 4L4 12M4 4l8 8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Museums List */}
                <div className="px-8 pb-6 space-y-2.5">
                  {PROVINCE_PREVIEWS[selectedProvince].slice(0, 4).map((museum, idx) => (
                    <div 
                      key={idx} 
                      className="group relative flex items-center gap-3 p-4 bg-white rounded-2xl border border-stone-100 hover:border-heritage-cinnabar/30 hover:shadow-lg hover:shadow-heritage-cinnabar/5 transition-all duration-300 cursor-pointer overflow-hidden"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      {/* Hover gradient effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-heritage-cinnabar/0 via-heritage-cinnabar/5 to-heritage-cinnabar/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Icon */}
                      <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-heritage-cinnabar/10 to-gold-accent/10 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                        <MapIcon size={14} className="text-heritage-cinnabar" strokeWidth={2.5} />
                      </div>
                      
                      {/* Museum name */}
                      <div className="relative z-10 flex-1 min-w-0">
                        <div className="text-sm font-bold text-ink-black group-hover:text-heritage-cinnabar transition-colors truncate">
                          {museum}
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <ChevronRight 
                        size={14} 
                        className="relative z-10 text-stone-300 group-hover:text-heritage-cinnabar group-hover:translate-x-1 transition-all flex-shrink-0" 
                        strokeWidth={2.5}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Footer button */}
                <div className="px-8 pb-8">
                  <button 
                    onClick={() => setActiveTab('探索目的地')}
                    className="w-full py-3.5 bg-gradient-to-r from-heritage-cinnabar to-china-red text-white text-xs font-bold rounded-2xl transition-all hover:shadow-xl hover:shadow-heritage-cinnabar/25 hover:-translate-y-0.5 active:scale-[0.98] tracking-[0.15em] uppercase flex items-center justify-center gap-2"
                  >
                    <Compass size={14} strokeWidth={2.5} />
                    查看更多场馆
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- SECOND SCREEN CONTENT --- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-24">
        {/* A. Cultural Routes (Large Zone) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
           <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-serif font-bold text-ink-black">精选文化路线</h2>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Selected Cultural Routes</p>
              </div>
              <button 
                onClick={() => {
                  setActiveTab('探索目的地');
                  setTimeout(() => {
                    const element = document.getElementById('hot-destinations');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className="text-[11px] font-bold text-stone-300 hover:text-heritage-cinnabar transition-colors flex items-center gap-1"
              >
                查看更多 <ArrowRight size={12} />
              </button>
           </div>
           <div className="space-y-4">
              {[
                { title: '盛世长安：十三朝古都巡礼', desc: '穿越三千年，在古都西安探寻周秦汉唐的辉煌余韵。', img: '/images/home/routes/xian-ancient-capital.jpg' },
                { title: '红船精神：江南红色印记', desc: '嘉兴南湖到南京雨花台，传承那抹永不褪色的文化血脉。', img: '/images/home/routes/jiangnan-red-route.jpg' },
                { title: '山水人文：浙东唐诗之路', desc: '寻访诗画浙江，感受古代文人墨客的归隐精神。', img: '/images/home/routes/zhedong-poetry-route.jpg' }
              ].map((route, i) => (
                <div key={i} className="flex gap-5 p-4 bg-white rounded-2xl border border-stone-100 hover:border-heritage-cinnabar/20 transition-all group cursor-pointer soft-shadow">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={route.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-[15px] font-bold text-ink-black group-hover:text-heritage-cinnabar transition-colors">{route.title}</h3>
                    <p className="text-[12px] text-stone-400 mt-2 line-clamp-2 leading-relaxed">{route.desc}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* B. Cultural Activities (Middle Column) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div>
              <h2 className="text-2xl font-serif font-bold text-ink-black">热门活动日历</h2>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Hot Activities Calendar</p>
           </div>
           <div className="bg-white rounded-3xl border border-stone-100 soft-shadow p-6 space-y-6">
              {[
                { date: '24', month: '11月', title: '徐渭书画艺术展', tag: '正在展览', status: 'hot' },
                { date: '18', month: '12月', title: '苏绣手工体验课', tag: '可预约', status: 'normal' },
                { date: '03', month: '1月', title: '非遗文化节启动', tag: '即将开始', status: 'upcoming' }
              ].map((act, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="flex flex-col items-center justify-center w-12 h-12 bg-stone-50 rounded-xl group-hover:bg-heritage-cinnabar/5 transition-colors">
                    <span className="text-base font-bold text-heritage-cinnabar">{act.date}</span>
                    <span className="text-[8px] text-stone-400 font-bold">{act.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-bold text-ink-black truncate group-hover:text-heritage-cinnabar transition-colors">{act.title}</h4>
                    <div className={`text-[9px] font-bold uppercase tracking-tighter mt-0.5 ${act.status === 'hot' ? 'text-china-red' : 'text-stone-300'}`}>
                      {act.tag}
                    </div>
                  </div>
                  <button className="p-2 text-stone-300 hover:text-heritage-cinnabar transition-colors">
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
              <div className="pt-4 border-t border-stone-50 text-center">
                 <button 
                   onClick={() => {
                     setActiveTab('教育系列');
                     setTimeout(() => {
                       const element = document.getElementById('offline-experience');
                       if (element) {
                         element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                       }
                     }, 100);
                   }}
                   className="text-[10px] font-bold text-stone-300 uppercase tracking-widest hover:text-ink-black transition-colors"
                 >
                   浏览完整历程
                 </button>
              </div>
           </div>
        </div>

        {/* C. Community Highlights (Right Column) */}
        <div className="lg:col-span-3 flex flex-col gap-8">
           <div className="flex justify-between items-end">
           <div>
                <h2 className="text-2xl font-serif font-bold text-ink-black">社区精选</h2>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Community Highlights</p>
              </div>
              <button 
                onClick={() => setActiveTab('社区动态')}
                className="text-[11px] font-bold text-stone-300 hover:text-heritage-cinnabar transition-colors flex items-center gap-1"
              >
                查看更多 <ArrowRight size={12} />
              </button>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {[
                { title: '故宫红墙摄影', views: '2.1k', img: '/images/home/community/forbidden-city-red-wall.jpg' },
                { title: '苏博贝聿铭展', views: '1.5k', img: '/images/home/community/suzhou-museum-pei.jpg' },
                { title: '莫高窟九层楼', views: '800', img: '/images/home/community/mogao-caves.jpg' },
                { title: '南京明故宫遗址', views: '1.2k', img: '/images/home/community/nanjing-ming-palace.jpg' }
              ].map((post, i) => (
                <div key={i} className="group cursor-pointer">
                   <div className="aspect-square rounded-2xl overflow-hidden mb-2 soft-shadow border border-stone-100">
                      <img src={post.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                   </div>
                   <h4 className="text-[11px] font-bold text-ink-black truncate">{post.title}</h4>
                   <div className="flex items-center gap-1 mt-1 text-[9px] text-stone-300 font-bold uppercase">
                      <Users size={10} /> {post.views}
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-paper-white text-ink-black overflow-x-hidden selection:bg-heritage-cinnabar/10 selection:text-heritage-cinnabar">
      <Header 
        activeTab={activeTab} 
        onTabChange={(tab) => { setActiveTab(tab); setSelectedProvince(null); }}
        onNavigateToUser={() => setActiveTab('个人中心')} 
      />

      <main className="flex-grow flex flex-col">
        {activeTab === '首页' ? (
          renderHome()
        ) : activeTab === '探索目的地' ? (
          <div className="max-w-[1360px] mx-auto w-full px-4 py-12">
            <ProvinceIndexPage 
              province={selectedProvince}
              museums={museums}
              loadingState={loadingState}
              onBack={() => setSelectedProvince(null)} 
              onProvinceCardClick={handleMapProvinceSelect}
              onMuseumSelect={() => {}}
            />
          </div>
        ) : activeTab === '教育系列' ? (
          <div className="max-w-[1360px] mx-auto w-full px-4 py-12">
            <EducationPage />
          </div>
        ) : activeTab === '周边商城' ? (
          <div className="max-w-[1360px] mx-auto w-full px-4 py-12">
            <ShopPage />
          </div>
        ) : activeTab === '社区动态' ? (
          <div className="max-w-[1360px] mx-auto w-full px-4 py-12">
            <CommunityPage />
          </div>
        ) : activeTab === '个人中心' ? (
          <div className="max-w-[1360px] mx-auto w-full px-4 py-12">
            <PersonalCenterPage />
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center text-stone-400 font-serif italic text-xl">筹备中...</div>
        )}
      </main>

      <footer className="bg-white border-t border-stone-100 py-12 mt-auto">
        <div className="max-w-[1360px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-heritage-cinnabar/10 rounded-lg flex items-center justify-center text-heritage-cinnabar">
                <Mountain size={16} />
             </div>
             <span className="text-xs font-serif font-bold text-stone-400 tracking-widest">华夏博览 · SINCE 2024</span>
          </div>
          <div className="flex gap-10 text-[10px] text-stone-300 font-bold uppercase tracking-[0.2em]">
            <span className="hover:text-heritage-cinnabar transition-colors cursor-pointer">隐私协议</span>
            <span className="hover:text-heritage-cinnabar transition-colors cursor-pointer">服务条款</span>
            <span>© {new Date().getFullYear()} CULTURAL HERITAGE ARCHIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
