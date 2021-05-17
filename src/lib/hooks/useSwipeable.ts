import { useState, useEffect, useRef } from 'react';

const useSwipeable = ({
  selected = 0,
  length,
  enableTransition,
  duration
}): any => {
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [index, setIndex] = useState(selected);
  const [offset, setOffset] = useState<number>(0);
  const startX = useRef(0);
  const delta = useRef(0);
  const LIMIT = 50;

  useEffect(() => {
    setIndex(selected);
  }, [selected]);

  useEffect(() => {
    let interval;
    if (enableTransition && !isSwiping) {
      interval = setInterval(() => {
        const i = (index + 1) % length;
        const value = Number.isNaN(i) ? 0 : i;
        setIndex(value);
      }, duration);
    }
    return () => clearInterval(interval);
  }, [index, isSwiping]);

  const shift = i => {
    setIndex(i);
  };

  const onMouseDown = e => {
    startX.current = e.clientX;
    setIsSwiping(true);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onTouchStart = e => {
    const touch = e.targetTouches[0];
    startX.current = touch.clientX;
    setIsSwiping(true);
    window.addEventListener('touchmove', onTouchMove, {
      capture: true,
      passive: false
    });
    window.addEventListener('touchend', onTouchEnd);
  };

  const onMouseMove = e => {
    const d = e.clientX - startX.current;
    if (!(index === 0 && d > 0) && !(index === length - 1 && d < 0)) {
      delta.current = d;
      setOffset(delta.current);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }

    const touch = e.targetTouches[0];
    const d = touch.clientX - startX.current;
    if (!(index === 0 && d > 0) && !(index === length - 1 && d < 0)) {
      delta.current = d;
      setOffset(delta.current);
    }
  };

  const onMouseUp = () => {
    if (delta.current < -200 && index !== length - 1) {
      setIndex(index + 1);
    }
    if (delta.current > 200 && index !== 0) {
      setIndex(index - 1);
    }
    setOffset(0);
    setIsSwiping(false);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (delta.current < -LIMIT && index !== length - 1) {
      setIndex(index + 1);
    }
    if (delta.current > LIMIT && index !== 0) {
      setIndex(index - 1);
    }
    setOffset(0);
    setIsSwiping(false);
    window.removeEventListener('touchmove', onTouchMove, { capture: true });
    window.removeEventListener('touchend', onTouchEnd);
  };

  return { isSwiping, offset, onMouseDown, onTouchStart, index, shift };
};

export default useSwipeable;
