<script setup lang="ts">
import StudentTable from "../components/StudentTable.vue";
import { useStudents } from "../composables/useStudents";

const {
  students,
  loading,
  removeStudent,
  page,
  pageSize,
  total,
  order,
  setPage,
  setPageSize,
  setOrder,
} = useStudents();
</script>

<template>
  <v-container>
    <h1>Students</h1>

    <StudentTable
      :loading="loading"
      :on-delete="removeStudent"
      :on-page-change="setPage"
      :on-page-size-change="setPageSize"
      :on-sort-change="setOrder"
      :order="order"
      :page="page"
      :page-size="pageSize"
      :students="students"
      :total="total"
    />

    <v-progress-linear v-if="loading" color="primary" indeterminate />
  </v-container>
</template>
