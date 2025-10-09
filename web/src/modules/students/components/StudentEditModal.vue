<script setup lang="ts">
import type Student from "@/modules/shared/interfaces/entities/Student";
import type StudentEditableAttributes from "@/modules/shared/interfaces/object-values/StudentEditableAttributes";
import { ref, watch } from "vue";
import ValidationException from "@/modules/shared/exceptions/ValidationException";

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
const formRef = ref();

const formInputErrors = ref<Record<string, string[]>>({});

watch(
  () => props.student,
  (newStudent) => {
    if (newStudent) {
      formInputErrors.value = {};
      form.value = { name: newStudent.name, email: newStudent.email };
    }
  },
  { immediate: true },
);

const rules = {
  required: (v: string) => !!v || "This form input is mandatory!",
  email: (v: string) => /^\S+@\S+\.\S+$/.test(v) || "Email invalid!",
};

function closeModal() {
  modelValue.value = false;
  formInputErrors.value = {};
}

function mapValidationErrors(exception: ValidationException): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  const errors = exception.details.errors;
  if (!Array.isArray(errors)) return result;

  for (const err of errors) {
    const field = err.fieldName;
    const messagesObj = err.messages;

    if (field && messagesObj) {
      result[field] = Object.values(messagesObj);
    }
  }

  return result;
}

async function handleSubmit() {
  const isValid = await formRef.value?.validate();
  if (!isValid.valid) return;

  try {
    await props.onSave(form.value);
    closeModal();
  } catch (error) {
    if (error instanceof ValidationException) {
      formInputErrors.value = mapValidationErrors(error);
    }
  }
}
</script>

<template>
  <v-dialog v-model="modelValue" max-width="500">
    <v-card color="background">
      <v-card-title> Edit Student </v-card-title>

      <v-card-text>
        <v-form ref="formRef" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.name"
            :error-messages="formInputErrors.name"
            label="Name"
            required
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="form.email"
            :error-messages="formInputErrors.email"
            label="Email"
            required
            :rules="[rules.required]"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="closeModal">Cancel</v-btn>
        <v-btn color="primary" @click="handleSubmit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
