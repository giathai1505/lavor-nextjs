import React, { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState<string>(value);
  useEffect(() => {
    const timeOutId: NodeJS.Timeout = setTimeout(
      () => setDebounceValue(value),
      delay
    );

    return () => {
      clearTimeout(timeOutId);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
