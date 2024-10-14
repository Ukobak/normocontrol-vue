import { ref, reactive } from "vue";

export function useCrud(crudApi, detailsModal) {
  const data = ref([]);
  const loading = ref(true);

  const pagination = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [10, 25, 50, 100],
    onChange: (page) => {
      pagination.page = page;
    },
    onUpdatePageSize: (pageSize) => {
      pagination.pageSize = pageSize;
      pagination.page = 1;
    },
  });

  function addRecord() {
    detailsModal.value.open();
  }

  function updateRecord(row) {
    detailsModal.value.open({ ...row });
  }

  async function deleteRecord(row) {
    await crudApi.remove(row.id);
    await load();
  }

  async function onCompleted(data, isEdit) {
    if (isEdit) {
      await crudApi.update(data);
    } else {
      await crudApi.create(data);
    }

    await load();
  }

  async function load() {
    const response = await crudApi.get();

    data.value = response;
    loading.value = false;
  }

  return {
    data,
    loading,
    pagination,

    onCompleted,

    load,
    addRecord,
    deleteRecord,
    updateRecord,
  };
}
