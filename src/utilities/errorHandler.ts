import { notification } from "antd";
import { codeMessage } from "../constants/constants";

const errorHandler = (error: any) => {
  const { response } = error;

  if (response.data && response.data.jwtExpired) {
  }

  if (response && response.status) {
    const message = response.data && response.data.message;

    const errorText = message || codeMessage[response.status];
    const { status } = response;
    notification.config({
      duration: 4,
      maxCount: 2,
    });

    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
    return response.data;
  } else {
    notification.config({
      duration: 5,
      maxCount: 1,
    });

    if (navigator.onLine) {
      notification.error({
        message: "Problem connecting to server",
        description: "Cannot connect to the server, Try again later",
      });
      return {
        success: false,
        result: null,
        message: "Cannot connect to the server, Check your internet network",
      };
    } else {
      notification.error({
        message: "No internet connection",
        description:
          "Cannot connect to the Internet, Check your internet network",
      });
      return {
        success: false,
        result: null,
        message: "Cannot connect to the server, Check your internet network",
      };
    }
  }
};

export default errorHandler;
