import { Request, Router } from "express";
import { verify } from "../auth";

const verification= Router();

verification.use(async (req, res, next)=>{
    let token= req.headers['authorization']

    if(typeof token === 'undefined'){
        res.status(400).send({
            error:'authorization token is needed'
        })
        return
    }

    if(!token.startsWith('Bearer ')){
        res.status(400).send({
            error:'Bad authorization header'
        })
        return
    }

    token=token.split(' ')[1]
    const pass=await verify(token)

    if(!pass){
        res.status(400).send({
            error:'Permission Denied'
        })
        return
    }

    next()
})

export default verification