import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token') || '');
  const isAuthenticated = ref(!!token.value);

  const login = async (username, password) => {
    // Replace with actual API call to authenticate
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      token.value = data.token;
      isAuthenticated.value = true;
      localStorage.setItem('auth_token', token.value);
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    token.value = '';
    isAuthenticated.value = false;
    localStorage.removeItem('auth_token');
  };

  return { token, isAuthenticated, login, logout };
});
