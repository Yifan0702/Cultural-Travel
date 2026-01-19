
import React, { useState } from 'react';
import { Search, User, Mountain, Menu, X } from 'lucide-react';
import { APP_TITLE } from '../constants';

interface HeaderProps {
  onNavigateToUser: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToUser, activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tabs = ['首页', '探索目的地', '教育系列', '周边商城', '社区动态'];

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-[100] bg-paper-white/80 backdrop-blur-md border-b border-stone-100/50 h-[72px] md:h-[88px] flex items-center">
        <div className="max-w-[1360px] mx-auto w-full px-4 flex justify-between items-center">
          {/* Left: Branding */}
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => handleTabChange('首页')}>
            <div className="p-1.5 md:p-2 bg-heritage-cinnabar rounded-lg md:rounded-xl group-hover:scale-105 transition-transform">
              <Mountain className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <span className="font-serif text-lg md:text-xl font-bold text-ink-black tracking-[0.1em]">{APP_TITLE}</span>
          </div>
          
          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => handleTabChange(tab)}
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
          
          {/* Right: Search + User + Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search - hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-100 shadow-sm group focus-within:ring-2 focus-within:ring-heritage-cinnabar/10 transition-all w-48 lg:w-64">
              <Search size={14} className="text-stone-300 group-focus-within:text-heritage-cinnabar" />
              <input 
                type="text" 
                placeholder="实现探索, 文化在身边..." 
                className="bg-transparent text-[12px] outline-none border-none w-full font-medium text-ink-black placeholder:text-stone-300" 
              />
            </div>
            
            {/* User - simplified on mobile */}
            <button 
              onClick={onNavigateToUser}
              className="flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-100 soft-shadow hover:bg-heritage-cinnabar group transition-all duration-300"
            >
              <User size={16} className="text-stone-400 group-hover:text-white transition-colors" />
              <span className="hidden md:inline text-[12px] font-bold text-stone-600 group-hover:text-white transition-colors tracking-tight">个人中心</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-heritage-cinnabar transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[99] bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav 
            className="absolute top-[72px] left-0 right-0 bg-paper-white border-b border-stone-200 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-[1360px] mx-auto px-4 py-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab 
                      ? 'bg-heritage-cinnabar text-white font-bold' 
                      : 'text-stone-600 hover:bg-stone-50 font-medium'
                  }`}
                >
                  {tab}
                </button>
              ))}
              {/* Mobile Search */}
              <div className="pt-3 px-4">
                <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-stone-100 shadow-sm">
                  <Search size={16} className="text-stone-300" />
                  <input 
                    type="text" 
                    placeholder="搜索博物馆..." 
                    className="bg-transparent text-sm outline-none border-none w-full text-ink-black placeholder:text-stone-300" 
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
