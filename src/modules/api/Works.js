import { useCrudApi } from "@/composables/CrudApi";

const controller = "works";
let defaultCrud = useCrudApi(controller);

export default defaultCrud;
