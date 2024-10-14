import { DefaultInstance } from "@/modules/api/ApiClient";

export function useCrudApi(controller) {
  async function get() {
    return (await DefaultInstance.get(`/${controller}/get`)).data;
  }

  async function remove(id) {
    await DefaultInstance.delete(`/${controller}/delete?id=${id}`);
  }

  async function update(data) {
    await DefaultInstance.put(`/${controller}/update`, data);
  }

  async function create(data) {
    await DefaultInstance.post(`/${controller}/create`, data);
  }

  return {
    get,
    remove,
    update,
    create,
  };
}
