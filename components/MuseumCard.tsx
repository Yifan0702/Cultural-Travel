import React from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Museum } from '../types';

interface MuseumCardProps {
  museum: Museum;
  index: number;
  onSelect?: (museum: Museum) => void;
}

const MuseumCard: React.FC<MuseumCardProps> = ({ museum, index, onSelect }) => {
  // 使用museum.image或回退到默认图片
  const imageUrl = museum.image || '/images/museums/museum-1.jpg';

  return (
    <div 
      onClick={() => onSelect?.(museum)}
      className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-stone-100 flex flex-col h-full group cursor-pointer hover:-translate-y-2"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={museum.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/museums/museum-1.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-heritage-cinnabar text-[9px] font-bold px-4 py-1.5 rounded-full shadow-lg tracking-widest uppercase">
          {museum.rating ? `★ ${museum.rating.toFixed(1)}` : 'PREMIUM'}
        </div>
      </div>
      
      <div className="p-10 flex-1 flex flex-col">
        <div className="flex items-center text-stone-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-3">
          <MapPin className="w-3 h-3 mr-1.5 text-heritage-cinnabar" />
          <span>{museum.city}</span>
        </div>

        <h3 className="text-2xl font-serif font-bold text-ink-black group-hover:text-heritage-cinnabar transition-colors leading-tight mb-4">
          {museum.name}
        </h3>

        <p className="text-stone-500 text-sm leading-loose mb-8 flex-grow font-serif italic line-clamp-3">
          "{museum.description}"
        </p>

        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-100 mb-8 group-hover:bg-heritage-cinnabar/5 group-hover:border-heritage-cinnabar/10 transition-colors">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-white rounded-lg shadow-sm">
              <Star className="w-4 h-4 text-gold-accent fill-current" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block mb-1">镇馆之宝 · Highlight</span>
              <span className="text-sm font-serif font-bold text-ink-black">{museum.highlight}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-50">
          <div className="flex gap-2">
            {museum.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-stone-100 text-stone-400 border border-stone-200/50">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-heritage-cinnabar translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
            查看详情 <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseumCard;