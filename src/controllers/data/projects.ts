import { Request, Response } from "express";
import { Project } from "../../interfaces";
import { admin, project } from "../../models";

function update(id:string,prop:string, data:any){
    const opt={new:true}
    const updateProp:{[key:string]:Function}={
        'name':async ()=>{
            return await project.findByIdAndUpdate(id,{name:data},opt)
        },
        'description':async ()=>{
            return await project.findByIdAndUpdate(id,{description:data},opt)
        },
        'start':async ()=>{
            return await project.findByIdAndUpdate(id,{start:new Date(data)},opt)
        },
        'end':async ()=>{
            return await project.findByIdAndUpdate(id,{end:new Date(data)},opt)
        },
        'active':async ()=>{
            return await project.findByIdAndUpdate(id,{active:data},opt)
        },
        'products':async ()=>{
            return await project.findByIdAndUpdate(id,{products_Id:data},opt)
        },
        'activities':async ()=>{
            return await project.findByIdAndUpdate(id,{products_Id:data},opt)
        }
    }

   return updateProp[prop]()
}


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
    const projects:Array<Object>=[]
    try {
        const userAdmin= await admin.findById(id).populate('projects');
        if(userAdmin === null){
            res.status(404).send({msg:'user not found'});
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

export async function getProject(req:Request, res: Response) {
    const id=req.params.id;
    let theProject:Project
    try {
        const aProject= await project.findById(id).populate('client_id')

        if(aProject === null){
            res.status(404).send({msg:'project not found'});
            return
        }
        console.log(aProject.client_id)
        theProject=aProject
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'there was a error, please try again later'})
        return
    }

    res.status(200).send({project:theProject, client:theProject.client_id}) 
    
}

export async function updateProject(req:Request, res:Response) {
    const {id,prop,data}=req.body
    let theNewProject
     try {
           const aProject=await update(id,prop,data)

        if(aProject === null){
            res.status(404).send({msg:'project not found'});
            return
        }
        theNewProject=aProject

    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'there was a error, please try again later'})
        return
    }

    res.status(200).send({newProject:theNewProject}) 
}

export async function DeleteProject(req:Request, res:Response) {
    const {id}=req.body
    let theNewProject
     try {
           const aProject=await project.findByIdAndDelete(id)

        if(aProject === null){
            res.status(404).send({msg:'project not found'});
            return
        }
        theNewProject=aProject

    } catch (error) {
        console.log(error)
        res.status(400).send({msg:'there was a error, please try again later'})
        return
    }

    res.status(200).send({name:theNewProject.name}) 
}