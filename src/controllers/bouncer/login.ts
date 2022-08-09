import { Request, Response } from "express";
import { admin } from "../../models";

export async function login(req: Request, res:Response){
    const {email, password}=req.body

    if( !(typeof email !== 'undefined' && typeof password !== 'undefined')){
        res.status(400).send("fill all inputs")
        return
    }

    const administrator=await admin.findOne({email})

    if(administrator === null){
        res.status(400).send("admin cannot found")
        return
    }

    if(administrator?.password!==password){
        res.status(400).send('wrong password')
        return
    }

    res.status(200).send(administrator)
}