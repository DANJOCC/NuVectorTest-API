
import { model, Model, Schema } from "mongoose";
import {Contractor} from "../interfaces"

const contractorSchema = new Schema<Contractor>({
    firts_name:{type:String, required:true},
    last_name:{type:String, required:true},
    gender:{type:String, required:true},
    birthyear:{type:String, required:true},
    country:{type:String, required: true},
    active:{type:Boolean, required: true},
});

export const contractor: Model<Contractor> = model('contractors',contractorSchema);