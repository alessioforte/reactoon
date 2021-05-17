import { useEffect, useState } from 'react';
import isMobile from '../utils/isMobile';

const useDevice = (): boolean => {
  const [state, setState] = useState<boolean>(isMobile());

  useEffect(() => {
    const device = isMobile();
    setState(device);
  }, []);

  return state;
};

export default useDevice;
