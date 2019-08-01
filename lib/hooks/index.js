import throttle from 'lodash/throttle';
import { useEffect, useState, useCallback } from 'react';

export function useToggleState(initialValue) {
  const [val, setVal] = useState(initialValue);

  const toggleVal = useCallback(() => {
    setVal(!val);
  }, [val]);

  return [val, toggleVal];
}

export function useOnResize(cb, inputs = [], throttleMs = 100) {
  useEffect(() => {
    const resizeListener = throttle(() => cb(), throttleMs, { leading: false });
    window.addEventListener('resize', resizeListener);
    resizeListener();
    return () => window.removeEventListener('resize', resizeListener);
  }, inputs);
}

export function useOnScroll(cb, inputs = [], throttleMs = 100) {
  useEffect(() => {
    const scrollListener = throttle(() => cb(), throttleMs, { leading: false });
    window.addEventListener('scroll', scrollListener);
    scrollListener();
    return () => window.removeEventListener('scroll', scrollListener);
  }, inputs);
}

export function useHeaderHeight() {
  const [headerElem, setHeaderElem] = useState(null);

  useEffect(() => {
    setHeaderElem(document.querySelector('#page-header'));
  }, []);

  const dimensions = useElemDimensions(headerElem);

  return dimensions ? dimensions.height : null;
}

export function useWindowWidth(inputs = [], debounceMs = 100) {
  const [windowWidth, setWindowWidth] = useState(null);

  useOnResize(
    () => {
      setWindowWidth(window.innerWidth);
    },
    inputs,
    debounceMs
  );

  return windowWidth;
}

export function useElemDimensions(elemRef, debounceMs = 100) {
  const [dimensions, setDimensions] = useState(false);

  useOnResize(
    () => {
      if (elemRef) {
        setDimensions(elemRef.getBoundingClientRect());
      }
    },
    [elemRef],
    debounceMs
  );

  return dimensions;
}

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref || ref.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
