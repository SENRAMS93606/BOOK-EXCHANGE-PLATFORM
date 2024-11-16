<template>
  <div>
    <el-form @submit.prevent="handleResetPassword">
      <el-form-item label="Reset Token">
        <el-input v-model="token"></el-input>
      </el-form-item>
      <el-form-item label="New Password">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleResetPassword"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import axiosInstance from "../../axiosInstance.js";

const router = useRouter();
const route = useRoute();

const token = ref("");
const password = ref("");

const handleResetPassword = async () => {
  try {
    const response = await axiosInstance.post("/auth/reset-password", {
      token: token.value,
      password: password.value,
    });
    console.log("Password reset successful:", response.data);
    ElMessage.success("Password reset successful");
    router.push({ name: "Login" }); // Redirect to login page
  } catch (error) {
    console.error("Error resetting password:", error);
    ElMessage.error("Error resetting password");
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
