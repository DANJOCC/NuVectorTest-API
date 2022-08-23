import { Request, Response } from "express";
import { contractor } from "../../models";
import { task } from "../../models/task.model";

function filterTaskBy(name:string,filter:string){
    const filterTask:{[key:string]:Function}={
           'project':async ()=>{
                return await task.find({project_name:name})
           },
           'client':async ()=>{
                return await task.find({client_name:name})
           },  
           'activity':async ()=>{
                return await task.find({activity_name:name})
           },
           'default':async ()=>{
                return await task.find()
            }  
        }
    
    return filterTask[filter]()
}


export async function getTasksFilter(req:Request, res:Response){
    const {name,filter}=req.params
    let tasks:Array<Object>=[]
    try {
        const arrayTasks = await filterTaskBy(name,filter)
        
        if(arrayTasks === null){
            res.status(404).send({msg:'tasks not found'});
            return
        }
        
        arrayTasks.map((value:Object)=>{
            tasks.push(value)
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'there was a error, please try again later'})
        return
    }

    res.status(200).send({tasks}) 
    
}