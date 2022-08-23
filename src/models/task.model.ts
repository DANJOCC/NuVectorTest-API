import { model, Model, Schema } from "mongoose";
import {Task} from "../interfaces"

const stackSchema = new Schema<Task>({
    
    description:{type:String, required:true},
    date:{type:Date, required:true},
    duration:{type:Number, required:true},
    billable:{type:Boolean, required:true},
    contractor_name:{type:String,},
    client_name:{type:String,},
    project_name:{type:String,},
    product_name:{type:String,},
    activity_name:{type:String,},
    category_name:{type:String,}

    
});

export const task: Model<Task> = model('tasks',stackSchema);