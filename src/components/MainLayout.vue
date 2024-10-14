<template>
  <NLayout>
    <NLayoutHeader bordered>
      <slot name="header" />
    </NLayoutHeader>
    <NLayout>
      <slot name="content" />
    </NLayout>
  </NLayout>
</template>

<script>
import { NLayout, NLayoutHeader } from "naive-ui";
import { useMessage } from "naive-ui";

export default {
  components: {
    NLayout,
    NLayoutHeader,
  },
  setup() {
    window.$message = useMessage();
  },
};
</script>
