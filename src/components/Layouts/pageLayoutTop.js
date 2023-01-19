import { Footer, Header, Meta } from "@/components/top";
import { useRouter } from "next/router";

const PageLayoutTop = ({children}) => {
  const router = useRouter()

  return (
    <>
      <Meta />

      <div className={`bolide_top bjc_page`}>
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