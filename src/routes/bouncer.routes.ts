import { Router } from "express";
import { info, login } from "../controllers";
import verification from "../middlewares/verification";
import multer from 'multer';


const user_route: Router= Router();

const data= multer()

user_route.post('/login',data.none(),login)
user_route.get('/info', verification, info)

export const bouncer=user_route