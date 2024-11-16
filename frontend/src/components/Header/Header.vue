<template>
  <header class="header">
    <div class="header-left">
      <img src="../../assets/homeimg.jpg" alt="Logo" class="logo" />
      <h2>BookSwap</h2>
    </div>
    <div class="header-right">
      <SearchComp />
      <el-button type="primary" @click="openForm">+ Add Book</el-button>

      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userName.split("@")[0] }}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>
import SearchComp from "../SearchFilter/searchComp.vue";
import { useBookStore } from "../../stores/bookStore";
import { useUserStore } from "../../stores/userStore";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";

const userStore = useUserStore();
const bookStore = useBookStore();

const router = useRouter();

const userName = computed(() => userStore.user?.email || "Guest");

const logout = async () => {
  try {
    await userStore.logout();
    router.push({ name: "Login" });
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

const openForm = () => {
  bookStore.setFormVisible(true);
};
</script>

<style scoped>
.header {
  background-color: #ffffff;
  color: black;
  text-align: center;
  font-size: 16px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  width: 100%;
  min-height: 3.5rem;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 2.5rem; /* Adjust the height as needed */
  margin-right: 1rem; /* Space between the logo and the title */
}

.header-right {
  display: flex;
  align-items: center;
  margin-right: 50px;
  gap: 20px;
}
</style>
