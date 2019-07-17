import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

export function useWindowWidth(inputs = [], debounceMs = 100) {
  const [windowWidth, setWindowWidth] = useState(null);

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

function useDebounce(value, delay, opts) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = debounce(
        () => {
          setDebouncedValue(value);
        },
        delay,
        opts
      );

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value]
  );

  return debouncedValue;
}
