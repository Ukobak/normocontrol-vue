import { DefaultInstance } from "./ApiClient";
import Consts from "../Consts";

const account = {
  login: async (login, password) => {
    const response = (
      await DefaultInstance.post("account/login", { login, password })
    ).data;

    localStorage.setItem(Consts.ACCESS_TOKEN_KEY, response);
  },
  saveMe: (account) => {
    localStorage.setItem(Consts.ACCOUNT_KEY, JSON.stringify(account));
  },
  getMe: () => {
    return JSON.parse(localStorage.getItem(Consts.ACCOUNT_KEY));
  },
  logout: () => {
    localStorage.removeItem(Consts.ACCESS_TOKEN_KEY);
    localStorage.removeItem(Consts.ACCOUNT_KEY);
  },
  isAuth: () => {
    return localStorage.getItem(Consts.ACCESS_TOKEN_KEY) != null;
  },
  isAdmin: () => {
    const token = localStorage.getItem(Consts.ACCESS_TOKEN_KEY);

    if (!token) return false;

    return (
      parseJwt(token)[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] == "Admin"
    );

    function parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }
  },
};

export default account;
