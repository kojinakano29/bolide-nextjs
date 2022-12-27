import styles from '@/styles/top/components/home.module.scss'
import PageLayoutTop from "@/components/Layouts/pageLayoutTop";

const BolideTop = () => {
  return (
    <div></div>
  );
}

export default BolideTop;

BolideTop.getLayout = function getLayout(page) {
  return <PageLayoutTop>{page}</PageLayoutTop>
}