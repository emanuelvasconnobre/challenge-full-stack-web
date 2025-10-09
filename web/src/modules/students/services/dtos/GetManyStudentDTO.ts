import type Student from "@/modules/shared/interfaces/entities/Student";

export default interface GetManyStudentDTO {
  page?: number;
  pageSize?: number;
  orderBy?: keyof Student | string;
  orderType?: "asc" | "desc";

  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  RA?: string;
}
