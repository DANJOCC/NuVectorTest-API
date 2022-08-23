import { Router } from "express";
import verification from "../middlewares/verification";
import multer from 'multer';
import {getProjects, newProject, getProject, updateProject } from "../controllers";

const project_route: Router= Router();

const data= multer()

project_route.get('/getProjects/:id',verification,getProjects)
project_route.get('/getProject/:id',verification,getProject)
project_route.post('/newProject',verification,data.none(), newProject)
project_route.put('/updateProject',verification,data.none(), updateProject)


export const project = project_route