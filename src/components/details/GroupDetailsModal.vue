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
      <NFormItem label="Название" path="name">
        <NInput v-model:value="value.name" placeholder="Введите логин" />
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
import { NForm, NFormItem, NModal, NInput, NButton, NSwitch } from "naive-ui";
import { ref, defineExpose, defineEmits } from "vue";
import { useDetailsModal } from "@/composables/DetailsModal";

const form = ref(null);

const emits = defineEmits(["completed"]);

const defaultValue = {
  id: 0,
  name: "",
  archive: false,
};

const { value, isEdit, visible, title, open } = useDetailsModal(defaultValue);

const rules = {
  name: {
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
