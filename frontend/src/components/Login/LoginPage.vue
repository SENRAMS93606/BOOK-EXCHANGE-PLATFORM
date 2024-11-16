<template>
  <div class="container">
    <div class="well">
      <form @submit.prevent="handleSubmit">
        <div v-if="formType === 'login'">
          <h1>Welcome Back</h1>
          <h2>Log in to your account</h2>
        </div>
        <div v-else-if="formType === 'signup'">
          <h1>Join Us</h1>
          <h2>Create your account</h2>
        </div>

        <div>
          <input
            type="email"
            v-if="formType !== 'reset-password'"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div
          v-if="formType !== 'forgot-password' && formType !== 'reset-password'"
        >
          <input
            type="password"
            v-model="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <a
          v-if="formType === 'login'"
          href="#"
          @click.prevent="goToForgotPassword"
        >
          Forgot Password?
        </a>

        <button @click.prevent="handleSubmit">
          <span>{{ formType === "login" ? "Log In" : "Sign Up" }}</span>
        </button>
      </form>
      <p v-if="formType === 'login'">
        Don't have an account?
        <a href="#" @click.prevent="switchFormType">Sign Up</a>.
      </p>
      <p v-else-if="formType === 'signup'">
        Already have an account?
        <a href="#" @click.prevent="switchFormType">Log In</a>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useUserStore } from "../../stores/userStore";

const props = defineProps({
  formType: {
    type: String,
    default: "login",
  },
});

const emit = defineEmits(["update:formType"]);
const email = ref("senramsenraj@gmail.com");
const password = ref("12345");
const formType = ref(props.formType);
const router = useRouter();
const userStore = useUserStore(); // Initialize the user store

const switchFormType = () => {
  formType.value = formType.value === "login" ? "signup" : "login";
  emit("update:formType", formType.value);
};

const goToForgotPassword = () => {
  router.push({ name: "ForgotPassword" });
};

const handleSubmit = async () => {
  try {
    const baseURL = "http://localhost:4000/api/auth"; // Ensure this matches your backend server URL

    let response;
    if (formType.value === "login") {
      // Login request using user store
      await userStore.login(email.value, password.value);
      response = { status: 200, data: { message: "Login successful" } };
    } else if (formType.value === "signup") {
      // Registration request
      response = await axios.post(`${baseURL}/register`, {
        email: email.value,
        password: password.value,
      });
    }

    if (response && response.data) {
      alert(response.data.message);
      if (response.status === 200 || response.status === 201) {
        router.push("/Home"); // Redirect to Home after login or registration
      }
    } else {
      alert("Unexpected response format");
    }
  } catch (error) {
    console.error("Error response:", error.response); // Log the full error response
    if (error.response && error.response.data) {
      alert(error.response.data.message || "An error occurred");
    } else {
      alert("An error occurred");
    }
  }
};
</script>

<style>
@import url("../Login/LoginPage.css");
</style>
