<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-form @submit.prevent="login">
          <q-input v-model="username" label="Username" required />
          <q-input v-model="password" label="Password" type="password" required />
          <q-btn type="submit" label="Login" color="primary" />
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
//import { useAuthStore } from '../stores/authStore';
import {authStore } from '../stores/sql_lite/authStore'
import { useRouter } from 'vue-router'; // Import useRouter

const username = ref('');
const password = ref('');
const router = useRouter(); // Get the router instance

const login = async () => {
  try {
    await authStore.login(username.value, password.value);
    router.push('/dashboard'); // Use router to navigate
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>
