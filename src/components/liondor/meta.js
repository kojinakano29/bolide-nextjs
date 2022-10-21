import { siteMeta } from "@/lib/liondor/constants";
import Head from "next/head";

const {siteTitle, siteLocale, siteType, siteIcon} = siteMeta;

const Meta = () => {
  return (
    <Head>
      <title>{siteTitle}</title>
    </Head>
  );
}

export default Meta;