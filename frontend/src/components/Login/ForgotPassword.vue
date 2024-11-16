<template>
  <div>
    <el-form @submit.prevent="handleForgotPassword">
      <el-form-item label="Email">
        <el-input v-model="email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleForgotPassword"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
    <div v-if="resetToken">
      <p>Your password reset token is: {{ resetToken }}</p>
      <el-button type="primary" @click="goToResetPassword"
        >Go to Reset Password</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axiosInstance from "../../axiosInstance.js";

const email = ref("");
const resetToken = ref("");
const router = useRouter();

const handleForgotPassword = async () => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email: email.value,
    });
    console.log("Password reset token generated:", response.data);
    resetToken.value = response.data.resetToken;
    ElMessage.success("Password reset token generated");
  } catch (error) {
    console.error("Error generating password reset token:", error);
    ElMessage.error("Error generating password reset token");
  }
};

const goToResetPassword = () => {
  router.push({ name: "ResetPassword", params: { token: resetToken.value } });
};
</script>

<style scoped>
/* Add your styles here */
</style>
