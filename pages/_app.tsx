import '/styles/index.scss'
import DatoSEO from '/lib/dato/components/DatoSEO';
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
  const page : PageProps = Component.page as PageProps;
  const Layout = page?.layout === 'page' ? LayoutPage : LayoutFull

  const router = useRouter()
  const { asPath : pathname } = router
  const { site, seo, contact, menuFooter} = pageProps;

  const errorCode = parseInt(router.pathname.replace('/', ''))
  const isError = !isNaN(errorCode) && (errorCode > 400 && errorCode < 600)

  if (isError) 
    return <Component {...pageProps} />
  
  return (
    <>
      <DatoSEO 
        seo={seo} 
        site={site}
        pathname={pathname} 
        key={pathname} 
        noindex={false}
        separator={' · '}
      />
      <PageProvider value={page}>
        <Navbar/>
        <Menu menu={pageProps.menu} contact={contact}/>
        <MenuMobile menu={pageProps.menu} contact={contact}/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer contact={contact} menu={menuFooter}/>
      </PageProvider>
    </>
  )
}

export default MyApp
