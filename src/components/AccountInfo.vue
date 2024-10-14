<template>
  <div class="account-info">
    <div v-if="!isAuth">
      <NButton @click="handleLogin" type="info" quaternary
        >Войти
        <template #icon>
          <NIcon>
            <LoginIcon />
          </NIcon>
        </template>
      </NButton>
    </div>
    <div v-else>
      <NDropdown :options="dropdownOptions" @select="handleSelect">
        <NButton
          >{{ currentUser.lastName }} {{ currentUser.firstName }}
          {{ currentUser.secondName }} ({{ currentUser.role?.name }})</NButton
        >
      </NDropdown>
    </div>
  </div>

  <LoginModal v-model:visible="loginModalVisible" />
</template>

<script setup>
import { computed, ref, h, onBeforeMount } from "vue";
import { NButton, NIcon, NDropdown } from "naive-ui";
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  UserAvatar as UserIcon,
} from "@vicons/carbon";
import LoginModal from "@/components/LoginModal.vue";
import Account from "@/modules/api/Account";
import Router from "@/general/Router";
import Users from "@/modules/api/Users";

const loginModalVisible = ref(false);

const isAuth = computed(() => {
  return Account.isAuth();
});

const currentUser = ref({});

onBeforeMount(async () => {
  if (Account.isAuth()) {
    const account = await Users.getMe();
    Account.saveMe(account);
  }

  currentUser.value = Account.getMe();
});

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

const dropdownOptions = [
  {
    label: "Мой профиль",
    key: "profile",
    icon: renderIcon(UserIcon),
  },
  {
    label: "Выйти",
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
];

const handleSelect = async (key) => {
  if (key == "logout") await logout();
  if (key == "profile") await Router.push({ name: "profile" });
};

function handleLogin() {
  loginModalVisible.value = true;
}

async function logout() {
  await Router.push({ name: "home" });
  Account.logout();
  location.reload();
}
</script>

<style scoped>
.account-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
