import { useCallback, useEffect, useRef } from 'react';

type TimeoutFn = (...args: any[]) => void;

export default function useTimeoutFn(fn: TimeoutFn, ms: number = 0): [() => boolean, () => void, () => void] {
  const ready = useRef(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const callback = useRef<TimeoutFn>(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  useEffect(() => {
    set();

    return clear;
  }, [ms, set, clear]);

  return [isReady, clear, set];
}
