import type Student from "@/modules/shared/interfaces/entities/Student";
import { onMounted, ref } from "vue";
import { getStudents } from "../services/StudentService";

export function useStudents() {
  const students = ref<Student[]>([]);
  const loading = ref(false);

  async function fetchStudents() {
    loading.value = true;
    const result = await getStudents();

    if (result.success && Array.isArray(result.data)) {
      students.value = result.data;
    }
    // TODO: set up a toast warning the error
    loading.value = false;
  }

  async function removeStudent(id: string) {
    // TODO: implement a delete student service logic here
    students.value = students.value.filter((s) => s.id !== id);
  }

  onMounted(fetchStudents);

  return { students, loading, fetchStudents, removeStudent };
}
