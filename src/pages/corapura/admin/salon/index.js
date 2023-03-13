import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";

const AdminSalon = () => {
  return (
    <section className="cont1">
      <Container small>
        <h2 className="ttl1">オンラインサロン一覧</h2>
      </Container>
    </section>
  );
}

export default AdminSalon;

AdminSalon.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}