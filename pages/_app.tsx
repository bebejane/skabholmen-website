import '/styles/index.scss'
import DatoSEO from '/lib/dato/components/DatoSEO';
import { GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";
import { useRouter } from 'next/router';
import { Menu, Layout, Footer } from '/components';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps } : AppProps) {
  
  //usePagesViews(); // Google Analytics page view tracker = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  const router = useRouter()
  const { asPath : pathname } = router
  const { site, seo, about, menu } = pageProps;
  
  return (
    <>
      <GoogleAnalytics />
      <DatoSEO seo={seo} site={site} pathname={pathname} key={pathname} noindex={true}/>
      <Menu menu={pageProps.menu}/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer about={about} menu={menu}/>
    </>
  )
}

export default MyApp
