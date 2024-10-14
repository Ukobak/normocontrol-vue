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
      <NCard v-for="work in works" :key="work.id" :title="work.name">
        <NSpace vertical>
          <div>Активно до: {{ work.deadline }}</div>
          <div>
            Нормоконтроллеры:
            <NTag
              type="info"
              style="margin-right: 5px"
              v-for="normController in work.normControllers"
              :key="normController.id"
              >{{ normController.lastName }} {{ normController.firstName }}
              {{ normController.secondName }}
            </NTag>
          </div>
        </NSpace>

        <template #header-extra>
          <NSpace>
            <NTag type="info" v-for="group in work.groups" :key="group.id">
              {{ group.name }}
            </NTag>
          </NSpace>
        </template>

        <template #action>
          <NCollapse v-if="work.studentWorks.length > 0">
            <NCollapseItem title="Студенты">
              <NTable size="small">
                <thead>
                  <tr>
                    <th>Студент</th>
                    <th>Группа</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="studentWork in work.studentWorks"
                    :key="studentWork.user.id"
                  >
                    <td>
                      {{ studentWork.user.lastName }}
                      {{ studentWork.user.firstName }}
                      {{ studentWork.user.secondName }}
                    </td>
                    <td>{{ studentWork.user.group.name }}</td>
                    <td>
                      <NTag
                        v-if="studentWork.status != null"
                        :type="studentWork.status.code"
                      >
                        {{ studentWork.status.name }}
                      </NTag>
                      <NTag v-else type="error">Ожидает загрузки файла</NTag>
                    </td>
                  </tr>
                </tbody>
              </NTable>
            </NCollapseItem>
          </NCollapse>
        </template>
      </NCard>
    </NSpace>
  </InfoContainer>
</template>

<script setup>
import InfoContainer from "@/components/InfoContainer.vue";
import StudentWorks from "@/modules/api/StudentWorks";
import { onBeforeMount, ref } from "vue";
import {
  NCard,
  NTag,
  NCollapse,
  NCollapseItem,
  NTable,
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
  works.value = await StudentWorks.get(searchWork.value);
};

const handleSearchClick = async () => {
  await load();
};
</script>
