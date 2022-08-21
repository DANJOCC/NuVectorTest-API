import { model, Model, Schema } from "mongoose";
import {Project} from "../interfaces"

const projectSchema = new Schema<Project>({
    client_id:{type:Schema.Types.ObjectId,ref:'clients',required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    start:{type:Date, required:true},
    end:{type:Date, required:true},
    active:{type:Boolean, required:true},
    products_Id:[{
        type:Schema.Types.ObjectId,
        ref:"products"
    }],
    activities_Id:[{
        type:Schema.Types.ObjectId,
        ref:"activities"
    }]
});

export const project: Model<Project> = model('projects',projectSchema);