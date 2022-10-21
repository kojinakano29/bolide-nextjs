import styles from '@/styles/liondor/components/sidebar.module.scss'
import { SidebarShowEditor, SidebarPost } from '@/components/liondor';

const Sidebar = ({posts}) => {
  const pickUp = posts.pickups

  return (
    <article className={styles.sidebar}>
      <div className={`${styles.editorBox} readonly`}>
        <SidebarShowEditor posts={posts} />
        <SidebarPost pickUp={pickUp} />
      </div>
    </article>
  );
}

export default Sidebar;