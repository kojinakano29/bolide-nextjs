import PageLayoutCorapura from '@/components/Layouts/pageLayoutCorapura'
import { MatterList } from '@/components/corapura'

export const getServerSideProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_CORAPURA}/post`)
    const data = await res.json()

    return {
        props: {
            posts: data,
        },
    }
}

const MatterListCompany = ({ posts }) => {
    return <MatterList posts={posts} />
}

export default MatterListCompany

MatterListCompany.getLayout = function getLayout(page) {
    return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}
