<template>
  <v-app-bar app class="border-b" color="background" flat>
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
import { computed } from "vue";
import { useTheme } from "vuetify";

const projectName = "+A Educação Tech - Teste Técnico";

const theme = useTheme();

const currentTheme = computed(() => theme.global.name.value);

function toggleTheme() {
  theme.change(currentTheme.value === "light" ? "dark" : "light");
}
</script>
