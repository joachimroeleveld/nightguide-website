import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

export function useWindowWidth(inputs = [], debounceMs = 100) {
  const [windowWidth, setWindowWidth] = useState(false);

  useEffect(() => {
    const resizeListener = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, debounceMs);
    window.addEventListener('resize', resizeListener);
    resizeListener();
    return () => window.removeEventListener('resize', resizeListener);
  }, inputs);

  return windowWidth;
}

export function useElemDimensions(elemRef, debounceMs = 100) {
  const [dimensions, setDimensions] = useState(false);

  useEffect(() => {
    const resizeListener = debounce(() => {
      if (elemRef) {
        setDimensions(elemRef.getBoundingClientRect());
      }
    }, debounceMs);
    resizeListener();
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [elemRef]);

  return dimensions;
}
