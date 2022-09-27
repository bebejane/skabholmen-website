import '/styles/index.scss'
import DatoSEO from '/lib/dato/components/DatoSEO';
import { GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";
import { useRouter } from 'next/router';
import { Menu, MenuMobile, LayoutPage, LayoutFull, Footer, Navbar } from '/components';
import { PageProvider, type PageProps } from '/lib/context/page';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app'

type Props = AppProps & {
  Component : NextComponentType & {
    page: PageProps
  }
}

function MyApp({ Component , pageProps } : Props) {
  
  //usePagesViews(); // Google Analytics page view tracker = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const page : PageProps = Component.page as PageProps;
  const Layout = page?.layout === 'page' ? LayoutPage : LayoutFull

  const router = useRouter()
  const { asPath : pathname } = router
  const { site, seo, contact} = pageProps;

  const errorCode = parseInt(router.pathname.replace('/', ''))
  const isError = !isNaN(errorCode) && (errorCode > 400 && errorCode < 600)

  if (isError) 
    return <Component {...pageProps} />
  
  return (
    <>
      <GoogleAnalytics />
      <DatoSEO seo={seo} site={site} pathname={pathname} key={pathname} noindex={true}/>
      <PageProvider value={page}>
        <Navbar/>
        <Menu menu={pageProps.menu} contact={contact}/>
        <MenuMobile menu={pageProps.menu} contact={contact}/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer contact={contact} menu={pageProps.menu}/>
      </PageProvider>
    </>
  )
}

export default MyApp
