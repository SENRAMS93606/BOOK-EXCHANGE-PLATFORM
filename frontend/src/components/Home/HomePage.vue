<template>
  <div class="home-main">
    <CardView />
  </div>
</template>

<script setup>
import CardView from "../Card/CardComp.vue";
</script>

<style scoped>
.home-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh; /* Ensure it occupies the full viewport height */
  overflow: hidden; /* Prevent body scroll */
}
</style>
