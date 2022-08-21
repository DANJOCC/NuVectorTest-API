import { model, Model, Schema } from "mongoose";
import { Product } from "../interfaces"

const productSchema = new Schema<Product>({
    name:{type:String, required:true},
    description:{type:String, required:true},
    active:{type:Boolean, required:true},
});

export const product: Model<Product> = model('products',productSchema);