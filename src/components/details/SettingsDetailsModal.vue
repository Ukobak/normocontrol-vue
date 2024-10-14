<template>
  <NModal
    v-model:show="visible"
    preset="dialog"
    :title="title"
    style="width: 40vw"
  >
    <NForm
      ref="form"
      :label-width="180"
      :rules="rules"
      :model="value"
      label-placement="left"
    >
      <NFormItem label="Название" path="name">
        <NInput v-model:value="value.name" placeholder="Введите название" />
      </NFormItem>
      <NFormItem label="Настройки оформления" path="designSettingsJson">
        <NInput
          v-model:value="value.designSettingsJson"
          type="textarea"
          placeholder="Настройки оформления"
        />
      </NFormItem>
      <NFormItem label="Настройки структуры" path="structureSettingsJson">
        <NInput
          v-model:value="value.structureSettingsJson"
          type="textarea"
          placeholder="Настройки структуры"
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
  name: "",
  designSettingsJson: "",
  structureSettingsJson: "",
};

const { value, isEdit, visible, title, open } = useDetailsModal(defaultValue);

const rules = {
  name: {
    required: true,
    message: "Обязательное значение",
    trigger: ["input", "blur"],
  },
  designSettingsJson: {
    required: true,
    message: "Обязательное значение",
    trigger: ["input", "blur"],
  },
  structureSettingsJson: {
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
