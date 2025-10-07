<template>
  <v-app-bar app color="background" flat class="border-b">
    <v-toolbar-title class="text-h6 font-weight-medium">
      {{ projectName }}
    </v-toolbar-title>

    <v-spacer />

    <v-btn icon variant="text" @click="toggleTheme">
      <v-icon>
        {{ currentTheme === "light" ? "mdi-weather-night" : "mdi-white-balance-sunny" }}
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import { computed } from "vue";

const projectName = "+A Educação Tech - Teste Técnico";

const theme = useTheme();

const currentTheme = computed(() => theme.global.name.value);

function toggleTheme() {
  theme.global.name.value = currentTheme.value === "light" ? "dark" : "light";
}
</script>
