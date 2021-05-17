import { useState, useEffect } from 'react';
import useResize from './useResize';
import isMobile from '../utils/isMobile';

interface Size {
  width: number;
  height: number;
}

interface Breakpoints {
  isSSR: boolean;
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  size: Size;
}

const useBreakpoints = (): Breakpoints => {
  const { width, height, isSSR } = useResize();
  const setBreakpoints = () => {
    const isDesktop = !isSSR && !isMobile();
    const breakpoints: Breakpoints = {
      isSSR,
      isSmall: false,
      isMedium: false,
      isLarge: true,
      isDesktop: isDesktop,
      isMobile: !isDesktop && width < 768,
      isTablet: !isDesktop && width >= 768,
      size: { width, height }
    };

    if (width <= 768) {
      breakpoints.isSmall = true;
      breakpoints.isMedium = false;
      breakpoints.isLarge = false;
    } else if (width > 768 && width < 1200) {
      breakpoints.isSmall = false;
      breakpoints.isMedium = true;
      breakpoints.isLarge = false;
    }

    return breakpoints;
  };
  const [state, setState] = useState(setBreakpoints());

  useEffect(() => {
    setState(setBreakpoints());
  }, [width, isSSR]);

  return state;
};

export default useBreakpoints;
