import throttle from 'lodash/throttle';
import { useEffect, useState, useCallback, useRef } from 'react';

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

export function useMatchMedia(query) {
  const [matches, setMatches] = useState(false);

  useOnResize(() => {
    setMatches(matchMedia(query).matches);
  }, [query]);

  return matches;
}

export function useEffectSkipFirst(cb, inputs) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      cb();
    } else {
      isFirstRender.current = false;
    }
  }, inputs);
}

export function useElemDimensions(elemRef, debounceMs = 100) {
  const [dimensions, setDimensions] = useState(false);

  useOnResize(
    () => {
      if (elemRef) {
        const {
          top,
          left,
          right,
          bottom,
          width,
          height,
        } = elemRef.getBoundingClientRect();
        setDimensions({ top, left, right, bottom, width, height });
      }
    },
    [elemRef],
    debounceMs
  );

  return dimensions;
}

export function useOnClickOutside(refs, handler) {
  refs = Array.isArray(refs) ? refs : [refs];

  useEffect(() => {
    const listener = event => {
      if (
        !refs.filter(ref => ref).length ||
        refs.filter(ref => ref.contains(event.target)).length
      ) {
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
  }, [...refs, handler]);
}

export function useDisableBodyScrolling(disabled) {
  useEffect(() => {
    // Prevent body scrolling
    document.body.style.overflow = disabled ? 'hidden' : 'visible';
    document.body.style.position = disabled ? 'relative' : '';
  }, [disabled]);
}

export function useScrollToId(id, inputs = []) {
  useEffect(() => {
    if (!id) return;
    const elem = document.querySelector(`#${id}`);
    const scroll = () => {
      elem.scrollIntoView({
        behavior: 'smooth',
      });
    };
    if (elem) {
      if (document.readyState !== 'complete') {
        window.addEventListener('load', scroll);
        return () => window.removeEventListener('load', scroll);
      } else {
        setTimeout(() => {
          scroll();
        }, 250);
      }
    }
  }, [id, ...inputs]);
}
