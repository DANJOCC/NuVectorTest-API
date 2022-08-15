import { Router } from "express";
import { info, login } from "../controllers";
import verification from "../middlewares/verification";
import multer from 'multer';
const route: Router= Router();
const data= multer()
route.post('/login',data.none(),login)
route.get('/info', verification, info)

export default route