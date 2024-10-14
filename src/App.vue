<template>
  <NConfigProvider :locale="ruRU" :date-locale="dateRuRU" :theme="theme">
    <NMessageProvider placement="top-right">
      <MainLayout>
        <template #header>
          <NavigationBar />
        </template>

        <template #content>
          <router-view />
        </template>
      </MainLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup>
import "vfonts/Roboto.css";

import { NConfigProvider, NMessageProvider } from "naive-ui";
import { ruRU, dateRuRU, lightTheme as theme } from "naive-ui";

import MainLayout from "@/components/MainLayout.vue";
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<style>
.n-data-table__pagination {
  padding: 0 10px;
}
</style>
