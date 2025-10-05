import { Router } from "express";
import { StudentController } from "./StudentController";

const studentRouter = Router();
const controller = new StudentController();

studentRouter.get("/", (req, res) => controller.getManyStudents(req, res));
studentRouter.post("/", (req, res) => controller.createNewStudent(req, res));
studentRouter.get("/:id", (req, res) => controller.getStudentById(req, res));
studentRouter.put("/:id", (req, res) => controller.updateStudents(req, res));
studentRouter.delete("/:id", (req, res) => controller.deleteStudents(req, res));

export default studentRouter;
