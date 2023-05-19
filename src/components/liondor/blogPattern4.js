import styles from '@/styles/liondor/components/blogPattern4.module.scss'
import { BlogColumn1, BlogColumn3, BlogColumn4 } from '@/components/liondor'

const BlogPattern4 = ({ mode2 = false, pattern, user }) => {
    return (
        <>
            <div className={`${styles.block} ${mode2 ? '' : styles.mbNone}`}>
                <BlogColumn1 patternData={pattern} user={user} />
                <BlogColumn3 patternData={pattern} user={user} part2 />
            </div>
            {mode2 ? (
                <BlogColumn4 patternData={pattern} user={user} part2 portrait />
            ) : (
                ''
            )}
        </>
    )
}

export default BlogPattern4
