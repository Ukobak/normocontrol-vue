<template>
  <InfoContainer v-if="profile != null" style="margin-top: 15px">
    <NCard title="Мой профиль">
      <NForm inline>
        <NFormItem label="Логин">
          <NInput disabled :value="profile.login" placeholder=""></NInput>
        </NFormItem>
        <NFormItem label="Фамилия">
          <NInput disabled :value="profile.lastName" placeholder=""></NInput>
        </NFormItem>
        <NFormItem label="Имя">
          <NInput disabled :value="profile.firstName" placeholder=""></NInput>
        </NFormItem>
        <NFormItem label="Отчество">
          <NInput disabled :value="profile.secondName" placeholder=""></NInput>
        </NFormItem>
      </NForm>
      <NForm inline>
        <NFormItem label="Email">
          <NInput v-model:value="profile.email" placeholder=""></NInput>
        </NFormItem>
        <NFormItem label="Номер телефона">
          <NInput v-model:value="profile.phoneNumber" placeholder=""></NInput>
        </NFormItem>
        <NFormItem>
          <NButton type="warning" ghost @click="handeEditMe">Сохранить</NButton>
        </NFormItem>
      </NForm>
      <NForm inline>
        <NFormItem label="Группа">
          <NInput disabled :value="profile.group?.name" placeholder=""></NInput>
        </NFormItem>
        <NFormItem label="Роль">
          <NInput disabled :value="profile.role.name" placeholder=""></NInput>
        </NFormItem>
      </NForm>
    </NCard>
  </InfoContainer>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import Users from "@/modules/api/Users";
import InfoContainer from "@/components/InfoContainer.vue";
import { NForm, NFormItem, NCard, NInput, NButton } from "naive-ui";

const profile = ref(null);

const handeEditMe = async () => {
  await Users.editMe({
    email: profile.value.email,
    phoneNumber: profile.value.phoneNumber,
  });
};

onBeforeMount(async () => {
  profile.value = await Users.getMe();
});
</script>
