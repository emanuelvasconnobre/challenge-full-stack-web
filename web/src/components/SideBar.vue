<template>
  <v-navigation-drawer app>
    <v-list v-for="link in links" :key="link.to">
      <v-list-item
        :to="link.to"
        :title="link.title"
        link
        :prepend-icon="link.icon"
        :aria-label="link.description"
        role="link"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const links = [
  {
    to: "/",
    icon: "mdi-text-box-outline",
    description: "Go to home page.",
    title: "Home",
  },
  {
    to: "students",
    icon: "mdi-star-circle-outline",
    description: "Go to students page.",
    title: "Students",
  },
];
</script>
