
import React, { useState, useMemo } from 'react';
/* Added missing TrendingUp import */
import { Calendar, MapPin, User, ChevronLeft, ChevronRight, CheckCircle, X, Sparkles, Loader2, Play, BookOpen, Clock, Heart, Download, Link as LinkIcon, Award, Footprints, TrendingUp } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ImageWithFallback from './ImageWithFallback';
import { getImagePath } from '../utils/imageUtils';

interface Event {
  id: number;
  title: string;
  image: string;
  prompt: string;
  date: string;
  location: string;
  instructor: string;
  instructorBio: string;
  capacity: string;
  description: string;
}

interface Lecture {
  id: number;
  title: string;
  lecturer: string;
  title_desc: string;
  image: string;
  episodes: number;
  summary: string;
  keyPoints: string[];
}

interface BloggerVideo {
  id: number;
  title: string;
  blogger: string;
  cover: string;
  views: string;
  duration: string;
}

const EVENTS: Event[] = [
  {
    id: 1,
    title: "指尖上的传承：苏绣体验课",
    image: getImagePath("images/education/events/suzhou-embroidery.jpg"),
    prompt: "A close-up, high-quality photo of traditional Chinese Suzhou embroidery. Fine silk threads, a half-finished peony on a round frame. Soft natural lighting.",
    date: "2024年11月15日 14:00-16:00",
    location: "苏州博物馆 · 工艺体验室",
    instructor: "张秀芳",
    instructorBio: "江苏省非物质文化遗产(苏绣)代表性传承人。",
    capacity: "仅限 15 人",
    description: "在这个午后，我们将近距离接触流传千年的指尖艺术。在传承人的指导下，亲手绣出一朵属于自己的江南繁花。"
  },
  {
    id: 2,
    title: "大唐遗韵：唐三彩烧制技艺工作坊",
    image: getImagePath("images/education/events/tang-sancai-pottery.jpg"),
    prompt: "Exquisite Tang Sancai pottery, a horse glazed figurine with vibrant amber and green colors. Warm kiln light.",
    date: "2024年11月22日 10:00-12:00",
    location: "洛阳博物馆 · 研习工坊",
    instructor: "李建国",
    instructorBio: "国家级高级工艺美术师，潜心研究唐三彩修复与复刻三十载。",
    capacity: "仅限 10 人",
    description: "了解盛唐时期的釉陶工艺，尝试为素胚涂抹上灿烂的三彩色泽，在泥土与色彩中对话历史。"
  },
  {
    id: 3,
    title: "墨香古今：传统笔墨纸砚鉴赏",
    image: getImagePath("images/education/events/calligraphy-tools.jpg"),
    prompt: "Top down view of a Chinese scholar's desk with inkstick, inkstone, and brush. Zen style.",
    date: "2024年12月05日 15:00-17:00",
    location: "中国国家博物馆 · 讲经堂",
    instructor: "王文清",
    instructorBio: "当代书法家，致力于传统书画美学推广。",
    capacity: "开放预约 30 人",
    description: "从选纸到磨墨，从运笔到收锋。在淡淡的墨香中，领略中国文人的精神世界与书法意境。"
  }
];

const LECTURES: Lecture[] = [
  {
    id: 1,
    title: "敦煌艺术通识：壁画里的千年色彩",
    lecturer: "常青教授",
    title_desc: "著名考古学家 · 敦煌学研究领军人物",
    image: getImagePath("images/education/lectures/dunhuang-murals.jpg"),
    episodes: 12,
    summary: "本课程将带你深入莫高窟，从矿物颜料的制备到飞天造型的演变，系统解析敦煌壁画背后跨越千年的美学逻辑与历史记忆。",
    keyPoints: ["西域风格与中原审美的融合", "北朝至晚清壁画分期特征", "古代画师的色彩心理学"]
  },
  {
    id: 2,
    title: "青铜时代的礼与乐：商周文明概论",
    lecturer: "许宏教授",
    title_desc: "二里头考古队首任队长 · 先秦史专家",
    image: getImagePath("images/education/lectures/bronze-ritual.jpg"),
    episodes: 8,
    summary: "从「国之大事，在祀与戎」出发，解读青铜器铭文背后的权利更迭与宗法制度，探寻华夏文明早期的礼乐精神。",
    keyPoints: ["鼎簋制度与阶级森严", "金文中的家国情怀", "青铜器范铸法工艺还原"]
  }
];

const BLOGGER_VIDEOS: BloggerVideo[] = [
  {
    id: 1,
    title: "这件国宝背后的故事亮了！三星堆青铜神树揭秘",
    blogger: "文化探索官小北",
    cover: getImagePath("images/education/videos/sanxingdui-tree.jpg"),
    views: "12.5w",
    duration: "15:20"
  },
  {
    id: 2,
    title: "沉浸式看展：故宫隐藏的清代审美巅峰",
    blogger: "故宫里的猫",
    cover: getImagePath("images/education/videos/forbidden-city-art.jpg"),
    views: "8.9w",
    duration: "22:45"
  },
  {
    id: 3,
    title: "拆解！古代榫卯结构到底有多硬核？",
    blogger: "硬核匠人木木",
    cover: getImagePath("images/education/videos/mortise-tenon.jpg"),
    views: "25.1w",
    duration: "18:10"
  }
];

const BookingModal: React.FC<{ event: Event; onClose: () => void }> = ({ event, onClose }) => {
  const [step, setStep] = useState(1);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fade-in">
      <div className="absolute inset-0 bg-ink-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-stone-100">
        <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-ink-black transition-colors z-10">
          <X size={20} />
        </button>
        {step === 1 ? (
          <div className="p-10">
            <h3 className="text-2xl font-serif font-bold text-ink-black mb-1">预约登记</h3>
            <p className="text-stone-400 text-xs tracking-widest uppercase mb-8">Course Reservation Form</p>
            <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-2xl mb-8 border border-stone-100">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={event.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-serif font-bold text-ink-black text-sm">{event.title}</div>
                <div className="text-[10px] text-stone-500 mt-1 flex items-center gap-1">
                  <Calendar size={10} /> {event.date}
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">预约人姓名</label>
                <input required type="text" className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-heritage-cinnabar/20 outline-none" placeholder="请输入姓名" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">联系电话</label>
                <input required type="tel" className="w-full bg-stone-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-heritage-cinnabar/20 outline-none" placeholder="请输入11位手机号" />
              </div>
              <button type="submit" className="w-full bg-heritage-cinnabar text-white py-4 rounded-xl font-bold text-sm tracking-widest hover:bg-china-red transition-all active:scale-[0.98] mt-4 shadow-lg shadow-heritage-cinnabar/20">
                确认预约
              </button>
            </form>
          </div>
        ) : (
          <div className="p-16 text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-ink-black mb-3">预约提交成功</h3>
            <button onClick={onClose} className="px-10 py-3 border border-stone-200 rounded-full text-stone-600 text-xs font-bold tracking-widest hover:bg-stone-50 transition-colors">
              关闭窗口
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const VideoPlayerModal: React.FC<{ video: any; onClose: () => void }> = ({ video, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 animate-fade-in">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full h-full flex flex-col lg:flex-row overflow-hidden">
        {/* Main Player Area */}
        <div className="flex-[3] relative bg-black flex items-center justify-center group">
          <div className="absolute top-8 left-8 z-10">
             <button onClick={onClose} className="p-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all">
               <ChevronLeft size={24} />
             </button>
          </div>
          <div className="w-full max-w-5xl aspect-video bg-stone-900 rounded-2xl overflow-hidden shadow-2xl relative">
             <img src={video.image || video.cover} className="w-full h-full object-cover opacity-40" alt="" />
             <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-24 h-24 bg-white/10 hover:bg-white text-white hover:text-heritage-cinnabar rounded-full flex items-center justify-center backdrop-blur-md transition-all scale-100 hover:scale-110">
                  <Play size={40} fill="currentColor" />
                </button>
             </div>
          </div>
          {/* Controls Placeholder */}
          <div className="absolute bottom-8 left-0 right-0 px-12 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-full h-1 bg-white/20 rounded-full mb-6">
              <div className="w-1/3 h-full bg-heritage-cinnabar rounded-full"></div>
            </div>
            <div className="flex items-center justify-between text-white/60 text-[10px] font-bold tracking-widest">
              <span>00:00 / {video.duration || '45:00'}</span>
              <div className="flex gap-6">
                <button>1.0X</button>
                <button>HD</button>
              </div>
            </div>
          </div>
        </div>

        {/* Info & Sidebar Area */}
        <div className="flex-1 bg-[#1a1a1a] border-l border-white/5 p-12 flex flex-col overflow-y-auto custom-scrollbar">
          <div className="mb-12">
            <div className="flex items-center gap-2 text-heritage-cinnabar text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              <Sparkles size={14} /> {video.lecturer ? '大师讲堂' : '博主视界'}
            </div>
            <h2 className="text-3xl font-serif font-bold text-white mb-6 leading-tight">
              {video.title}
            </h2>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                 <User size={16} className="text-white/60" />
               </div>
               <div>
                  <div className="text-sm font-bold text-white">{video.lecturer || video.blogger}</div>
                  <div className="text-[10px] text-white/30 tracking-widest">{video.title_desc || '文化科普博主'}</div>
               </div>
            </div>
          </div>

          <div className="space-y-10">
             <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Download size={14} /> 资料下载
                </h4>
                <div className="space-y-3">
                   {['课程讲义 (PDF)', '重点文物对照表 (JPG)'].map((file, idx) => (
                     <button key={idx} className="w-full flex items-center justify-between p-3 rounded-xl bg-black/20 hover:bg-heritage-cinnabar/20 transition-all text-[11px] text-white/60 hover:text-white">
                        {file} <Download size={12} />
                     </button>
                   ))}
                </div>
             </div>

             <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <LinkIcon size={14} /> 关联内容
                </h4>
                <div className="grid gap-4">
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group cursor-pointer hover:border-heritage-cinnabar/30 transition-all">
                      <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-2">相关文物</div>
                      <div className="text-sm font-bold text-white/80 group-hover:text-heritage-cinnabar transition-colors">青铜神树 (3D 交互页)</div>
                   </div>
                   <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group cursor-pointer hover:border-heritage-cinnabar/30 transition-all">
                      <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest mb-2">线下工坊</div>
                      <div className="text-sm font-bold text-white/80 group-hover:text-heritage-cinnabar transition-colors">莫高窟研习营 (可预约)</div>
                   </div>
                </div>
             </div>
          </div>

          <div className="mt-auto pt-12 text-center">
             <button className="flex items-center justify-center gap-2 mx-auto text-[10px] font-bold text-white/30 hover:text-white transition-colors uppercase tracking-[0.3em]">
               <Heart size={14} /> 收藏此课程
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [eventImages, setEventImages] = useState<Record<number, string>>({});
  const [generatingIds, setGeneratingIds] = useState<Set<number>>(new Set());

  const generateAIImage = async (event: Event) => {
    if (generatingIds.has(event.id)) return;
    setGeneratingIds(prev => new Set(prev).add(event.id));
    try {
      // Create a new instance of GoogleGenAI using the environment variable API_KEY.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: event.prompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } },
      });
      let generatedUrl = "";
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
      if (generatedUrl) setEventImages(prev => ({ ...prev, [event.id]: generatedUrl }));
    } catch (error) { console.error(error); } finally { setGeneratingIds(prev => { const n = new Set(prev); n.delete(event.id); return n; }); }
  };

  return (
    <div className="w-full animate-fade-in flex flex-col pb-16 md:pb-40">
      {/* Page Header */}
      <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-black mb-2">学无止境 · 文化传薪</h2>
          <p className="text-stone-400 text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold">Bridging heritage and education through digital learning</p>
        </div>
        <div className="flex gap-2 md:gap-4">
          <button className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-stone-200 text-stone-500 text-[9px] md:text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:shadow-md transition-all">
            <Calendar size={12} className="md:w-3.5 md:h-3.5" /> <span className="hidden sm:inline">我的</span>预约
          </button>
          <button className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-heritage-cinnabar text-white text-[9px] md:text-[10px] font-bold tracking-widest uppercase hover:bg-china-red shadow-lg shadow-heritage-cinnabar/20 transition-all">
            <Footprints size={12} className="md:w-3.5 md:h-3.5" /> <span className="hidden sm:inline">学习</span>足迹
          </button>
        </div>
      </div>

      {/* Section 1: Offline Experiences */}
      <section className="mb-12 md:mb-16">
        <div id="offline-experience" className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-10 gap-4">
          <div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-ink-black flex items-center gap-2 md:gap-3">
              <MapPin className="text-heritage-cinnabar" size={20} /> 线下体验
            </h3>
            <p className="text-[9px] md:text-[10px] text-stone-400 font-bold uppercase tracking-[0.25em] md:tracking-[0.3em] mt-1 ml-7 md:ml-9">Hands-on Workshops</p>
          </div>
          <button className="text-[9px] md:text-[10px] font-bold text-stone-400 hover:text-heritage-cinnabar uppercase tracking-widest border-b border-stone-200 hover:border-heritage-cinnabar pb-1 transition-all self-start sm:self-auto">
            查看更多线下活动
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {EVENTS.map((event, idx) => (
            <div key={event.id} className="group bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-700 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="relative h-56 overflow-hidden bg-stone-100">
                <ImageWithFallback 
                  src={eventImages[event.id] || event.image} 
                  alt={event.title}
                  fallbackText={event.title.slice(0, 4)}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <button onClick={() => generateAIImage(event)} className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-heritage-cinnabar rounded-full transition-all opacity-0 group-hover:opacity-100">
                  <Sparkles size={16} />
                </button>
              </div>
              <div className="p-8">
                <h4 className="text-lg font-serif font-bold text-ink-black mb-4 group-hover:text-heritage-cinnabar transition-colors">{event.title}</h4>
                <div className="space-y-2 mb-6 text-[11px] text-stone-400 font-medium">
                  <div className="flex items-center gap-2"><Calendar size={12} /> {event.date}</div>
                  <div className="flex items-center gap-2"><MapPin size={12} /> {event.location}</div>
                </div>
                <button onClick={() => setSelectedEvent(event)} className="w-full py-3 bg-stone-50 group-hover:bg-heritage-cinnabar text-stone-600 group-hover:text-white rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all active:scale-[0.98]">
                  立即报名
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Divider */}
      <div className="w-full h-[1px] bg-stone-200/50 mb-16"></div>

      {/* Section 2: Huaxia Academy (Online) */}
      <section className="mb-16">
        {/* Part A: Master Lectures */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-serif font-bold text-ink-black flex items-center gap-3">
                <Award className="text-gold-accent" size={24} /> 大师讲堂
              </h3>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mt-1 ml-9">Master Lectures</p>
            </div>
            <button className="text-[10px] font-bold text-stone-400 hover:text-heritage-cinnabar uppercase tracking-widest border-b border-stone-200 hover:border-heritage-cinnabar pb-1 transition-all">
              查看更多课程
            </button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
             {LECTURES.map((lec, idx) => (
               <div key={lec.id} className="group flex flex-col md:flex-row bg-white rounded-[3rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700 animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="md:w-2/5 relative h-80 md:h-auto overflow-hidden">
                    <ImageWithFallback 
                      src={lec.image} 
                      alt={lec.title}
                      fallbackText={lec.lecturer.slice(0, 2)}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    <div className="absolute bottom-8 left-8">
                       <div className="text-xl font-serif font-bold text-white mb-1">{lec.lecturer}</div>
                       <div className="text-[9px] text-white/70 font-bold uppercase tracking-widest">{lec.title_desc}</div>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-10 flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-4">
                       <span className="px-3 py-1 bg-stone-100 rounded-full text-[9px] font-bold text-stone-500 tracking-widest uppercase">共 {lec.episodes} 集</span>
                       <div className="flex text-gold-accent"><Award size={14} /></div>
                    </div>
                    <h5 className="text-2xl font-serif font-bold text-ink-black mb-4 group-hover:text-heritage-cinnabar transition-colors">{lec.title}</h5>
                    <p className="text-sm text-stone-500 leading-relaxed italic mb-8">"{lec.summary}"</p>
                    <div className="space-y-2 mb-8">
                       {lec.keyPoints.map((pt, pi) => (
                         <div key={pi} className="flex items-center gap-2 text-xs text-stone-400">
                            <span className="w-1 h-1 bg-heritage-cinnabar rounded-full"></span> {pt}
                         </div>
                       ))}
                    </div>
                    <button onClick={() => setSelectedVideo(lec)} className="bg-ink-black text-white py-4 rounded-2xl text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-heritage-cinnabar transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                      <Play size={14} fill="currentColor" /> 开始学习
                    </button>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-[1px] bg-stone-200/50 mb-16"></div>

        {/* Part B: Blogger Insights */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-serif font-bold text-ink-black flex items-center gap-3">
                <TrendingUp className="text-heritage-cinnabar" size={24} /> 博主视界
              </h3>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mt-1 ml-9">Blogger Insights</p>
            </div>
            <button className="text-[10px] font-bold text-stone-400 hover:text-heritage-cinnabar uppercase tracking-widest border-b border-stone-200 hover:border-heritage-cinnabar pb-1 transition-all">
              查看更多视频
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {BLOGGER_VIDEOS.map((vid, idx) => (
               <div key={vid.id} className="group cursor-pointer animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }} onClick={() => setSelectedVideo(vid)}>
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-5 border border-stone-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                    <ImageWithFallback 
                      src={vid.cover} 
                      alt={vid.title}
                      fallbackText={vid.blogger.slice(0, 4)}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                          <Play size={24} className="text-white ml-1" fill="currentColor" />
                       </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-[9px] text-white font-bold tracking-widest">{vid.duration}</div>
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-ink-black mb-3 group-hover:text-heritage-cinnabar transition-colors leading-tight line-clamp-2">{vid.title}</h5>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-300"><User size={12} /></div>
                          <span className="text-xs text-stone-400 font-medium">{vid.blogger}</span>
                       </div>
                       <div className="flex items-center gap-1.5 text-[10px] text-stone-300 font-bold uppercase tracking-widest">
                          <Heart size={10} className="fill-current" /> {vid.views}
                       </div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Badges Concept */}
      <section className="bg-stone-50 rounded-[4rem] p-16 text-center border border-stone-100">
         <Award size={40} className="text-heritage-gold mx-auto mb-6" />
         <h3 className="text-2xl font-serif font-bold text-ink-black mb-4">开启您的文化守护之旅</h3>
         <p className="text-stone-500 text-sm max-w-xl mx-auto mb-10 leading-relaxed font-serif italic">
           完成“华夏学堂”各主题课程的学习，不仅能收获跨越千年的知识，还能解锁专属的“文化守护者”勋章，点亮您的文明版图。
         </p>
         <div className="flex justify-center gap-10 grayscale opacity-40">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-16 h-16 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-200">
                 <Award size={24} />
              </div>
            ))}
         </div>
      </section>

      {selectedEvent && <BookingModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      {selectedVideo && <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
    </div>
  );
};

export default EducationPage;
