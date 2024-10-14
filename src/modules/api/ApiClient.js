import axios from "axios";
import Consts from "@/modules/Consts";
import Router from "@/general/Router";

const defaultInstace = {
  baseURL: `${Consts.ApiBaseUrl}/api`,
  headers: {
    "Content-type": "application/json",
  },
  responseType: "json",
};

const token = localStorage.getItem(Consts.ACCESS_TOKEN_KEY);
if (token) defaultInstace.headers["Authorization"] = `Bearer ${token}`;

export const DefaultInstance = axios.create(defaultInstace);

DefaultInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response.status;

    if (status === 401) {
      await Router.push({ name: "home" });
      window.$message.error(
        "Срок действия вашего сеанса истек, войдите в свою учетную запись!"
      );

      return Promise.reject(error);
    }

    if (status === 403) {
      await Router.push({ name: "home" });
      window.$message.error(
        "У вас недостаточно прав для просмотра этой страницы!"
      );

      return Promise.reject(error);
    }

    window.$message.error(error.response.data);
    return Promise.reject(error);
  }
);
