
export interface Task{
    description:string
    date:Date,
    duration:Number,
    billable:Boolean,
    contractor_name:String | Object,
    project_name:string | Object,
    client_name:string | Object,
    product_name:string | Object,
    activity_name:string | Object,
    category_name:string | Object,
}