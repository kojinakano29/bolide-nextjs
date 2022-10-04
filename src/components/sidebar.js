import styles from '@/styles/components/sidebar.module.scss'
import { SidebarShowEditor } from '@/components';

const Sidebar = ({posts}) => {
  return (
    <article className={styles.sidebar}>
      <div className={`${styles.editorBox} readonly`}>
        <SidebarShowEditor posts={posts} />
      </div>
    </article>
  );
}

export default Sidebar;