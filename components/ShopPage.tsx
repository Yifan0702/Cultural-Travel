
import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, LayoutGrid, Book, Palette, Home, Gift, Filter, X, ChevronLeft, ArrowRight, History, Info, Plus, Search, ScrollText, Ruler, Boxes, MapPin } from 'lucide-react';
import { SHOP_PRODUCTS, Product, ALL_MUSEUMS_LIST } from '../constants';

const HOT_MUSEUMS = ["全部", "故宫博物院", "陕西历史博物馆", "敦煌研究院", "南京博物院"];
const CATEGORIES = [
  { label: "全部", icon: LayoutGrid },
  { label: "纪念品", icon: Gift },
  { label: "书籍", icon: Book },
  { label: "艺术品", icon: Palette },
  { label: "生活家居", icon: Home },
];

const ProductDetail: React.FC<{ product: Product, onBack: () => void }> = ({ product, onBack }) => {
  const [activeImage, setActiveImage] = useState(product.image);

  useEffect(() => {
    setActiveImage(product.image);
    // Ensure detail view starts at the top
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <div className="w-full min-h-screen bg-[#FDFBF5] animate-fade-in">
      {/* Top Bar */}
      <div className="px-8 py-6 flex items-center justify-between border-b border-stone-100/50 bg-[#FDFBF5] sticky top-0 z-10 shadow-sm">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-stone-400 hover:text-heritage-cinnabar transition-all text-xs font-bold tracking-widest uppercase group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          返回商店
        </button>
        <div className="text-[10px] text-stone-300 font-bold tracking-[0.3em] uppercase hidden sm:block">
          Museum Heritage Archive · Official Product
        </div>
        <div className="w-20"></div>
      </div>

      <div id="detail-content" className="w-full">
        <div className="max-w-[1400px] mx-auto w-full px-8 py-12">
          {/* Main Layout: 38:62 Split for Premium Visual Hierarchy */}
          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            
            {/* Left Section: Gallery (38%) */}
            <div className="lg:w-[38%] flex flex-col gap-8 lg:sticky lg:top-8 self-start">
              {/* Main Image - Fixed Size Container */}
              <div className="relative w-full h-[720px] rounded-[2.5rem] overflow-hidden bg-stone-50 shadow-2xl shadow-stone-200/40 border border-stone-100/60">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover animate-fade-in transition-all duration-500" 
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=800&auto=format&fit=crop'; }}
                />
              </div>
              
              {/* Thumbnail Gallery - Fixed Size */}
              <div className="flex gap-4 justify-center">
                 {product.gallery.map((img, i) => (
                   <button 
                     key={`${product.id}-thumb-${i}`} 
                     onClick={() => setActiveImage(img)}
                     className={`w-24 h-24 rounded-2xl border-2 overflow-hidden transition-all duration-300 flex-shrink-0 ${activeImage === img ? 'border-heritage-cinnabar shadow-lg scale-105' : 'border-stone-100 opacity-60 hover:opacity-100 hover:border-stone-200'}`}
                   >
                     <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" alt={`View ${i + 1}`} />
                   </button>
                 ))}
              </div>
            </div>

            {/* Right Section: Info (62%) */}
            <div className="lg:w-[62%] flex flex-col space-y-8">
              {/* Core Information Header */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">来源于：</span>
                  <span className="px-3 py-1 bg-stone-100 rounded-full text-[10px] font-bold text-stone-600 uppercase tracking-widest">
                    {product.museum}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-ink-black mb-6 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-heritage-cinnabar font-sans tracking-tight">
                    <span className="text-lg mr-1 font-medium">¥</span>{product.price}
                  </span>
                  <span className="text-stone-300 text-xs line-through font-medium">参考价: ¥{Math.round(product.price * 1.2)}</span>
                </div>
              </div>

              {/* Cultural Narrative Description */}
              <section className="relative">
                <div className="absolute -left-6 top-0 w-1 h-full bg-stone-100 rounded-full"></div>
                <div className="flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <Info size={14} className="text-stone-300" /> 设计灵感 · 美学叙事
                </div>
                <p className="text-stone-600 leading-relaxed text-[15px] lg:text-base font-serif italic text-justify pr-8">
                  {product.description}
                </p>
              </section>

              {/* Cultural Provenance Section */}
              <section className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm relative overflow-hidden group">
                <div className="absolute right-0 top-0 opacity-[0.03] transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-1000">
                  <ScrollText size={300} strokeWidth={0.5} />
                </div>
                
                <div className="flex items-center gap-3 text-heritage-cinnabar text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
                  <ScrollText size={20} /> 文化溯源
                </div>
                
                <div className="relative z-10">
                  <p className="text-stone-700 font-serif leading-loose text-sm mb-5">
                    {product.history}
                  </p>
                  <div className="flex items-center gap-2 py-4 border-t border-stone-50">
                    <History size={14} className="text-stone-300" />
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">历史脉络记录 · Archive Record</span>
                  </div>
                </div>
              </section>

              {/* Specifications Grid Layout */}
              <section>
                <div className="flex items-center gap-3 text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-5">
                  <Boxes size={14} /> 规格参数
                </div>
                <div className="grid grid-cols-2 gap-y-6 gap-x-12 pt-4">
                  <div className="group">
                    <div className="flex items-center gap-2 text-[9px] text-stone-300 font-bold uppercase tracking-widest mb-3">
                      <Ruler size={10} /> 尺寸规格
                    </div>
                    <div className="text-sm text-stone-700 font-medium pb-4 border-b border-stone-100 group-hover:border-heritage-cinnabar/30 transition-colors">
                      {product.specs}
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-2 text-[9px] text-stone-300 font-bold uppercase tracking-widest mb-3">
                      <Palette size={10} /> 主要材质
                    </div>
                    <div className="text-sm text-stone-700 font-medium pb-4 border-b border-stone-100 group-hover:border-heritage-cinnabar/30 transition-colors">
                      {product.material}
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-2 text-[9px] text-stone-300 font-bold uppercase tracking-widest mb-3">
                      <Boxes size={10} /> 匠心工艺
                    </div>
                    <div className="text-sm text-stone-700 font-medium pb-4 border-b border-stone-100 group-hover:border-heritage-cinnabar/30 transition-colors">
                      {product.category === '艺术品' ? '古法柴烧 / 手工复刻' : '精密数字化工艺'}
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-center gap-2 text-[9px] text-stone-300 font-bold uppercase tracking-widest mb-3">
                      <MapPin size={10} /> 馆藏归属
                    </div>
                    <div className="text-sm text-stone-700 font-medium pb-4 border-b border-stone-100 group-hover:border-heritage-cinnabar/30 transition-colors">
                      {product.museum}
                    </div>
                  </div>
                </div>
              </section>

              {/* Floating Action Bar at Bottom */}
              <div className="pt-6 pb-12 flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-[#FDFBF5]/95 backdrop-blur-md mt-auto z-20">
                <button className="flex-[2] bg-heritage-cinnabar text-white py-3.5 px-6 rounded-2xl font-semibold text-sm tracking-[0.2em] shadow-xl shadow-heritage-cinnabar/20 hover:bg-china-red active:scale-[0.98] transition-all flex items-center justify-center gap-2.5">
                  <ShoppingCart size={18} /> 立即购买
                </button>
                <button className="flex-1 bg-white border border-stone-200 text-stone-600 py-3.5 px-6 rounded-2xl font-semibold text-sm tracking-[0.15em] hover:bg-stone-50 active:scale-[0.98] transition-all">
                  加入购物车
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopPage: React.FC = () => {
  const [selectedMuseum, setSelectedMuseum] = useState("全部");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMuseums = useMemo(() => {
    return ALL_MUSEUMS_LIST.filter(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter(p => {
      const museumMatch = selectedMuseum === "全部" || p.museum === selectedMuseum;
      const categoryMatch = selectedCategory === "全部" || p.category === selectedCategory;
      return museumMatch && categoryMatch;
    });
  }, [selectedMuseum, selectedCategory]);

  const handleSelectFromMore = (museum: string) => {
    setSelectedMuseum(museum);
    setIsMoreOpen(false);
    setSearchQuery("");
  };

  // If product detail is open, ONLY render detail (not shop list)
  if (selectedProduct) {
    return (
      <ProductDetail 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
      />
    );
  }

  return (
    <div className="w-full animate-fade-in bg-[#FDFBF5] min-h-screen">
      {/* Page Title */}
      <div className="mb-12">
        <h2 className="text-3xl font-serif font-bold text-ink-black mb-2">周边商城</h2>
        <p className="text-stone-400 text-[10px] tracking-[0.4em] uppercase font-bold">Cultural products and authentic souvenirs</p>
      </div>
      
      {/* Filtering Section */}
      <div className="space-y-8 mb-16">
        <div className="flex items-center gap-6 overflow-x-auto pb-4 custom-scrollbar">
          <div className="flex-shrink-0 text-[10px] font-bold text-stone-400 uppercase tracking-widest">所属馆舍</div>
          <div className="flex gap-3 items-center">
            {HOT_MUSEUMS.map(m => (
              <button 
                key={m}
                onClick={() => setSelectedMuseum(m)}
                className={`px-6 py-2 rounded-full text-[11px] font-bold transition-all whitespace-nowrap border ${
                  selectedMuseum === m 
                  ? 'bg-heritage-cinnabar border-heritage-cinnabar text-white shadow-lg shadow-heritage-cinnabar/10' 
                  : 'bg-white border-stone-200 text-stone-500 hover:border-heritage-cinnabar/30 hover:text-heritage-cinnabar'
                }`}
              >
                {m}
              </button>
            ))}
            {!HOT_MUSEUMS.includes(selectedMuseum) && selectedMuseum !== "全部" && (
                <div className="px-6 py-2 rounded-full text-[11px] font-bold bg-heritage-cinnabar border-heritage-cinnabar text-white shadow-lg shadow-heritage-cinnabar/10 whitespace-nowrap">
                   {selectedMuseum}
                </div>
            )}
            <button 
              onClick={() => setIsMoreOpen(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold text-stone-400 border border-dashed border-stone-300 hover:border-heritage-cinnabar hover:text-heritage-cinnabar transition-all whitespace-nowrap group"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform" /> 更多场馆
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto pb-4 custom-scrollbar">
          <div className="flex-shrink-0 text-[10px] font-bold text-stone-400 uppercase tracking-widest">文创品类</div>
          <div className="flex gap-4">
            {CATEGORIES.map(({ label, icon: Icon }) => (
              <button 
                key={label}
                onClick={() => setSelectedCategory(label)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-bold transition-all border ${
                  selectedCategory === label 
                  ? 'bg-heritage-cinnabar border-heritage-cinnabar text-white shadow-lg shadow-heritage-cinnabar/10' 
                  : 'bg-white border-stone-200 text-stone-500 hover:border-heritage-cinnabar/30 hover:text-heritage-cinnabar'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Display */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-12 pb-40">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white mb-6 border border-stone-100 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-stone-300/40 group-hover:-translate-y-2">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out" 
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=800&auto=format&fit=crop'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl text-heritage-cinnabar hover:bg-heritage-cinnabar hover:text-white transition-colors">
                    <ShoppingCart size={20} />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">{product.museum}</div>
                <h3 className="text-base font-serif font-bold text-ink-black mb-3 group-hover:text-heritage-cinnabar transition-colors leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-heritage-cinnabar font-sans">
                    <span className="text-xs mr-0.5">¥</span>{product.price}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-stone-300 font-bold uppercase tracking-tighter group-hover:text-stone-500 transition-colors">
                    查看详情 <ArrowRight size={10} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[50vh] flex flex-col items-center justify-center text-center animate-fade-in">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6"><Filter className="text-stone-300" /></div>
          <h3 className="text-xl font-serif font-bold text-ink-black mb-2">暂无该分类产品</h3>
          <p className="text-stone-400 text-sm italic">请尝试更换筛选条件</p>
        </div>
      )}

      {/* Museum Index Modal */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 sm:p-10 animate-fade-in overflow-hidden">
          <div className="absolute inset-0 bg-ink-black/75 backdrop-blur-[16px]" onClick={() => setIsMoreOpen(false)}></div>
          <div className="relative bg-[#FDFBF5] w-full max-w-5xl h-[85vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border border-stone-200">
            <div className="p-8 sm:p-12 border-b border-stone-100 bg-white z-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-ink-black">馆舍索引</h3>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.3em] mt-2">All Museum Partners</p>
                </div>
                <button onClick={() => setIsMoreOpen(false)} className="p-4 hover:bg-heritage-cinnabar/10 rounded-full text-stone-400 hover:text-heritage-cinnabar transition-all group active:scale-90">
                  <X size={32} />
                </button>
              </div>
              <div className="relative group max-w-2xl">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-heritage-cinnabar transition-colors" size={20} />
                <input 
                  type="text" placeholder="搜索馆舍名称..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl py-5 pl-16 pr-6 text-base outline-none focus:ring-2 focus:ring-heritage-cinnabar/20 focus:bg-white transition-all placeholder:text-stone-300 font-medium" 
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar bg-[#FDFBF5]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-12">
                {filteredMuseums.length > 0 ? (
                  filteredMuseums.map(museum => (
                    <button key={museum} onClick={() => handleSelectFromMore(museum)} className={`text-left p-6 rounded-2xl transition-all border ${selectedMuseum === museum ? 'bg-heritage-cinnabar border-heritage-cinnabar text-white shadow-lg' : 'bg-white border-stone-100 text-stone-600 hover:border-heritage-cinnabar/40 hover:shadow-xl hover:-translate-y-1'}`}>
                      <span className="text-sm font-bold block truncate">{museum}</span>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center">
                    <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6"><Search className="text-stone-300" size={32} /></div>
                    <p className="text-stone-500 font-serif italic">未找到匹配的场馆</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
