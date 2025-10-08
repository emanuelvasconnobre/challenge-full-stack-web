import type Student from "@/modules/shared/interfaces/entities/Student";
import { onMounted, ref } from "vue";
import { useToast } from "@/modules/shared/composable/useToast";
import { deleteStudent, getStudents } from "../services/StudentService";

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

  const { showToast } = useToast();

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
        showToast("Student was deleted successfully!", "success");
      } else {
        students.value = [];
        total.value = 0;
        showToast("An error occured when trying to get student data!", "error");
      }
    } finally {
      loading.value = false;
    }
  }

  async function removeStudent(id: string) {
    loading.value = true;

    try {
      const result = await deleteStudent(id);

      if (result.success) {
        students.value = students.value.filter((s) => s.id !== id);
        showToast("Student was deleted successfully!", "success");
      } else {
        students.value = [];
        total.value = 0;
        showToast("An error occured when trying to delete student!", "error");
      }
    } finally {
      loading.value = false;
    }
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
