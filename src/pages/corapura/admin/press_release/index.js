import Container from "@/components/corapura/Layout/container";
import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";

const AdminPressRelease = () => {
  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">プレスリリース一覧</h2>
      </Container>
    </section>
  );
}

export default AdminPressRelease;

AdminPressRelease.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}