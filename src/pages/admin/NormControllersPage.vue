<template>
  <NDataTable
    :single-line="false"
    :loading="loading"
    :columns="columns"
    :pagination="pagination"
    :data="data"
    :scroll-x="1800"
    style="height: calc(100vh - 80px)"
    flex-height
    striped
  >
  </NDataTable>

  <NormControllerDetailsModal ref="detailsModal" @completed="onCompleted" />
</template>

<script setup>
import { ref, h, onBeforeMount } from "vue";
import { NDataTable, NButton, NTag } from "naive-ui";

import { useCrud } from "@/composables/CrudPage";
import NormControllers from "@/modules/api/NormControllers";
import NormControllerDetailsModal from "@/components/details/NormControllerDetailsModal.vue";

const detailsModal = ref(null);

const {
  data,
  loading,
  pagination,
  onCompleted,
  load,
  addRecord,
  deleteRecord,
  updateRecord,
} = useCrud(NormControllers, detailsModal);

onBeforeMount(async () => {
  await load();
});

const columns = [
  {
    key: "actions",
    width: 195,
    title() {
      return h(
        NButton,
        {
          size: "small",
          type: "info",
          quaternary: true,
          style: "width: 100%",
          onClick: () => addRecord(),
        },
        { default: () => "Добавить" }
      );
    },
    render(row) {
      const editButton = h(
        NButton,
        {
          size: "small",
          type: "warning",
          quaternary: true,
          style: "margin-right: 5px",
          onClick: () => updateRecord(row),
        },
        { default: () => "Изменить" }
      );

      const deleteButton = h(
        NButton,
        {
          size: "small",
          type: "error",
          quaternary: true,
          onClick: () => deleteRecord(row),
        },
        { default: () => "Удалить" }
      );

      return [editButton, deleteButton];
    },
  },
    {
    title: "ФИО",
    sorter: "default",
    render(row) {
      
        return h(
          NTag,
          {
            type: "qwe",
            style: {
              margin: "0 4px 4px 0",
            },
          },
          {
            default: () => `${row.lastName} ${row.firstName} ${row.secondName}`,
          }
        );
      
    },
  },
  { title: "Email", key: "email", sorter: "default" }, 
  { title: "Номер телефона", key: "phoneNumber", sorter: "default" }, 
  /* { title: "Фамилия", key: "lastName", sorter: "default" },
  { title: "Имя", key: "firstName", sorter: "default" },
  { title: "Отчество", key: "secondName", sorter: "default" }, */
];
</script>
