import { model, Model, Schema } from "mongoose";
import {Task} from "../interfaces"

const stackSchema = new Schema<Task>({
    
    description:{type:String, required:true},
    date:{type:Date, required:true},
    duration:{type:Number, required:true},
    billable:{type:Boolean, required:true},
    contractor_id:{type:Schema.Types.ObjectId,ref:'clients',required:true},
    client_id:{type:Schema.Types.ObjectId,ref:'clients',required:true},
    project_id:{type:Schema.Types.ObjectId,ref:'projects',required:true},
    product_id:{type:Schema.Types.ObjectId,ref:'products',required:true},
    activity_id:{type:Schema.Types.ObjectId,ref:'projects',required:true},
    category_id:{type:Schema.Types.ObjectId,ref:'projects',required:true}

    
});

export const task: Model<Task> = model('projects',stackSchema);