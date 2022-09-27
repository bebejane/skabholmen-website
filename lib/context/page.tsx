import { useContext, createContext } from "react";

export type PageProps = {
  layout: 'page' | 'full',
  menu: 'normal' | 'inverted',
  footerSeparator: boolean
}

const initialState: PageProps = {
  layout: 'page',
  menu: 'normal',
  footerSeparator: false
}

export const PageContext = createContext(initialState);

export type PageProviderProps = {
  children: React.ReactElement | React.ReactElement[],
  value: PageProps
}

// Context provider
export const PageProvider = ({ children, value }: PageProviderProps) => {

  return (
    <PageContext.Provider value={{ ...initialState, ...value }}>
      {children}
    </PageContext.Provider>
  )
};
// usePage hook
export const usePage = (): PageProps => {
  return useContext(PageContext)
}
