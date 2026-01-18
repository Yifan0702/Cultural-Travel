import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, MapPin, Clock, Ticket, Info, 
  Star, Share2, Heart, ArrowRight,
  BookOpen, History, Award, Sparkles, Plus, ThumbsUp, X,
  Maximize, Minimize, Headphones, Map as MapIcon, Layers, Move, Eye
} from 'lucide-react';
import { Museum } from '../types';

interface MuseumDetailPageProps {
  museum: Museum;
  onBack: () => void;
  onSeeMoreCommunity: (tag: string) => void;
}

interface Artifact {
  name: string;
  desc: string;
  img: string;
  dynasty?: string;
  audioDuration?: string;
}

interface VRHall {
  id: string;
  name: string;
  bgImage: string;
  hotspots: {
    id: string;
    x: number; // percentage
    y: number; // percentage
    artifact: Artifact;
  }[];
}

const DigitalGuideVR: React.FC<{ museum: Museum; onClose: () => void }> = ({ museum, onClose }) => {
  const [activeHallIndex, setActiveHallIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  const halls: VRHall[] = [
    {
      id: 'lobby',
      name: '序厅 · 万里江山',
      bgImage: 'https://images.unsplash.com/photo-1518998053502-519086c74661?q=80&w=2000&auto=format&fit=crop',
      hotspots: [
        {
          id: 'treasure-1',
          x: 45, y: 40,
          artifact: {
            name: museum.highlight,
            dynasty: "盛唐 / 唐代",
            desc: "作为本馆的核心馆藏，该作品展示了极高的古代艺术成就与工艺水准，其纹饰细节体现了当时社会繁荣开放的气象。",
            img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop",
            audioDuration: "02:45"
          }
        }
      ]
    },
    {
      id: 'hall-1',
      name: '第一展厅 · 远古回响',
      bgImage: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2000&auto=format&fit=crop',
      hotspots: [
        {
          id: 'bronze-1',
          x: 30, y: 55,
          artifact: {
            name: "青铜兽面纹尊",
            dynasty: "商代晚期",
            desc: "典型的商代礼器，造型雄伟，纹饰严谨。腹部饰以夸张的兽面纹，展现了先民对神灵的敬畏与崇拜。",
            img: "https://images.unsplash.com/photo-1615655096451-912e74d89b01?q=80&w=800&auto=format&fit=crop",
            audioDuration: "01:30"
          }
        },
        {
          id: 'jade-1',
          x: 70, y: 48,
          artifact: {
            name: "龙纹玉佩",
            dynasty: "战国",
            desc: "玉质温润，雕工精湛。龙形蜿蜒生动，体现了东周时期卓越的治玉工艺与审美品位。",
            img: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800&auto=format&fit=crop",
            audioDuration: "01:15"
          }
        }
      ]
    }
  ];

  const currentHall = halls[activeHallIndex];

  // Simulated Pan Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!viewportRef.current) return;
    const { left, top, width, height } = viewportRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 20; // max 10px shift
    const y = ((e.clientY - top) / height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const activeArtifact = currentHall.hotspots.find(h => h.id === selectedHotspot)?.artifact;

  return (
    <div className="fixed inset-0 z-[600] bg-[#1A1A1A] overflow-hidden flex flex-col font-sans text-white">
      {/* 1. Top Navigation Bar (Floating) */}
      <header className="absolute top-0 left-0 right-0 z-[620] p-8 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-6 pointer-events-auto">
          <button 
            onClick={onClose}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all border border-white/10 text-[10px] font-bold tracking-[0.2em] uppercase"
          >
            <ChevronLeft size={18} /> 返回场馆简介
          </button>
          <div className="h-10 w-[1px] bg-white/10"></div>
          <div>
            <h2 className="text-xl font-serif font-bold tracking-widest">{currentHall.name}</h2>
            <div className="flex items-center gap-2 text-[8px] text-white/40 uppercase tracking-[0.3em]">
              <Eye size={10} /> 虚拟漫游中 · VR Roaming
            </div>
          </div>
        </div>

        <div className="flex gap-3 pointer-events-auto">
          <button className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-ink-black transition-all">
            <Maximize size={18} />
          </button>
          <button className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 hover:bg-white hover:text-ink-black transition-all">
            <Move size={18} />
          </button>
        </div>
      </header>

      {/* 2. Main Immersive Viewport */}
      <main 
        ref={viewportRef}
        onMouseMove={handleMouseMove}
        className="relative flex-grow m-[1.5%] rounded-[3rem] overflow-hidden bg-[#2C2C2C] shadow-[0_0_100px_rgba(0,0,0,0.5)] transition-all duration-300"
      >
        {/* The 360-ish Background Image */}
        <div 
          className="absolute inset-[-10%] transition-transform duration-700 ease-out"
          style={{ 
            transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.1)`,
            backgroundImage: `url(${currentHall.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
          
          {/* Guide Lines on Floor (Visual Fx) */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] h-[200px] opacity-20 pointer-events-none">
             <div className="w-full h-full border-b-2 border-heritage-cinnabar rounded-full shadow-[0_10px_30px_rgba(139,35,35,0.8)]"></div>
          </div>
        </div>

        {/* Hotspots Container */}
        <div className="absolute inset-0 pointer-events-none">
          {currentHall.hotspots.map((hotspot) => (
            <div 
              key={hotspot.id}
              className="absolute pointer-events-auto"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              <button 
                onClick={() => setSelectedHotspot(hotspot.id)}
                className="relative flex items-center justify-center group"
              >
                {/* Pulsing Halo */}
                <div className="absolute inset-0 w-12 h-12 bg-heritage-cinnabar rounded-full animate-ping opacity-40"></div>
                <div className="relative w-8 h-8 bg-heritage-cinnabar border-2 border-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform duration-500">
                  <Info size={14} className="text-white" />
                </div>
                {/* Floating Tooltip Label */}
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-ink-black px-4 py-1 rounded-full text-[9px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 shadow-xl tracking-widest border border-white">
                  {hotspot.artifact.name}
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* 3. Artifact Detail Layer (Floating Modal) */}
        {selectedHotspot && activeArtifact && (
          <div className="absolute inset-0 z-[650] flex items-center justify-center p-12 animate-fade-in">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedHotspot(null)}></div>
            <div className="relative bg-[#1a1a1a] w-full max-w-4xl h-[60vh] rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10">
              <button 
                onClick={() => setSelectedHotspot(null)}
                className="absolute top-8 right-8 z-10 p-3 bg-white/10 hover:bg-white text-white hover:text-ink-black rounded-full transition-all"
              >
                <X size={20} />
              </button>

              <div className="md:w-1/2 bg-[#222] flex items-center justify-center p-12">
                 <img src={activeArtifact.img} className="max-w-full max-h-full object-contain shadow-2xl rounded-2xl animate-fade-in-up" alt={activeArtifact.name} />
              </div>

              <div className="md:w-1/2 p-12 flex flex-col justify-center">
                 <div className="flex items-center gap-2 text-heritage-cinnabar text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                    <Sparkles size={14} /> 精选馆藏 · Artifact Insight
                 </div>
                 <h2 className="text-3xl font-serif font-bold text-white mb-2">{activeArtifact.name}</h2>
                 <div className="text-xs text-white/40 font-bold uppercase tracking-widest mb-8">{activeArtifact.dynasty}</div>
                 <p className="text-white/60 font-serif leading-relaxed italic text-base mb-12">
                    "{activeArtifact.desc}"
                 </p>
                 <div className="flex gap-4">
                    <button 
                      onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                      className="flex-1 bg-white text-ink-black py-4 rounded-xl font-bold text-[10px] tracking-widest uppercase hover:bg-heritage-cinnabar hover:text-white transition-all flex items-center justify-center gap-2 group/audio"
                    >
                      <Headphones size={16} className={isAudioPlaying ? "animate-pulse" : ""} />
                      {isAudioPlaying ? '暂停导览' : '播放语音导览'}
                      <span className="opacity-40 ml-2 font-normal">[{activeArtifact.audioDuration}]</span>
                    </button>
                    <button className="px-6 py-4 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white transition-all text-[10px] font-bold tracking-widest uppercase">
                      研究报告
                    </button>
                 </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. Bottom Control Bar (Frosted Glass) */}
      <footer className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[630] w-full max-w-5xl px-8 pointer-events-none">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 p-4 rounded-[2rem] shadow-2xl pointer-events-auto flex items-center justify-between gap-12">
          {/* Mini-Map / Scene Switchers */}
          <div className="flex gap-4">
            {halls.map((hall, idx) => (
              <button 
                key={hall.id}
                onClick={() => setActiveHallIndex(idx)}
                className={`relative group overflow-hidden w-24 h-16 rounded-xl border-2 transition-all duration-500 ${activeHallIndex === idx ? 'border-heritage-cinnabar scale-105 shadow-[0_0_20px_rgba(139,35,35,0.4)]' : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'}`}
              >
                <img src={hall.bgImage} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-[8px] font-bold text-white/80 uppercase tracking-widest text-center px-2">
                  {hall.name}
                </div>
              </button>
            ))}
          </div>

          <div className="h-10 w-[1px] bg-white/10"></div>

          {/* Master Audio / Navigation Bar */}
          <div className="flex-1 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/5 rounded-full border border-white/10 text-heritage-cinnabar animate-float">
                <MapIcon size={18} />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">当前位置</div>
                <div className="text-sm font-serif font-bold text-white tracking-widest">
                  {currentHall.name}
                </div>
              </div>
            </div>

            <div className="flex-1 h-[2px] bg-white/10 rounded-full relative overflow-hidden">
               <div className="absolute inset-0 bg-heritage-cinnabar w-1/3 animate-draw-line" style={{ animationDuration: '30s' }}></div>
            </div>

            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 bg-white/10 hover:bg-white text-white hover:text-ink-black rounded-full transition-all border border-white/10 group"
            >
              <Layers size={18} className={isSidebarOpen ? "rotate-180" : ""} />
            </button>
          </div>
        </div>
      </footer>

      {/* 5. Collapsible Sidebar (Exhibit List) */}
      <aside className={`absolute top-0 right-0 bottom-0 z-[640] w-96 bg-[#1a1a1a]/95 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-700 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-12 h-full flex flex-col">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-xl font-serif font-bold text-white">展品清单</h3>
              <p className="text-[10px] text-white/30 font-bold tracking-[0.3em] uppercase">Current Hall Exhibit List</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow space-y-6 overflow-y-auto custom-scrollbar">
            {currentHall.hotspots.map((h) => (
              <div 
                key={h.id}
                onClick={() => { setSelectedHotspot(h.id); setIsSidebarOpen(false); }}
                className="group flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-heritage-cinnabar/20 border border-white/5 hover:border-heritage-cinnabar/20 transition-all cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-black">
                  <img src={h.artifact.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">{h.artifact.name}</h4>
                  <p className="text-[10px] text-white/40 mt-1 line-clamp-2 italic">"{h.artifact.desc}"</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
             <div className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em] mb-4 text-center">华夏博览 · 数字文化档案系</div>
             <button className="w-full bg-white/5 text-white/60 py-4 rounded-xl text-[10px] font-bold tracking-widest uppercase border border-white/10 hover:bg-white hover:text-ink-black transition-all">
               导出我的漫游手记
             </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

const MuseumDetailPage: React.FC<MuseumDetailPageProps> = ({ museum, onBack, onSeeMoreCommunity }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showDigitalGuide, setShowDigitalGuide] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [museum, showDigitalGuide]);

  const getImageUrl = (name: string) => {
    if (name.includes('故宫')) return 'https://images.unsplash.com/photo-1547984609-4458535048d0?q=80&w=1200&auto=format&fit=crop';
    if (name.includes('兵马俑') || name.includes('秦始皇')) return 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=1200&auto=format&fit=crop';
    if (name.includes('敦煌') || name.includes('莫高窟')) return 'https://images.unsplash.com/photo-1524292332409-30588e273146?q=80&w=1200&auto=format&fit=crop';
    return `https://images.unsplash.com/photo-1547984609-4458535048d0?q=80&w=1200&auto=format&fit=crop`;
  };

  const mockedReviews = [
    {
      user: "博览行者_小张",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang",
      date: "2024.11.10",
      content: "震撼！亲眼看到青铜器细节，不虚此行。展厅布置得很有层次，灯光精准地投射在文物上，仿佛能听见历史的呼吸。尤其是那件镇馆之宝，现场看的冲击力远非图片可比。",
      images: ["https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=400&auto=format&fit=crop"],
      likes: 128
    },
    {
      user: "文化寻踪者",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Culture",
      date: "2024.11.05",
      content: "苏州博物馆的建筑真的绝了。白墙青瓦，每一处窗景都是画。馆藏的瓷器色泽温润，让人流连忘返。这里的讲解服务也非常到位，很有收获。",
      images: ["https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=400&auto=format&fit=crop"],
      likes: 86
    },
    {
      user: "摄影师木木",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Photo",
      date: "2024.10.28",
      content: "特别推荐这里的数字化展厅，互动性很强，特别适合带小朋友来了解中华文明。下午三点的光影拍摄效果最佳，一定要带好充电宝。",
      images: ["https://images.unsplash.com/photo-1581894158354-5dec4cdc8841?q=80&w=400&auto=format&fit=crop"],
      likes: 214
    }
  ];

  if (showDigitalGuide) {
    return <DigitalGuideVR museum={museum} onClose={() => setShowDigitalGuide(false)} />;
  }

  return (
    <div className="flex flex-col animate-fade-in bg-paper-white min-h-screen">
      {/* 1. Back Navigation Above Banner */}
      <div className="max-w-[1400px] mx-auto w-full px-10 pt-10 pb-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-heritage-cinnabar transition-all font-bold text-xs tracking-widest uppercase group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          返回名录列表
        </button>
      </div>

      {/* 2. Hero Section */}
      <section className="relative h-[65vh] w-full overflow-hidden shadow-2xl">
        <img 
          src={getImageUrl(museum.name)} 
          alt={museum.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/90 via-ink-black/20 to-transparent"></div>
        
        <div className="absolute top-10 right-10 flex gap-4 z-10">
          <button className="p-3.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-heritage-cinnabar transition-all border border-white/20">
            <Share2 size={20} />
          </button>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3.5 backdrop-blur-md rounded-full border transition-all ${
              isLiked ? 'bg-heritage-cinnabar border-heritage-cinnabar text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-heritage-cinnabar'
            }`}
          >
            <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          </button>
        </div>

        <div className="absolute bottom-16 left-12 right-12">
          <div className="flex items-center gap-3 text-heritage-gold mb-6 animate-fade-in-up">
            <Award size={22} className="animate-float" />
            <span className="text-[11px] font-bold uppercase tracking-[0.5em]">National First-Class Museum</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-serif font-bold text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {museum.name}
          </h1>
          <div className="flex flex-wrap gap-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 text-white/90">
              <MapPin size={20} className="text-heritage-gold" />
              <span className="text-base font-medium tracking-widest">{museum.city} · {museum.city}文化保护区</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Star size={20} className="text-heritage-gold fill-current" />
              <span className="text-base font-medium tracking-widest">评分 {museum.rating?.toFixed(1) || '4.9'} · {museum.reviewCount || '1.2w'}+ 打卡</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Basic Info Bar */}
      <section className="bg-white border-b border-stone-100 py-12">
        <div className="max-w-[1400px] mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex items-start gap-6 group">
            <div className="p-5 bg-stone-50 rounded-[1.5rem] text-heritage-cinnabar group-hover:bg-heritage-cinnabar group-hover:text-white transition-all duration-500 shadow-sm">
              <Clock size={28} />
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mb-2">开放时间 · Hours</div>
              <div className="text-base font-bold text-ink-black">09:00 - 17:00</div>
              <div className="text-xs text-stone-400 mt-1 italic">周一闭馆 (节假日除外)</div>
            </div>
          </div>
          <div className="flex items-start gap-6 group">
            <div className="p-5 bg-stone-50 rounded-[1.5rem] text-heritage-cinnabar group-hover:bg-heritage-cinnabar group-hover:text-white transition-all duration-500 shadow-sm">
              <Ticket size={28} />
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mb-2">门票服务 · Tickets</div>
              <div className="text-base font-bold text-ink-black">免费预约 · 实名登记</div>
              <div className="text-xs text-stone-400 mt-1 italic">提前 3-7 天官方号预约</div>
            </div>
          </div>
          <div className="flex items-start gap-6 group">
            <div className="p-5 bg-stone-50 rounded-[1.5rem] text-heritage-cinnabar group-hover:bg-heritage-cinnabar group-hover:text-white transition-all duration-500 shadow-sm">
              <Info size={28} />
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mb-2">地理位置 · Map</div>
              <div className="text-base font-bold text-ink-black">{museum.city}市 核心文化园</div>
              <div className="text-xs text-stone-400 mt-1 italic">推荐地铁绿色出行</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Narrative Section */}
      <section className="max-w-[1400px] mx-auto px-10 py-28">
        <div className="flex flex-col lg:flex-row gap-24">
          <div className="lg:w-2/3 space-y-16">
            <div>
              <div className="flex items-center gap-3 text-heritage-cinnabar text-[11px] font-bold uppercase tracking-[0.5em] mb-6">
                <History size={18} /> 场馆叙事 · Narrative
              </div>
              <p className="text-2xl lg:text-3xl font-serif text-stone-700 leading-relaxed italic text-justify">
                "{museum.description}"
              </p>
            </div>
            
            <div className="p-12 bg-white rounded-[3rem] border border-stone-100 shadow-sm relative overflow-hidden group">
              <div className="absolute right-0 top-0 opacity-[0.03] transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-1000">
                 <BookOpen size={300} strokeWidth={0.5} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-ink-black mb-8">历史背景与建筑底蕴</h3>
              <p className="text-stone-600 leading-loose text-base lg:text-lg font-serif">
                本馆不仅是一座保存历史的殿堂，其建筑本身亦是一件宏大的艺术品。馆内藏品横跨数千年，从上古时期的原始陶器到明清时期的繁复珍宝，每一件文物都在默默讲述着这片土地上的兴衰荣辱。
                设计理念融合了中国传统美学与现代建筑语言，通过光影与空间的交错，引导访客进入一场跨越时空的文明对话。
              </p>
            </div>
          </div>

          <div className="lg:w-1/3">
             <div className="sticky top-28 bg-stone-50 rounded-[2.5rem] p-10 border border-stone-100">
               <div className="flex items-center gap-3 mb-10">
                 <Sparkles className="text-heritage-cinnabar animate-float" size={24} />
                 <h3 className="text-sm font-bold text-ink-black uppercase tracking-[0.3em]">观展亮点总结</h3>
               </div>
               <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xs font-bold text-heritage-cinnabar shadow-sm flex-shrink-0">01</div>
                    <p className="text-sm text-stone-500 font-medium leading-relaxed">必须观摩的“{museum.highlight}”，该文物代表了当时文明的最高水准。</p>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xs font-bold text-heritage-cinnabar shadow-sm flex-shrink-0">02</div>
                    <p className="text-sm text-stone-500 font-medium leading-relaxed">数字化沉浸式展厅，利用 VR 技术复原古代文明奇迹。</p>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xs font-bold text-heritage-cinnabar shadow-sm flex-shrink-0">03</div>
                    <p className="text-sm text-stone-500 font-medium leading-relaxed">定制化文创体验，推荐入手本季限量周边。</p>
                  </div>
               </div>
               <button 
                onClick={() => setShowDigitalGuide(true)}
                className="w-full mt-12 bg-ink-black text-white py-5 rounded-2xl font-bold tracking-[0.3em] text-[11px] uppercase hover:bg-heritage-cinnabar transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group/guide"
              >
                 <div className="w-2 h-2 bg-heritage-cinnabar rounded-full animate-pulse group-hover/guide:bg-white transition-colors"></div>
                 开启数字导览
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* 5. REIMAGINED COMMUNITY SECTION - ELEGANT LIST */}
      <section className="bg-[#FDFBF5] py-32 border-t border-stone-100">
        <div className="max-w-[1400px] mx-auto px-10 md:px-24">
          {/* Header & Rating Overview */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-ink-black mb-4">寻踪者言 · Community</h2>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="h-[1px] w-12 bg-heritage-cinnabar/30"></span>
                <p className="text-stone-400 text-sm font-medium tracking-[0.3em] uppercase italic">来自真实探索者的文化共鸣与视觉盛宴</p>
              </div>
            </div>

            <div className="flex items-center gap-10 bg-white px-10 py-6 rounded-[2rem] shadow-sm border border-stone-100">
              <div className="text-5xl font-bold text-heritage-cinnabar">4.9</div>
              <div className="h-12 w-[1px] bg-stone-100"></div>
              <div>
                <div className="flex text-gold-accent mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <div className="text-[10px] text-stone-400 font-bold tracking-widest uppercase">1,245 份真实见证</div>
              </div>
            </div>
          </div>

          {/* Medium Sized Action Button */}
          <div className="mb-20 flex justify-center">
            <button 
              className="bg-heritage-cinnabar text-white px-10 py-4 rounded-xl font-bold text-xs tracking-[0.3em] uppercase hover:bg-china-red active:scale-[0.98] transition-all shadow-lg shadow-heritage-cinnabar/10 flex items-center justify-center gap-3 group"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" /> 
              分享我的文化感悟
            </button>
          </div>

          {/* Elegant Review Flow (List Style) */}
          <div className="space-y-0">
            {mockedReviews.map((review, idx) => (
              <div key={idx} className={`py-12 flex flex-col gap-6 animate-fade-in-up ${idx !== mockedReviews.length - 1 ? 'border-b border-stone-200/40' : ''}`} style={{ animationDelay: `${idx * 150}ms` }}>
                {/* User Info Line */}
                <div className="flex items-center gap-3">
                  <img src={review.avatar} className="w-8 h-8 rounded-full border border-stone-100 shadow-sm" alt="" />
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold text-ink-black">{review.user}</span>
                    <span className="text-[10px] text-stone-300 font-bold tracking-widest uppercase">{review.date}</span>
                  </div>
                  <div className="flex text-gold-accent ml-auto">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Images on the right side of text for list feel */}
                  <div className="flex-1">
                    <p className="text-sm text-stone-600 font-sans leading-[1.8] text-justify">
                      {review.content}
                    </p>
                    <div className="mt-6 flex items-center gap-6">
                      <button className="flex items-center gap-2 text-[11px] font-bold text-stone-300 hover:text-heritage-cinnabar transition-colors group/heart">
                        <ThumbsUp size={14} className="group-hover/heart:scale-125 transition-transform" />
                        <span>{review.likes} 同感</span>
                      </button>
                      <button className="text-[10px] font-bold text-stone-300 hover:text-ink-black transition-colors uppercase tracking-widest">
                        回复见闻
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 md:w-auto w-full overflow-x-auto pb-2">
                    {review.images.map((img, imgIdx) => (
                      <div key={imgIdx} className="w-[120px] h-[120px] rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-stone-100">
                        <img src={img} className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700" alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More Button - Ghost Style */}
          <div className="mt-20 text-center">
            <button 
              onClick={() => onSeeMoreCommunity(`#${museum.name}`)}
              className="px-12 py-3.5 rounded-full border border-heritage-cinnabar/20 text-heritage-cinnabar text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-heritage-cinnabar/5 transition-all active:scale-95"
            >
              浏览更多社区见闻
            </button>
          </div>
        </div>
      </section>

      {/* 6. Footer Call to Action */}
      <section className="bg-heritage-cinnabar py-32 text-center">
        <h3 className="text-white text-4xl lg:text-5xl font-serif font-bold mb-12 tracking-widest">下一站，去往何方？</h3>
        <button 
          onClick={onBack}
          className="bg-white text-heritage-cinnabar px-20 py-6 rounded-full font-bold tracking-[0.6em] uppercase text-xs hover:bg-heritage-gold hover:text-ink-black transition-all shadow-2xl active:scale-95"
        >
          探索更多目的地
        </button>
      </section>
    </div>
  );
};

export default MuseumDetailPage;