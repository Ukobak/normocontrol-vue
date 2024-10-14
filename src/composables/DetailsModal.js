import { ref, computed } from "vue";

export function useDetailsModal(defaultValue) {
  const value = ref(null);
  const isEdit = ref(false);
  const visible = ref(false);

  const title = computed(() => {
    return isEdit.value ? "Редактирование" : "Создание";
  });

  function open(data) {
    value.value = data != null ? data : { ...defaultValue };
    isEdit.value = data != null;
    visible.value = true;
  }

  function toOptions(x) {
    return {
      source: x,
      value: x.id,
      label: x.name,
    };
  }

  return {
    value,
    title,
    isEdit,
    visible,

    open,
    toOptions,
  };
}
