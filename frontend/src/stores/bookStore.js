import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useBookStore = defineStore("bookStore", () => {
  const books = ref([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Fiction",
      condition: "Good",
      status: "Available",
      description:
        "A tragic story of Jay Gatsby's pursuit of love and the American Dream.",
      owner: "Alice",
      location: "New York",
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Historical Fiction",
      condition: "Excellent",
      status: "Available",
      description:
        "A powerful story about race and justice in the American South.",
      owner: "Bob",
      location: "Chicago",
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      condition: "Fair",
      status: "Lent Out",
      description:
        "A grim portrayal of a totalitarian society under constant surveillance.",
      owner: "Charlie",
      location: "San Francisco",
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romantic Fiction",
      condition: "Good",
      status: "Available",
      description: "A timeless romance between Elizabeth Bennet and Mr. Darcy.",
      owner: "Diana",
      location: "Los Angeles",
    },
    {
      id: 5,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "Literary Fiction",
      condition: "Good",
      status: "Available",
      description: "A young boy’s struggles with identity and alienation.",
      owner: "Ethan",
      location: "Boston",
    },
    {
      id: 6,
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Philosophical Fiction",
      condition: "Excellent",
      status: "Lent Out",
      description:
        "A young shepherd’s quest for treasure becomes a journey of self-discovery.",
      owner: "Fiona",
      location: "Miami",
    },
    {
      id: 7,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      genre: "Non-Fiction",
      condition: "Good",
      status: "Available",
      description:
        "A fascinating exploration of humanity's history and impact on the world.",
      owner: "George",
      location: "Austin",
    },
    {
      id: 8,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      condition: "Excellent",
      status: "Available",
      description:
        "Bilbo Baggins embarks on an adventurous journey to recover a lost treasure.",
      owner: "Hannah",
      location: "Seattle",
    },
  ]);

  const searchQuery = ref("");
  const formVisible = ref(false);

  const getSearchQuery = computed(() => searchQuery.value);
  const getFormVisible = computed(() => formVisible.value);

  const setSearchQuery = (query) => {
    searchQuery.value = query;
    console.log("query", query);
  };

  const setFormVisible = (visible) => {
    formVisible.value = visible;
  };

  const addBook = (book) => {
    book.id = books.value.length + 1;
    books.value.push(book);
  };

  const editBook = (book) => {
    const index = books.value.findIndex((b) => b.id === book.id);
    if (index !== -1) {
      books.value[index] = { ...book };
    }
  };

  const deleteBook = (id) => {
    books.value = books.value.filter((book) => book.id !== id);
  };

  return {
    books,
    searchQuery: getSearchQuery,
    formVisible: getFormVisible,
    setSearchQuery,
    setFormVisible,
    addBook,
    editBook,
    deleteBook,
  };
});
