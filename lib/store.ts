import create from "zustand";

export interface StoreState {
  showMenu:boolean,
  setShowMenu : (showMenu:boolean) => void
}

const useStore = create<StoreState>((set) => ({
	showMenu: true,
	setShowMenu: (showMenu : boolean) =>  
    set((state) => ({
      showMenu
    })
  ),
}));

export default useStore;
