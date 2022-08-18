import { Request, Response } from "express";
import { client } from "../../models";

export async function getActiveClientNames(req:Request,res:Response) {
    const client_Names:Array<Object>=[]
    try {
        const clients= await client.find({active:true});
        clients.map((value)=>{
            client_Names.push({id:value._id,name:value.name})
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'there was a error, please try again later'})
        return
    }
    
    res.status(200).send({names:client_Names})
}