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

  <SettingsDetailsModal ref="detailsModal" @completed="onCompleted" />
</template>

<script setup>
import { reactive, ref, h, onBeforeMount } from "vue";
import { NDataTable, NButton, /*NInput*/ } from "naive-ui";

import Settings from "@/modules/api/Settings";
import SettingsDetailsModal from "@/components/details/SettingsDetailsModal";

const data = ref([]);
const loading = ref(true);

const detailsModal = ref(null);

onBeforeMount(async () => {
  await load();
});

async function load() {
  const response = await Settings.get();

  data.value = response;
  loading.value = false;
}

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
 /* {
    title: "Настройки оформления",
    key: "designSettingsJson",
    sorter: "default",
    render(row) {
      return h(NInput, {
        value: row.designSettingsJson,
        type: "textarea",
        disabled: true,
      });
    },
  }, */
  /* {
    title: "Настройки структуры",
    key: "structureSettingsJson",
    sorter: "default",
    render(row) {
      return h(NInput, {
        value: row.structureSettingsJson,
        type: "textarea",
        disabled: true,
      });
    }, 
  }, */
];

function addRecord() {
  detailsModal.value.open();
}

function updateRecord(row) {
  detailsModal.value.open({ ...row });
}

async function deleteRecord(row) {
  await Settings.remove(row.id);
  await load();
}

async function onCompleted(data, isEdit) {
  if (isEdit) {
    await Settings.update(data);
  } else {
    await Settings.create(data);
  }

  await load();
}
</script>
