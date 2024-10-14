<template>
  <NSpace>
    <NButton @click="handleSendFile" :disabled="fileListLength == 0">
      Отправить
      <template #icon>
        <NIcon>
          <UploadIcon />
        </NIcon>
      </template>
    </NButton>
    <NButton @click="handleSelectFile" :disabled="fileListLength == 1">
      Выбрать файл
      <template #icon>
        <NIcon>
          <SelectFileIcon />
        </NIcon>
      </template>
    </NButton>
  </NSpace>
  <NUpload
    ref="upload"
    :max="1"
    :default-upload="false"
    @change="handleUploadChange"
    :custom-request="customRequest"
    @beforeUpload="handleBeforeUpload"
  >
  </NUpload>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { NUpload, NButton, NSpace, NIcon } from "naive-ui";
import {
  Upload as UploadIcon,
  CopyFile as SelectFileIcon,
} from "@vicons/carbon";

import StudentWorks from "@/modules/api/StudentWorks";

const props = defineProps(["workId"]);
const emits = defineEmits(["uploaded"]);

const upload = ref(null);
const fileListLength = ref(0);

const handleSendFile = () => {
  upload.value.submit();
};

const handleSelectFile = () => {
  upload.value.openOpenFileDialog();
};

const handleUploadChange = (data) => {
  fileListLength.value = data.fileList.length;
};

const customRequest = ({
  file,
  data,
  headers,
  withCredentials,
  onFinish,
  onError,
  onProgress,
}) => {
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  }
  formData.append(file.name, file.file);
  formData.append("workId", props.workId);

  StudentWorks.uploadWork(formData, {
    headers,
    withCredentials,
    onUploadProgress: ({ percent }) => {
      onProgress({ percent: Math.ceil(percent) });
    },
  })
    .then(() => {
      onFinish();
      emits("uploaded");
      upload.value.clear();
    })
    .catch(() => onError());
};

const handleBeforeUpload = (data) => {
  console.log(data.file);
  if (data.file.file?.name.split(".").pop() !== "docx") {
    window.$message.error(
      "Вы можете загружать документы только в формате docx!"
    );
    return false;
  }
  return true;
};
</script>
