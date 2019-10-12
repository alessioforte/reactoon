import { useEffect, useState } from 'react'

const useResize = (): { width: number, height: number } => {
  const width: number = window.innerWidth;
  const height: number = window.innerHeight;
  const [size, setSize] = useState({ width, height })

  useEffect(() => {
    const onResize = () => setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  return size
}

export default useResize
