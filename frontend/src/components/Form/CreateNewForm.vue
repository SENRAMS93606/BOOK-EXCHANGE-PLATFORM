<template>
  <el-dialog :visible.sync="visible" title="Add/Edit Book" :width="'30%'">
    <el-form :model="book" label-width="80px">
      <el-form-item label="Title" prop="title">
        <el-input v-model="book.title" placeholder="Enter Title"></el-input>
      </el-form-item>
      <el-form-item label="Author" prop="author">
        <el-input v-model="book.author" placeholder="Enter Author"></el-input>
      </el-form-item>
      <el-form-item label="Genre" prop="genre">
        <el-input v-model="book.genre" placeholder="Enter Genre"></el-input>
      </el-form-item>
      <el-form-item label="Condition" prop="condition">
        <el-input
          v-model="book.condition"
          placeholder="Enter Condition"
        ></el-input>
      </el-form-item>
      <el-form-item label="Status" prop="status">
        <el-select v-model="book.status" placeholder="Select Status">
          <el-option label="Available" value="Available"></el-option>
          <el-option label="Lent Out" value="Lent Out"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
        <el-button @click="handleCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  visible: Boolean,
  book: Object,
});

const emit = defineEmits(["submit", "update:visible"]);

const handleSubmit = () => {
  emit("submit", book);
  emit("update:visible", false);
};

const handleCancel = () => {
  emit("update:visible", false);
};
</script>

<style>
.el-form-item__label {
  color: #4a4a4a;
  font-size: 14px;
  font-weight: 600;
}

.el-dialog {
  width: 30%;
  overflow: hidden; /* Prevent scrolling in the dialog */
}
.el-dialog__header {
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.el-dialog {
  width: 30%;
  overflow: scroll;
  height: fit-content;
}
.el-dialog__footer {
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  padding: 10px 20px;
  text-align: right;
}
</style>
