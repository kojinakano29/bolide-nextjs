import styles from '@/styles/dellamall/components/shopSearch.module.scss'
import { Trend } from "@/components/dellamall";
import Container from "@/components/dellamall/Layouts/container";
import PageLayoutDellamall from "@/components/Layouts/PageLayoutDellamall";

const ShopSearch = () => {
  return (
    <section className="cont1">
      <Container small>
        <div className={styles.trend}>
          <Trend />
        </div>
      </Container>
    </section>
  );
}

export default ShopSearch;

ShopSearch.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}