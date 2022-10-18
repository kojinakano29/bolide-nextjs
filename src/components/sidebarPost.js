import styles from '@/styles/components/sidebarPost.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import dummy10 from '@/images/cms/dummy10.png'
import { BlogTxt } from '@/components'

const SidebarPost = ({pickUp}) => {
  console.log(pickUp)

  const data = pickUp.filter((item, index) => {
    return index < 4
  })

  return (
    <div>
      Enter
    </div>
  );
}

export default SidebarPost;