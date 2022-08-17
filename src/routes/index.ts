import { Router } from "express";
import { info, login } from "../controllers";
import verification from "../middlewares/verification";
import multer from 'multer';
import { newProject } from "../controllers/data/projects";

const route: Router= Router();

const data= multer()

route.post('/login',data.none(),login)
route.get('/info', verification, info)
route.post('/newProject',verification,data.none(), newProject)

export default route