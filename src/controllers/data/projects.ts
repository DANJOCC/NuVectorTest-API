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
        client_id:data.client_id,
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

export async function getProjects(req:Request, res: Response) {
    const id=req.params.id;
    console.log(id)
    const projects:Array<Object>=[]
    try {
        const userAdmin= await admin.findById(id).populate('projects');
        if(userAdmin === null){
            res.status(400).send({msg:'user cannot be found'});
            return
        }

        userAdmin.projects.map((value)=>{projects.push(value)})
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'there was a error, please try again later'})
        return
    }

    res.status(200).send({projects}) 
    
}