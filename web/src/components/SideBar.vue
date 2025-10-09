<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    color="surface"
    floating
    :rail="collapsed"
    rail-width="64"
    width="220"
  >
    <div class="d-flex align-center justify-end pa-2">
      <v-btn icon variant="text" @click="collapsed = !collapsed">
        <v-icon>{{ collapsed ? "mdi-menu-open" : "mdi-menu" }}</v-icon>
      </v-btn>
    </div>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in links"
        :key="item.to"
        :aria-label="item.description"
        :prepend-icon="item.icon"
        role="link"
        :title="collapsed ? '' : item.title"
        :to="item.to"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(true);
const collapsed = ref(false);
const links = [
  {
    to: "/",
    icon: "mdi-text-box-outline",
    description: "Go to home page.",
    title: "Home",
  },
  {
    to: "/students",
    icon: "mdi-star-circle-outline",
    description: "Go to students page.",
    title: "Students",
  },
];
</script>
