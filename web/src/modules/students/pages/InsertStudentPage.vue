<script setup lang="ts">
import type InsertStudentAttributes from "@/modules/shared/interfaces/object-values/InsertStudentAttributes";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ValidationException from "@/modules/shared/exceptions/ValidationException";
import { useStudents } from "../composables/useStudents";

type FormData = InsertStudentAttributes;

const form = ref<FormData>({
  name: "",
  email: "",
  cpf: "",
  RA: "",
});
const formRef = ref();
const formInputErrors = ref<Record<string, string[]>>({});
const router = useRouter();

const { createStudent } = useStudents();

const rules = {
  required: (v: string) => !!v || "This form input is mandatory!",
  email: (v: string) => /^\S+@\S+\.\S+$/.test(v) || "Email invalid!",
};

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
  const result = await createStudent(form.value);

  if (!result.success && result.error instanceof ValidationException) {
    formInputErrors.value = mapValidationErrors(result.error);
  }

  router.push("/students");
}

async function handleCancel() {
  router.push("/students");
}
</script>

<template>
  <v-card color="background">
    <v-card-title> Insert Student </v-card-title>

    <v-card-text>
      <v-form :ref="formRef" @submit.prevent="handleSubmit">
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
          :rules="[rules.required, rules.email]"
        />
        <v-text-field
          v-model="form.cpf"
          :error-messages="formInputErrors.cpf"
          label="CPF"
          required
          :rules="[rules.required]"
        />
        <v-text-field
          v-model="form.RA"
          :error-messages="formInputErrors.RA"
          label="RA"
          required
          :rules="[rules.required]"
        />
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn text @click="handleCancel">Cancel</v-btn>
      <v-btn color="primary" @click="handleSubmit">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
