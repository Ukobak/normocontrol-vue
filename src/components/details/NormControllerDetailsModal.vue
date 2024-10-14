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
      <NFormItem label="Email" path="email">
        <NInput v-model:value="value.email" placeholder="Введите Email" />
      </NFormItem>
      <NFormItem label="Номер телефона" path="phoneNumber">
        <NInput
          v-model:value="value.phoneNumber"
          placeholder="Введите номер телефона"
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
import { NForm, NFormItem, NModal, NInput, NButton } from "naive-ui";
import { ref, defineExpose, defineEmits } from "vue";
import { useDetailsModal } from "@/composables/DetailsModal";

const form = ref(null);

const emits = defineEmits(["completed"]);

const defaultValue = {
  id: 0,
  firstName: "",
  lastName: "",
  secondName: "",
  email: "",
  phoneNumber: "",
};

const { value, isEdit, visible, title, open } = useDetailsModal(defaultValue);

const rules = {
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
};

defineExpose({ open });

function onCompleted() {
  form.value.validate(async (errors) => {
    if (errors) return;
    emits("completed", value.value, isEdit.value);
  });
}
</script>
