import { useCrudApi } from "@/composables/CrudApi";

let { get } = useCrudApi("roles");

export default { get };
