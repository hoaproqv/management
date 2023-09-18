"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllTasksOfUser = exports.getUsers = exports.createUser = void 0;
const Task_1 = __importDefault(require("../model/Task"));
const User_1 = __importDefault(require("../model/User"));
/**
 * @route POST api/users
 * @description Create a user
 */
const createUser = async (req, res, next) => {
    try {
        const checkName = await User_1.default.findOne({ name: req.body.name });
        if (checkName) {
            throw new Error(`User "${req.body.name}" already exists`);
        }
        else {
            const data = {
                name: req.body.name,
                role: "employee",
                isDeleted: false,
            };
            const newData = await User_1.default.create(data);
            delete newData.isDeleted;
            res.status(200).send({
                message: "Create User Successfully!",
                data: { user: newData },
            });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.createUser = createUser;
/**
 * @route GET api/users
 * @description Get a list of users
 * @allowedQueries: name
 */
const getUsers = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const query = {
            isDeleted: false,
        };
        if (req.query.name) {
            query.name = req.query.name;
        }
        if (req.query.role) {
            query.role = req.query.role;
        }
        let getUsers = await User_1.default.find(query);
        const total = Math.ceil(getUsers.length / limit);
        if (total > limit) {
            const startPoint = (page - 1) * limit;
            const endPoint = startPoint + limit;
            const newData = getUsers.slice(startPoint, endPoint);
            getUsers = newData;
        }
        res.status(200).send({
            message: "Get users successfully!",
            data: { users: getUsers, page: page, total: total },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUsers = getUsers;
/**
 * @route GET api/users/:id/task
 * @description Get all tasks of a user
 */
const getAllTasksOfUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User_1.default.findOne({ _id: id, isDeleted: false });
        if (user) {
            const tasksOfUser = await Task_1.default.find({ assignee: id }).populate({
                path: "assignee",
                model: "User",
            });
            if (tasksOfUser) {
                res.status(200).send({
                    message: `Get tasks of ${user.name} success`,
                    data: { task: tasksOfUser },
                });
            }
        }
        else {
            throw new Error("Not found user");
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getAllTasksOfUser = getAllTasksOfUser;
/**
 * @route PUT api/users/:id
 * @description Update user by id
 */
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const checkNameUser = await User_1.default.findOne({ _id: id, isDeleted: false });
        if (!checkNameUser) {
            throw new Error(`User ${data.name} already exists`);
        }
        const userUpdate = await User_1.default.findOneAndUpdate({
            _id: id,
            isDeleted: false,
        }, data, { new: true });
        if (userUpdate) {
            res.status(200).send({
                message: "Update user successfully!",
                data: {
                    user: userUpdate,
                },
            });
        }
        else {
            throw new Error("Not found user");
        }
    }
    catch (err) {
        next(err);
    }
};
exports.updateUser = updateUser;
/**
 * @route DELETE api/users/:id
 * @description Delete user by id
 */
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDelete = await User_1.default.findOneAndUpdate({
            _id: id,
            isDeleted: false,
        }, { isDeleted: true }, { new: true });
        if (userDelete) {
            delete userDelete.isDeleted;
            res.status(200).send({
                message: `User ${userDelete.name} deleted successfully`,
            });
        }
        else {
            throw new Error("Not found user or deleted");
        }
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map