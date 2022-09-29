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

// API連携ホスト名
export const apiHost = process.env.API_DOMAIN

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
    {name: "All Topics", link: "/post/fashion"},
    {name: "News", link: "/post/fashion?cat=News"},
    {name: "Trend", link: "/post/fashion?cat=Trend"},
    {name: "Snap", link: "/post/fashion?cat=Snap"},
    {name: "FirstClass", link: "/post/fashion?cat=FirstClass"},
  ],
  beauty: [
    {name: "All Topics", link: "/post/beauty"},
    {name: "News", link: "/post/beauty?cat=News"},
    {name: "Trend", link: "/post/beauty?cat=Trend"},
    {name: "Wellness", link: "/post/beauty?cat=Wellness"},
    {name: "Expart", link: "/post/beauty?cat=Expart"},
    {name: "FirstClass", link: "/post/beauty?cat=FirstClass"},
  ],
  trend: [
    {name: "All Topics", link: "/post/trend"},
    {name: "SDGs", link: "/post/trend?cat=SDGs"},
    {name: "metaverse", link: "/post/trend?cat=metaverse"},
    {name: "virtualcurrency", link: "/post/trend?cat=virtualcurrency"},
    {name: "Blockchain", link: "/post/trend?cat=Blockchain"},
    {name: "NFT", link: "/post/trend?cat=NFT"},
    {name: "spaceBusiness", link: "/post/trend?cat=spaceBusiness"},
    {name: "FirstClass", link: "/post/trend?cat=FirstClass"},
  ],
  lifestyle: [
    {name: "All Topics", link: "/post/lifestyle"},
    {name: "News", link: "/post/lifestyle?cat=News"},
    {name: "Gurmet", link: "/post/lifestyle?cat=Gurmet"},
    {name: "Culture", link: "/post/lifestyle?cat=Culture"},
    {name: "Interior", link: "/post/lifestyle?cat=Interior"},
    {name: "RealEstate", link: "/post/lifestyle?cat=RealEstate"},
    {name: "Travel", link: "/post/lifestyle?cat=Travel"},
    {name: "Entertaiment", link: "/post/lifestyle?cat=Entertaiment"},
    {name: "FirstClass", link: "/post/lifestyle?cat=FirstClass"},

  ],
  wedding: [
    {name: "All Topics", link: "/post/wedding"},
    {name: "News", link: "/post/wedding?cat=News"},
    {name: "Dress", link: "/post/wedding?cat=Dress"},
    {name: "Weddinghall", link: "/post/wedding?cat=Weddinghall"},
    {name: "Accessory", link: "/post/wedding?cat=Accessory"},
    {name: "Bouquet", link: "/post/wedding?cat=Bouquet"},
    {name: "Bresent", link: "/post/wedding?cat=Bresent"},
    {name: "FirstClass", link: "/post/wedding?cat=FirstClass"},
  ],
  topleader: [
    {name: "All Topics", link: "/post/topleader"},
    {name: "Interview", link: "/post/topleader?cat=Interview"},
    {name: "Career", link: "/post/topleader?cat=Career"},
  ],
  fortune: [
    {name: "All Topics", link: "/post/fortune"},
    {name: "Daily", link: "/post/fortune?cat=Daily"},
    {name: "Monthly", link: "/post/fortune?cat=Monthly"},
    {name: "Yealy", link: "/post/fortune?cat=Yealy"},
  ],
  video: [
    {name: "All Topics", link: "/post/video"},
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