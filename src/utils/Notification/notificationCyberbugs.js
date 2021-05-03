import { notification } from "antd";

export const notiFunction = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};
