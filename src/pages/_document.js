import { Html, Head, Main, NextScript } from 'next/document'
import { siteMeta } from '@/lib/liondor/constants'

const {siteLang} = siteMeta;

export default function Document() {
    return (
        <Html lang={siteLang}>
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/tvy7bqb.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}