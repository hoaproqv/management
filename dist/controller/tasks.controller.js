"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../model/Task"));
/**
 * @route POST api/tasks
 * @description Create a task
 */
const createTask = async (req, res, next) => {
    try {
        const checkName = await Task_1.default.findOne({ name: req.body.name });
        if (checkName) {
            throw new Error(`Task "${req.body.name}" already exists`);
        }
        else {
            const data = {
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                assignee: req.body.assignee,
                isDeleted: false,
            };
            await Task_1.default.create(data);
            res.status(200).send({
                message: "Create Task Successfully!",
                data: { task: data },
            });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.createTask = createTask;
/**
 * @route GET api/tasks
 * @description Get tasks
 */
const getTasks = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const { name, status, createAt, updateAt } = req.query;
        const query = {
            isDeleted: false,
        };
        if (name) {
            query.name = name;
        }
        if (status) {
            query.status = status;
        }
        const sort = {};
        if (createAt) {
            if (createAt === "latest") {
                sort.createdAt = -1;
            }
            else {
                sort.createdAt = 1;
            }
        }
        if (updateAt) {
            if (updateAt === "latest") {
                sort.updatedAt = -1;
            }
            else {
                sort.updatedAt = 1;
            }
        }
        let getTasks = await Task_1.default.find(query).sort(sort);
        const total = Math.ceil(getTasks.length / limit);
        if (total > limit) {
            const startPoint = (page - 1) * limit;
            const endPoint = startPoint + limit;
            const newData = getTasks.slice(startPoint, endPoint);
            getTasks = newData;
        }
        res.status(200).send({
            message: "Get Tasks Successfully!",
            data: { tasks: getTasks, page: page, total: total },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getTasks = getTasks;
/**
 * @route GET api/tasks/:id
 * @description Get task by id
 */
const getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task_1.default.findById(id);
        if (task) {
            res.status(200).send({
                message: "Get task successfully!",
                data: { task: task },
            });
        }
        else {
            throw new Error("Task not found");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getTaskById = getTaskById;
/**
 * @route PUT api/tasks/:id
 * @description Update task
 */
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const checkTask = await Task_1.default.findById(id);
        if (checkTask) {
            let taskUpdate;
            if (checkTask.status === "done" || "archive") {
                if (data.status === "archive") {
                    taskUpdate = await Task_1.default.findByIdAndUpdate(id, data, { new: true });
                }
                else {
                    throw new Error("You only change status of task from done to archive if status is done");
                }
            }
            else {
                taskUpdate = await Task_1.default.findByIdAndUpdate(id, data, { new: true });
            }
            res.status(200).send({
                message: "Task updated successfully",
                data: { task: taskUpdate },
            });
        }
        else {
            throw new Error("Task not found");
        }
    }
    catch (err) {
        next(err);
    }
};
exports.updateTask = updateTask;
/**
 * @route DELETE api/tasks/:id
 * @description Delete task
 */
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const taskDelete = await Task_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (taskDelete) {
            res.status(200).send({
                message: "Delete Task Successfully!",
                data: { task: taskDelete },
            });
        }
        else {
            throw new Error("Task not found");
        }
    }
    catch (err) {
        next(err);
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=tasks.controller.js.map