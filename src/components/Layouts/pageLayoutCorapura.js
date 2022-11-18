import { Footer, Header, Meta } from "@/components/corapura";
import { useRouter } from "next/router";

const PageLayoutCorapura = ({children}) => {
  const router = useRouter()

  return (
    <>
      <Meta />

      <div className={`corapura ${router.route === "/corapura" ? "topPage" : null}`}>
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