import styles from '@/styles/liondor/components/blogPattern2.module.scss'
import { BlogColumn1, BlogColumn4 } from '@/components/liondor'

const BlogPattern2 = ({ pattern, user }) => {
    return (
        <>
            <BlogColumn1 patternData={pattern} user={user} />
            <BlogColumn4 patternData={pattern} user={user} />
        </>
    )
}

export default BlogPattern2
