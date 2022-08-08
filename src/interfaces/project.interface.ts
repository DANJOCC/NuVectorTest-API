export default interface Project{
    client_Code:String,
    name:String,
    description:String,
    active:boolean
    products_Id:Array<String>
    activities_Id:Array<String>
}