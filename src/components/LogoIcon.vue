<template>
  <div class="logo" @click="onClick">
    <LogoIcon class="logo-icon" />
    Нормоконтроль
  </div>
</template>

<script>
import { MachineLearningModel as LogoIcon } from "@vicons/carbon";

export default {
  components: {
    LogoIcon,
  },
  methods: {
    onClick() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
.logo-icon {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
}
</style>
