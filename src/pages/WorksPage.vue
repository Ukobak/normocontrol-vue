<template>
  <InfoContainer style="margin-top: 15px; margin-bottom: 50px">
    <NEmpty v-if="works.length < 1" />
    <NSpace v-else vertical>
      <NInputGroup>
        <NButton type="info" @click="handleSearchClick"
          >Поиск
          <template #icon>
            <NIcon>
              <SearchIcon />
            </NIcon>
          </template>
        </NButton>
        <NInput v-model:value="searchWork" />
      </NInputGroup>

      <NCard
        v-for="work in works.filter((x) => !x.archive)"
        :key="work.id"
        :title="work.name"
      >
        <NSpace vertical>
          <div>Активно до: {{ work.deadline }}</div>
          <NSpace>
            <NP>Нормоконтроллеры:</NP>
            <NTooltip
              trigger="hover"
              v-for="normController in work.normControllers"
              :key="normController.id"
            >
              <template #trigger>
                <NTag type="info" style="margin-right: 5px"
                  >{{ normController.lastName }} {{ normController.firstName }}
                  {{ normController.secondName }}
                </NTag>
              </template>
              Email: {{ normController.email }} | Номер телефона:
              {{ normController.phoneNumber }}
            </NTooltip>
          </NSpace>
        </NSpace>

        <template #header-extra>
          <NTag v-if="work.status == null" type="error"
            >Ожидает загрузки файла</NTag
          >
          <NTag v-else :type="work.status.code">{{ work.status.name }}</NTag>
        </template>
        <template #action>
          <NCollapse>
            <NCollapseItem title="Загрузить файл">
              <FileUpload :workId="work.id" @uploaded="handleUpload" />
            </NCollapseItem>
            <NCollapseItem title="Попытки" v-if="work.attempts.length > 0">
              <NTable size="small">
                <thead>
                  <tr>
                    <th>Исходный файл</th>
                    <th>Проверенный файл</th>
                    <th>Оценка</th>
                    <th>Дата загрузки</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="attempt in work.attempts" :key="attempt.id">
                    <td>
                      <NA
                        :href="`${Consts.ApiBaseUrl}/${attempt.inputFilePath}`"
                        target="_blank"
                        >Загрузить</NA
                      >
                    </td>
                    <td>
                      <NA
                        v-if="
                          attempt.checkerMark != 0 &&
                          attempt.checkerMark != null
                        "
                        :href="`${Consts.ApiBaseUrl}/${attempt.checkerFilePath}`"
                        target="_blank"
                        >Загрузить</NA
                      >
                    </td>
                    <td>{{ attempt.checkerMark }}</td>
                    <td>{{ attempt.createdAt }}</td>
                  </tr>
                </tbody>
              </NTable>
            </NCollapseItem>
          </NCollapse>
        </template>
      </NCard>

      <NCollapse v-if="works.filter((x) => x.archive).length > 0">
        <NCollapseItem title="Архив">
          <NSpace vertical>
            <NCard
              v-for="work in works.filter((x) => x.archive)"
              :key="work.id"
              :title="work.name"
            >
              <NSpace vertical>
                <div>Истек: {{ work.deadline }}</div>
                <div>
                  Нормоконтроллеры:
                  <NTag
                    type="info"
                    style="margin-right: 5px"
                    v-for="normController in work.normControllers"
                    :key="normController.id"
                    >{{ normController.lastName }}
                    {{ normController.firstName }}
                    {{ normController.secondName }}
                  </NTag>
                </div>
              </NSpace>

              <template #header-extra>
                <NTag type="error">Архивированно</NTag>
              </template>

              <template #action>
                <NCollapse v-if="work.attempts.length > 0">
                  <NCollapseItem title="Попытки">
                    <NTable size="small">
                      <thead>
                        <tr>
                          <th>Исходный файл</th>
                          <th>Проверенный файл</th>
                          <th>Оценка</th>
                          <th>Дата загрузки</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="attempt in work.attempts" :key="attempt.id">
                          <td>
                            <NA
                              :href="`${Consts.ApiBaseUrl}/${attempt.inputFilePath}`"
                              target="_blank"
                              >Загрузить</NA
                            >
                          </td>
                          <td>{{ attempt.checkerFilePath }}</td>
                          <td>{{ attempt.checkerMark }}</td>
                          <td>{{ attempt.createdAt }}</td>
                        </tr>
                      </tbody>
                    </NTable>
                  </NCollapseItem>
                </NCollapse>
              </template>
            </NCard>
          </NSpace>
        </NCollapseItem>
      </NCollapse>
    </NSpace>
  </InfoContainer>
</template>

<script setup>
import InfoContainer from "@/components/InfoContainer.vue";
import FileUpload from "@/components/FileUpload.vue";
import Consts from "@/modules/Consts";
import StudentWorks from "@/modules/api/StudentWorks";
import { onBeforeMount, ref } from "vue";
import {
  NCard,
  NTag,
  NCollapse,
  NCollapseItem,
  NTable,
  NA,
  NP,
  NTooltip,
  NInput,
  NInputGroup,
  NButton,
  NSpace,
  NIcon,
  NEmpty,
} from "naive-ui";

import { Search as SearchIcon } from "@vicons/carbon";

const works = ref([]);
const searchWork = ref("");

onBeforeMount(async () => {
  await load();
});

const load = async () => {
  works.value = await StudentWorks.getMyWorks(searchWork.value);
};

const handleUpload = async () => {
  await load();
};

const handleSearchClick = async () => {
  await load();
};
</script>
