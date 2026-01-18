
import React from 'react';
import { Search, User, Mountain } from 'lucide-react';
import { APP_TITLE } from '../constants';

interface HeaderProps {
  onNavigateToUser: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToUser, activeTab, onTabChange }) => {
  const tabs = ['首页', '探索目的地', '教育系列', '周边商城', '社区动态'];

  return (
    <header className="sticky top-0 z-[100] bg-paper-white/80 backdrop-blur-md border-b border-stone-100/50 h-[88px] flex items-center pt-2">
      <div className="max-w-[1360px] mx-auto w-full px-4 flex justify-between items-center">
        {/* Left: Branding */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onTabChange('首页')}>
          <div className="p-2 bg-heritage-cinnabar rounded-xl group-hover:scale-105 transition-transform">
            <Mountain className="h-5 w-5 text-white" />
          </div>
          <span className="font-serif text-xl font-bold text-ink-black tracking-[0.1em]">{APP_TITLE}</span>
        </div>
        
        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => onTabChange(tab)}
              className="relative text-[14px] font-medium transition-all py-2"
            >
              <span className={activeTab === tab ? 'text-heritage-cinnabar' : 'text-stone-400 hover:text-heritage-cinnabar'}>
                {tab}
              </span>
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-heritage-cinnabar rounded-full"></div>
              )}
            </button>
          ))}
        </nav>
        
        {/* Right: Search + User */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-100 shadow-sm group focus-within:ring-2 focus-within:ring-heritage-cinnabar/10 transition-all w-48 lg:w-64">
            <Search size={14} className="text-stone-300 group-focus-within:text-heritage-cinnabar" />
            <input 
              type="text" 
              placeholder="实现探索, 文化在身边..." 
              className="bg-transparent text-[12px] outline-none border-none w-full font-medium text-ink-black placeholder:text-stone-300" 
            />
          </div>
          
          {/* User */}
          <button 
            onClick={onNavigateToUser}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-100 soft-shadow hover:bg-heritage-cinnabar group transition-all duration-300"
          >
            <User size={16} className="text-stone-400 group-hover:text-white transition-colors" />
            <span className="text-[12px] font-bold text-stone-600 group-hover:text-white transition-colors tracking-tight">个人中心</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
