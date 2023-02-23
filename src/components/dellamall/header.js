import { useRouter } from "next/router";
import styles from '@/styles/dellamall/components/header.module.scss'
import { SearchIcon, HeaderNav } from "@/components/dellamall/index";
import Container from "./Layouts/container";
import logo from '@/images/dellamall/top/kasou_logo.svg'
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import { useCallback, useEffect, useState } from "react";
import axios from "@/lib/axios";

const Header = () => {
  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const router = useRouter()
  const { user } = useAuth()
  const [searchActive, setSearchActive] = useState(false)

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

  const [show, setShow] = useState(false)

  const handleScroll = useCallback(() => {
    const nowPos = window.scrollY

    if (nowPos > 300) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [setShow])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className={`
        ${styles.header}
        ${router.route === "/dellamall" ? null : styles.kasou}
        ${show ? styles.active : null}
      `}>
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
              <SearchIcon setSearchActive={setSearchActive} />
            </div>
            <div className={`${styles.right} pc`}>
              <HeaderNav />
            </div>
            {searchActive ? null :
              <div className={`${styles.right} sp`}>
                <HeaderNav />
              </div>
            }
          </div>
        </Container>
      </header>

      <div className={`
        ${styles.header}
        ${styles.spHeader}
        ${show ? styles.active : null}
        sp
      `}>
        <Container>
          <div className={styles.flex}>
            <div className={styles.left}>
              <SearchIcon setSearchActive={setSearchActive} />
            </div>
            <div className={`${styles.right} pc`}>
              <HeaderNav />
            </div>
            {searchActive ? null :
              <div className={`${styles.right} sp`}>
                <HeaderNav />
              </div>
            }
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;