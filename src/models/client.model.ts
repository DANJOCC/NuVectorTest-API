import { model, Model, Schema } from "mongoose";
import {Client} from "../interfaces"

const clientsSchema = new Schema<Client>({
    client:{type:String, required:true},
    name:{type:String, required:true},
    city:{type:String, required:true},
    state:{type:String, required:true},
    country:{type:String, required:true},
    industry:{type:String, required: true},
    active:{type:Boolean, required: true},
    projects_id:[{type:Schema.Types.ObjectId, ref:'projects'}]
});
 
export const client: Model<Client> = model('clients',clientsSchema);