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
exports.getTasksFilter = void 0;
const task_model_1 = require("../../models/task.model");
function filterTaskBy(name, filter) {
    const filterTask = {
        'project': () => __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.task.find({ project_name: name });
        }),
        'client': () => __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.task.find({ client_name: name });
        }),
        'activity': () => __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.task.find({ activity_name: name });
        }),
        'default': () => __awaiter(this, void 0, void 0, function* () {
            return yield task_model_1.task.find();
        })
    };
    return filterTask[filter]();
}
function getTasksFilter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, filter } = req.params;
        let tasks = [];
        try {
            const arrayTasks = yield filterTaskBy(name, filter);
            if (arrayTasks === null) {
                res.status(404).send({ msg: 'tasks not found' });
                return;
            }
            arrayTasks.map((value) => {
                tasks.push(value);
            });
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
