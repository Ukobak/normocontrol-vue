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

  <GroupDetailsModal ref="detailsModal" @completed="onCompleted"/>
</template>

<script setup>
import {reactive, ref, h, onBeforeMount} from "vue";
import {NDataTable, NButton, NSwitch} from "naive-ui";

import Groups from "@/modules/api/Groups";
import GroupDetailsModal from "@/components/details/GroupDetailsModal.vue";

const data = ref([]);
const loading = ref(true);

const detailsModal = ref(null);

onBeforeMount(async () => {
  await load();
});

async function load() {
  const response = await Groups.get();

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
          {default: () => "Добавить"}
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
          {default: () => "Изменить"}
      );

      const deleteButton = h(
          NButton,
          {
            size: "small",
            type: "error",
            quaternary: true,
            onClick: () => deleteRecord(row),
          },
          {default: () => "Удалить"}
      );

      return [editButton, deleteButton];
    },
  },
  {title: "ID", key: "id", width: 75, sorter: "default"},
  {title: "Название", key: "name", sorter: "default"},
  {
    title: "Архивирован",
    key: "archive",
    sorter: "default",
    align: "center",
    render(row) {
      return h(NSwitch, {value: row.archive, disabled: true});
    },
  },
];

function addRecord() {
  detailsModal.value.open();
}

function updateRecord(row) {
  detailsModal.value.open({...row});
}

async function deleteRecord(row) {
  await Groups.remove(row.id);
  await load();
}

async function onCompleted(data, isEdit) {
  if (isEdit) {
    await Groups.update(data);
  } else {
    await Groups.create(data);
  }

  await load();
}
</script>
