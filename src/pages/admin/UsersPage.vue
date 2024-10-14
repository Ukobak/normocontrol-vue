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

  <UserDetailsModal ref="userDetails" @completed="onCompleted"/>
</template>

<script setup>
import {reactive, ref, h, onBeforeMount} from "vue";
import {NDataTable, NButton, NSwitch, NTag} from "naive-ui";

import Users from "@/modules/api/Users";
import UserDetailsModal from "@/components/details/UserDetailsModal.vue";

const data = ref([]);
const loading = ref(true);

const userDetails = ref(null);

onBeforeMount(async () => {
  await load();
});

async function load() {
  const response = await Users.get();

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
      //column
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
  {title: "Логин", key: "login", sorter: "default"},
  {title: "Роль", key: "role.name", sorter: "default"},
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
  {title: "Группа", key: "group.name", sorter: "default"},
  {title: "Email", key: "email", sorter: "default"},
  {title: "Номер телефона", key: "phoneNumber", sorter: "default"},
  /* {title: "Фамилия", key: "lastName", sorter: "default"}, */
  /* {title: "Имя", key: "firstName", sorter: "default"},
  {title: "Отчество", key: "secondName", sorter: "default"}, */
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
  userDetails.value.open();
}

function updateRecord(row) {
  userDetails.value.open({...row});
}

async function deleteRecord(row) {
  await Users.remove(row.id);
  await load();
}

async function onCompleted(data, isEdit) {
  if (isEdit) {
    await Users.update(data);
  } else {
    await Users.create(data);
  }

  await load();
}
</script>
