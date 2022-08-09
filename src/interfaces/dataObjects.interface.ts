import DataObject from "./dataObject.interface";

export interface Activity extends DataObject{
    categories:Array<String>
   
}
export interface Category extends DataObject{
   
}

export interface Product extends DataObject{
}
    
