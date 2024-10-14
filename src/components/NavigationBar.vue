<template>
  <nav class="nav">
    <LogoIcon />
    <NavigationMenu />
    <AccountInfo />
  </nav>
</template>

<script>
import LogoIcon from "@/components/LogoIcon.vue";
import AccountInfo from "@/components/AccountInfo.vue";
import NavigationMenu from "@/components/NavigationMenu.vue";

export default {
  components: {
    LogoIcon,
    AccountInfo,
    NavigationMenu,
  },
};
</script>

<style scoped>
.nav {
  display: grid;
  grid-template-columns: 10% 70% 20%;
  padding: 0 50px;
  align-items: center;
  height: 60px;
}
</style>
