
import React, { useState } from 'react';
import { 
  User, Calendar, Package, Bell, Settings, LogOut, 
  MapPin, Award, Heart, MessageSquare, History, 
  Eye, Star, ChevronRight, Shield, CreditCard, RefreshCw 
} from 'lucide-react';

type SubSection = 'bookings' | 'orders' | 'messages' | 'settings';

const PersonalCenterPage: React.FC = () => {
  const [activeSubSection, setActiveSubSection] = useState<SubSection>('bookings');
  const [activeSummary, setActiveSummary] = useState('发布');

  const user = {
    name: "苏轼迷弟",
    title: "文化守望者",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    points: 1280,
    footprints: 12
  };

  const summaries = [
    { label: '发布', count: 32 },
    { label: '收藏', count: 128 },
    { label: '评价', count: 45 },
    { label: '最近浏览', count: 210 }
  ];

  const menuItems = [
    { id: 'bookings', label: '活动预约', icon: Calendar },
    { id: 'orders', label: '我的订单', icon: Package },
    { id: 'messages', label: '消息中心', icon: Bell },
    { id: 'settings', label: '系统设置', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSubSection) {
      case 'bookings':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-serif font-bold text-ink-black tracking-widest">即将进行的行程</h3>
              <button className="text-[10px] font-bold text-stone-300 hover:text-heritage-cinnabar uppercase tracking-widest">查看全部预约</button>
            </div>
            {[
              { id: 1, title: '故宫红墙摄影课', date: '2024.12.15 14:00', location: '北京 · 故宫博物院', status: '准备出发', img: '/images/personal/trips/forbidden-city-photography.jpg' },
              { id: 2, title: '青铜器修复体验', date: '2024.12.28 10:00', location: '西安 · 陕西历史博物馆', status: '待审核', img: '/images/personal/trips/bronze-restoration.jpg' }
            ].map(item => (
              <div key={item.id} className="group bg-white rounded-3xl border border-stone-100 p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:shadow-stone-200/40 transition-all duration-500">
                <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-50">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${item.status === '准备出发' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                      {item.status}
                    </span>
                    <span className="text-[10px] text-stone-300 font-bold uppercase tracking-widest">ID: 882910</span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-ink-black group-hover:text-heritage-cinnabar transition-colors mb-3">{item.title}</h4>
                  <div className="flex flex-wrap gap-6 text-[11px] text-stone-400">
                    <div className="flex items-center gap-1.5"><Calendar size={12} /> {item.date}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={12} /> {item.location}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                   <button className="p-4 bg-stone-50 rounded-full text-stone-300 hover:bg-heritage-cinnabar hover:text-white transition-all shadow-sm">
                     <ChevronRight size={20} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-lg font-serif font-bold text-ink-black tracking-widest mb-2">近期文创订单</h3>
            {[
              { id: 1, name: '千里江山图长卷胶带', museum: '故宫博物院', status: '运输中', price: 32, img: 'https://images.unsplash.com/photo-1589368305011-82782b17f519?q=80&w=200&auto=format&fit=crop' },
              { id: 2, name: '唐三彩马复刻摆件', museum: '陕西历史博物馆', status: '已签收', price: 1280, img: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=200&auto=format&fit=crop' }
            ].map(order => (
              <div key={order.id} className="bg-white rounded-3xl border border-stone-100 p-6 flex items-center gap-6 group hover:border-heritage-cinnabar/20 transition-all">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-50 border border-stone-100">
                  <img src={order.img} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1">
                  <div className="text-[9px] font-bold text-stone-300 uppercase tracking-widest mb-1">{order.museum}</div>
                  <h4 className="text-base font-bold text-ink-black mb-1">{order.name}</h4>
                  <div className="text-sm font-bold text-heritage-cinnabar">¥{order.price}</div>
                </div>
                <div className="text-right flex flex-col items-end gap-3">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${order.status === '运输中' ? 'text-blue-500 bg-blue-50' : 'text-stone-400 bg-stone-50'}`}>{order.status}</span>
                  {order.status === '已签收' && (
                    <button className="text-[10px] font-bold text-heritage-cinnabar border-b border-heritage-cinnabar/20 pb-0.5 hover:border-heritage-cinnabar transition-all">追加评价</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      case 'messages':
        return (
          <div className="space-y-4 animate-fade-in-up">
            <h3 className="text-lg font-serif font-bold text-ink-black tracking-widest mb-4">消息中心</h3>
            {[
              { id: 1, type: '学者', title: '学者回信：关于青铜神树的见解', content: '您上次提出的关于神树三层分支的构图疑问，我们进行了专项探讨...', time: '2小时前' },
              { id: 2, type: '系统', title: '系统通知：您的故宫摄影课预约已成功', content: '请准时于12月15日下午14:00到达故宫午门入口处集合。', time: '昨天' },
              { id: 3, type: '社交', title: '博览达人 点赞了您的动态', content: '“您的那张莫高窟光影拍得太有灵气了！”', time: '3天前' }
            ].map(msg => (
              <div key={msg.id} className="p-6 bg-white rounded-2xl border border-stone-100 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${msg.type === '学者' ? 'bg-amber-50 text-amber-600' : msg.type === '系统' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                      {msg.type}
                    </span>
                    <h4 className="text-sm font-bold text-ink-black group-hover:text-heritage-cinnabar transition-colors">{msg.title}</h4>
                  </div>
                  <span className="text-[9px] text-stone-300 font-bold uppercase tracking-widest">{msg.time}</span>
                </div>
                <p className="text-xs text-stone-500 font-serif italic line-clamp-1">{msg.content}</p>
              </div>
            ))}
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-10 animate-fade-in-up max-w-2xl">
            <div>
              <h3 className="text-lg font-serif font-bold text-ink-black tracking-widest mb-8">账户设置</h3>
              <div className="space-y-6">
                {[
                  { label: '隐私设置', desc: '控制您的足迹图卷是否对公开可见', icon: Shield },
                  { label: '支付绑定', desc: '管理您的支付协议与提现账户', icon: CreditCard },
                  { label: '清空缓存', desc: '当前占用空间 128.5 MB', icon: RefreshCw }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-stone-100 group hover:border-heritage-cinnabar/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-stone-50 rounded-2xl text-stone-400 group-hover:text-heritage-cinnabar transition-colors">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-ink-black">{item.label}</div>
                        <div className="text-[10px] text-stone-400 tracking-widest mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                    <div className="w-10 h-5 bg-stone-100 rounded-full relative p-1 cursor-pointer">
                       <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-10 border-t border-stone-100 flex justify-center">
               <button className="flex items-center gap-2 text-[10px] font-bold text-stone-300 hover:text-heritage-cinnabar uppercase tracking-[0.3em] transition-all">
                 <LogOut size={16} /> 退出当前账号登录
               </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24 animate-fade-in py-10 pb-40">
      
      {/* 25% Left Sidebar */}
      <aside className="lg:w-1/4 space-y-12">
        {/* Profile Card */}
        <div className="bg-white rounded-[3rem] p-10 border border-stone-100 shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 opacity-[0.05] transform translate-x-1/4 -translate-y-1/4 rotate-12">
             <MapPin size={200} />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-heritage-cinnabar to-heritage-gold shadow-xl">
                <img src={user.avatar} className="w-full h-full rounded-full bg-white object-cover" alt="" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-2 bg-heritage-gold rounded-full border-4 border-white text-ink-black shadow-lg">
                <Award size={14} />
              </div>
            </div>
            <h2 className="text-2xl font-serif font-bold text-ink-black mb-1">{user.name}</h2>
            <p className="text-[10px] text-heritage-cinnabar font-bold uppercase tracking-[0.4em] mb-8">{user.title}</p>
            
            <div className="grid grid-cols-2 w-full gap-4 pt-8 border-t border-stone-100">
               <div>
                 <div className="text-lg font-bold text-ink-black">{user.points}</div>
                 <div className="text-[8px] text-stone-400 font-bold uppercase tracking-widest">博览积分</div>
               </div>
               <div className="border-l border-stone-100">
                 <div className="text-lg font-bold text-ink-black">{user.footprints}</div>
                 <div className="text-[8px] text-stone-400 font-bold uppercase tracking-widest">足迹城市</div>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="space-y-3 px-4">
          {menuItems.map(item => {
            const isActive = activeSubSection === item.id;
            const Icon = item.icon;
            return (
              <button 
                key={item.id}
                onClick={() => setActiveSubSection(item.id as SubSection)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${isActive ? 'bg-heritage-cinnabar text-white shadow-xl shadow-heritage-cinnabar/10' : 'text-stone-400 hover:bg-stone-50 hover:text-ink-black'}`}
              >
                <Icon size={18} className={isActive ? "" : "group-hover:text-heritage-cinnabar transition-colors"} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">{item.label}</span>
                {isActive && <div className="ml-auto w-1 h-4 bg-white/40 rounded-full"></div>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* 75% Right Content Area */}
      <main className="lg:w-3/4 flex flex-col gap-16">
        {/* Interaction Summary Panel */}
        <div className="bg-white rounded-[3rem] p-4 border border-stone-100 shadow-sm flex flex-wrap justify-center sm:justify-between items-center px-10">
          {summaries.map((s, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveSummary(s.label)}
              className="flex flex-col items-center py-6 px-8 group transition-all"
            >
              <div className={`text-2xl font-sans font-bold transition-all ${activeSummary === s.label ? 'text-heritage-cinnabar scale-110' : 'text-ink-black group-hover:text-heritage-cinnabar'}`}>
                {s.count}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeSummary === s.label ? 'text-heritage-cinnabar' : 'text-stone-300 group-hover:text-stone-500'}`}>
                {s.label}
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Section Content */}
        <section className="min-h-[500px]">
          {renderContent()}
        </section>
      </main>

    </div>
  );
};

export default PersonalCenterPage;
