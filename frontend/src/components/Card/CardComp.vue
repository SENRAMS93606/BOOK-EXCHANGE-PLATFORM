<template>
  <div class="card-container">
    <CreateNewForm
      v-model="localFormVisible"
      :book="currentBook"
      @submit="handleFormSubmit"
    />
    <ExchangeRequestForm v-model="exchangeFormVisible" />
    <h2 style="font-weight: bold">Your Books</h2>
    <el-row :gutter="20" v-if="userBooks.length">
      <el-col
        :span="6"
        v-for="book in userBooks"
        :key="book._id"
        style="padding-bottom: 10px !important"
      >
        <el-card>
          <template #header>
            <div class="card-header">
              <img
                :src="`https://picsum.photos/200/300?random=${book._id}`"
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
            <!-- <p class="book_content" v-bind:title="book.owner.email">
              <strong>Owner:</strong> {{ book.owner.email }}
            </p> -->
            <p class="book_content" v-bind:title="book.location">
              <strong>Location:</strong> {{ book.location }}
            </p>
          </div>
          <template #footer>
            <el-button
              v-if="book.owner._id === user._id"
              @click="openEditForm(book)"
              ><el-icon><Edit /></el-icon
            ></el-button>
            <el-button
              v-if="book.owner._id === user._id"
              @click="deleteBookById(book._id)"
              ><el-icon><Delete /></el-icon
            ></el-button>
            <el-button type="warning" @click="openExchangeForm"
              >Exchange</el-button
            >
          </template>
        </el-card>
      </el-col>
    </el-row>

    <h2 style="font-weight: bold">Other Books</h2>
    <el-row :gutter="20" v-if="otherBooks.length">
      <el-col
        :span="6"
        v-for="book in otherBooks"
        :key="book._id"
        style="padding-bottom: 10px !important"
      >
        <el-card>
          <template #header>
            <div class="card-header">
              <img
                :src="`https://picsum.photos/200/300?random=${book._id}`"
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
            <p class="book_content" v-bind:title="book.location">
              <strong>Location:</strong> {{ book.location }}
            </p>
          </div>
          <template #footer>
            <el-button
              v-if="book.owner._id === user._id"
              @click="openEditForm(book)"
              ><el-icon><Edit /></el-icon
            ></el-button>
            <el-button
              v-if="book.owner._id === user._id"
              @click="deleteBookById(book._id)"
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
import { ref, computed, watch, onMounted } from "vue";
import { useBookStore } from "../../stores/bookStore";
import { useUserStore } from "../../stores/userStore";
import CreateNewForm from "../Form/CreateNewForm.vue";
import ExchangeRequestForm from "../Form/ExchangeReqForm.vue";

const bookStore = useBookStore();
const userStore = useUserStore();

const user = userStore.user;
console.log("user", user);
const { fetchBooks, addBook, editBook, deleteBook } = bookStore;

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

const handleFormSubmit = (book) => {
  if (book._id) {
    console.log("EDIT Book.................", book);
    editBook(book);
  } else {
    console.log("form to add=---------", book);
    addBook(book);
  }
  localFormVisible.value = false;
};

const openEditForm = (book) => {
  currentBook.value = { ...book };
  localFormVisible.value = true;
};

const openExchangeForm = () => {
  exchangeFormVisible.value = true;
};

onMounted(() => {
  fetchBooks();
});

const deleteBookById = (id) => {
  deleteBook(id);
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
      book.location.toLowerCase().includes(query)
    );
  });
});

const userBooks = computed(() => {
  return filteredBooks.value.filter((book) => book.owner._id === user._id);
});

const otherBooks = computed(() => {
  return filteredBooks.value.filter((book) => book.owner._id !== user._id);
});

watch(
  () => bookStore.books,
  () => {
    console.log("Books updated:", bookStore.books);
    console.log("userBooks", userBooks.value);
    console.log("otherBooks", otherBooks.value);
  },
  { immediate: true, deep: true }
);
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
  width: 100%;
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
