import { Footer, Header, Meta } from "@/components/corapura";

const PageLayoutCorapura = ({children}) => {
  return (
    <>
      <Meta />

      <div className="corapura">
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}

export default PageLayoutCorapura;