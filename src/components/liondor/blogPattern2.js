import styles from '@/styles/liondor/components/blogPattern2.module.scss'
import { BlogColumn1, BlogColumn4 } from '@/components/liondor'

const BlogPattern2 = ({ pattern }) => {
    return (
        <>
            <BlogColumn1 patternData={pattern} />
            <BlogColumn4 patternData={pattern} />
        </>
    )
}

export default BlogPattern2
