import { Router } from "express";
import { getActiveClientNames, getClient} from "../controllers";
import verification from "../middlewares/verification";



const client_route: Router= Router();


client_route.get('/getClient/:id',verification,getClient)

client_route.get('/getClientsNames',verification ,getActiveClientNames)

export const client=client_route