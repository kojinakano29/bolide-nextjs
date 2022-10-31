import {Header, Footer, Meta} from "@/components/liondor";

const PageLayoutLiondor = ({children}) => {
  return (
    <>
      <Meta />

      <div className="liondor">
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}

export default PageLayoutLiondor;