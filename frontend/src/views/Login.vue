<template>
  <div>
    <LoginPageView :formType="formType" @update:formType="formType = $event" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoginPageView from "../components/Login/LoginPage.vue";

const formType = ref("login");
</script>
<style lang="scss" scoped></style>
