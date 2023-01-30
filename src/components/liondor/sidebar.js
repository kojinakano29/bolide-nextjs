import styles from '@/styles/liondor/components/sidebar.module.scss'
import { SidebarPost, ShowEditor } from '@/components/liondor';

const Sidebar = ({posts}) => {
  const pickUp = posts.pickups

  return (
    <article className={styles.sidebar}>
      <div className={styles.editorBox}>
        {posts.sidebars.map((sidebar, index) => (
          <ShowEditor
            key={index}
            value={sidebar.content}
          />
        ))}
        <SidebarPost pickUp={pickUp} />
      </div>
    </article>
  );
}

export default Sidebar;