<script setup lang="ts">
import type Student from "@/modules/shared/interfaces/entities/Student";

const props = defineProps<{ students: Student[]; onDelete: (id: string) => void }>();
</script>

<template>
  <v-data-table
    :headers="[
      { title: 'ID', value: 'id' },
      { title: 'Name', value: 'name' },
      { title: 'Email', value: 'email' },
      { title: 'Actions', value: 'actions', sortable: false },
    ]"
    :items="props.students"
  >
    <template #item.actions="{ item }">
      <v-btn color="red" icon @click="props.onDelete(item.id)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>
