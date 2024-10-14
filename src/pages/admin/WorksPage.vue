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

  <WorkDetailsModal ref="detailsModal" @completed="onCompleted" />
</template>

<script setup>
import { ref, h, onBeforeMount } from "vue";
import { NDataTable, NButton, NSwitch, NTag } from "naive-ui";

import Works from "@/modules/api/Works";
import { useCrud } from "@/composables/CrudPage";
import WorkDetailsModal from "@/components/details/WorkDetailsModal.vue";

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
} = useCrud(Works, detailsModal);

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
  { title: "ID", key: "id", width: 75, sorter: "default" },
  { title: "Название", key: "name", sorter: "default" },
  {
    title: "Группы",
    sorter: "default",
    render(row) {
      return row.groups.map((x) => {
        return h(
          NTag,
          {
            type: "info",
            style: {
              margin: "0 4px 4px 0",
            },
          },
          {
            default: () => x.name,
          }
        );
      });
    },
  },
  {
    title: "Нормоконтролеры",
    sorter: "default",
    render(row) {
      return row.normControllers.map((x) => {
        return h(
          NTag,
          {
            type: "info",
            style: {
              margin: "0 4px 4px 0",
            },
          },
          {
            default: () => `${x.lastName} ${x.firstName} ${x.secondName}`,
          }
        );
      });
    },
  },
  { title: "Настройки", key: "settings.name", sorter: "default" },
  { title: "Активно до", key: "deadline", sorter: "default" },
  {
    title: "Архивирован",
    key: "archive",
    sorter: "default",
    align: "center",
    render(row) {
      return h(NSwitch, { value: row.archive, disabled: true });
    },
  },
];
</script>
