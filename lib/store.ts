import create from "zustand";

export interface StoreState {
  showMenu:boolean,
  showMenuMobile: boolean,
  setShowMenu : (showMenu:boolean) => void,
  setShowMenuMobile : (showMenuMobile:boolean) => void
}

const useStore = create<StoreState>((set) => ({
	showMenu: true,
  showMenuMobile: false,
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
}));

export default useStore;
