import { Request, Response } from "express";
import { admin, project } from "../../models";

export async function newProject(req:Request, res: Response) {
    const data=req.body;
    const userAdmin= await admin.findById(data.id);

    if(userAdmin === null){
        res.status(400).send({msg:'user cannot be found'});
        return
    }
    const newProject= new project({
        client_Code:'data.client_Code',
        name:data.name,
        description:data.description,
        start:new Date(data.start),
        end:new Date(data.end),
        active:true,
        products_Id:[],
        activities_Id:[]
    })

    userAdmin.projects.push(newProject.id)

    await newProject.save()
    await userAdmin.save()

    res.status(201).send({msg:'New project create'})
}