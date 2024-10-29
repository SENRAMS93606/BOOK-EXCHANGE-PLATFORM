<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li>
          <router-link to="/Home" @click="handleMenuSelect('1')"
            >Home</router-link
          >
        </li>
        <li><router-link to="/Exchange">Exchange</router-link></li>
        <!-- Add more links as needed -->
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const handleMenuSelect = (index) => {
  console.log("menu selected");
  const routePath = index === "1" ? "/Home" : "/Home";
  router.push(routePath);
};
</script>

<style scoped>
.sidebar {
  width: 150px;
  background-color: #ffffff;
  padding: 1rem;
  height: 100vh;
  position: fixed;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  margin: 1rem 0;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
  align-items: center;
}
a {
  font-weight: 500;
  color: black;
  text-decoration: inherit;
}
</style>
