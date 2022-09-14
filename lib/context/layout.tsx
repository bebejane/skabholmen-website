import { useContext, createContext } from "react";

export type PageLayoutProps = {
  type: 'page' | 'full',
  menu: 'normal' | 'inverted',
}

const initialState : PageLayoutProps = {
  type: 'page',
  menu: 'normal',
}

export const LayoutContext = createContext(initialState);

export type LayoutProviderProps = {
  children: React.ReactElement,
  value: PageLayoutProps
}

// Context provider
export const LayoutProvider = ({ children, value } : LayoutProviderProps) => {
  
  return (
    <LayoutContext.Provider value={{...initialState, ...value }}>
      {children}
    </LayoutContext.Provider>
  )
};
// useLayout hook
export const useLayout = () : PageLayoutProps => {
  return useContext(LayoutContext)
}
