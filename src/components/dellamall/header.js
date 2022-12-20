import { useRouter } from "next/router";
import styles from '@/styles/dellamall/components/header.module.scss'
import { SearchIcon, HeaderNav } from "@/components/dellamall/index";
import Container from "./Layouts/container";
import logo from '@/images/dellamall/top/kasou_logo.svg'
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useCallback, useEffect } from "react";
import axios from "@/lib/axios";

const Header = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user, logout } = useAuth()

  const profileCheck = useCallback(async () => {
    await csrf()

    await axios.post(`/api/d_profile_get`, {
      id: user?.id,
    }).then((res) => {
      // console.log(res)
      if (!res.data) {
        router.push('/dellamall/mypage/create')
      }
    }).catch((e) => {
      console.error(e)
    })
  }, [user])

  useEffect(() => {
    if (user) {
      profileCheck()
    }
  }, [])

  return (
    <header className={`${styles.header} ${router.route === "/dellamall" ? null : styles.kasou}`}>
      <Container>
        <div className={styles.flex}>
          <div className={styles.left}>
            {router.route === "/dellamall" ?
              null
              :
              <Link href="/dellamall">
                <a className={`${styles.logo} hoverEffect pc`}>
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
            <button
              type="button"
              onClick={() => logout()}
            >ログアウト</button>
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