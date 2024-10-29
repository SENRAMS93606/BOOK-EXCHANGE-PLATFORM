<template>
  <div class="layout">
    <Header />
    <div class="main-content">
      <Sidebar />
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/Header/Header.vue";
import Sidebar from "../components/SideBar/Sidebar.vue";
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
.main-content {
  display: flex;
  flex: 1;
  width: 100%;
}
.content {
  flex: 1;
  padding: 1rem;
  margin-left: 150px; /* Adjust based on sidebar width */
  width: calc(100% - 150px); /* Adjust based on sidebar width */
  overflow: hidden; /* Prevent body scroll */
}
</style>
