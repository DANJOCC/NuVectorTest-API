import { model, Model, Schema } from "mongoose";
import {Admin} from "../interfaces"

const adminSchema = new Schema<Admin>({
    email:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
});

export const admin: Model<Admin> = model('admins',adminSchema);