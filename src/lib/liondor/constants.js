import bannar1 from '@/images/liondor/common/bannar1.png'
import bannar2 from '@/images/liondor/common/bannar2.png'
import bannar3 from '@/images/liondor/common/bannar3.png'
import bannar4 from '@/images/liondor/common/bannar4.png'

// サイト情報
export const siteMeta = {
  siteTitle: 'Liondor',
  siteDesc: 'ディスクリプション',
  siteUrl: 'サイトURL',
  siteLang: 'ja',
  siteLocale: 'ja_JP',
  siteType: 'website',
  siteIcon: '/favicon.ico',
}

// 編集者ナビ
export const editorNaviData = [
  {name: '記事管理', link: '/liondor/post/editor_index/',},
]

// 管理者ナビ
export const adminNaviData = [
  {name: 'プレゼント管理', link: '/liondor/admin/present'},
  {name: 'ピックアップ管理', link: '/liondor/admin/pickup'},
  {name: 'サイドバー管理', link: '/liondor/admin/sidebar'},
  {name: 'FAQ管理', link: '/liondor/admin/faq'},
  {name: 'FirstClass管理', link: '/liondor/admin/first_class/create'},
  {name: 'COLLECTION管理', link: '/liondor/admin/collection/create'},
]

// ページナビ
export const pageNaviData = [
  {slug: 'fashion', name: 'Fashion', link: '/liondor/post/fashion'},
  {slug: 'beauty', name: 'Beauty', link: '/liondor/post/beauty'},
  {slug: 'trend', name: 'Trend', link: '/liondor/post/trend'},
  {slug: 'lifestyle', name: 'Life Style', link: '/liondor/post/lifestyle'},
  {slug: 'wedding', name: 'Wedding', link: '/liondor/post/wedding'},
  {slug: 'topleader', name: 'Top Leader', link: '/liondor/post/topleader'},
  {slug: 'fortune', name: 'Fortune', link: '/liondor/post/fortune'},
  {slug: 'video', name: 'Video', link: '/liondor/post/video'},
]

// カテゴリナビ
export const catNavData = {
  fashion: [
    {name: "All Topics", slug: "fashion", link: "/liondor/post/fashion"},
    {name: "News", slug: "news_fashion", link: "/liondor/post/news_fashion"},
    {name: "Trend", slug: "trend_fashion", link: "/liondor/post/trend_fashion"},
    {name: "Snap", slug: "snap", link: "/liondor/post/snap"},
    {name: "FirstClass", slug: "firstclass_fashion", link: "/liondor/post/firstclass_fashion"},
  ],
  beauty: [
    {name: "All Topics", slug: "beauty", link: "/liondor/post/beauty"},
    {name: "News", slug: "news_beauty", link: "/liondor/post/news_beauty"},
    {name: "Trend", slug: "trend_beauty", link: "/liondor/post/trend_beauty"},
    {name: "Wellness", slug: "wellness", link: "/liondor/post/wellness"},
    {name: "Expart", slug: "expartt", link: "/liondor/post/expartt"},
    {name: "FirstClass", slug: "firstclass_beauty", link: "/liondor/post/firstclass_beauty"},
  ],
  trend: [
    {name: "All Topics", slug: "trend", link: "/liondor/post/trend"},
    {name: "SDGs", slug: "sdgs", link: "/liondor/post/sdgs"},
    {name: "metaverse", slug: "metaverse", link: "/liondor/post/metaverse"},
    {name: "virtualcurrency", slug: "virtualcurrency", link: "/liondor/post/virtualcurrency"},
    {name: "Blockchain", slug: "blockchain", link: "/liondor/post/blockchain"},
    {name: "NFT", slug: "nft", link: "/liondor/post/nft"},
    {name: "spaceBusiness", slug: "spacebusiness", link: "/liondor/post/spacebusiness"},
    {name: "FirstClass", slug: "firstclass_trend", link: "/liondor/post/firstclass_trend"},
  ],
  lifestyle: [
    {name: "All Topics", slug: "lifestyle", link: "/liondor/post/lifestyle"},
    {name: "News", slug: "news_lifestyle", link: "/liondor/post/news_lifestyle"},
    {name: "Gurmet", slug: "gurmet", link: "/liondor/post/gurmet"},
    {name: "Culture", slug: "culture", link: "/liondor/post/culture"},
    {name: "Interior", slug: "interior", link: "/liondor/post/interior"},
    {name: "RealEstate", slug: "realestate", link: "/liondor/post/realestate"},
    {name: "Travel", slug: "travel", link: "/liondor/post/travel"},
    {name: "Entertaiment", slug: "entertaiment", link: "/liondor/post/entertaiment"},
    {name: "FirstClass", slug: "firstclass_lifestyle", link: "/liondor/post/firstclass_lifestyle"},
  ],
  wedding: [
    {name: "All Topics", slug: "wedding", link: "/liondor/post/wedding"},
    {name: "News", slug: "news_wedding", link: "/liondor/post/news_wedding"},
    {name: "Dress", slug: "dress", link: "/liondor/post/dress"},
    {name: "Weddinghall", slug: "weddinghall", link: "/liondor/post/weddinghall"},
    {name: "Accessory", slug: "accessory", link: "/liondor/post/accessory"},
    {name: "Bouquet", slug: "bouquet", link: "/liondor/post/bouquet"},
    {name: "Bresent", slug: "bresent", link: "/liondor/post/bresent"},
    {name: "FirstClass", slug: "firstclass_wedding", link: "/liondor/post/firstclass_wedding"},
  ],
  topleader: [
    {name: "All Topics", slug: "topleader", link: "/liondor/post/topleader"},
    {name: "Interview", slug: "interview", link: "/liondor/post/interview"},
    {name: "Career", slug: "career", link: "/liondor/post/career"},
  ],
  fortune: [
    {name: "All Topics", slug: "fortune", link: "/liondor/post/fortune"},
    {name: "Daily", slug: "daily", link: "/liondor/post/daily"},
    {name: "Monthly", slug: "monthly", link: "/liondor/post/monthly"},
    {name: "Yealy", slug: "yealy", link: "/liondor/post/yealy"},
  ],
  video: [
    {name: "All Topics", slug: "video", link: "/liondor/post/video"},
  ],
}

export const sitemap = [
  {
    cat: "Fashion",
    group: [
      {name: "All Topics", slug: "fashion", link: "/liondor/post/fashion"},
      {name: "News", slug: "news_fashion", link: "/liondor/post/news_fashion"},
      {name: "Trend", slug: "trend_fashion", link: "/liondor/post/trend_fashion"},
      {name: "Snap", slug: "snap", link: "/liondor/post/snap"},
      {name: "First Class", slug: "firstclass_fashion", link: "/liondor/post/firstclass_fashion"},
    ],
  },
  {
    cat: "Beauty",
    group: [
      {name: "All Topics", slug: "beauty", link: "/liondor/post/beauty"},
      {name: "News", slug: "news_beauty", link: "/liondor/post/news_beauty"},
      {name: "Trend", slug: "trend_beauty", link: "/liondor/post/trend_beauty"},
      {name: "Wellness", slug: "wellness", link: "/liondor/post/wellness"},
      {name: "Expart", slug: "expartt", link: "/liondor/post/expartt"},
      {name: "First Class", slug: "firstclass_beauty", link: "/liondor/post/firstclass_beauty"},
    ],
  },
  {
    cat: "Trend",
    group: [
      {name: "All Topics", slug: "trend", link: "/liondor/post/trend"},
      {name: "SDGS", slug: "sdgs", link: "/liondor/post/sdgs"},
      {name: "Metaverse", slug: "metaverse", link: "/liondor/post/metaverse"},
      {name: "virtual currency", slug: "virtualcurrency", link: "/liondor/post/virtualcurrency"},
      {name: "Blockchain", slug: "blockchain", link: "/liondor/post/blockchain"},
      {name: "NFT", slug: "nft", link: "/liondor/post/nft"},
      {name: "space business", slug: "spacebusiness", link: "/liondor/post/spacebusiness"},
      {name: "First Class", slug: "firstclass_trend", link: "/liondor/post/firstclass_trend"},
    ],
  },
  {
    cat: "Life Style",
    group: [
      {name: "All Topics", slug: "lifestyle", link: "/liondor/post/lifestyle"},
      {name: "News", slug: "news_lifestyle", link: "/liondor/post/news_lifestyle"},
      {name: "Gurmet", slug: "gurmet", link: "/liondor/post/gurmet"},
      {name: "Culture", slug: "culture", link: "/liondor/post/culture"},
      {name: "Interior", slug: "interior", link: "/liondor/post/interior"},
      {name: "Real Estate", slug: "realestate", link: "/liondor/post/realestate"},
      {name: "Travel", slug: "travel", link: "/liondor/post/travel"},
      {name: "Entertaiment", slug: "entertaiment", link: "/liondor/post/entertaiment"},
      {name: "First Class", slug: "firstclass_lifestyle", link: "/liondor/post/firstclass_lifestyle"},
    ],
  },
  {
    cat: "Wedding",
    group: [
      {name: "All Topics", slug: "wedding", link: "/liondor/post/wedding"},
      {name: "News", slug: "news_wedding", link: "/liondor/post/news_wedding"},
      {name: "Dress", slug: "dress", link: "/liondor/post/dress"},
      {name: "Wedding Hall", slug: "weddinghall", link: "/liondor/post/weddinghall"},
      {name: "Accessory", slug: "accessory", link: "/liondor/post/accessory"},
      {name: "Bouquet", slug: "bouquet", link: "/liondor/post/bouquet"},
      {name: "Present", slug: "bresent", link: "/liondor/post/bresent"},
      {name: "First Class", slug: "firstclass_wedding", link: "/liondor/post/firstclass_wedding"},
    ],
  },
  {
    cat: "Top Leader",
    group: [
      {name: "All Topics", slug: "topleader", link: "/liondor/post/topleader"},
      {name: "Interview", slug: "interview", link: "/liondor/post/interview"},
      {name: "Career", slug: "career", link: "/liondor/post/career"},
    ],
  },
  {
    cat: "Fortune",
    group: [
      {name: "All Topics", slug: "fortune", link: "/liondor/post/fortune"},
      {name: "Daily", slug: "daily", link: "/liondor/post/daily"},
      {name: "Monthly", slug: "monthly", link: "/liondor/post/monthly"},
      {name: "Yearly", slug: "yealy", link: "/liondor/post/yealy"},
    ],
  },
  {
    cat: "Video",
    group: [
      {name: "All Topics", slug: "video", link: "/liondor/post/video"},
    ],
  },
]

// バナー
export const bannarData = [
  {src: bannar1, link: "/"},
  {src: bannar2, link: "https://marche-dor.jp/"},
  {src: bannar3, link: "/corapura"},
  {src: bannar4, link: "/dellamall"},
]

// プレゼントの趣味のチェックボックス
export const hobby = [
  {
    name: "スポーツ系",
    group: [
      {name: "サイクリング"},
      {name: "ヨガ"},
      {name: "筋トレ"},
      {name: "ゴルフ"},
      {name: "マラソン"},
    ],
  },
  {
    name: "芸術・鑑賞系",
    group: [
      {name: "読書"},
      {name: "映画鑑賞"},
      {name: "音楽鑑賞"},
      {name: "カメラ"},
      {name: "楽器演奏"},
      {name: "美術館・博物館巡り"},
      {name: "カラオケ"},
    ],
  },
  {
    name: "美容・健康系",
    group: [
      {name: "メイク"},
      {name: "ショッピング"},
      {name: "アロマ"},
      {name: "ジョギング"},
    ],
  },
  {
    name: "旅行・お出かけ",
    group: [
      {name: "旅行"},
      {name: "ドライブ"},
    ],
  },
  {
    name: "自然・アウトドア",
    group: [
      {name: "車"},
      {name: "バイク"},
      {name: "キャンプ"},
      {name: "登山"},
      {name: "釣り"},
    ],
  },
  {
    name: "つくる・育てる",
    group: [
      {name: "料理"},
      {name: "ガーデニング"},
      {name: "片付け"},
      {name: "陶芸"},
      {name: "絵画"},
    ],
  },
  {
    name: "食べる・飲む",
    group: [
      {name: "食べ歩き"},
      {name: "スイーツ巡り"},
      {name: "ワイン"},
    ],
  },
  {
    name: "ゲーム",
    group: [
      {name: "ゲーム"},
    ],
  },
  {
    name: "その他",
    group: [
      {name: "その他"},
    ],
  },
]

// ブランド一覧
export const brand = [
  {
    initial: "A",
    group: [
      {name: "ALAIA"},
      {name: "ARMANI"},
    ]
  },
  {
    initial: "B",
    group: [
      {name: "BALENCIAGA"},
      {name: "BOTTEGA VENETA"},
      {name: "BOUCHERON"},
      {name: "BURBERRY"},
      {name: "BVLGARI"},
    ]
  },
  {
    initial: "C",
    group: [
      {name: "Cartier"},
      {name: "CELINE"},
      {name: "CHANEL"},
      {name: "CHAUMET"},
      {name: "Chloé"},
      {name: "Christian Louboutin"},
      {name: "Chopard"},
    ]
  },
  {
    initial: "D",
    group: [
      {name: "DAMIANI"},
      {name: "DELVAUX"},
      {name: "Dior"},
      {name: "Dolce & Gabbana"},
    ]
  },
  {
    initial: "E",
    group: []
  },
  {
    initial: "F",
    group: [
      {name: "FENDI"},
      {name: "FURLA"},
    ]
  },
  {
    initial: "G",
    group: [
      {name: "GIVENCHY"},
      {name: "GOYARD"},
      {name: "GRAFF"},
      {name: "GUCCI"},
    ]
  },
  {
    initial: "H",
    group: [
      {name: "HARRY WINSTON"},
      {name: "Hermès"},
    ]
  },
  {
    initial: "I",
    group: []
  },
  {
    initial: "J",
    group: [
      {name: "JIL SANDER"},
      {name: "Jimmy Choo"},
    ]
  },
  {
    initial: "K",
    group: []
  },
  {
    initial: "L",
    group: [
      {name: "LANVIN"},
      {name: "LOEWE"},
      {name: "LONGCHAMP"},
      {name: "Louis Vuitton"},
    ]
  },
  {
    initial: "M",
    group: [
      {name: "Manolo Blahnik"},
      {name: "MICHAEL KORS"},
      {name: "MISSONI"},
      {name: "MIU MIU"},
      {name: "MONCLER"},
      {name: "MORABITO"},
      {name: "MOYNAT"},
    ]
  },
  {
    initial: "N",
    group: []
  },
  {
    initial: "O",
    group: []
  },
  {
    initial: "P",
    group: [
      {name: "PRADA"},
    ]
  },
  {
    initial: "Q",
    group: []
  },
  {
    initial: "R",
    group: [
      {name: "Roger Vivier"},
    ]
  },
  {
    initial: "S",
    group: [
      {name: "Saint Laurent"},
      {name: "Salvatore Ferragamo"},
      {name: "sergio rossi"},
      {name: "Stella McCartney"},
    ]
  },
  {
    initial: "T",
    group: [
      {name: "Tiffany & Co"},
    ]
  },
  {
    initial: "U",
    group: []
  },
  {
    initial: "V",
    group: [
      {name: "VALENTINO"},
      {name: "Valextra"},
      {name: "Van Cleef & Arpels"},
      {name: "VERSACE"},
    ]
  },
  {
    initial: "W",
    group: []
  },
  {
    initial: "X",
    group: []
  },
  {
    initial: "Y",
    group: []
  },
  {
    initial: "Z",
    group: [
      {name: "ZANELLATO"},
    ]
  },
  {
    initial: "OTHER",
    group: [
      {name: "宝飾"},
    ]
  },
]

// コスメブランド一覧
export const cosmetic = [
  {
    initial: "A",
    group: [
      {name: "ADDICTION"},
      {name: "ALBION"},
      {name: "ANNASUI"},
    ]
  },
  {
    initial: "B",
    group: [
      {name: "BOBBI BROWN"},
    ]
  },
  {
    initial: "C",
    group: [
      {name: "CHANEL"},
      {name: "CLARINS"},
      {name: "Cle de Peau Beaute"},
      {name: "CLINIQUE"},
      {name: "cover mark"},
    ]
  },
  {
    initial: "D",
    group: [
      {name: "DECORTE"},
      {name: "DE LA MER"},
      {name: "Dior"},
      {name: "Dolce & Gabbana"},
    ]
  },
  {
    initial: "E",
    group: [
      {name: "est"},
      {name: "ESTEELAUDER"},
      {name: "ETVOS"},
    ]
  },
  {
    initial: "F",
    group: []
  },
  {
    initial: "G",
    group: [
      {name: "GIORGIO ARMANI"},
      {name: "GIVENCHY"},
      {name: "GUERLAIN"},
    ]
  },
  {
    initial: "H",
    group: [
      {name: "HELENA RUBINSTEIN"},
    ]
  },
  {
    initial: "I",
    group: [
      {name: "IPSA"},
    ]
  },
  {
    initial: "J",
    group: [
      {name: "JILLSTUART"},
    ]
  },
  {
    initial: "K",
    group: [
      {name: "KesalanPatharan"},
    ]
  },
  {
    initial: "L",
    group: [
      {name: "LA PRAIRIE"},
      {name: "LANCOME"},
      {name: "Laura mercier"},
      {name: "LUNASOL"},
      {name: "L'OCCITANE"},
    ]
  },
  {
    initial: "M",
    group: [
      {name: "MAKE UP FOEVER"},
      {name: "M・A・C"},
    ]
  },
  {
    initial: "N",
    group: [
      {name: "NARS"},
      {name: "NOEVIR"},
    ]
  },
  {
    initial: "O",
    group: [
      {name: "ORLANE"},
    ]
  },
  {
    initial: "P",
    group: [
      {name: "POLA"},
      {name: "PAUL&JOE"},
    ]
  },
  {
    initial: "Q",
    group: []
  },
  {
    initial: "R",
    group: [
      {name: "RMK"},
    ]
  },
  {
    initial: "S",
    group: [
      {name: "shiseido"},
      {name: "shuuemura"},
      {name: "sisley"},
      {name: "SK-2"},
      {name: "SUQQU"},
    ]
  },
  {
    initial: "T",
    group: [
      {name: "THREE"},
      {name: "TOMFORD"},
      {name: "TWANY"},
    ]
  },
  {
    initial: "U",
    group: []
  },
  {
    initial: "V",
    group: []
  },
  {
    initial: "W",
    group: []
  },
  {
    initial: "X",
    group: []
  },
  {
    initial: "Y",
    group: [
      {name: "YVES SAINT LAURENT"},
    ]
  },
  {
    initial: "Z",
    group: []
  },
  {
    initial: "OTHER",
    group: []
  },
]

export const zip = [
  "北海道",
  "青森",
  "岩手",
  "宮城",
  "秋田",
  "山形",
  "福島",
  "茨城",
  "栃木",
  "群馬",
  "埼玉",
  "千葉",
  "東京",
  "神奈川",
  "新潟",
  "富山",
  "石川",
  "福井",
  "山梨",
  "長野",
  "岐阜",
  "静岡",
  "愛知",
  "三重",
  "滋賀",
  "京都",
  "大阪",
  "兵庫",
  "奈良",
  "和歌山",
  "鳥取",
  "島根",
  "岡山",
  "広島",
  "山口",
  "徳島",
  "香川",
  "愛媛",
  "高知",
  "福岡",
  "佐賀",
  "長崎",
  "熊本",
  "大分",
  "宮崎",
  "鹿児島",
  "沖縄",
]

export const workTypes = [
  "正社員",
  "契約社員",
  "派遣労働者",
  "パートタイム労働者",
  "業務委託",
]

export const industries = [
  "食品・農林・水産",
  "建設・住宅・インテリア",
  "繊維・化学・薬品・化粧品",
  "鉄鋼・金属・鉱業",
  "機械・プラント",
  "電子・電気機器",
  "自動車・輸送用機器",
  "精密・医療機器",
  "印刷・事務機器関連",
  "スポーツ・玩具",
  "その他メーカー",
  "総合商社",
  "専門商社",
  "百貨店・スーパー",
  "コンビニ",
  "専門店",
  "銀行・証券",
  "クレジット",
  "信販・リース",
  "その他金融",
  "生保・損保",
  "不動産",
  "鉄道・航空・運輸・物流",
  "電力・ガス・エネルギー",
  "フードサービス",
  "ホテル・旅行",
  "医療・福祉",
  "アミューズメント・レジャー",
  "その他サービス",
  "コンサルティング・調査",
  "人材サービス",
  "教育",
  "ソフトウエア",
  "インターネット",
  "通信",
  "放送",
  "新聞",
  "出版",
  "広告",
  "公社・団体",
  "官公庁",
]