import axios from "axios";
import successHandler from "@/utilities/successHandler";
import errorHandler from "@/utilities/errorHandler";
import { CLIENT_API_ENPOINT } from "@/constants/client.env";

axios.defaults.baseURL = CLIENT_API_ENPOINT;
axios.defaults.withCredentials = true;

const request = {
  create: async ({ entity, jsonData }: any) => {
    try {
      const response = await axios.post(entity + "/create", jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  createAndUpload: async ({ entity, jsonData }: any) => {
    try {
      const response = await axios.post(entity + "/create", jsonData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  read: async ({ entity, id }: any) => {
    try {
      const response = await axios.get(entity + "/read/" + id);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  update: async ({ entity, id, jsonData }: any) => {
    try {
      const response = await axios.patch(entity + "/update/" + id, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  updateAndUpload: async ({ entity, id, jsonData }: any) => {
    try {
      const response = await axios.patch(entity + "/update/" + id, jsonData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  delete: async ({ entity, id }: any) => {
    try {
      const response = await axios.delete(entity + "/delete/" + id);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  filter: async ({ entity, options = {} }: any) => {
    try {
      let filter = options.filter ? "filter=" + options.filter : "";
      let equal = options.equal ? "&equal=" + options.equal : "";
      let query = `?${filter}${equal}`;

      const response = await axios.get(entity + "/filter" + query);
      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  search: async ({ entity, options = {} }: any) => {
    try {
      let query = "?";
      for (var key in options) {
        query += key + "=" + options[key] + "&";
      }
      query = query.slice(0, -1);
      // headersInstance.cancelToken = source.token;
      const response = await axios.get(entity + "/search" + query);

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  list: async ({ entity, options = {} }: any) => {
    try {
      let query = "?";
      for (var key in options) {
        query += key + "=" + options[key] + "&";
      }
      query = query.slice(0, -1);

      const response = await axios.get(entity + "/list" + query);

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  listAll: async ({ entity }: any) => {
    try {
      const response = await axios.get(entity + "/listAll");

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  post: async ({ entity, jsonData }: any) => {
    try {
      const response = await axios.post(entity, jsonData);

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  get: async ({ entity }: any) => {
    try {
      const response = await axios.get(entity);
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  patch: async ({ entity, jsonData }: any) => {
    try {
      const response = await axios.patch(entity, jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  upload: async ({ entity, id, jsonData }: any) => {
    try {
      const response = await axios.patch(entity + "/upload/" + id, jsonData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  source: () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    return source;
  },

  summary: async ({ entity }: any) => {
    try {
      const response = await axios.get(entity + "/summary");

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  mail: async ({ entity, jsonData }: any) => {
    try {
      const response = await axios.post(entity + "/mail/", jsonData);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },

  convert: async ({ entity, id }: any) => {
    try {
      const response = await axios.get(`${entity}/convert/${id}`);
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
};
export default request;
