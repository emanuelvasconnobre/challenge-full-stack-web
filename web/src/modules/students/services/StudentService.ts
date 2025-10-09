import type CreateStudentDTO from "./dtos/CreateStudentDTO";
import type GetManyStudentDTO from "./dtos/GetManyStudentDTO";
import type UpdateStudentDTO from "./dtos/UpdateStudentDTO";
import type Student from "@/modules/shared/interfaces/entities/Student";
import type { PaginatedResult } from "@/modules/shared/interfaces/Pagination";
import getEnvSettings from "@/config/env";
import ValidationException from "@/modules/shared/exceptions/ValidationException";
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

    if (!res.ok) {
      const data = await res.json();
      switch (res.status) {
        case 400: {
          return new Result({
            error: new ValidationException({
              validationErrors: (data as ValidationException).details.errors,
            }),
            success: false,
          });
        }

        default: {
          console.log(res);
          return new Result({
            error: new Error("Unexpected error"),
            success: false,
          });
        }
      }
    }

    return new Result();
  } catch (error) {
    console.log(error);
    return new Result({
      error: new Error(`Unexpected error: ${error}`),
      success: false,
    });
  }
}

export async function updateStudent(id: string, dto: UpdateStudentDTO = {}): Promise<Result> {
  try {
    const res = await fetch(`${API_URL}/students/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
      method: "PUT",
    });

    if (!res.ok) {
      const data = await res.json();
      switch (res.status) {
        case 400: {
          return new Result({
            error: new ValidationException({
              validationErrors: (data as ValidationException).details.errors,
            }),
            success: false,
          });
        }

        default: {
          console.log(data);
          return new Result({
            error: new Error("Unexpected error"),
            success: false,
          });
        }
      }
    }

    const data = await res.json();
    return new Result({ data });
  } catch (error) {
    console.log(error);
    return new Result({
      error: new Error(`Unexpected error: ${error}`),
      success: false,
    });
  }
}

export async function insertStudent(dto: CreateStudentDTO): Promise<Result> {
  try {
    const res = await fetch(`${API_URL}/students`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
      method: "POST",
    });

    if (!res.ok) {
      const data = await res.json();
      switch (res.status) {
        case 400: {
          return new Result({
            error: new ValidationException({
              validationErrors: (data as ValidationException).details.errors,
            }),
            success: false,
          });
        }

        default: {
          console.log(data);
          return new Result({
            error: new Error("Unexpected error"),
            success: false,
          });
        }
      }
    }

    const data = await res.json();
    return new Result({ data });
  } catch (error) {
    console.log(error);
    return new Result({
      error: new Error(`Unexpected error: ${error}`),
      success: false,
    });
  }
}
