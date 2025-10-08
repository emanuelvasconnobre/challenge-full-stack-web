<script setup lang="ts">
import type Student from "@/modules/shared/interfaces/entities/Student";
import { computed, ref } from "vue";
import formatDate from "@/utils/formatDate";

type StudentView = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  RA: string;
  createdAt: string;
  modifiedAt: string;
};

function convertInView(students: Student[]): StudentView[] {
  return students.map((item) => ({
    ...item,
    createdAt: formatDate(item.createdAt),
    modifiedAt: formatDate(item.modifiedAt),
  }));
}

const props = defineProps<{
  students: Student[];
  total: number;
  page: number;
  pageSize: number;
  order: { attribute: string; type: "asc" | "desc" };
  loading: boolean;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortChange: (attribute: string, type: "asc" | "desc") => void;
}>();

const currentPage = computed({
  get: () => props.page,
  set: (newPage) => props.onPageChange(newPage),
});

const headers = [
  { title: "ID", value: "id", sortable: true },
  { title: "Name", value: "name", sortable: true },
  { title: "Email", value: "email", sortable: true },
  { title: "CPF", value: "cpf", sortable: true },
  { title: "RA", value: "RA", sortable: true },
  { title: "Created At", value: "createdAt", sortable: true },
  { title: "Modified At", value: "modifiedAt", sortable: true },
  { title: "Actions", value: "actions", sortable: false },
];

function handleSort({
  sortBy,
  sortDesc,
}: {
  sortBy: { key: string; order?: string }[];
  sortDesc: boolean;
}) {
  if (sortBy?.length > 0) {
    const type = sortDesc ? "desc" : "asc";
    props.onSortChange(sortBy[0]!.key, type);
  }
}

const showDialog = ref(false);
const selectedStudent = ref<Student | null>(null);

function confirmDelete(id: string) {
  selectedStudent.value = props.students.find((item) => item.id === id)!;
  showDialog.value = true;
}

function handleConfirm() {
  if (selectedStudent.value) {
    props.onDelete(selectedStudent.value.id);
  }
  showDialog.value = false;
  selectedStudent.value = null;
}

function handleCancel() {
  showDialog.value = false;
  selectedStudent.value = null;
}
</script>

<template>
  <v-data-table
    v-model:page="currentPage"
    :footer-props="{ 'items-per-page-options': [5, 10, 25] }"
    :headers="headers"
    :items="convertInView(props.students)"
    :items-per-page="props.pageSize"
    :items-per-page-options="[10, 25, 50, 100]"
    :loading="loading"
    :server-items-length="props.total"
    :sort-desc="props.order.type === 'desc'"
    @update:items-per-page="props.onPageSizeChange"
    @update:page="props.onPageChange"
    @update:sort-by="(sortBy) => handleSort({ sortBy, sortDesc: props.order.type === 'desc' })"
  >
    <template #item.actions="{ item }">
      <v-btn color="red" icon @click="confirmDelete(item.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>

  <v-dialog v-model="showDialog" max-width="400">
    <v-card color="background">
      <v-card-title class="text-h6"> Do you confirm to remove this student? </v-card-title>

      <v-card-text> Once removed It is not possible to recover this student data. </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="grey" variant="text" @click="handleCancel">Cancel</v-btn>
        <v-btn color="red" variant="flat" @click="handleConfirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
