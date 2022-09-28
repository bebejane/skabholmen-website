import create from "zustand";

export interface StoreState {
  showMenu:boolean,
  showMenuMobile: boolean,
  invertedMenu: boolean,
  setShowMenu : (showMenu:boolean) => void,
  setShowMenuMobile : (showMenuMobile:boolean) => void,
  showContact: boolean,
  setShowContact : (showContact:boolean) => void,
  setInvertedMenu : (invertedMenu:boolean) => void,
}

const useStore = create<StoreState>((set) => ({
	showMenu: true,
  showMenuMobile: false,
  showContact:false,
  invertedMenu: false,
	setShowMenu: (showMenu : boolean) =>  
    set((state) => ({
      showMenu
    })
  ),
  setShowMenuMobile: (showMenuMobile : boolean) =>  
    set((state) => ({
      showMenuMobile
    })
  ),
  setShowContact: (showContact : boolean) =>  
    set((state) => ({
      showContact
    })
  ),
  setInvertedMenu: (invertedMenu : boolean) =>  
    set((state) => ({
      invertedMenu
    })
  ),
}));

export default useStore;
