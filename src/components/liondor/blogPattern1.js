import styles from '@/styles/liondor/components/blogPattern1.module.scss'
import { BlogColumn3, BlogPickup, BlogScrollBox } from '@/components/liondor'

const BlogPattern1 = ({ column3None, pattern, route2, pickup = false }) => {
    return (
        <>
            <article
                className={`${styles.stickyArea} ${
                    column3None ? styles.mbNone : ''
                }`}>
                <BlogPickup
                    patternData={pattern}
                    route2={route2}
                    pickup={pickup}
                />
                <BlogScrollBox
                    patternData={pattern}
                    route2={route2}
                    pickup={pickup}
                />
            </article>

            {column3None ? (
                ''
            ) : (
                <BlogColumn3 patternData={pattern} route2={route2} />
            )}
        </>
    )
}

export default BlogPattern1
