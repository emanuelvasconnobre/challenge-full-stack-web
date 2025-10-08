import { Request, Response } from "express";
import makeCreateStudent from "../../application/factories/makeCreateStudent";
import makeUpdateStudent from "../../application/factories/makeUpdateStudent";
import makeFindOneStudent from "../../application/factories/makeFindOneStudent";
import makeFindManyStudent from "../../application/factories/makeFindManyStudent";
import makeDeleteStudent from "../../application/factories/makeDeleteStudent";
import type { GetManyStudentDTO } from "../dtos/GetManyStudentDTO";
import type { UpdateStudentDTO } from "../dtos/UpdateStudentDTO";
import type { CreateStudentDTO } from "../dtos/CreateStudentDTO";

export class StudentController {
  constructor(
    private readonly createStudentUsecase = makeCreateStudent(),
    private readonly updateStudentUsecase = makeUpdateStudent(),
    private readonly findOneStudentUsecase = makeFindOneStudent(),
    private readonly findManyStudentUsecase = makeFindManyStudent(),
    private readonly deleteStudentUsecase = makeDeleteStudent(),
  ) {}

  async createNewStudent(req: Request, res: Response) {
    const result = await this.createStudentUsecase.execute(req.dtoInstance as CreateStudentDTO);

    return res.status(201).json(result);
  }

  async getStudentById(req: Request, res: Response) {
    const result = await this.findOneStudentUsecase.execute({
      id: req.params.id,
    });

    return res.status(200).json(result);
  }

  async getManyStudents(req: Request, res: Response) {
    const { page, pageSize, orderBy, orderType, ...attributes } =
      req.dtoInstance as GetManyStudentDTO;
    const result = await this.findManyStudentUsecase.execute({
      attributes,
      page,
      pageSize,
      order: {
        attribute: orderBy,
        type: orderType,
      },
    });

    return res.status(200).json(result);
  }

  async updateStudents(req: Request, res: Response) {
    const result = await this.updateStudentUsecase.execute({
      id: req.params.id,
      ...(req.dtoInstance as UpdateStudentDTO),
    });

    return res.status(200).json(result);
  }

  async deleteStudents(req: Request, res: Response) {
    await this.deleteStudentUsecase.execute({ id: req.params.id });

    return res.status(200).json();
  }
}
