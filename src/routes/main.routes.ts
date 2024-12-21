import { Router } from "express";
import { getDepartments, getDepartmentByName } from "../controllers/main.controller";

const mainRouter = Router();

mainRouter.get("/", getDepartments);
// @ts-ignore
mainRouter.get("/:name", getDepartmentByName);

export default mainRouter;