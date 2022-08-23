import { Router } from "express";
import {getTasksFilter} from "../controllers";
import verification from "../middlewares/verification";


const task_route: Router= Router();

task_route.get('/tasks/:name/:filter',verification,getTasksFilter)

export const task = task_route