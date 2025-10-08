import type Student from "@/modules/shared/interfaces/entities/Student";
import getEnvSettings from "@/config/env";
import Result from "@/modules/shared/interfaces/Result";

const envSettings = getEnvSettings();

const API_URL = envSettings.api.url;

export async function getStudents(): Promise<Result<Student[]>> {
  try {
    const res = await fetch(`${API_URL}/students`, {
      method: "GET",
    });
    const data = await res.json();

    return new Result({ data });
  } catch (error) {
    return new Result({ error, success: false });
  }
}
