import { Router } from "express";
import { getActiveClientNames, getProjects, info, login, newProject, getProject, getClient, updateProject } from "../controllers";
import verification from "../middlewares/verification";
import multer from 'multer';


const route: Router= Router();

const data= multer()

route.post('/login',data.none(),login)
route.get('/info', verification, info)
route.post('/newProject',verification,data.none(), newProject)
route.get('/getClientsNames',verification ,getActiveClientNames)
route.get('/getProjects/:id',verification,getProjects)
route.get('/getProject/:id',verification,getProject)
route.get('/getClient/:id',verification,getClient)
route.put('/updateProject',verification,data.none(), updateProject)
export default route