import { message } from "antd";
import "./Message.scss"

const success = (mes = "Thực hiện thành công") => {
  message.success(mes);
};

const error = (mes = "Errol") => {
  message.error(mes);
};

const warning = (mes = "Warning") => {
  message.warning(mes);
};

export { success, error, warning}