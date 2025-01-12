import { siteMeta } from '@/lib/liondor/constants'
import Head from 'next/head'

const { siteTitle, siteDesc, siteLocale, siteType, siteIcon } = siteMeta

const Meta = () => {
    return (
        <Head>
            <title>{siteTitle}</title>
            <meta name="description" content={siteDesc} />
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Prompt:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />
        </Head>
    )
}

export default Meta
