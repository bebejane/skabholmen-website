import '/styles/index.scss'
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';
import { useRouter } from 'next/router';
import { Menu, MenuMobile, LayoutPage, LayoutFull, Footer, Navbar } from '/components';
import { PageProvider, type PageProps } from '/lib/context/page';
import type { NextComponentType } from 'next';
import type { AppProps } from 'next/app'

type Props = AppProps & {
  Component: NextComponentType & {
    page: PageProps
  }
}

function MyApp({ Component, pageProps }: Props) {

  const router = useRouter()
  const page: PageProps = Component.page as PageProps;
  const Layout = page?.layout === 'page' ? LayoutPage : LayoutFull
  const { asPath: pathname } = router
  const { site, contact, menuFooter } = pageProps;
  const pageTitle = pageProps.pageTitle || page.title
  const description = site?.globalSeo.fallbackSeo.description
  const errorCode = parseInt(router.pathname.replace('/', ''))
  const isError = !isNaN(errorCode) && (errorCode > 400 && errorCode < 600)

  if (isError)
    return <Component {...pageProps} />

  return (
    <>
      <DefaultDatoSEO
        siteTitle="Skabholmen Invest"
        title={pageTitle}
        description={description}
        site={site}
        path={router.asPath}
      />
      <PageProvider value={page}>
        <Navbar />
        <Menu menu={pageProps.menu} contact={contact} />
        <MenuMobile menu={pageProps.menu} contact={contact} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer contact={contact} menu={menuFooter} />
      </PageProvider>
    </>
  )
}

export default MyApp
