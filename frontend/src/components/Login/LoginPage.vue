<template>
  <div class="container">
    <div class="well">
      <form action="#" method="post">
        <div v-if="formType === 'login'">
          <h1>Welcome Back</h1>
          <h2>Log in to your account</h2>
        </div>
        <div v-else>
          <h1>Join Us</h1>
          <h2>Create your account</h2>
        </div>

        <div>
          <input
            type="text"
            :name="formType === 'login' ? 'login-username' : 'signup-username'"
            :id="formType === 'login' ? 'login-username' : 'signup-username'"
            v-model="username"
            required
          />
          <label
            :for="formType === 'login' ? 'login-username' : 'signup-username'"
            >Username</label
          >
        </div>

        <div>
          <input
            type="password"
            :name="formType === 'login' ? 'login-passwd' : 'signup-passwd'"
            :id="formType === 'login' ? 'login-passwd' : 'signup-passwd'"
            v-model="password"
            required
          />
          <label :for="formType === 'login' ? 'login-passwd' : 'signup-passwd'"
            >Password</label
          >
        </div>

        <a v-if="formType === 'login'" href="#" id="forgot-passwd"
          >Forgot Password?</a
        >

        <button class="button" id="btn-submit" @click.prevent="buttonClicked">
          <span class="button-text">{{
            formType === "login" ? "Log In" : "Sign Up"
          }}</span>
          <div class="button-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </button>
      </form>
      <p v-if="formType === 'login'">
        Don't have an account?
        <a href="#" @click.prevent="switchFormType">Sign Up</a>.
      </p>
      <p v-else>
        Already have an account?
        <a href="#" @click.prevent="switchFormType">Log In</a>.
      </p>
    </div>

    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgjAoBw9Qj6p6R6O_0x4pIPiER_YVklvwibw&s"
    />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  formType: {
    type: String,
    default: "login",
  },
});

const emit = defineEmits(["update:formType"]);
const username = ref("");
const password = ref("");
const formType = ref(props.formType);
const router = useRouter();

const switchFormType = () => {
  formType.value = formType.value === "login" ? "signup" : "login";
  emit("update:formType", formType.value);
};

const buttonClicked = () => {
  //if (formType.value === "login" || formType.value === "signup") {
  router.push("/Home"); // Redirect to Home after login
  //}
};
</script>

<style>
@import url("../Login/LoginPage.css");
</style>
