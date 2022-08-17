import { model, Model, Schema } from "mongoose";
import {Project} from "../interfaces"

const projectSchema = new Schema<Project>({
    client_Code:{type:String, required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    start:{type:Date, required:true},
    end:{type:Date, required:true},
    active:{type:Boolean, required:true},
    products_Id:{type:[String]},
    activities_Id:{type:[String]}
});

export const project: Model<Project> = model('projects',projectSchema);