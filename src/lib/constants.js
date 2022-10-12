import bannar1 from '@/images/common/bannar1.png'
import bannar2 from '@/images/common/bannar2.png'
import bannar3 from '@/images/common/bannar3.png'
import bannar4 from '@/images/common/bannar4.png'
import dummy14 from '@/images/cms/dummy14.png'
import dummy15 from '@/images/cms/dummy15.png'
import dummy16 from '@/images/cms/dummy16.png'
import dummy17 from '@/images/cms/dummy17.png'
import dummy18 from '@/images/cms/dummy18.png'

// サイト情報
export const siteMeta = {
  siteTitle: 'Bolide',
  siteDesc: 'ディスクリプション',
  siteUrl: 'サイトURL',
  siteLang: 'ja',
  siteLocale: 'ja_JP',
  siteType: 'website',
  siteIcon: '/favicon.ico',
}

// ページナビ
export const pageNaviData = [
  {slug: 'fashion', name: 'Fashion', link: '/post/fashion'},
  {slug: 'beauty', name: 'Beauty', link: '/post/beauty'},
  {slug: 'trend', name: 'Trend', link: '/post/trend'},
  {slug: 'lifestyle', name: 'Life Style', link: '/post/lifestyle'},
  {slug: 'wedding', name: 'Wedding', link: '/post/wedding'},
  {slug: 'topleader', name: 'Top Leader', link: '/post/topleader'},
  {slug: 'fortune', name: 'Fortune', link: '/post/fortune'},
  {slug: 'video', name: 'Video', link: '/post/video'},
]

// カテゴリナビ
export const catNavData = {
  fashion: [
    {name: "All Topics", slug: "fashion", link: "/post/fashion"},
    {name: "News", slug: "news_fashion", link: "/post/news_fashion"},
    {name: "Trend", slug: "trend_fashion", link: "/post/trend_fashion"},
    {name: "Snap", slug: "snap", link: "/post/snap"},
    {name: "FirstClass", slug: "firstclass_fashion", link: "/post/firstclass_fashion"},
  ],
  beauty: [
    {name: "All Topics", slug: "beauty", link: "/post/beauty"},
    {name: "News", slug: "news_beauty", link: "/post/news_beauty"},
    {name: "Trend", slug: "trend_beauty", link: "/post/trend_beauty"},
    {name: "Wellness", slug: "wellness", link: "/post/wellness"},
    {name: "Expart", slug: "expartt", link: "/post/expartt"},
    {name: "FirstClass", slug: "firstclass_beauty", link: "/post/firstclass_beauty"},
  ],
  trend: [
    {name: "All Topics", slug: "trend", link: "/post/trend"},
    {name: "SDGs", slug: "sdgs", link: "/post/sdgs"},
    {name: "metaverse", slug: "metaverse", link: "/post/metaverse"},
    {name: "virtualcurrency", slug: "virtualcurrency", link: "/post/virtualcurrency"},
    {name: "Blockchain", slug: "blockchain", link: "/post/blockchain"},
    {name: "NFT", slug: "nft", link: "/post/nft"},
    {name: "spaceBusiness", slug: "spacebusiness", link: "/post/spacebusiness"},
    {name: "FirstClass", slug: "firstclass_trend", link: "/post/firstclass_trend"},
  ],
  lifestyle: [
    {name: "All Topics", slug: "lifestyle", link: "/post/lifestyle"},
    {name: "News", slug: "news_lifestyle", link: "/post/news_lifestyle"},
    {name: "Gurmet", slug: "gurmet", link: "/post/gurmet"},
    {name: "Culture", slug: "culture", link: "/post/culture"},
    {name: "Interior", slug: "interior", link: "/post/interior"},
    {name: "RealEstate", slug: "realestate", link: "/post/realestate"},
    {name: "Travel", slug: "travel", link: "/post/travel"},
    {name: "Entertaiment", slug: "entertaiment", link: "/post/entertaiment"},
    {name: "FirstClass", slug: "firstclass_lifestyle", link: "/post/firstclass_lifestyle"},

  ],
  wedding: [
    {name: "All Topics", slug: "wedding", link: "/post/wedding"},
    {name: "News", slug: "news_wedding", link: "/post/news_wedding"},
    {name: "Dress", slug: "dress", link: "/post/dress"},
    {name: "Weddinghall", slug: "weddinghall", link: "/post/weddinghall"},
    {name: "Accessory", slug: "accessory", link: "/post/accessory"},
    {name: "Bouquet", slug: "bouquet", link: "/post/bouquet"},
    {name: "Bresent", slug: "bresent", link: "/post/bresent"},
    {name: "FirstClass", slug: "firstclass_wedding", link: "/post/firstclass_wedding"},
  ],
  topleader: [
    {name: "All Topics", slug: "topleader", link: "/post/topleader"},
    {name: "Interview", slug: "interview", link: "/post/interview"},
    {name: "Career", slug: "career", link: "/post/career"},
  ],
  fortune: [
    {name: "All Topics", slug: "fortune", link: "/post/fortune"},
    {name: "Daily", slug: "daily", link: "/post/daily"},
    {name: "Monthly", slug: "monthly", link: "/post/monthly"},
    {name: "Yealy", slug: "yealy", link: "/post/yealy"},
  ],
  video: [
    {name: "All Topics", slug: "video", link: "/post/video"},
  ],
}

// バナー
export const bannarData = [
  {src: bannar1, link: "/"},
  {src: bannar2, link: "/"},
  {src: bannar3, link: "/"},
  {src: bannar4, link: "/"},
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

// ダミー画像（削除予定）
export const dummyImage3 = [
  {src: dummy14},
  {src: dummy15},
  {src: dummy16},
  {src: dummy17},
]

export const dummyImage5 = [
  {
    src: dummy18,
    ttl: 'かずきのギターサークル',
    txt: 'ギター初心者が安心して上達できる。上達の過程を楽しみながら練習できる。それを実現する場所を作りました。 僕とメンバーと…'
  },
  {
    src: dummy18,
    ttl: 'Mayumi Lab. 宇宙一わかりやすいスピリチュアル',
    txt: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキス…'
  },
  {
    src: dummy18,
    ttl: 'SKILLS',
    txt: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキス…'
  },
  {
    src: dummy18,
    ttl: '風水師黒門のオンライン開運塾',
    txt: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキス…'
  },
]