import PageLayoutCorapura from "@/components/Layouts/pageLayoutCorapura";

const Corapura = () => {
  return (
    <div>
      Enter
    </div>
  );
}

export default Corapura;

Corapura.getLayout = function getLayout(page) {
  return <PageLayoutCorapura>{page}</PageLayoutCorapura>
}