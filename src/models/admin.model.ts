import { model, Model, Schema } from "mongoose";
import {Admin} from "../interfaces"

const adminSchema = new Schema<Admin>({
    email:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    projects:[{
        type:Schema.Types.ObjectId,
        ref:"projects"
    }],
    active:{type:Boolean, required:true}
});

export const admin: Model<Admin> = model('Admin',adminSchema);