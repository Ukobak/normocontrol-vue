import { DefaultInstance } from "./ApiClient";
import { useCrudApi } from "@/composables/CrudApi";

const controller = "users";
let defaultCrud = useCrudApi(controller);

defaultCrud.getMe = async () => {
  return (await DefaultInstance.get(`${controller}/getMe`)).data;
};

defaultCrud.editMe = async (data) => {
  await DefaultInstance.post(`${controller}/editMe`, data);
};

export default defaultCrud;
