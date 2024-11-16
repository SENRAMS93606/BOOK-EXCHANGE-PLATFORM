<template>
  <el-dialog :visible.sync="visible" :title="dialogTitle" :width="'30%'">
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
      <el-form-item label="Description" prop="description">
        <el-input
          v-model="book.description"
          placeholder="Enter Description"
        ></el-input>
      </el-form-item>
      <el-form-item label="Location" prop="location">
        <el-input
          v-model="book.location"
          placeholder="Enter Location"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">Submit</el-button>
        <el-button @click="handleCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useUserStore } from "../../stores/userStore"; // Assuming you have a user store

const props = defineProps({
  visible: Boolean,
  book: Object,
});

const emit = defineEmits(["submit", "update:visible"]);

const userStore = useUserStore();
const { user } = userStore;

const bookForm = reactive({
  title: "",
  author: "",
  genre: "",
  condition: "",
  status: "Available",
  description: "",
  location: "",
  ...props.book, // Spread the book prop to populate the form if editing
});

const handleSubmit = () => {
  const userId = userStore.user._id;

  const bookPayload = {
    ...bookForm,
    owner: userId, // Include the user ID in the request payload
  };

  try {
    if (bookForm._id) {
      emit("submit", bookPayload);
      emit("update:visible", false);
    } else {
      const { id, ...bookWithoutId } = props.book;
      emit("submit", bookWithoutId);
      emit("update:visible", false);
    }
  } catch (error) {
    console.error("Error saving book:", error);
  }
};

const dialogTitle = computed(() =>
  props.book && props.book._id ? "Edit Book" : "Add Book"
);

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
