import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Heart, MessageCircle, Share2, Plus, TrendingUp, Award, Clock, X, ChevronRight } from 'lucide-react';
import { COMMUNITY_CHECKINS, COMMUNITY_FEED, FORUM_POSTS } from '../constants';
import ImageWithFallback from './ImageWithFallback';

interface CommunityPageProps {
  initialFilter?: string | null;
  onTagClick?: (tag: string) => void;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ initialFilter, onTagClick }) => {
  const [activeFilter, setActiveFilter] = useState<string | null>(initialFilter || null);

  useEffect(() => {
    setActiveFilter(initialFilter || null);
  }, [initialFilter]);

  const filteredFeed = useMemo(() => {
    if (!activeFilter) return COMMUNITY_FEED;
    const cleanFilter = activeFilter.replace('#', '');
    return COMMUNITY_FEED.filter(item => 
      item.location.includes(cleanFilter) || 
      item.content.includes(cleanFilter)
    );
  }, [activeFilter]);

  return (
    <div className="w-full animate-fade-in flex flex-col pb-16 md:pb-40">
      
      {/* 1. Header & Active Filter Display */}
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink-black mb-2">寻踪灵感</h2>
          <p className="text-stone-400 text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold">Live user updates and cultural explorations</p>
        </div>
        
        {activeFilter && (
          <div className="flex items-center gap-3 bg-heritage-cinnabar/5 border border-heritage-cinnabar/20 px-4 py-2 rounded-xl animate-fade-in-up">
            <span className="text-xs font-bold text-heritage-cinnabar tracking-widest uppercase">当前过滤：{activeFilter}</span>
            <button 
              onClick={() => setActiveFilter(null)}
              className="text-heritage-cinnabar hover:bg-heritage-cinnabar hover:text-white rounded-full p-1 transition-all"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* 2. Top Check-in Spots */}
      <section className="mb-12 md:mb-20">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-lg md:text-xl font-serif font-bold text-ink-black mb-1">本季热门地推荐</h2>
            <p className="text-[9px] md:text-[10px] text-stone-300 font-bold uppercase tracking-[0.25em] md:tracking-[0.3em]">Trending Heritage Spots</p>
          </div>
          <button className="flex items-center gap-1 text-xs md:text-sm font-bold text-stone-400 hover:text-heritage-cinnabar transition-colors group">
            查看全部
            <ChevronRight size={14} className="md:w-4 md:h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-6 md:pb-8 -mx-4 px-4 custom-scrollbar">
          {COMMUNITY_CHECKINS.map((spot) => (
            <div 
              key={spot.id} 
              onClick={() => onTagClick?.(`#${spot.title}`)}
              className="flex-shrink-0 w-64 md:w-80 group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl md:rounded-[3rem] overflow-hidden mb-3 md:mb-5 border border-stone-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                <ImageWithFallback 
                  src={spot.image} 
                  alt={spot.title}
                  fallbackText={spot.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={12} className="text-white/80" />
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{spot.tag}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-3 leading-tight">{spot.title}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-white/70 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                      {spot.count} CHECK-INS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col xl:flex-row gap-12 md:gap-20">
        {/* 3. User Feed */}
        <section className="flex-[3]">
          <div className="flex items-end justify-between mb-10">
            <div className="flex items-end gap-6">
              <div>
                <h2 className="text-xl font-serif font-bold text-ink-black mb-1">动态</h2>
                <p className="text-[10px] text-stone-300 font-bold uppercase tracking-[0.3em]">LIVE UPDATES</p>
              </div>
              <div className="flex items-center gap-6">
                <button className="text-sm font-bold text-heritage-cinnabar border-b-2 border-heritage-cinnabar pb-2 leading-none h-6 flex items-center">最热发现</button>
                <button className="text-sm font-bold text-stone-300 hover:text-stone-500 pb-2 transition-colors leading-none h-6 flex items-center">最新动态</button>
              </div>
            </div>
            <button className="flex items-center gap-1 text-sm font-bold text-stone-400 hover:text-heritage-cinnabar transition-colors group pb-1">
              更多
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-6 sm:gap-x-8 items-start">
            {filteredFeed.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[3rem] border border-stone-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-700"
              >
                <div className="relative cursor-pointer overflow-hidden" onClick={() => onTagClick?.(`#${item.location}`)}>
                  <ImageWithFallback 
                    src={item.image} 
                    alt={item.location}
                    fallbackText={item.location}
                    className="w-full h-auto object-cover block transform group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-stone-100">
                    <MapPin size={12} className="text-heritage-cinnabar" />
                    <span className="text-[10px] font-bold text-ink-black uppercase tracking-widest">#{item.location}</span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={item.user.avatar} className="w-10 h-10 rounded-full border-2 border-stone-50" alt={item.user.name} />
                    <div>
                      <div className="text-sm font-bold text-ink-black">{item.user.name}</div>
                      <div className="text-[9px] text-stone-300 font-bold uppercase tracking-widest mt-0.5">VERIFIED EXPLORER</div>
                    </div>
                  </div>
                  <p className="text-base text-stone-600 font-serif leading-loose mb-8 italic">
                    "{item.content}"
                  </p>
                  
                  {item.comments.length > 0 && (
                    <div className="space-y-4 mb-8 pt-6 border-t border-stone-50">
                      {item.comments.map((comment, idx) => (
                        <div key={idx} className="text-xs leading-relaxed">
                          <span className="font-bold text-ink-black mr-2">{comment.user}</span>
                          <span className="text-stone-400 font-serif italic">"{comment.text}"</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                    <div className="flex gap-8">
                      <button className="flex items-center gap-2 text-stone-300 hover:text-heritage-cinnabar transition-colors group/action">
                        <Heart size={18} className="group-hover/action:fill-current" />
                        <span className="text-[11px] font-bold">{item.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-stone-300 hover:text-ink-black transition-colors group/action">
                        <MessageCircle size={18} />
                        <span className="text-[11px] font-bold">{item.comments.length}</span>
                      </button>
                    </div>
                    <button className="text-stone-200 hover:text-stone-400 transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFeed.length === 0 && (
            <div className="py-40 text-center animate-fade-in">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-200">
                <X size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-400 italic">在该分类下暂无内容</h3>
              <button onClick={() => setActiveFilter(null)} className="mt-6 text-heritage-cinnabar font-bold text-xs uppercase tracking-widest border-b border-heritage-cinnabar/20 pb-1">重置过滤条件</button>
            </div>
          )}
        </section>

        {/* 4. Forum Sidebar */}
        <section className="flex-[2] lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-[3rem] border border-stone-100 shadow-sm overflow-hidden p-10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-xl font-serif font-bold text-ink-black mb-1">文化论坛</h2>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em]">Knowledge & Discussions</p>
              </div>
              <TrendingUp className="text-stone-200" size={24} />
            </div>

            <div className="space-y-8">
              {FORUM_POSTS.map((post) => (
                <div key={post.id} className="group cursor-pointer p-5 -mx-5 rounded-[1.5rem] hover:bg-stone-50 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    {post.isHot && <span className="px-2 py-0.5 bg-red-50 text-[8px] font-bold text-heritage-cinnabar rounded uppercase tracking-tighter border border-red-100">HOT</span>}
                    {post.isEssence && <span className="px-2 py-0.5 bg-amber-50 text-[8px] font-bold text-amber-600 rounded uppercase tracking-tighter border border-amber-100">TOP</span>}
                    <span className="text-[9px] text-stone-300 font-bold uppercase tracking-widest">{post.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-ink-black group-hover:text-heritage-cinnabar transition-colors mb-4 leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-1.5 opacity-60">
                      <Clock size={10} /> {post.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-12 py-5 rounded-2xl border border-dashed border-stone-200 text-stone-400 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-stone-50 hover:border-heritage-cinnabar/20 hover:text-heritage-cinnabar transition-all flex items-center justify-center gap-3">
              <Plus size={16} /> 发表我的见解
            </button>
          </div>
        </section>
      </div>

      <button className="fixed bottom-12 right-12 z-[100] bg-heritage-cinnabar text-white w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group">
        <Plus className="group-hover:rotate-90 transition-transform duration-500" size={40} />
      </button>

    </div>
  );
};

export default CommunityPage;