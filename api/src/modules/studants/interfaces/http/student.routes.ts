import { Router } from "express";
import { StudentController } from "./StudentController";
import validateDTOMiddleware from "@/shared/infrastructure/middlewares/validateDTOMiddleware";
import { CreateStudentDTO } from "../dtos/CreateStudentDTO";
import { UpdateStudentDTO } from "../dtos/UpdateStudentDTO";

const studentRouter = Router();
const controller = new StudentController();

studentRouter.get("/", (req, res) => controller.getManyStudents(req, res));
studentRouter.post("/", validateDTOMiddleware(CreateStudentDTO), (req, res) =>
  controller.createNewStudent(req, res),
);
studentRouter.get("/:id", (req, res) => controller.getStudentById(req, res));
studentRouter.put("/:id", validateDTOMiddleware(UpdateStudentDTO), (req, res) =>
  controller.updateStudents(req, res),
);
studentRouter.delete("/:id", (req, res) => controller.deleteStudents(req, res));

export default studentRouter;
