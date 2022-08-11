import { Router } from "express";
import { info, login } from "../controllers";
import verification from "../middlewares/verification";

const route: Router= Router();

route.post('/login',login)
route.get('/info', verification, info)

export default route