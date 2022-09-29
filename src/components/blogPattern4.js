import styles from '@/styles/components/blogPattern4.module.scss'
import { BlogColumn1, BlogColumn3, BlogColumn4 } from '@/components'

const BlogPattern4 = ({mode2 = false, pattern}) => {
  return (
    <>
      <div className={`${styles.block} ${mode2 ? '' : styles.mbNone}`}>
        <BlogColumn1 patternData={pattern} />
        <BlogColumn3 patternData={pattern} part2 />
      </div>
      {mode2 ? <BlogColumn4 patternData={pattern} part2 /> : ''}
    </>
  );
}

export default BlogPattern4;