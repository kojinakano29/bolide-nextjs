import {Header, Footer} from "@/components";

const PageLayout = ({children}) => {
  return (
    <>
      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

export default PageLayout;