
import React from 'react';
import { Compass, Heart, BookOpen, RefreshCw, BarChart3, ChevronRight } from 'lucide-react';

interface HomeContentLeftProps {
  onRandomPick: () => void;
}

const HomeContentLeft: React.FC<HomeContentLeftProps> = ({ onRandomPick }) => {
  return (
    <div className="flex flex-col gap-10 animate-fade-in-up py-4">
      {/* 1. Core Features */}
      <section className="space-y-6">
        <div className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.4em] mb-4">平台核心功能 · Core Features</div>
        {[
          { icon: Compass, title: '沉浸探索', desc: '点击省份，开启文化降落' },
          { icon: Heart, title: '足迹收藏', desc: '记录您的每一次文明发现' },
          { icon: BookOpen, title: '专题路线', desc: '跟随学者足迹深度研习' },
        ].map((f, i) => (
          <div key={i} className="flex gap-4 group cursor-default p-4 rounded-2xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-stone-100">
            <div className="p-3 rounded-xl bg-heritage-cinnabar/5 text-heritage-cinnabar group-hover:bg-heritage-cinnabar group-hover:text-white transition-all">
              <f.icon size={16} />
            </div>
            <div>
              <div className="text-xs font-bold text-ink-black mb-0.5">{f.title}</div>
              <div className="text-[10px] text-stone-400 font-medium">{f.desc}</div>
            </div>
          </div>
        ))}
      </section>

      {/* 2. Primary Actions */}
      <section className="flex flex-col gap-4">
        <button 
          onClick={() => document.getElementById('china-map')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full bg-heritage-cinnabar text-white py-5 rounded-2xl font-bold text-[11px] tracking-[0.3em] uppercase shadow-lg shadow-heritage-cinnabar/20 hover:bg-china-red active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          开始探索地图 <ChevronRight size={14} />
        </button>
        <button 
          onClick={onRandomPick}
          className="w-full bg-white border border-stone-200 text-stone-600 py-5 rounded-2xl font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-stone-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw size={14} /> 随机落脚一个省份
        </button>
      </section>

      {/* 3. Real-time Data Stats */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm">
          <div className="flex items-center gap-2 text-[9px] text-stone-300 font-bold uppercase tracking-widest mb-1">
            <BarChart3 size={12} /> 覆盖行政区
          </div>
          <div className="text-3xl font-serif font-bold text-ink-black">34</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm">
          <div className="flex items-center gap-2 text-[9px] text-stone-300 font-bold uppercase tracking-widest mb-1">
            <Compass size={12} /> 博物名录
          </div>
          <div className="text-3xl font-serif font-bold text-ink-black">5000+</div>
        </div>
      </section>

      {/* 4. Interactive Guide */}
      <section className="p-8 bg-white rounded-[2.5rem] border border-stone-100 shadow-sm">
        <div className="text-[9px] text-stone-300 font-bold uppercase tracking-widest mb-6">探索引导 · User Guide</div>
        <div className="space-y-5">
          {[
            { step: '01', text: '在右侧地图点击想要探索的省份' },
            { step: '02', text: '在滑出的面板中浏览精选文化场馆' },
            { step: '03', text: '开启数字导览或收藏文明足迹' },
          ].map((g, i) => (
            <div key={i} className="flex items-center gap-5">
              <div className="w-7 h-7 rounded-full bg-stone-50 flex items-center justify-center text-[10px] font-bold text-heritage-cinnabar border border-stone-200 flex-shrink-0">
                {g.step}
              </div>
              <span className="text-[11px] text-stone-500 font-medium leading-relaxed">{g.text}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeContentLeft;
