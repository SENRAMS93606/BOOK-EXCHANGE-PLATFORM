<template>
  <el-row :gutter="20" class="auto-search-container">
    <el-col :span="24">
      <el-input v-model="searchQuery" placeholder="Search..." clearable>
        <template #prefix>
          <el-icon class="blue-icon"><Search /></el-icon>
        </template>
      </el-input>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useBookStore } from "../../stores/bookStore";

const bookStore = useBookStore();
const emit = defineEmits(["update:searchQuery"]);
const searchQuery = ref("");

watch(searchQuery, (newValue) => {
  emit("update:searchQuery", newValue);
  bookStore.setSearchQuery(newValue); // Update the searchQuery in the store
});
</script>

<style scoped>
.el-input {
  width: 100%;
}
.blue-icon {
  color: #409eff;
}
.auto-search-container {
  display: flex;
  justify-content: flex-end;
}
</style>
