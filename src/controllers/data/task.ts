import { Request, Response } from "express";
import { contractor } from "../../models";
import { task } from "../../models/task.model";

function filterTaskBy(id:string,filter:string){
    const filterTask:{[key:string]:Function}={
           'project':async ()=>{
                return await task.find({project_id:id}).
                populate('client_id','name').
                populate('contractor_id', 'first_name last_name').
                populate('product_id','description').
                populate('activity_id','description').
                populate('category_id','description').exec()
           },
           'client':async ()=>{
                return await task.find({client_id:id}).
                populate('project_id','name').
                populate('contractor_id', 'first_name last_name').
                populate('product_id','description').
                populate('activity_id','description').
                populate('category_id','description').exec()
           },  
           'activity':async ()=>{
                return await task.find({activity_id:id}).
                populate('project_id','name').
                populate('client_id','name').
                populate('contractor_id', 'first_name last_name').
                populate('product_id','description').
                populate('activity_id','description').
                populate('category_id','description').exec()
           },
           'default':async ()=>{
                return await task.find().
                populate('project_id','name').
                populate('client_id','name').
                populate('contractor_id', 'first_name last_name').
                populate('product_id','description').
                populate('activity_id','description').
                populate('category_id','description').exec()
            }  
        }

    return filterTask[filter]()
}


export async function newTask(req:Request, res:Response) {
    const data=req.body

    try {

        const aContractor=await contractor.findById(data.id)

        if(aContractor===null){
            res.status(400).send({msg:'user cannot be found'});
            return
        }

        const newTask=await new task({
            description:data.description,
            date:new Date(data.date),
            duration:data.duration,
            billable:data.billable,
            contractor_id:aContractor.id,
            client_id:data.client,
            project_id:data.project,
            product_id:data.product,
            activity_id:data.activity,
            category_id:data.category
        })
        newTask.save()
        
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'there was a error, please try again later'})
        return
    }
    
    res.status(201).send({msg:'New task create'})
}

export async function getTasksFilter(req:Request, res:Response){
    const {id,filter}=req.params
    let tasks:Array<Object>=[]
    try {
        const tasks = await filterTaskBy(id,filter)
        if(tasks === null){
            res.status(404).send({msg:'tasks not found'});
            return
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'there was a error, please try again later'})
        return
    }

    res.status(200).send({tasks}) 
    
}