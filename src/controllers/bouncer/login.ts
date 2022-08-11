import { Request, Response } from "express";
import { admin,user, contractor } from "../../models";
import {sign} from '../../auth'

export async function login(req: Request, res:Response){
    const {email, password}=req.body

    if( !(typeof email !== 'undefined' && typeof password !== 'undefined')){
        res.status(400).send("fill all inputs")
        return
    }

    const person=await user.findOne({email})

    if(person === null){
        res.status(400).send("user cannot found")
        return
    }

    if(person?.password!==password){
        res.status(400).send('wrong password')
        return
    }

    const isAdmin = await admin.findById(person._id)

    if(isAdmin===null){
        const token= await sign({logged:true, admin: false})
        res.status(200).send({id:person._id, username: person.username, token})
        return
    }
    const token= await sign({logged:true, admin: true})
    res.status(200).send({id:person._id,username: person.username,token})
}

export async function info(req: Request, res:Response) {
    const {email}=req.body

    if( !(typeof email !== 'undefined')){
        res.status(400).send("fill all inputs")
        return
    }

    const person=await user.findOne({email})

    if(person === null){
        res.status(400).send("user cannot found")
        return
    }

    res.status(200).send({info:person})
}


