<script setup lang="ts">
import StudentTable from "../components/StudentTable.vue";
import { useStudents } from "../composables/useStudents";

const { students, loading, removeStudent } = useStudents();
</script>

<template>
  <v-container>
    <h1>Students</h1>

    <StudentTable :on-delete="removeStudent" :students="students" />
    <v-progress-linear v-if="loading" color="primary" indeterminate />
  </v-container>
</template>
