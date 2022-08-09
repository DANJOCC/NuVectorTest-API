import { Router } from "express";
import { login } from "../controllers";

const route: Router= Router();

route.post('/login', login)

export default route