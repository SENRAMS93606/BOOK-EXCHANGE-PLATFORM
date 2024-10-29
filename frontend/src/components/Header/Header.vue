<template>
  <header class="header">
    <div class="header-left">
      <img src="../../assets/homeimg.jpg" alt="Logo" class="logo" />
      <h2>BookSwap</h2>
    </div>
    <div class="header-right">
      <SearchComp />
      <el-button type="primary" @click="openForm">+ Add Book</el-button>
    </div>
  </header>
</template>

<script setup>
import SearchComp from "../SearchFilter/searchComp.vue";
import { useBookStore } from "../../stores/bookStore";
const bookStore = useBookStore();

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
