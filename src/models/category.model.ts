import { model, Model, Schema } from "mongoose";
import { Category } from "../interfaces"

const categorySchema = new Schema<Category>({
    name:{type:String, required:true},
    description:{type:String, required:true},
    active:{type:Boolean, required:true},
});

export const category: Model<Category> = model('categories',categorySchema);