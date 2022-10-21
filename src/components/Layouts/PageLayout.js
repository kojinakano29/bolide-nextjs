import {Header, Footer} from "@/components/liondor";

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