<template>
  <NModal
    v-model:show="visible"
    preset="dialog"
    :title="title"
    style="width: 40vw"
  >
    <NForm
      ref="form"
      :label-width="200"
      :rules="rules"
      :model="value"
      label-placement="left"
    >
      <NFormItem label="Название" path="name">
        <NInput v-model:value="value.name" placeholder="Введите логин" />
      </NFormItem>
      <NFormItem label="Активно до" path="deadline">
        <NDatePicker
          v-model:formatted-value="value.deadline"
          type="datetime"
          format="dd.MM.yyyy HH:mm"
          value-format="yyyy-MM-dd HH:mm:ss"
          clearable
        />
      </NFormItem>
      <NFormItem label="Нормоконтролеры" path="normControllersIds">
        <NSelect
          v-model:value="value.normControllersIds"
          placeholder="Выберите нормоконтролеров"
          :options="selectNormControllerOptions"
          :render-label="renderLabel"
          :render-tag="renderMultipleTag"
          clearable
          multiple
        />
      </NFormItem>
      <NFormItem label="Группы" path="groupsIds">
        <NSelect
          v-model:value="value.groupsIds"
          placeholder="Выберите группы"
          :options="selectGroupOptions"
          clearable
          multiple
        />
      </NFormItem>
      <NFormItem label="Настройки" path="settingsId">
        <NSelect
          v-model:value="value.settingsId"
          placeholder="Выберите настройки"
          :options="selectSettingsOptions"
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
import {
  NTag,
  NText,
  NForm,
  NFormItem,
  NModal,
  NInput,
  NButton,
  NSwitch,
  NSelect,
  NDatePicker,
} from "naive-ui";
import { ref, defineExpose, defineEmits, onBeforeMount, h } from "vue";
import { useDetailsModal } from "@/composables/DetailsModal";

import Groups from "@/modules/api/Groups";
import Settings from "@/modules/api/Settings";
import NormControllers from "@/modules/api/NormControllers";

const form = ref(null);

const emits = defineEmits(["completed"]);

const selectGroupOptions = ref([]);
const selectSettingsOptions = ref([]);
const selectNormControllerOptions = ref([]);

const defaultValue = {
  id: 0,
  name: "",
  deadline: null,
  archive: false,
  designSettingsJson: "",
  settingsId: null,
  groupsIds: [],
  normControllersIds: [],
};

const { value, isEdit, visible, title, open, toOptions } =
  useDetailsModal(defaultValue);

const rules = {
  name: {
    required: true,
    message: "Обязательное значение",
    trigger: ["input", "blur"],
  },
  deadline: {
    required: true,
    message: "Обязательное значение",
  },
  groupsIds: {
    required: true,
    message: "Обязательное значение",
  },
  normControllersIds: {
    required: true,
    message: "Обязательное значение",
  },
  settingsId: {
    required: true,
    message: "Обязательное значение",
  },
};

onBeforeMount(async () => {
  selectGroupOptions.value = (await Groups.get()).map(toOptions);
  selectSettingsOptions.value = (await Settings.get()).map(toOptions);
  selectNormControllerOptions.value = (await NormControllers.get()).map((x) => {
    return {
      source: x,
      value: x.id,
      label: `${x.lastName} ${x.firstName} ${x.secondName}`,
    };
  });
});

const renderLabel = (option) => {
  if (option.source == null) return;
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
      },
    },
    [
      h(
        "div",
        {
          style: {
            marginLeft: "12px",
            padding: "4px 0",
          },
        },
        [
          h("div", null, [option.label]),
          h(
            NText,
            { depth: 3, tag: "div" },
            { default: () => `Email: ${option.source.email}` }
          ),
          h(
            NText,
            { depth: 3, tag: "div" },
            { default: () => `Номер телефона: ${option.source.phoneNumber}` }
          ),
        ]
      ),
    ]
  );
};

const renderMultipleTag = ({ option, handleClose }) => {
  return h(
    NTag,
    {
      style: {
        padding: "0 6px 0 4px",
      },
      closable: true,
      onClose: (e) => {
        e.stopPropagation();
        handleClose();
      },
    },
    {
      default: () =>
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
            },
          },
          [option.label]
        ),
    }
  );
};

defineExpose({ open });

function onCompleted() {
  form.value.validate(async (errors) => {
    if (errors) return;
    emits("completed", value.value, isEdit.value);
  });
}
</script>
