import { RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void
): void => {
  const handleClick = (e: MouseEvent): void => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
};

export default useClickOutside;
