<script setup lang="ts">
import type StudentEditableAttributes from "@/modules/shared/interfaces/object-values/StudentEditableAttributes";
import { useRouter } from "vue-router";
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
const router = useRouter();

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
    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <h1 class="text-h5 font-weight-medium">Students</h1>
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" @click="router.push('/students/insert')"> New student </v-btn>
        </v-col>
      </v-row>
    </v-container>

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
