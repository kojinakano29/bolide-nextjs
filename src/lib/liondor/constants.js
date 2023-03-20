import bannar1 from '@/images/liondor/common/bannar1.webp'
import bannar2 from '@/images/liondor/common/bannar2.webp'
import bannar3 from '@/images/liondor/common/bannar3.webp'
import bannar4 from '@/images/liondor/common/bannar4.webp'

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
  // {name: 'FAQ管理', link: '/liondor/admin/faq'},
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
    {name: "Present", slug: "present", link: "/liondor/post/present"},
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
      {name: "Present", slug: "present", link: "/liondor/post/present"},
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
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
]

export const workTypes = [
  "正社員",
  "契約社員",
  "派遣労働者",
  "個人事業主",
  "アルバイト",
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

export const occupations = [
  "経営者",
  "メディア",
  "自治体",
  "営業事務",
  "オペレーター",
  "経理・会計・財務",
  "総務・人事",
  "法務・特許事務",
  "生保・損保事務",
  "金融事務(銀行・証券)",
  "受付・秘書",
  "学校・大学事務",
  "貿易事務",
  "英文事務・経理",
  "通訳・翻訳",
  "OAオペレーター",
  "テレマーケティング・ テレアポインター",
  "営業・企画営業・ ラウンダー",
  "広報・宣伝",
  "マーケティング",
  "経営企画",
  "商品開発",
  "食品販売",
  "イベントスタッフ",
  "アパレル・ファッション・コスメ販売",
  "インテリア・雑貨・文房具販売",
  "携帯・家電販売",
  "ホールスタッフ",
  "ホテル関連・リゾートスタッフ",
  "ブライダル関連・セレモニー関連スタッフ",
  "旅行事務・旅行カウンタースタッフ",
  "航空関連・ツアーコンダクター・添乗員",
  "エステティシャン・ネイリスト・セラピスト・マッサージ師",
  "美容師（スタイリスト）",
  "WEBデザイナー",
  "WEBディレクター",
  "制作・編集・校正・ライター",
  "DTPオペレーター",
  "グラフィックデザイナー",
  "映像・音響",
  "インテリアコーディネーター",
  "ネットワークエンジニア",
  "システムエンジニア",
  "プログラマー",
  "設計（電気・電子・機械）職",
  "設計（建築・土木・設備）職",
  "OAインストラクター",
  "フィールドエンジニア・サービスエンジニア",
  "医療事務",
  "ホームヘルパー（訪問介護等）",
  "介護助手",
  "介護福祉士",
  "ケアマネジャー",
  "看護師・准看護師",
  "看護助手",
  "歯科医師・歯科衛生士・歯科助手",
  "薬剤師",
  "栄養士・管理栄養士",
  "医療技術者",
  "保育士",
  "塾講師・インストラクター",
  "教師",
  "建築土木企画・設計",
  "調査・測量・製図・積算",
  "施工管理",
  "生産管理",
  "研究職",
  "開発職",
  "トレーダー・ディーラー",
  "ファンドマネージャー",
  "証券アナリスト",
  "アクチュアリー",
  "製造（組立・加工）",
  "ドライバー（配達・配送）",
  "施工管理・現場監督",
  "建築・土木作業員",
  "警備・交通整理",
  "清掃・ハウスクリーニング・家事代行",
  "その他",
]