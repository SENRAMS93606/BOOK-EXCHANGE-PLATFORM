import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./userStore";
import axiosInstance from "../axiosInstance"; // Import the Axios instance
import { ElMessageBox, ElMessage } from "element-plus";

export const useBookStore = defineStore("bookStore", () => {
  const books = ref([]);
  const searchQuery = ref("");
  const formVisible = ref(false);
  const userStore = useUserStore();
  const getSearchQuery = computed(() => searchQuery.value);
  const getFormVisible = computed(() => formVisible.value);

  const setSearchQuery = (query) => {
    searchQuery.value = query;
    console.log("query", query);
  };

  const setFormVisible = (visible) => {
    formVisible.value = visible;
  };

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books");
      books.value = response.data;
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async (book) => {
    try {
      const userId = userStore.user._id; // Get the user ID from the store

      const bookPayload = {
        ...book,
        owner: userId, // Include the user ID in the request payload
      };
      console.log("Adding book:", book); // Log the book payload
      const response = await axiosInstance.post("/books", bookPayload);
      books.value.push(response.data);
      ElMessage.success("Book added successfully");
      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const editBook = async (book) => {
    try {
      console.log("Editing book", book);
      const response = await axiosInstance.put(`/books/${book._id}`, book);
      const index = books.value.findIndex((b) => b._id === book._id);
      if (index !== -1) {
        books.value[index] = response.data;
      }
      ElMessage.success("Book updated successfully");
      fetchBooks();
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      books.value = books.value.filter((book) => book.id !== id);
      ElMessage.success("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const filteredBooks = computed(() => {
    const query = searchQuery.value.toLowerCase();
    if (!query) {
      return books.value;
    }
    return books.value.filter((book) => {
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

  return {
    books,
    searchQuery: getSearchQuery,
    formVisible: getFormVisible,
    setSearchQuery,
    setFormVisible,
    fetchBooks,
    addBook,
    editBook,
    deleteBook,
    filteredBooks,
  };
});
