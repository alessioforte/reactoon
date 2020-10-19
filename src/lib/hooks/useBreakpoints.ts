import { useState, useEffect } from 'react'
import useResize from './useResize'
import useDevice from './useDevice'

const useBreakpoints = () => {
  const { width } = useResize()
  const isMobile = useDevice()

  let breakpoints = {
    isSmall: false,
    isMedium: false,
    isLarge: true,
    isMobile
  }

  if (width <= 768) {
    breakpoints = {
      isSmall: true,
      isMedium: false,
      isLarge: false,
      isMobile
    }
  } else if (width > 768 && width < 1440) {
    breakpoints = {
      isSmall: false,
      isMedium: true,
      isLarge: false,
      isMobile
    }
  }

  const [state, setState] = useState(breakpoints)

  useEffect(() => {
    setState(breakpoints)
  }, [breakpoints])

  return state
}

export default useBreakpoints;
