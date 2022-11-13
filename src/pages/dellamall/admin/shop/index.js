import Container from "@/components/dellamall/Layouts/container";
import PageLayoutDellamall from "@/components/Layouts/PageLayoutDellamall";

const AdminShop = () => {
  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl2">作成したショップ一覧</h2>
      </Container>
    </section>
  );
}

export default AdminShop;

AdminShop.getLayout = function getLayout(page) {
  return <PageLayoutDellamall>{page}</PageLayoutDellamall>
}