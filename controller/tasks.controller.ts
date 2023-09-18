import { SortOrder } from "mongoose";
import Task from "../model/Task";
import { NextFunction, Request, Response } from "express";
import User from "../model/User";

/**
 * @route POST api/tasks
 * @description Create a task
 */
export const createTask = async (
  req: Request<
    object,
    object,
    {
      name: string;
      description: string;
      status: string;
      assignee?: string;
    },
    object,
    Record<string, any>
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const checkName = await Task.findOne({ name: req.body.name });
    if (checkName) {
      throw new Error(`Task "${req.body.name}" already exists`);
    } else {
      const data = {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        assignee: req.body.assignee,
        isDeleted: false,
      };
      const taskCreated = await Task.create(data);
      res.status(200).send({
        message: "Create Task Successfully!",
        data: { task: taskCreated },
      });
    }
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route GET api/tasks
 * @description Get tasks
 */
export const getTasks = async (
  req: Request<
    object,
    object,
    object,
    {
      page: number;
      limit: number;
      name: string;
      status: string;
      createAt: string;
      updateAt: string;
    },
    Record<string, any>
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { name, status, createAt, updateAt } = req.query;
    interface Query {
      name?: string;
      status?: string;
      createAt?: ["latest, oldest"];
      updateAt?: ["latest, oldest"];
      assignee?: string;
      isDeleted: boolean;
    }
    const query: Query = {
      isDeleted: false,
    };

    if (name) {
      query.name = name;
    }

    if (status) {
      query.status = status;
    }

    const sort: { [key: string]: SortOrder } = {};

    if (createAt) {
      if (createAt === "latest") {
        sort.createdAt = -1;
      } else {
        sort.createdAt = 1;
      }
    }

    if (updateAt) {
      if (updateAt === "latest") {
        sort.updatedAt = -1;
      } else {
        sort.updatedAt = 1;
      }
    }

    let getTasks = await Task.find(query)
      .populate({
        path: "assignee",
        model: "User",
      })
      .sort(sort);
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
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route GET api/tasks/:id
 * @description Get task by id
 */
export const getTaskById = async (
  req: Request<{ id: string }, object, object, object, Record<string, any>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, isDeleted: false }).populate({
      path: "assignee",
      model: "User",
    });
    if (task) {
      res.status(200).send({
        message: "Get task successfully!",
        data: { task: task },
      });
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @route PUT api/tasks/:id
 * @description Update task
 */
export const updateTask = async (
  req: Request<
    { id: string },
    object,
    {
      name: string;
      description: string;
      status: string;
      assignee: string;
    },
    object,
    Record<string, any>
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const checkTask = await Task.findOne({ _id: id, isDeleted: false });
    if (!checkTask) {
      throw new Error("Task not found");
    }
    if (data.assignee) {
      const checkUser = await User.findById(data.assignee);
      if (!checkUser) {
        throw new Error("Can't find user with assignee");
      }
    }

    let taskUpdate;
    if (checkTask.status !== "archive") {
      if (checkTask.status !== "done") {
        taskUpdate = await Task.findByIdAndUpdate(id, data, {
          new: true,
        }).populate({ path: "assignee", model: "User" });
      } else {
        if (data.status === "archive") {
          taskUpdate = await Task.findByIdAndUpdate(id, data, {
            new: true,
          }).populate({ path: "assignee", model: "User" });
        } else {
          throw new Error("This task can only change its status to archive");
        }
      }
      res.status(200).send({
        message: "Task updated successfully",
        data: { task: taskUpdate },
      });
    } else {
      throw new Error("Can't change status of task");
    }
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route DELETE api/tasks/:id
 * @description Delete task
 */
export const deleteTask = async (
  req: Request<{ id: string }, object, object, object, Record<string, any>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const taskDelete = await Task.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );

    if (taskDelete) {
      res.status(200).send({
        message: `Task ${taskDelete.name} deleted successfully`,
      });
    } else {
      throw new Error("Task not found");
    }
  } catch (err: any) {
    next(err);
  }
};

export const unassignTask = async (
  req: Request<{ id: string }, object, object, object, Record<string, any>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const taskUnassigned = await Task.findOne({
      _id: id,
      isDeleted: false,
    });
    if (taskUnassigned) {
      taskUnassigned.set("assignee", undefined, { strict: false });
      taskUnassigned.save();
      res.status(200).send({
        message: `Task ${taskUnassigned.name} unassigned`,
        data: { task: taskUnassigned },
      });
    } else {
      throw new Error("Task not found");
    }
  } catch (error) {
    next(error);
  }
};
