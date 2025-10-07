<template>
  <v-app>
    <Sidebar />

    <v-main class="pa-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

