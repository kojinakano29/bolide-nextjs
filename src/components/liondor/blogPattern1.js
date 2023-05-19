import styles from '@/styles/liondor/components/blogPattern1.module.scss'
import { BlogColumn3, BlogPickup, BlogScrollBox } from '@/components/liondor'

const BlogPattern1 = ({ column3None, pattern, user }) => {
    return (
        <>
            <article
                className={`${styles.stickyArea} ${
                    column3None ? styles.mbNone : ''
                }`}>
                <BlogPickup patternData={pattern} user={user} />
                <BlogScrollBox patternData={pattern} user={user} />
            </article>

            {column3None ? (
                ''
            ) : (
                <BlogColumn3 patternData={pattern} user={user} />
            )}
        </>
    )
}

export default BlogPattern1
