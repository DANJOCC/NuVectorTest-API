export interface Project{
    client_id:String | Object,
    name:String,
    description:String,
    start:Date,
    end:Date,
    active:boolean
    products_Id:Array<String>
    activities_Id:Array<String>
}