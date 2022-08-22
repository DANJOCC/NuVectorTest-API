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
exports.getTasksFilter = exports.newTask = void 0;
const models_1 = require("../../models");
const task_model_1 = require("../../models/task.model");
function filterTaskBy(id, filter) {
    const filterTask = {
        'project': () => __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.task.find({ project_id: id }).
                populate('client_id', 'name').
                populate('contractor_id', 'first_name last_name').
                populate('product_id', 'description').
                populate('activity_id', 'description').
                populate('category_id', 'description').exec();
        }),
        'client': () => __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.task.find({ client_id: id }).
                populate('project_id', 'name').
                populate('contractor_id', 'first_name last_name').
                populate('product_id', 'description').
                populate('activity_id', 'description').
                populate('category_id', 'description').exec();
        }),
        'activity': () => __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.task.find({ activity_id: id }).
                populate('project_id', 'name').
                populate('client_id', 'name').
                populate('contractor_id', 'first_name last_name').
                populate('product_id', 'description').
                populate('activity_id', 'description').
                populate('category_id', 'description').exec();
        }),
        'default': () => __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.task.find().
                populate('project_id', 'name').
                populate('client_id', 'name').
                populate('contractor_id', 'first_name last_name').
                populate('product_id', 'description').
                populate('activity_id', 'description').
                populate('category_id', 'description').exec();
        })
    };
    return filterTask[filter]();
}
function newTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            const aContractor = yield models_1.contractor.findById(data.id);
            if (aContractor === null) {
                res.status(400).send({ msg: 'user cannot be found' });
                return;
            }
            const newTask = yield new task_model_1.task({
                description: data.description,
                date: new Date(data.date),
                duration: data.duration,
                billable: data.billable,
                contractor_id: aContractor.id,
                client_id: data.client,
                project_id: data.project,
                product_id: data.product,
                activity_id: data.activity,
                category_id: data.category
            });
            newTask.save();
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'there was a error, please try again later' });
            return;
        }
        res.status(201).send({ msg: 'New task create' });
    });
}
exports.newTask = newTask;
function getTasksFilter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, filter } = req.params;
        let tasks = [];
        try {
            const tasks = yield filterTaskBy(id, filter);
            if (tasks === null) {
                res.status(404).send({ msg: 'tasks not found' });
                return;
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'there was a error, please try again later' });
            return;
        }
        res.status(200).send({ tasks });
    });
}
exports.getTasksFilter = getTasksFilter;
