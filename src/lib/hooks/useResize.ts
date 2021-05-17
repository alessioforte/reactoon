import { useEffect, useState } from 'react';

const useResize = (): { width: number; height: number; isSSR: boolean } => {
  const [size, setSize] = useState({ width: 100, height: 0 });
  const [isSSR, setIsSSR] = useState(typeof window === 'undefined');

  useEffect(() => {
    setIsSSR(typeof window === 'undefined');
  }, [typeof window === 'undefined']);

  useEffect(() => {
    if (!isSSR) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize({ width, height });
    }
  }, [isSSR]);

  useEffect(() => {
    const onResize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    window?.addEventListener('resize', onResize);
    return () => window?.removeEventListener('resize', onResize);
  }, []);

  return { ...size, isSSR };
};

export default useResize;
