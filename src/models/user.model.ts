import { model, Model, Schema } from "mongoose";
import {User} from "../interfaces"

const userSchema = new Schema<User>({
    email:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
});

export const user: Model<User> = model('users',userSchema);