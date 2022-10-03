import bannar1 from '@/images/common/bannar1.png'
import bannar2 from '@/images/common/bannar2.png'
import bannar3 from '@/images/common/bannar3.png'
import bannar4 from '@/images/common/bannar4.png'
import dummy3 from '@/images/cms/dummy3.png'
import dummy4 from '@/images/cms/dummy4.png'
import dummy5 from '@/images/cms/dummy5.png'
import dummy6 from '@/images/cms/dummy6.png'
import dummy7 from '@/images/cms/dummy7.png'
import dummy8 from '@/images/cms/dummy8.png'
import dummy9 from '@/images/cms/dummy9.png'
import dummy10 from '@/images/cms/dummy10.png'
import dummy11 from '@/images/cms/dummy11.png'
import dummy12 from '@/images/cms/dummy12.png'
import dummy13 from '@/images/cms/dummy13.png'
import dummy14 from '@/images/cms/dummy14.png'
import dummy15 from '@/images/cms/dummy15.png'
import dummy16 from '@/images/cms/dummy16.png'
import dummy17 from '@/images/cms/dummy17.png'
import dummy18 from '@/images/cms/dummy18.png'
import dummy19 from '@/images/cms/dummy19.png'
import dummy20 from '@/images/cms/dummy20.png'
import dummy21 from '@/images/cms/dummy21.png'
import dummy22 from '@/images/cms/dummy22.png'

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
  {slug: 'pickupinformation', name: 'Pick Up Information', link: '/post/pickUpInformation'},
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

// ダミー画像（削除予定）
export const dummyImage = [
  {num: 2, src: dummy3},
  {num: 3, src: dummy4},
  {num: 4, src: dummy5},
  {num: 5, src: dummy6},
  {num: 6, src: dummy3},
  {num: 7, src: dummy4},
  {num: 8, src: dummy5},
  {num: 9, src: dummy6},
]

export const dummyImage2 = [
  {src: dummy7},
  {src: dummy8},
  {src: dummy9},
]

export const dummyImage3 = [
  {src: dummy14},
  {src: dummy15},
  {src: dummy16},
  {src: dummy17},
]

export const dummyImage4 = [
  {src: dummy10},
  {src: dummy11},
  {src: dummy12},
  {src: dummy13},
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

export const dummyImage6 = [
  {src: dummy19},
  {src: dummy20},
  {src: dummy21},
]

export const dummyImage7 = [
  {src: dummy22},
  {src: dummy22},
  {src: dummy22},
]