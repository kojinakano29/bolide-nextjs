import { useRouter } from "next/router";
import styles from '@/styles/dellamall/components/header.module.scss'
import { SearchIcon, HeaderNav } from "@/components/dellamall/index";
import Container from "./Layouts/container";
import logo from '@/images/dellamall/top/kasou_logo.svg'
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const router = useRouter()

  return (
    <header className={`${styles.header} ${router.route === "/dellamall" ? null : styles.kasou}`}>
      <Container>
        <div className={styles.flex}>
          <div className={styles.left}>
            {router.route === "/dellamall" ?
              null
              :
              <Link href="/dellamall">
                <a className={`${styles.logo} hoverEffect`}>
                  <Image
                    src={logo}
                    alt="della mall"
                    layout="responsive"
                    sizes="150px"
                    priority
                  />
                </a>
              </Link>
            }
            <SearchIcon />
          </div>
          <div className={styles.right}>
            <HeaderNav />
          </div>
        </div>
      </Container>
    </header>



    // <header>
    //   <div class="header__flex">
    //     <div></div>
    //     <div class="header__flexRight">
    //         <a href=""><img src="./assets/images/header/speaker.svg" alt="スピーカーアイコン"></a>
    //         <a href=""><img src="./assets/images/header/bookmark.svg" alt="ブックマークアイコン"></a>
    //         <a href=""><img src="./assets/images/header/question.svg" alt="質問アイコン"></a>
    //         <a id="sp" href=""><img src="./assets/images/header/plusIcon.svg" alt="作成アイコン"></a>
    //         <a id="sp" href=""><img src="./assets/images/header/userIcon.svg" alt="ユーザーアイコン"></a>
    //         <div id="pc" class="btn">
    //             <a class="btn06" href="">
    //                 <span>
    //                     <img src="./assets/images/header/plus.svg" alt="ショップを作る">
    //                     <p>ショップを作る</p>
    //                 </span>
    //             </a>
    //         </div>
    //         <div id="pc" class="btn">
    //             <a class="btn07" href="">
    //                 <span>
    //                     <img src="./assets/images/header/user.svg" alt="マイページ">
    //                     <p>マイページ</p>
    //                 </span>
    //             </a>
    //         </div>
    //     </div>
    //   </div>
    // </header>
  );
}

export default Header;