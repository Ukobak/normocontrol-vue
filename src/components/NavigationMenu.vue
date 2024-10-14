<template>
  <NMenu mode="horizontal" :options="menuOptions"/>
</template>

<script>
import {h} from "vue";
import {NMenu, NIcon} from "naive-ui";
import {RouterLink} from "vue-router";
import {
  User as UserIcon,
  Information as AboutIcon,
  Group as GroupIcon,
  Workspace as WorkIcon,
  UserAdmin as NormControllerIcon,
  Settings as SettingsIcon,
} from "@vicons/carbon";

import Account from "@/modules/api/Account";

function renderIcon(icon) {
  return () => h(NIcon, null, {default: () => h(icon)});
}

const menuOptions = [];

const aboutPage = {
  label: () =>
      h(RouterLink, {to: {name: "about"}}, {default: () => "О Сайте"}),
  key: "about",
  icon: renderIcon(AboutIcon),
};

if (Account.isAuth()) {
  if (Account.isAdmin()) {
    menuOptions.push(
        {
          label: () =>
              h(
                  RouterLink,
                  {to: {name: "adminUsers"}},
                  {default: () => "Пользователи"}
              ),
          key: "adminUsers",
          icon: renderIcon(UserIcon),
        },
        {
          label: () =>
              h(
                  RouterLink,
                  {to: {name: "adminGroups"}},
                  {default: () => "Группы"}
              ),
          key: "adminGroups",
          icon: renderIcon(GroupIcon),
        },
        {
          label: () =>
              h(
                  RouterLink,
                  {to: {name: "adminNormControllers"}},
                  {default: () => "Нормоконтролеры"}
              ),
          key: "adminNormControllers",
          icon: renderIcon(NormControllerIcon),
        },
        {
          label: () =>
              h(
                  RouterLink,
                  {to: {name: "adminWorks"}},
                  {default: () => "Работы"}
              ),
          key: "adminWorks",
          icon: renderIcon(WorkIcon),
        },
        {
          label: () =>
              h(
                  RouterLink,
                  {to: {name: "adminSettings"}},
                  {default: () => "Настройки"}
              ),
          key: "adminSettings",
          icon: renderIcon(SettingsIcon),
        },
    );
  } else {
    menuOptions.push(aboutPage, {
      label: () =>
          h(
              RouterLink,
              {to: {name: "works"}},
              {default: () => "Мои работы"}
          ),
      key: "works",
      icon: renderIcon(WorkIcon),
    });
  }
} else {
  menuOptions.push(aboutPage, {
    label: () =>
        h(
            RouterLink,
            {to: {name: "allWorks"}},
            {default: () => "Все работы"}
        ),
    key: "works",
    icon: renderIcon(WorkIcon),
  });
}

export default {
  components: {
    NMenu,
  },
  setup() {
    return {
      menuOptions,
    };
  },
};
</script>
