import IStudentRepository from "../../domain/repositories/IStudentRepository";
import IUseCase from "@/shared/types/IUseCase";

type Input = { id: string };
type Output = void;

export default class DeleteStudent implements IUseCase<Input, Output> {
  constructor(private readonly repository: IStudentRepository) {}

  async execute({ id }: Input): Promise<Output> {
    await this.repository.delete(id);
  }
}
