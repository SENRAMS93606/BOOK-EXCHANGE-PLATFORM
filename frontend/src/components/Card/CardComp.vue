<template>
  <div class="card-container">
    <CreateNewForm
      v-model="localFormVisible"
      :book="currentBook"
      @submit="handleFormSubmit"
    />
    <ExchangeRequestForm v-model="exchangeFormVisible" />
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="book in filteredBooks"
        :key="book.id"
        style="padding-bottom: 10px !important"
      >
        <el-card>
          <template #header>
            <div class="card-header">
              <img
                :src="`https://picsum.photos/200/300?random=${book.id}`"
                alt="Book Image"
                class="card-image"
              />
              <span>{{ book.title }}</span>
            </div>
          </template>
          <div class="card-content">
            <p class="book_content" v-bind:title="book.author">
              <strong>Author:</strong> {{ book.author }}
            </p>
            <p class="book_content" v-bind:title="book.genre">
              <strong>Genre:</strong> {{ book.genre }}
            </p>
            <p class="book_content" v-bind:title="book.condition">
              <strong>Condition:</strong> {{ book.condition }}
            </p>
            <p class="book_content" v-bind:title="book.status">
              <strong>Status:</strong> {{ book.status }}
            </p>
            <p class="book_content" v-bind:title="book.description">
              <strong>Description:</strong> {{ book.description }}
            </p>
            <p class="book_content" v-bind:title="book.owner">
              <strong>Owner:</strong> {{ book.owner }}
            </p>
            <p class="book_content" v-bind:title="book.location">
              <strong>Location:</strong> {{ book.location }}
            </p>
          </div>
          <template #footer>
            <el-button @click="editBook(book)"
              ><el-icon><Edit /></el-icon
            ></el-button>
            <el-button @click="deleteBook(book.id)"
              ><el-icon><Delete /></el-icon
            ></el-button>
            <el-button type="warning" @click="openExchangeForm"
              >Exchange</el-button
            >
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useBookStore } from "../../stores/bookStore";
import CreateNewForm from "../Form/CreateNewForm.vue";
import ExchangeRequestForm from "../Form/ExchangeReqForm.vue";

const bookStore = useBookStore();
const { addBook, editBook, deleteBook } = bookStore;

const localFormVisible = ref(bookStore.formVisible);

watch(localFormVisible, (newValue) => {
  bookStore.setFormVisible(newValue);
});

watch(
  () => bookStore.formVisible,
  (newValue) => {
    localFormVisible.value = newValue;
  }
);

const exchangeFormVisible = ref(false);
const currentBook = ref({
  id: null,
  title: "",
  author: "",
  genre: "",
  condition: "",
  status: "",
  description: "",
  owner: "",
  location: "",
});

// const openForm = () => {
//   currentBook.value = {
//     id: null,
//     title: "",
//     author: "",
//     genre: "",
//     condition: "",
//     status: "",
//     description: "",
//     owner: "",
//     location: "",
//   };
//   formVisible.value = true;
// };

const handleFormSubmit = (book) => {
  if (book.id) {
    editBook(book);
  } else {
    addBook(book);
  }
};

const openExchangeForm = () => {
  exchangeFormVisible.value = true;
};

const filteredBooks = computed(() => {
  const query = bookStore.searchQuery.toLowerCase();
  if (!query) {
    return bookStore.books;
  }
  return bookStore.books.filter((book) => {
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.genre.toLowerCase().includes(query) ||
      book.condition.toLowerCase().includes(query) ||
      book.status.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query) ||
      book.owner.toLowerCase().includes(query) ||
      book.location.toLowerCase().includes(query)
    );
  });
});
</script>

<style>
.book_content {
  overflow: hidden;
  max-width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.el-card__body {
  padding: 0px !important;
}
.el-card__header {
  padding: 0px !important;
}
.el-card__footer {
  padding: 5px !important;
  float: right !important;
  border-top: none !important;
}
</style>

<style scoped>
.card-container {
  overflow: auto;
  height: calc(90vh - 0px);
  margin-top: 10px;
  margin-left: 40px;
}

.card-header {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.card-image {
  height: 100px;
  width: 75px;
  margin-right: 1rem;
}

.card-content {
  text-align: left;
  padding-left: 20px;
}

.text {
  margin: 0;
}

.item {
  padding: 0.5rem 0;
}

.el-card__footer {
  display: flex;
  justify-content: space-between;
}
</style>
