import { notification } from "antd";
import { codeMessage } from "../constants/constants";

// type TSuccessHandler<T> = {
//   response: T;
//   options: {
//     notifyOnSuccess: boolean;
//     notifyOnFailed: boolean;
//   };
// };

const successStatus = [204, 201];

const successHandler = (
  response: any,
  options = { notifyOnSuccess: false, notifyOnFailed: true }
) => {
  const { data, status } = response;
  if (data || successStatus.includes(status)) {
    const message = response.data && data?.message;
    const successText = message || codeMessage[response.status];

    if (options.notifyOnSuccess) {
      notification.config({
        duration: 2,
        maxCount: 2,
      });
      notification.success({
        message: `Request success`,
        description: successText,
      });
    }
  } else {
    const message = response.data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    if (options.notifyOnFailed) {
      notification.config({
        duration: 4,
        maxCount: 2,
      });
      notification.error({
        message: `Request error ${status}`,
        description: errorText,
      });
    }
  }
};

export default successHandler;
