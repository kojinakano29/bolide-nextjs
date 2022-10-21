import 'tailwindcss/tailwind.css'
import '@/styles/liondor/globals.scss'

// Font Awesome の設定
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

const App = ({ Component, pageProps }) => {

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default App
