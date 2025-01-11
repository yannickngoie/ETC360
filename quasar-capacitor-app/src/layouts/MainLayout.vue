<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>My Quasar App</q-toolbar-title>
        <q-btn flat label="Logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above>
      <q-list>
        <q-item clickable to="/dashboard">
          <q-item-section>Dashboard</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>
