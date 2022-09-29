import styles from '@/styles/components/blogPattern2.module.scss'
import { BlogColumn1, BlogColumn4 } from '@/components'

const BlogPattern2 = ({pattern}) => {
  return (
    <>
      <BlogColumn1 patternData={pattern} />
      <BlogColumn4 patternData={pattern} />
    </>
  );
}

export default BlogPattern2;