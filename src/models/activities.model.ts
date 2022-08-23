import { model, Model, Schema } from "mongoose";
import { Activity } from "../interfaces"

const activitySchema = new Schema<Activity>({
    name:{type:String, required:true},
    description:{type:String, required:true},
    active:{type:Boolean, required:true},
    categories:[{type:String}]
});

export const activity: Model<Activity> = model('activities',activitySchema);