<script setup lang="ts">
import type Student from "@/modules/shared/interfaces/entities/Student";
import type StudentEditableAttributes from "@/modules/shared/interfaces/object-values/StudentEditableAttributes";
import { ref, watch } from "vue";

type FormData = StudentEditableAttributes;

const modelValue = defineModel<boolean>();
const props = defineProps<{
  student: Student | null;
  onSave: (data: StudentEditableAttributes) => Promise<void> | void;
}>();

const form = ref<FormData>({
  name: props.student?.name,
  email: props.student?.email,
});

watch(
  () => props.student,
  (newStudent) => {
    if (newStudent) form.value = { name: newStudent.name, email: newStudent.email };
  },
  { immediate: true },
);

function closeModal() {
  modelValue.value = false;
}

async function handleSubmit() {
  await props.onSave(form.value);
  closeModal();
}
</script>

<template>
  <v-dialog v-model="modelValue" max-width="500">
    <v-card color="background">
      <v-card-title> Edit Student </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field v-model="form.name" label="Name" required />
          <v-text-field v-model="form.email" label="Email" required />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="closeModal">Cancel</v-btn>
        <v-btn color="primary" @click="handleSubmit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
