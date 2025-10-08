import type GetManyStudentDTO from "./dtos/GetManyStudentDTO";
import type Student from "@/modules/shared/interfaces/entities/Student";
import type { PaginatedResult } from "@/modules/shared/interfaces/Pagination";
import getEnvSettings from "@/config/env";
import Result from "@/modules/shared/interfaces/Result";

const envSettings = getEnvSettings();

const API_URL = envSettings.api.url;

export async function getStudents(
  dto: GetManyStudentDTO = {},
): Promise<Result<PaginatedResult<Student>>> {
  try {
    const params = new URLSearchParams();

    if (dto) {
      for (const key in dto) {
        const value = dto[key as keyof GetManyStudentDTO];
        if (value !== undefined) {
          params.append(key, String(value));
        }
      }
    }
    const res = await fetch(`${API_URL}/students?${params.toString()}`, {
      method: "GET",
    });
    const data = await res.json();

    return new Result({ data });
  } catch (error) {
    return new Result({ error, success: false });
  }
}

export async function deleteStudent(id: string): Promise<Result> {
  try {
    const res = await fetch(`${API_URL}/students/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    return new Result({ data });
  } catch (error) {
    return new Result({ error, success: false });
  }
}
