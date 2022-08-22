"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProject = exports.updateProject = exports.getProject = exports.getProjects = exports.newProject = void 0;
const models_1 = require("../../models");
function newProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const userAdmin = yield models_1.admin.findById(data.id);
        if (userAdmin === null) {
            res.status(400).send({ msg: 'user cannot be found' });
            return;
        }
        const newProject = new models_1.project({
            client_id: data.client_id,
            name: data.name,
            description: data.description,
            start: new Date(data.start),
            end: new Date(data.end),
            active: true,
            products_Id: [],
            activities_Id: []
        });
        userAdmin.projects.push(newProject.id);
        yield newProject.save();
        yield userAdmin.save();
        res.status(201).send({ msg: 'New project create' });
    });
}
exports.newProject = newProject;
function getProjects(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const projects = [];
        try {
            const userAdmin = yield models_1.admin.findById(id).populate('projects');
            if (userAdmin === null) {
                const userContractor = yield models_1.contractor.findById(id);
                if (userContractor !== null) {
                    const ArrayProjects = yield models_1.project.find({ active: true });
                    ArrayProjects.map((value) => {
                        projects.push(value);
                    });
                    return res.status(200).send({ projects });
                }
                res.status(404).send({ msg: 'user not found' });
                return;
            }
            userAdmin.projects.map((value) => { projects.push(value); });
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'there was a error, please try again later' });
            return;
        }
        res.status(200).send({ projects });
    });
}
exports.getProjects = getProjects;
function getProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        let theProject;
        try {
            const aProject = yield models_1.project.findById(id).populate('client_id').populate('products_Id').populate('activities_Id').exec();
            if (aProject === null) {
                res.status(404).send({ msg: 'project not found' });
                return;
            }
            console.log(aProject.client_id);
            theProject = aProject;
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'there was a error, please try again later' });
            return;
        }
        res.status(200).send({ project: theProject,
            client: theProject.client_id,
            products: theProject.products_Id,
            activities: theProject.activities_Id });
    });
}
exports.getProject = getProject;
function updateProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        console.log(req.body.active);
        let theNewProject;
        try {
            const aProject = yield models_1.project.findById(id);
            if (aProject === null) {
                res.status(404).send({ msg: 'project not found' });
                return;
            }
            aProject.name = req.body.name;
            aProject.description = req.body.description;
            aProject.start = req.body.start;
            aProject.end = req.body.end;
            aProject.active = req.body.active;
            theNewProject = aProject;
            aProject.save();
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'there was a error, please try again later' });
            return;
        }
        res.status(200).send({ newProject: theNewProject });
    });
}
exports.updateProject = updateProject;
function DeleteProject(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        let theNewProject;
        try {
            const aProject = yield models_1.project.findByIdAndDelete(id);
            if (aProject === null) {
                res.status(404).send({ msg: 'project not found' });
                return;
            }
            theNewProject = aProject;
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'there was a error, please try again later' });
            return;
        }
        res.status(200).send({ name: theNewProject.name });
    });
}
exports.DeleteProject = DeleteProject;
