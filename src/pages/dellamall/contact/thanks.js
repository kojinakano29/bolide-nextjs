// import styles from '@/styles/liondor/components/form.module.scss'
// import Container from "@/components/liondor/Layouts/container";
// import PageLayoutLiondor from "@/components/Layouts/PageLayoutLiondor";
// import { PageTitle } from '@/components/liondor';
// import Link from 'next/link';
// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// const ContactThanks = () => {
//   const router = useRouter()

//   useEffect(() => {
//     const contact = sessionStorage.getItem('contact')

//     if (!contact) {
//       router.push(`/liondor/contact`)
//     }

//     sessionStorage.removeItem('contact')
//   }, [])

//   return (
//     <section className="cont1">
//       <PageTitle title="CONTACT" ivy />
//       <Container small900>
//         <div className={styles.thanksBox}>
//           <p className={styles.txt}>送信が完了しました。</p>
//           <p className={styles.txt2}>
//             お問合わせいただき誠にありがとうございました。
//             <br/>お問い合わせ内容を確認させていただき、後ほど担当者よりご回答をさせていただきます。
//             <br/>恐れ入りますが、今しばらくお待ちいただけますよう、よろしくお願い申し上げます。
//           </p>
//           <Link href="/liondor/present">
//             <a className="btn3 ivy">back to top</a>
//           </Link>
//         </div>
//       </Container>
//     </section>
//   );
// }

// export default ContactThanks;

// ContactThanks.getLayout = function getLayout(page) {
//   return <PageLayoutLiondor>{page}</PageLayoutLiondor>
// }