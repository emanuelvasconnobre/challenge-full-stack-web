import Student from "../entities/Student";

export default class StudentFilter extends Student {
  constructor(data: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    RA: string;
    createdAt: Date;
    modifiedAt: Date;
  }) {
    super(data);
  }
}
