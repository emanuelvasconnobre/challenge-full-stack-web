<template>
  <v-app>
    <div class="layout d-flex">
      <SideBar />

      <div class="main-content flex-grow-1 d-flex flex-column">
        <NavBar />
        <v-main>
          <v-container fluid>
            <router-view />
          </v-container>
        </v-main>
      </div>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
</script>
