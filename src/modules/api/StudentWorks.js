import { DefaultInstance } from "./ApiClient";

const controller = "studentWorks";

export default {
  get: async (searchWork) => {
    return (
      await DefaultInstance.get(`${controller}/get?searchWork=${searchWork}`)
    ).data;
  },
  uploadWork: async (data, config) => {
    config.headers = { "Content-Type": "multipart/form-data" };
    await DefaultInstance.post(`${controller}/uploadWork`, data, config);
  },
  getMyWorks: async (searchWork) => {
    return (
      await DefaultInstance.get(
        `${controller}/getMyWorks?searchWork=${searchWork}`
      )
    ).data;
  },
};
