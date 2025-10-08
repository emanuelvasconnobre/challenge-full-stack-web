import type Student from "@/modules/shared/interfaces/entities/Student";
import { onMounted, ref } from "vue";
import { getStudents } from "../services/StudentService";

export function useStudents() {
  const students = ref<Student[]>([]);
  const loading = ref(false);
  const page = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  const totalPages = ref(0);
  const order = ref<{ attribute: string; type: "asc" | "desc" }>({
    attribute: "createdAt",
    type: "asc",
  });

  async function fetchStudents() {
    loading.value = true;

    try {
      const result = await getStudents({
        page: page.value,
        pageSize: pageSize.value,
        orderBy: order.value.attribute,
        orderType: order.value.type,
      });

      if (result.success && result.data) {
        students.value = result.data.items;
        total.value = result.data.total;
        totalPages.value = result.data.totalPages;
      } else {
        students.value = [];
        total.value = 0;
        // TODO: show a toast warning
      }
    } catch {
      students.value = [];
      total.value = 0;
      // TODO: show a toast error
    } finally {
      loading.value = false;
    }
  }

  async function removeStudent(id: string) {
    // TODO: call delete API
    students.value = students.value.filter((s) => s.id !== id);
  }

  function setPage(newPage: number) {
    page.value = newPage;
    fetchStudents();
  }

  function setPageSize(newPageSize: number) {
    pageSize.value = newPageSize;
    fetchStudents();
  }

  function setOrder(attribute: string, type: "asc" | "desc") {
    order.value = { attribute, type };
    fetchStudents();
  }

  onMounted(fetchStudents);

  return {
    students,
    loading,
    page,
    pageSize,
    total,
    totalPages,
    order,
    fetchStudents,
    removeStudent,
    setPage,
    setPageSize,
    setOrder,
  };
}
