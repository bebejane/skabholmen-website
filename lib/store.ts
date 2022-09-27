import create from "zustand";

export interface StoreState {
  showMenu:boolean,
  showMenuMobile: boolean,
  setShowMenu : (showMenu:boolean) => void,
  setShowMenuMobile : (showMenuMobile:boolean) => void,
  showContact: boolean,
  setShowContact : (showContact:boolean) => void,
}

const useStore = create<StoreState>((set) => ({
	showMenu: true,
  showMenuMobile: false,
  showContact:false,
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
}));

export default useStore;
