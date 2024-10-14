<template>
  <NModal
    v-model:show="visible"
    preset="dialog"
    :title="title"
    style="width: 40vw"
  >
    <NForm
      ref="form"
      :label-width="160"
      :rules="rules"
      :model="value"
      label-placement="left"
    >
      <NFormItem label="Логин" path="login">
        <NInput v-model:value="value.login" placeholder="Введите логин" />
      </NFormItem>
      <NFormItem label="Пароль" path="password">
        <NInput
          v-model:value="value.password"
          type="password"
          placeholder="Введите пароль"
        />
      </NFormItem>
      <NFormItem label="Фамилия" path="lastName">
        <NInput v-model:value="value.lastName" placeholder="Введите фамилию" />
      </NFormItem>
      <NFormItem label="Имя" path="firstName">
        <NInput v-model:value="value.firstName" placeholder="Введите имя" />
      </NFormItem>
      <NFormItem label="Отчество" path="secondName">
        <NInput
          v-model:value="value.secondName"
          placeholder="Введите отчество"
        />
      </NFormItem>
      <NFormItem label="Email" path="email">
        <NInput v-model:value="value.email" placeholder="Введите Email" />
      </NFormItem>
      <NFormItem label="Номер телефона" path="phoneNumber">
        <NInput
          v-model:value="value.phoneNumber"
          placeholder="Введите номер телефона"
        />
      </NFormItem>
      <NFormItem label="Роль" path="roleId">
        <NSelect
          v-model:value="value.roleId"
          placeholder="Выберите роль"
          :options="selectRoleOptions"
        />
      </NFormItem>
      <NFormItem label="Группа" path="groupId">
        <NSelect
          clearable
          v-model:value="value.groupId"
          placeholder="Выберите группу"
          :options="selectGroupOptions"
        />
      </NFormItem>
      <NFormItem label="Архивирован" path="archive">
        <NSwitch v-model:value="value.archive" />
      </NFormItem>
    </NForm>

    <template #action>
      <NButton v-if="!isEdit" type="info" ghost @click="onCompleted"
        >Добавить
      </NButton>

      <NButton v-else type="warning" ghost @click="onCompleted"
        >Сохранить
      </NButton>
    </template>
  </NModal>
</template>

<script setup>
import Roles from "@/modules/api/Roles";
import Groups from "@/modules/api/Groups";
import {
  NForm,
  NFormItem,
  NModal,
  NInput,
  NButton,
  NSelect,
  NSwitch,
} from "naive-ui";
import { ref, defineExpose, defineEmits, onBeforeUpdate } from "vue";
import { useDetailsModal } from "@/composables/DetailsModal";

const selectRoleOptions = ref([]);
const selectGroupOptions = ref([]);

const form = ref(null);

const emits = defineEmits(["completed"]);

onBeforeUpdate(async () => {
  selectRoleOptions.value = (await Roles.get()).map(toOptions);
  selectGroupOptions.value = (await Groups.get()).map(toOptions);
});

const defaultValue = {
  id: 0,
  login: "",
  password: "",
  firstName: "",
  lastName: "",
  secondName: "",
  email: "",
  phoneNumber: "",
  archive: false,
  roleId: null,
  groupId: null,
};

const { value, isEdit, visible, title, toOptions, open } =
  useDetailsModal(defaultValue);

const rules = {
  login: {
    required: true,
    message: "Обязательное значение",
    trigger: ["input", "blur"],
  },
  firstName: {
    required: true,
    message: "Обязательное значение",
    trigger: ["input", "blur"],
  },
  lastName: {
    required: true,
    message: "Обязательное значение",
    trigger: ["input", "blur"],
  },
  email: {
    required: true,
    message: "Обязательное значение",
    trigger: ["input", "blur"],
  },
  phoneNumber: {
    required: true,
    message: "Обязательное значение",
    trigger: ["input", "blur"],
  },
  roleId: {
    required: true,
    message: "Обязательное значение",
  },
};

defineExpose({ open });

function onCompleted() {
  form.value.validate(async (errors) => {
    if (errors) return;
    emits("completed", value.value, isEdit.value);
  });
}
</script>
