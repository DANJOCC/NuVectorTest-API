import { Request, Response } from "express";
import { Project } from "../../interfaces";
import { admin, project, activity, product, contractor } from "../../models";


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
            const userContractor= await contractor.findById(id)
            if(userContractor!==null){
                const ArrayProjects=await project.find({active:true})
                ArrayProjects.map((value)=>{
                    projects.push(value)
                })
              return  res.status(200).send({projects})
            }
                
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
        const aProject= await project.findById(id).populate('client_id').populate('products_Id').populate('activities_Id').exec()

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

    res.status(200).send({project:theProject,
         client:theProject.client_id, 
         products:theProject.products_Id, 
         activities:theProject.activities_Id}) 
}

export async function updateProject(req:Request, res:Response) {
    const {id}=req.body
    let theNewProject
     try {
           const aProject=await project.findById(id)
        if(aProject === null){
            res.status(404).send({msg:'project not found'});
            return
        }
        aProject.name=req.body.name
        aProject.description=req.body.description
        aProject.start=req.body.start
        aProject.end=req.body.end
        aProject.active=req.body.active
        theNewProject=aProject
        aProject.save()

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