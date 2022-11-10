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
  );
}

export default Header;