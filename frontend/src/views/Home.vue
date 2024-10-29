<template>
  <div class="home-main">
    <HomePageView />
  </div>
</template>

<script setup>
import HomePageView from "../components/Home/HomePage.vue";
console.log("loading");
</script>

<style scoped>
.home-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
