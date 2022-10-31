import { Footer, Header, Meta } from "@/components/dellamall";

const PageLayoutDellamall = ({children}) => {
  return (
    <>
      <Meta />

      <div className="dellamall">
        <Header />

        <main>
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}

export default PageLayoutDellamall;