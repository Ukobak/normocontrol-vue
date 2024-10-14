<template>
  <NModal
    :show="visible"
    @update:show="onUpdateShow"
    preset="dialog"
    title="Вход"
  >
    <NForm
      ref="form"
      :label-width="80"
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
          show-password-on="mousedown"
          placeholder="Введите пароль"
        />
      </NFormItem>
    </NForm>

    <template #action>
      <NButton type="info" ghost @click="onClickLogin" :loading="loading"
        >Войти в аккаунт
        <template #icon>
          <NIcon>
            <UserIcon />
          </NIcon>
        </template>
      </NButton>
    </template>
  </NModal>
</template>

<script>
import { ref } from "vue";
import { UserAvatar as UserIcon } from "@vicons/carbon";
import { NForm, NFormItem, NModal, NInput, NButton, NIcon } from "naive-ui";

import Account from "@/modules/api/Account";

export default {
  components: {
    NModal,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NIcon,
    UserIcon,
  },
  props: ["visible"],
  emits: ["update:visible"],
  methods: {
    onUpdateShow(value) {
      this.$emit("update:visible", value);
    },
    onClickLogin(e) {
      e.preventDefault();

      this.$refs.form?.validate(async (errors) => {
        if (errors) return;

        this.loading = true;

        const { login, password } = this.value;

        try {
          await Account.login(login, password);
          location.reload();
        } finally {
          this.loading = false;
        }
      });
    },
  },
  setup() {
    return {
      value: ref({
        login: "",
        password: "",
      }),
      loading: ref(false),
      rules: rules,
    };
  },
};

const rules = {
  login: {
    required: true,
    message: "Обязательное значение",
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    message: "Обязательное значение",
    trigger: ["password-input", "input", "blur"],
  },
};
</script>
