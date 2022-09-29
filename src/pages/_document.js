import { Html, Head, Main, NextScript } from 'next/document'
import { siteMeta } from '@/lib/constants'

const {siteLang} = siteMeta;

export default function Document() {
    return (
        <Html lang={siteLang}>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Prompt:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link rel="stylesheet" href="https://use.typekit.net/tvy7bqb.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}