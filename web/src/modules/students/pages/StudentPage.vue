<script setup lang="ts">
import type StudentEditableAttributes from "@/modules/shared/interfaces/object-values/StudentEditableAttributes";
import StudentTable from "../components/StudentTable.vue";
import { useStudents } from "../composables/useStudents";

const {
  students,
  loading,
  removeStudent,
  editStudent,
  page,
  pageSize,
  total,
  order,
  setPage,
  setPageSize,
  setOrder,
} = useStudents();

async function onEditHandler(id: string, data: StudentEditableAttributes) {
  const result = await editStudent(id, data);

  if (!result.success) {
    throw result.error;
  }
}

async function onDeleteHandler(id: string) {
  const result = await removeStudent(id);

  if (!result.success) {
    throw result.error;
  }
}
</script>

<template>
  <v-container>
    <h1>Students</h1>

    <StudentTable
      :loading="loading"
      :on-delete="onDeleteHandler"
      :on-edit="onEditHandler"
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
