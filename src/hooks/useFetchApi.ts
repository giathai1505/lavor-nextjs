import { useState, useCallback } from "react";
import { AxiosResponse, AxiosError } from "axios";
import successHandler from "@/utilities/successHandler";
import errorHandler from "@/utilities/errorHandler";
import useInterceptorsAxios from "./useInterceptorsAxios";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseFetchApi {
  create: <T>(
    url: string,
    data: any,
    isUpload: boolean,
    config?: object
  ) => Promise<T>;
  edit: <T>(url: string, data: any, config?: object) => Promise<T>;
  get: <T>(url: string, config?: object) => Promise<T>;
  delete: <T>(url: string, data?: any, config?: object) => Promise<T>;
  error: AxiosError | null;
  loading: boolean;
}

const useFetchApi = (): UseFetchApi => {
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);
  const request = useInterceptorsAxios();

  const makeRequest = useCallback(
    async <T>(
      method: RequestMethod,
      url: string,
      data: any,
      isUpload: boolean = false,
      config?: object,
      option: boolean = true
    ): Promise<T> => {
      try {
        setError(null);
        setLoading(true);

        let requestData: any = data;

        let requestConfig = { ...config };

        if (method === "POST" && isUpload) {
          const formData = new FormData();

          if (Array.isArray(data) && data.length > 1) {
            data.forEach((file) => {
              formData.append("files", file);
            });
          } else {
            formData.append("file", data);
          }
          requestData = formData;
          requestConfig = {
            ...config,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
        }

        const response: AxiosResponse<T> = await request({
          method,
          url,
          data: requestData,
          ...requestConfig,
        });

        successHandler(response, {
          notifyOnSuccess: option,
          notifyOnFailed: option,
        });

        return response.data;
      } catch (error) {
        errorHandler(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [request]
  );

  const create = useCallback(
    async <T>(
      url: string,
      data: any,
      isUpload?: boolean,
      config?: object
    ): Promise<T> => makeRequest<T>("POST", url, data, isUpload, config),
    [makeRequest]
  );

  const edit = useCallback(
    async <T>(url: string, data: any, config?: object): Promise<T> =>
      makeRequest<T>("PUT", url, data, false, config),
    [makeRequest]
  );

  const get = useCallback(
    async <T>(url: string, config?: object): Promise<T> =>
      makeRequest<T>("GET", url, undefined, false, config, false),
    [makeRequest]
  );

  const remove = useCallback(
    async <T>(url: string, data?: any, config?: object): Promise<T> =>
      makeRequest<T>("DELETE", url, data, false, config),
    [makeRequest]
  );

  return {
    create,
    edit,
    get,
    delete: remove,
    error,
    loading,
  };
};

export default useFetchApi;
