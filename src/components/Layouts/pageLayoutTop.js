import { Footer, Header, Meta } from "@/components/top";

const PageLayoutTop = ({children}) => {
  return (
    <>
      <Meta />

      <div className="bolide_top">
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}

export default PageLayoutTop;