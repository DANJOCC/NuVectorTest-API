
export interface Task{
    description:string
    date:Date,
    duration:Number,
    billable:Boolean,
    contractor_id:String | Object,
    project_id:string | Object,
    client_id:string | Object,
    product_id:string | Object,
    activity_id:string | Object,
    category_id:string | Object,
}