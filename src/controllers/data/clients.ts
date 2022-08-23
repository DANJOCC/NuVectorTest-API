import { Request, Response } from "express";
import { Client } from "../../interfaces";
import { client} from "../../models";


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

export async function getClient(req:Request,res:Response) {
    const id=req.params.id
    let theClient:Client
    try {
        const aClient= await client.findById(id);
       if(aClient===null){
        res.status(404).send({msg:'client not found'})
        return
       }
       theClient=aClient
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'there was a error, please try again later'})
        return
    }
    
    res.status(200).send({client_Name:theClient.name})
}