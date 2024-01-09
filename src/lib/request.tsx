import axios from "axios";
import { CLIENT_API_ENPOINT } from "../constants/client.env";
import successHandler from "../utilities/successHandler";
import errorHandler from "../utilities/errorHandler";

enum Endpoints {
  Create = "/create",
  Read = "/read",
}

type TRequestParam = {
  entity: string;
  jsonData?: Record<string, any>;
  id?: string;
  options: Record<string, any>;
};

axios.defaults.baseURL = CLIENT_API_ENPOINT;
axios.defaults.withCredentials = true;

class ApiRequest {
  private static instance: ApiRequest | null = null;

  private constructor() {
    if (ApiRequest.instance) {
      return ApiRequest.instance;
    }

    ApiRequest.instance = this;
  }

  public static getInstance(): ApiRequest {
    if (!ApiRequest.instance) {
      ApiRequest.instance = new ApiRequest();
    }
    return ApiRequest.instance;
  }

  public create = async ({ entity, jsonData }: TRequestParam) => {
    try {
      const response = await axios.post(
        `${entity}${Endpoints.Create}`,
        jsonData
      );
      successHandler(response, {
        notifyOnSuccess: true,
        notifyOnFailed: true,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  };

  public createAndUpload = async ({ entity, jsonData }: TRequestParam) => {
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
  };

  public read = async ({ entity, id }: TRequestParam) => {
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
  };

  public update = async ({ entity, id, jsonData }: TRequestParam) => {
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
  };

  public updateAndUpload = async ({ entity, id, jsonData }: TRequestParam) => {
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
  };

  public delete = async ({ entity, id }: TRequestParam) => {
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
  };

  public filter = async ({ entity, options = {} }: TRequestParam) => {
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
  };

  public search = async ({ entity, options = {} }: TRequestParam) => {
    try {
      let query = "?";
      for (var key in options) {
        query += key + "=" + options[key] + "&";
      }
      query = query.slice(0, -1);
      const response = await axios.get(entity + "/search" + query);

      successHandler(response, {
        notifyOnSuccess: false,
        notifyOnFailed: false,
      });
      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  };

  public list = async ({ entity, options = {} }: TRequestParam) => {
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
  };

  public listAll = async ({ entity }: any) => {
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
  };
}

const apiRequestInstance = ApiRequest.getInstance();

export default apiRequestInstance;
