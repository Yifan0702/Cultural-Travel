
export const PROVINCES = [
  "北京", "上海", "陕西", "江苏", "浙江", 
  "四川", "广东", "河南", "湖南", "湖北", 
  "甘肃", "辽宁", "云南", "福建", "山东",
  "山西", "河北", "黑龙江", "吉林", "安徽",
  "江西", "贵州", "海南", "青海", "台湾",
  "内蒙古", "广西", "西藏", "宁夏", "新疆",
  "天津", "重庆", "香港", "澳门"
];

export const APP_TITLE = "华夏博览";
export const APP_SUBTITLE = "探索中华五千年文明的瑰宝";

export const DEFAULT_TOP_LISTS = [
  {
    category: "历史文明 · 必游经典",
    icon: "history",
    items: [
      { name: "故宫博物院", location: "北京", tag: "皇家建筑" },
      { name: "中国国家博物馆", location: "北京", tag: "中华瑰宝" },
      { name: "秦始皇帝陵博物院", location: "陕西·西安", tag: "世界奇迹" },
      { name: "陕西历史博物馆", location: "陕西·西安", tag: "古都明珠" }
    ]
  },
  {
    category: "艺术美学 · 视觉盛宴",
    icon: "palette",
    items: [
      { name: "上海博物馆", location: "上海", tag: "青铜陶瓷" },
      { name: "苏州博物馆", location: "江苏·苏州", tag: "贝聿铭作" },
      { name: "浙江省博物馆", location: "浙江·杭州", tag: "江南风韵" },
      { name: "敦煌莫高窟", location: "甘肃·敦煌", tag: "壁画艺术" }
    ]
  },
  {
    category: "自然科技 · 探索发现",
    icon: "compass",
    items: [
      { name: "上海科技馆", location: "上海", tag: "科普互动" },
      { name: "自贡恐龙博物馆", location: "四川·自贡", tag: "侏罗纪" },
      { name: "中国航海博物馆", location: "上海", tag: "航海历史" }
    ]
  }
];

export interface CommunityCheckIn {
  id: number;
  title: string;
  image: string;
  count: string;
  tag: string;
}

export const COMMUNITY_CHECKINS: CommunityCheckIn[] = [
  { id: 1, title: "故宫红墙", image: "/images/community/ginkgo-temple.jpg", count: "128.5k", tag: "北京" },
  { id: 2, title: "莫高窟九层楼", image: "/images/community/fireworks-lake.jpg", count: "45.2k", tag: "甘肃" },
  { id: 3, title: "兵马俑一号坑", image: "/images/community/nordic-winter.jpg", count: "89.1k", tag: "陕西" },
  { id: 4, title: "南京博物院特展区", image: "/images/community/ginkgo-architecture.jpg", count: "32.4k", tag: "江苏" },
  { id: 5, title: "西湖断桥雪", image: "/images/community/window-snow.jpg", count: "210k", tag: "浙江" }
];

export interface CommunityFeedItem {
  id: number;
  user: { name: string; avatar: string };
  image: string;
  content: string;
  likes: number;
  comments: { user: string; text: string }[];
  location: string;
}

export const COMMUNITY_FEED: CommunityFeedItem[] = [
  {
    id: 1,
    user: { name: "云游诗人", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" },
    image: "/images/community/posts/ginkgo-temple-roof.jpg",
    content: "今日在故宫，红墙衬着瑞雪，仿佛穿越回了那个辉煌的时代。每一块砖瓦都在低语。",
    likes: 342,
    location: "故宫博物院",
    comments: [
      { user: "苏轼迷弟", text: "真漂亮，这辈子一定要在下雪的时候去一次故宫。" },
      { user: "画堂春", text: "光影绝了，构图很有高级感。" }
    ]
  },
  {
    id: 2,
    user: { name: "青灯影", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" },
    image: "/images/community/posts/mogao-murals.jpg",
    content: "敦煌壁画带来的冲击是巨大的。那种跨越千年的艳丽色彩，是现代科技难以复刻的神韵。",
    likes: 856,
    location: "敦煌莫高窟",
    comments: [
      { user: "敦煌守护者", text: "感谢分享，壁画确实需要更多人的关注和保护。" }
    ]
  },
  {
    id: 3,
    user: { name: "古建筑狂热粉", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=George" },
    image: "/images/community/posts/celadon-bowl.jpg",
    content: "苏州博物馆的建筑本身就是一件艺术品。贝聿铭先生将现代与传统融合到了极致。",
    likes: 120,
    location: "苏州博物馆",
    comments: [
      { user: "小透明", text: "那个片石假山真的绝了。" }
    ]
  },
  {
    id: 4,
    user: { name: "金陵往事", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Caleb" },
    image: "/images/community/posts/nanjing-celadon.jpg",
    content: "在南博见到了影青釉。那种温润如玉的质感，让人感叹古人的审美。",
    likes: 67,
    location: "南京博物院",
    comments: []
  }
];

export interface ForumPost {
  id: number;
  title: string;
  category: string;
  author: string;
  time: string;
  isHot?: boolean;
  isEssence?: boolean;
}

export const FORUM_POSTS: ForumPost[] = [
  { id: 1, title: "【攻略】三天玩转西安：博物馆深度路线规划", category: "路线规划", author: "长安老铁", time: "2小时前", isHot: true },
  { id: 2, title: "关于三星堆新出土金面具的工艺探讨", category: "学术讨论", author: "考古小陈", time: "5小时前", isEssence: true },
  { id: 3, title: "寻找消失的文化：这些冷门小众博物馆千万别错过", category: "寻宝攻略", author: "独行侠", time: "昨天" },
  { id: 4, title: "唐三彩色彩形成的技术分析", category: "学术讨论", author: "陶瓷研究员", time: "昨天", isHot: true },
  { id: 5, title: "江南水乡：围绕苏浙一带的文创打卡指南", category: "寻宝攻略", author: "精致女孩", time: "3天前" }
];

export interface Product {
  id: number;
  name: string;
  museum: string;
  category: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  history: string;
  specs: string;
  material: string;
}

export const SHOP_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "《大明宫》数字艺术折扇",
    museum: "陕西历史博物馆",
    category: "纪念品",
    price: 158,
    image: "/images/shop/products/daming-palace-fan.jpg",
    gallery: [
      "/images/shop/products/daming-palace-fan.jpg",
      "/images/shop/products/daming-palace-fan.jpg",
      "/images/shop/products/daming-palace-fan.jpg"
    ],
    description: "扇面通过数字化修复技术，重现大明宫宣政殿、麟德殿的壮丽景观。扇骨精选上等头青冬竹，手感细腻温润。轻摇扇动，仿佛能感受到千年盛唐吹来的微风，带着万宫之宫的威严与雅致，是兼具实用性与历史厚重感的艺术收藏。",
    history: "大明宫曾是唐帝国的统治中心，被誉为“万宫之宫”。本款折扇的设计灵感来源于考古发掘出的建筑基址与传世画卷，利用现代数字绘画技术还原其红墙金瓦、斗拱纵横的繁华盛景，展现了中国古代木构建筑的最高水平。",
    specs: "10寸 · 15方",
    material: "桑蚕丝扇面 · 手磨头青竹"
  },
  {
    id: 2,
    name: "莫高窟壁画艺术丝巾",
    museum: "敦煌研究院",
    category: "艺术品",
    price: 450,
    image: "/images/shop/products/mogao-silk-scarf.jpg",
    gallery: [
      "/images/shop/products/mogao-silk-scarf.jpg",
      "/images/shop/products/mogao-silk-scarf.jpg",
      "/images/shop/products/mogao-silk-scarf.jpg"
    ],
    description: "以敦煌莫高窟标志性的“九色鹿”与“飞天”纹样为核心，采用顶级桑蚕丝织就，触感丝滑。色彩经过百次比对，完美还原矿物颜料在千年时光洗礼下的独特质感。飘逸的流云纹饰与神圣的佛国景象相互辉映，将这份世界文化遗产的绚烂，化作指尖与颈间的优雅。",
    history: "敦煌壁画是中国石窟艺术的瑰宝。其中的九色鹿图案出自第257窟，传递着善良、诚信与慈悲。此款丝巾不仅是服饰配件，更是敦煌学研究成果与现代丝绸工艺的结晶，让深藏于沙漠中的璀璨文明，以流动的姿态回归生活。",
    specs: "90cm * 90cm",
    material: "100% 桑蚕丝 (14姆米)"
  },
  {
    id: 3,
    name: "云纹如意香薰炉",
    museum: "南京博物院",
    category: "生活家居",
    price: 399,
    image: "/images/shop/products/incense-burner.jpg",
    gallery: [
      "/images/shop/products/incense-burner.jpg",
      "/images/shop/products/incense-burner.jpg",
      "/images/shop/products/incense-burner.jpg"
    ],
    description: "器型端庄稳重，炉身环绕精美的云纹与如意结装饰，寓意平安祥瑞。选用特种合金复刻青铜质感，表面经多层仿古工艺处理。当线香燃起，缕缕轻烟顺着缕空的如意云纹袅袅升起，宁静致远，为案头工作或品茗时光增添一抹古典书卷气息。",
    history: "“如意”作为中国传统的吉祥器物，其云纹变体象征着对自然灵气的崇拜与生活美好的祈愿。此炉设计参考了南京博物院馆藏的明清宣德款香炉细节，将古人的香道文化与现代家居氛围完美融合，旨在喧嚣中营造一份中式静谧。",
    specs: "直径 10cm · 高 8cm",
    material: "精工合金 · 仿古古铜釉面"
  },
  {
    id: 4,
    name: "千里江山图长卷胶带",
    museum: "故宫博物院",
    category: "纪念品",
    price: 32,
    image: "/images/shop/products/qianli-jiangshan-tap.jpg",
    gallery: [
      "/images/shop/products/qianli-jiangshan-tap.jpg",
      "/images/shop/products/qianli-jiangshan-tap.jpg",
      "/images/shop/products/qianli-jiangshan-tap.jpg"
    ],
    description: "微缩复刻北宋王希孟《千里江山图》，采用特种和纸材质，触感柔韧且不易留胶痕。长达10米的胶带循环展示了青绿山水的巅峰之作：峰峦叠嶂，江河浩渺，茅舍村庄点缀其间。无论是作为手账装饰，还是礼品包装，都能让收礼者感受到中华山水画博大精深的意境。",
    history: "《千里江山图》是故宫博物院的“镇馆之宝”之一，由十八岁天才画家王希孟在北宋宣和年间创作。该图以石青、石绿等天然矿物颜料绘就，色彩千年不褪。本款胶带致力于将这幅传世名作带入日常办公，让美学与实用在方寸之间共生。",
    specs: "30mm * 10m / 卷",
    material: "进口和纸 · UV印刷"
  },
  {
    id: 5,
    name: "瑞兽系列金属书签",
    museum: "南京博物院",
    category: "纪念品",
    price: 68,
    image: "/images/shop/products/metal-bookmark.jpg",
    gallery: [
      "/images/shop/products/metal-bookmark.jpg",
      "/images/shop/products/metal-bookmark.jpg",
      "/images/shop/products/metal-bookmark.jpg"
    ],
    description: "以故宫建筑脊兽为原型，采用精密金属蚀刻技术，线条流畅细如发丝。书签表面经过真金电镀，不仅光泽持久，更具有极佳的耐腐蚀性。它是古老建筑智慧在纸间的停留，也是对传统匠心精神的微缩致敬，为每一次翻开书页的瞬间，带来皇家建筑的庄重与静谧。",
    history: "故宫的屋檐脊兽不仅是装饰，更是等级与辟邪消灾的象征。从领头骑凤仙人到身后的狮子、海马、天马。本系列选取了寓意最为祥瑞的“龙”与“麒麟”作为主设计，旨在将故宫的护佑之意，传递给每一位热爱阅读的人。",
    specs: "45mm * 120mm",
    material: "黄铜电镀真金"
  },
  {
    id: 6,
    name: "唐三彩马复刻摆件",
    museum: "陕西历史博物馆",
    category: "艺术品",
    price: 1280,
    image: "/images/shop/products/tang-sancai-horse.jpg",
    gallery: [
      "/images/shop/products/tang-sancai-horse.jpg",
      "/images/shop/products/tang-sancai-horse.jpg",
      "/images/shop/products/tang-sancai-horse.jpg"
    ],
    description: "纯手工采用传统工艺复刻唐代盛世三彩，骏马姿态英挺，肌肉线条矫健。其釉色在窑内高温下自然流淌、交融，形成了独一无二的斑斓纹理。这不仅是一件摆件，更是大唐帝国包容自信、昂扬向上精神风貌的微缩写照，展现了中国传统低温铅釉陶器的最高艺术成就。",
    history: "唐三彩盛行于唐代，以黄、绿、白三色为主，是丝绸之路文化交流的物证. 此件复刻品采用洛阳唐三彩原产地高岭土，遵循古法配方与分段烧制技术，旨在最大程度还原盛唐时期那一抹鲜活而灵动的历史底蕴。",
    specs: "高 28cm · 宽 32cm",
    material: "天然瓷土 · 低温铅釉"
  },
  {
    id: 7,
    name: "青花影青釉餐具套装",
    museum: "南京博物院",
    category: "艺术品",
    price: 588,
    image: "/images/shop/products/celadon-tableware.jpg",
    gallery: [
      "/images/shop/products/celadon-tableware.jpg",
      "/images/shop/products/celadon-tableware.jpg",
      "/images/shop/products/celadon-tableware.jpg"
    ],
    description: "这套二十二头餐具融合了“青如天、明如镜”的影青釉质感与灵动的青花缠枝纹。瓷胎致密半透明，在灯光下呈现出淡淡的鸭蛋青色。细腻的纹饰经过手工勾勒，层次丰富。无论是日常进餐还是待客盛宴，这套瓷器都能赋予餐桌一份来自北宋景德镇窑火淬炼后的儒雅与洁净。",
    history: "影青釉又名青白瓷，是宋代著名的瓷器品种。南京博物院馆藏多件精美青白瓷器，本产品提取其中的缠枝莲纹与如意头纹作为设计元素，并根据现代人体工程学改良碗盘弧度，是“古艺新用”的最佳范例，传递着平安、连绵不绝的美好祝愿。",
    specs: "22件套 (含餐盘、碗、匙)",
    material: "优质高岭土 · 1300℃高温瓷"
  },
  {
    id: 8,
    name: "《敦煌：石窟艺术的瑰宝》书籍",
    museum: "故宫博物院",
    category: "书籍",
    price: 298,
    image: "/images/shop/products/dunhuang-book.jpg",
    gallery: [
      "/images/shop/products/dunhuang-book.jpg",
      "/images/shop/products/dunhuang-book.jpg",
      "/images/shop/products/dunhuang-book.jpg"
    ],
    description: "这是一本跨越千年的影像集. 全书采用特种哑粉纸精美印刷，高清收录了莫高窟最具代表性的彩塑与壁画. 从北魏的古朴到盛唐的繁丽，每一页都配有权威专家的深度导读，带您走进那座被沙漠守护的“墙壁上的图书馆”，感悟人类宗教艺术与历史人文交织出的壮丽乐章。",
    history: "敦煌莫高窟是中国乃至世界现存规模最大、内容最丰富的佛教艺术地. 本书由敦煌研究院官方编纂，包含多处非开放特窟的独家珍贵照片，致力于将这一人类共有文化遗产的细节，以最高清的规格呈现在读者面前，极具学术研究与艺术鉴赏价值。",
    specs: "260mm * 350mm · 420页",
    material: "200g 特种哑粉纸 · 布艺精装"
  }
];

export const PROVINCE_PREVIEWS: Record<string, string[]> = {
  "北京": ["故宫博物院", "中国国家博物馆", "首都博物馆"],
  "上海": ["上海博物馆", "上海科技馆", "中华艺术宫"],
  "陕西": ["秦始皇帝陵博物院", "陕西历史博物馆", "西安碑林博物馆"],
  "江苏": ["南京博物院", "苏州博物馆", "扬州博物馆"],
  "浙江": ["浙江省博物馆", "良渚博物院", "中国丝绸博物馆"],
  "四川": ["三星堆博物馆", "成都武侯祠博物馆", "杜甫草堂博物馆"],
  "广东": ["广东省博物馆", "西汉南越王博物馆", "深圳博物馆"],
  "河南": ["河南博物院", "洛阳博物馆", "中国文字博物馆"],
  "湖南": ["湖南博物院", "长沙简牍博物馆", "韶山毛泽东同志纪念馆"],
  "湖北": ["湖北省博物馆", "辛亥革命博物馆", "武汉博物馆"],
  "甘肃": ["甘肃省博物馆", "敦煌莫高窟", "天水麦积山石窟"],
  "辽宁": ["辽宁省博物馆", "沈阳故宫博物院", "旅顺博物馆"],
  "云南": ["云南省博物馆", "云南陆军讲武堂历史博物馆", "云南民族博物馆"],
  "福建": ["福建博物院", "泉州海外交通史博物馆", "古田会议纪念馆"],
  "山东": ["山东博物馆", "孔子博物馆", "青岛啤酒博物馆"],
  "山西": ["山西博物院", "大同市博物馆", "晋祠博物馆"],
  "河北": ["河北博物院", "西柏坡纪念馆", "山海关长城博物馆"],
  "黑龙江": ["黑龙江省博物馆", "侵华日军第七三一部队罪证陈列馆", "大庆铁人王进喜纪念馆"],
  "吉林": ["吉林省博物院", "伪满皇宫博物院", "长影旧址博物馆"],
  "安徽": ["安徽博物院", "安徽中国徽州文化博物馆", "渡江战役纪念馆"],
  "江西": ["江西省博物馆", "南昌八一起义纪念馆", "景德镇中国陶瓷博物馆"],
  "贵州": ["贵州省博物馆", "遵义会议纪念馆", "四渡赤水纪念馆"],
  "海南": ["海南省博物馆", "中国(海南)南海博物馆", "三亚自然博物馆"],
  "青海": ["青海省博物馆", "青海藏医药文化博物馆", "柳湾彩陶博物馆"],
  "台湾": ["台北故宫博物院", "奇美博物馆", "台湾历史博物馆"],
  "内蒙古": ["内蒙古博物院", "鄂尔多斯博物馆", "昭君博物院"],
  "广西": ["广西民族博物馆", "广西壮族自治区博物馆", "桂林博物馆"],
  "西藏": ["西藏博物馆", "布达拉宫珍宝馆", "罗布林卡"],
  "宁夏": ["宁夏博物馆", "西夏陵博物馆", "固原博物馆"],
  "新疆": ["新疆维吾尔自治区博物馆", "吐鲁番博物馆", "楼兰博物馆"],
  "天津": ["天津博物馆", "天津自然博物馆", "平津战役纪念馆"],
  "重庆": ["重庆中国三峡博物馆", "重庆红岩革命历史博物馆", "白鹤梁水下博物馆"],
  "香港": ["香港故宫文化博物馆", "香港历史博物馆", "香港科学馆"],
  "澳门": ["澳门博物馆", "澳门艺术博物馆", "海事博物馆"]
};

export const ALL_MUSEUMS_LIST = Array.from(new Set(Object.values(PROVINCE_PREVIEWS).flat())).sort();

// Province banner gradient colors
export const PROVINCE_COLORS: Record<string, string> = {
  "北京": "linear-gradient(135deg, #8B2323 0%, #D4AF37 50%, #C19A6B 100%)",
  "上海": "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
  "陕西": "linear-gradient(135deg, #92400e 0%, #ea580c 50%, #fb923c 100%)",
  "江苏": "linear-gradient(135deg, #134e4a 0%, #14b8a6 50%, #5eead4 100%)",
  "浙江": "linear-gradient(135deg, #065f46 0%, #10b981 50%, #6ee7b7 100%)",
  "四川": "linear-gradient(135deg, #7c2d12 0%, #dc2626 50%, #f87171 100%)",
  "广东": "linear-gradient(135deg, #831843 0%, #e11d48 50%, #fb7185 100%)",
  "河南": "linear-gradient(135deg, #854d0e 0%, #eab308 50%, #fde047 100%)",
  "湖南": "linear-gradient(135deg, #991b1b 0%, #ef4444 50%, #fca5a5 100%)",
  "湖北": "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #93c5fd 100%)",
  "甘肃": "linear-gradient(135deg, #9f1239 0%, #db2777 50%, #f9a8d4 100%)",
  "辽宁": "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #c4b5fd 100%)",
  "云南": "linear-gradient(135deg, #166534 0%, #22c55e 50%, #86efac 100%)",
  "福建": "linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 50%, #7dd3fc 100%)",
  "山东": "linear-gradient(135deg, #713f12 0%, #f59e0b 50%, #fcd34d 100%)",
  "山西": "linear-gradient(135deg, #431407 0%, #9a3412 50%, #fb923c 100%)",
  "河北": "linear-gradient(135deg, #334155 0%, #64748b 50%, #cbd5e1 100%)",
  "黑龙江": "linear-gradient(135deg, #1e293b 0%, #475569 50%, #94a3b8 100%)",
  "吉林": "linear-gradient(135deg, #164e63 0%, #0891b2 50%, #67e8f9 100%)",
  "安徽": "linear-gradient(135deg, #4a5568 0%, #718096 50%, #cbd5e0 100%)",
  "江西": "linear-gradient(135deg, #047857 0%, #059669 50%, #6ee7b7 100%)",
  "贵州": "linear-gradient(135deg, #065f46 0%, #059669 50%, #34d399 100%)",
  "海南": "linear-gradient(135deg, #0e7490 0%, #06b6d4 50%, #67e8f9 100%)",
  "青海": "linear-gradient(135deg, #155e75 0%, #0891b2 50%, #22d3ee 100%)",
  "台湾": "linear-gradient(135deg, #7e22ce 0%, #a855f7 50%, #d8b4fe 100%)",
  "内蒙古": "linear-gradient(135deg, #6b21a8 0%, #9333ea 50%, #c084fc 100%)",
  "广西": "linear-gradient(135deg, #15803d 0%, #16a34a 50%, #4ade80 100%)",
  "西藏": "linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #2dd4bf 100%)",
  "宁夏": "linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #fbbf24 100%)",
  "新疆": "linear-gradient(135deg, #a16207 0%, #ca8a04 50%, #facc15 100%)",
  "天津": "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #60a5fa 100%)",
  "重庆": "linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%)",
  "香港": "linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)",
  "澳门": "linear-gradient(135deg, #9f1239 0%, #be123c 50%, #fb7185 100%)"
};

export const PROVINCE_BANNERS: Record<string, string> = PROVINCE_COLORS;
