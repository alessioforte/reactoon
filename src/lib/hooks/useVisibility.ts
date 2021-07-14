import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface Options {
  root?: any;
  rootMargin?: any;
  threshold?: any;
}

interface Props {
  options?: Options;
  visible?: boolean;
}

const defaultConfig = {
  root: null,
  rootMargin: '0px',
  threshold: 0
};

const useVisibility = (
  props?: Props
): {
  setElement: Dispatch<SetStateAction<Element | null>>;
  isVisible: boolean;
  forceVisible: () => void;
  forceCheck: () => void;
} => {
  let observer: IntersectionObserver;
  const options = props?.options || {};
  const visible = props?.visible || false;

  const [isVisible, setIsVisible] = useState<boolean>(visible);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (visible) {
      forceVisible();
    }
  }, [visible]);

  useEffect(() => {
    if (element) {
      observer = new IntersectionObserver(handleIntersect, {
        ...defaultConfig,
        ...options
      });

      observer.observe(element);
      return () => observer?.disconnect();
    }
  }, [element, options.root, options.rootMargin, options.threshold]);

  const forceVisible = () => {
    setIsVisible(true);
  };

  const forceCheck = () => {
    if (element) {
      observer.unobserve(element);
      observer.observe(element);
    }
  };

  const handleIntersect = entries => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
      observer.disconnect();
    }
  };

  return { setElement, isVisible, forceVisible, forceCheck };
};

export default useVisibility;
