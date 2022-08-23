import { Request, Response } from "express";
import { admin,user, contractor } from "../../models";
import {sign} from '../../auth'
import bcrypt from 'bcrypt'
export async function login(req: Request, res:Response){
    const {email, password}=req.body
   
    if( !(typeof email !== 'undefined' && typeof password !== 'undefined')){
        res.status(400).send("fill all inputs")
        return
    }

    const person=await user.findOne({email})

    if(person === null){
        res.status(404).send({msg:"user not found"})
        return
    }
    if(!bcrypt.compareSync(password,person.password)){
        res.status(404).send({msg:'wrong password'})
        return
    }

    const isAdmin = await admin.findById(person._id)

    if(isAdmin===null){
        const token= await sign({id:person._id, logged:true, username: person.username,role:'CONTRACTOR'})
        res.status(200).send({token})
        return
    }
    const token= await sign({id:person._id,logged:true,username: person.username, role: 'ADMIN'})
    res.status(200).send({token})
}

export async function info(req: Request, res:Response) {
    const {email}=req.body

    if( !(typeof email !== 'undefined')){
        res.status(401).send("fill all inputs")
        return
    }

    const person=await user.findOne({email})

    if(person === null){
        res.status(400).send("user not found")
        return
    }

    res.status(200).send({info:person})
}


