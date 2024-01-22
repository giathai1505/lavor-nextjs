import { Category, TDesignData } from "@/types/type";

export const localStorageKeys = {
  CARTS: "carts",
};

export const webRouter = {
  user: {
    sanPham: "/san-pham",
    HOME_PAGE: "/",
  },
  admin: {
    CAR_MANAGEMENT: "/admin/car-management",
    PRODUCT_MANAGEMENT: "/admin/product-management",
    BLOG_MANAGEMENT: "/admin/blog-management",
    AGENCY_MANAGEMENT: "/admin/agency-management",
    REVIEW_MANAGEMENT: "/admin/rating-management",
  },
};

export const eventKeys = {
  ADD_TO_CART: "ADD_TO_CART",
};

export const codeMessage: Record<number, string> = {
  200: "The server successfully returned the requested data. ",
  201: "Create or modify data successfully. ",
  202: "A request has entered the background queue (asynchronous task). ",
  204: "Delete data successfully. ",
  400: "There was an error in the request sent, and the server did not create or modify data. ",
  401: "The admin does not have permission please try to login again. ",
  403: "The admin is authorized, but access is forbidden. ",
  404: "The request sent is for a record that does not exist, and the server is not operating. ",
  406: "The requested format is not available. ",
  410: "The requested resource has been permanently deleted and will no longer be available. ",
  422: "When creating an object, a validation error occurred. ",
  500: "An error occurred in the server, please check the server. ",
  502: "Gateway error. ",
  503: "The service is unavailable, the server is temporarily overloaded or maintained. ",
  504: "The gateway has timed out. ",
};

export const REGEX = {
  phone: /^(?:\+84|0)(3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/,
};

export const DEFAULT_DESIGN_DATA: TDesignData = {
  car: {
    brand: { id: NaN, value: "" },
    model: { id: NaN, value: "" },
    version: { id: NaN, value: "" },
    year: { id: NaN, value: "" },
    image: "",
  },
  design: {
    colorID: NaN,
    holeID: "",
    materialID: "",
    note: "",
  },
};

export const BLOG_CATEGORY_COLOR = {
  [Category.TIPS]: "#ff3385",
  [Category.RECRUITMENT]: "#ffae25",
  [Category.ABOUT]: "#1559c2",
};

export const COMMON_COLOR = {
  star: "#ffce3d",
  primary: "#f47a20",
};
