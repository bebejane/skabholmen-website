import '/styles/index.scss'
import DatoSEO from '/lib/dato/components/DatoSEO';
import { GoogleAnalytics, usePagesViews } from "nextjs-google-analytics";
import { useRouter } from 'next/router';
import { Menu, LayoutPage, LayoutFull, Footer } from '/components';
import { LayoutProvider, type PageLayoutProps } from '/lib/context/layout';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app'

type Props = AppProps & {
  Component : NextComponentType & {
    layout: PageLayoutProps
  }
}

function MyApp({ Component , pageProps } : Props) {
  
  //usePagesViews(); // Google Analytics page view tracker = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const layout : PageLayoutProps = Component.layout as PageLayoutProps;
  const Layout = layout?.type === 'page' ? LayoutPage : LayoutFull

  const router = useRouter()
  const { asPath : pathname } = router
  const { site, seo, about} = pageProps;

  const errorCode = parseInt(router.pathname.replace('/', ''))
  const isError = !isNaN(errorCode) && (errorCode > 400 && errorCode < 600)

  if (isError) 
    return <Component {...pageProps} />
  console.log(layout)
  return (
    <>
      <GoogleAnalytics />
      <DatoSEO seo={seo} site={site} pathname={pathname} key={pathname} noindex={true}/>
      <LayoutProvider value={layout}>
        <Menu menu={pageProps.menu}/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LayoutProvider>
      <Footer about={about} menu={pageProps.menu}/>
    </>
  )
}

export default MyApp
