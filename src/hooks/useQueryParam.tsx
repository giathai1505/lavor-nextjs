import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ParamsObject = Record<string, string>;

const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState(new URLSearchParams());
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlParams = new URLSearchParams(
      Array.from(searchParams?.entries() ?? [])
    );
    setQueryParams(urlParams);
  }, []);

  const setQueryParam = (arr: ParamsObject) => {
    setQueryParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      Object.entries(arr).forEach(([key, value]) => {
        newParams.set(key, value);
      });

      const search = newParams.toString();
      const query = search ? `?${search}` : "";
      router.replace(`${pathname}${query}`);
      return newParams;
    });
  };

  const getQueryParam = (key: string) => {
    return queryParams.get(key);
  };

  const deleteQueryParam = (key: string) => {
    setQueryParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete(key);
      const search = newParams.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
      return newParams;
    });
  };

  return {
    setQueryParam,
    getQueryParam,
    deleteQueryParam,
  };
};

export default useQueryParams;
