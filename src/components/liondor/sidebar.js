import styles from '@/styles/liondor/components/sidebar.module.scss'
import { SidebarPost, ShowEditor } from '@/components/liondor'

const Sidebar = ({ posts }) => {
    const pickUp = posts.pickups

    return (
        <article className={styles.sidebar}>
            <div className={styles.editorBox}>
                {posts.sidebars.length !== 0
                    ? posts.sidebars.map((sidebar, index) => (
                          <ShowEditor key={index} value={sidebar.content} />
                      ))
                    : null}
                {pickUp.length !== 0 ? <SidebarPost pickUp={pickUp} /> : null}
            </div>
        </article>
    )
}

export default Sidebar
