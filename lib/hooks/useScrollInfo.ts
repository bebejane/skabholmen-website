
import { useEffect, useState, useRef, useCallback } from "react";

export type ScrollInfo = {
  isScrolling: boolean, 
  isPageTop: boolean,
  isPageBottom: boolean,
  isScrolledUp: boolean,
  isScrolledDown: boolean,
  scrolledPosition: number,
  documentHeight: number,
  viewportHeight: number,
  timer: ReturnType<typeof setTimeout>,
}

export default function useScrollInfo(pageBottomLimit = 0) {

  const isServer = typeof window === 'undefined'
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    isScrolling:false, 
    isPageTop: false,
    isPageBottom: false,
    isScrolledUp: true,
    isScrolledDown: false,
    scrolledPosition: isServer ? 0 : window.pageYOffset,
    documentHeight: isServer ? 0 : document.documentElement.offsetHeight,
    viewportHeight: isServer ? 0 : window.innerHeight,
    timer:null,
  });

  const lastScrollInfo = useRef(scrollInfo);

  const handleScroll = useCallback(() => {
    
    clearTimeout(lastScrollInfo.current.timer)

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const viewportHeight = isServer ? 0 : window.innerHeight
    const scrolledPosition = isServer ? 0 : Math.max(0, Math.ceil(window.pageYOffset));
    const isPageBottom = isServer ? false : (window.innerHeight + scrolledPosition) >= documentHeight - pageBottomLimit;
    const isPageTop = isServer ? true : window.pageYOffset <= 0;
    const isScrolledUp = scrolledPosition < lastScrollInfo.current.scrolledPosition;
    const isScrolledDown = scrolledPosition > lastScrollInfo.current.scrolledPosition;
    const isScrolling = true;
    const timer = lastScrollInfo.current.timer;
    const scrollInfo = {
      isScrolling,
      isPageTop,
      isPageBottom,
      isScrolledUp,
      isScrolledDown,
      scrolledPosition,
      documentHeight,
      viewportHeight,
      timer
    };
    setScrollInfo(scrollInfo);
    lastScrollInfo.current = {
      ...scrollInfo,
      timer: setTimeout(() => setScrollInfo({...scrollInfo, isScrolling:false}), 100)
    }
    
  }, [isServer, pageBottomLimit]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return scrollInfo;
}
