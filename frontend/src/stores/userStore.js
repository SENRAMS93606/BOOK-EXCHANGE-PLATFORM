import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../axiosInstance"; // Import the Axios instance

export const useUserStore = defineStore("userStore", () => {
  const user = ref(null);

  const setUser = (userData) => {
    user.value = userData;
    console.log("User ID set in store:", userData); // Log the user data
  };

  const login = async (email, password) => {
    try {
      console.log("Login is called");
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log("Login Successful", response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      //await axiosInstance.post("/auth/logout");
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      user.value = null;
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const fetchUserFromSession = async () => {
    try {
      const response = await axiosInstance.get("/auth/me", {
        withCredentials: true,
      });
      //const response = await axiosInstance.get("/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user from session:", error);
    }
  };

  return {
    user,
    setUser,
    login,
    logout,
    fetchUserFromSession,
  };
});
