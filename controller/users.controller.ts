import Task from "../model/Task";
import User from "../model/User";
import { NextFunction, Request, Response } from "express";

/**
 * @route POST api/users
 * @description Create a user
 */
export const createUser = async (
  req: Request<
    object,
    object,
    {
      name: string;
    },
    object,
    Record<string, any>
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const checkName = await User.findOne({ name: req.body.name });
    if (checkName) {
      throw new Error(`User "${req.body.name}" already exists`);
    } else {
      const data = {
        name: req.body.name,
        role: "employee",
        isDeleted: false,
      };
      const newData = await User.create(data);
      delete newData.isDeleted;
      res.status(200).send({
        message: "Create User Successfully!",
        data: { user: newData },
      });
    }
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route GET api/users
 * @description Get a list of users
 * @allowedQueries: name
 */
export const getUsers = async (
  req: Request<
    object,
    object,
    object,
    {
      page: number;
      limit: number;
      name: string;
      role: string;
    },
    Record<string, any>
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    interface Query {
      name?: string;
      role?: string;
      isDeleted: boolean;
    }
    const query: Query = {
      isDeleted: false,
    };

    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.role) {
      query.role = req.query.role;
    }
    let getUsers = await User.find(query);
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
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route GET api/users/:id/task
 * @description Get all tasks of a user
 */

export const getAllTasksOfUser = async (
  req: Request<{ id: string }, object, object, Record<string, any>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      const tasksOfUser = await Task.find({ assignee: id });
      if (tasksOfUser) {
        res.status(200).send({
          message: `Get tasks of ${user.name}`,
          data: { task: tasksOfUser },
        });
      }
    } else {
      throw new Error("Not found user");
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @route PUT api/users/:id
 * @description Update user by id
 */
export const updateUser = async (
  req: Request<
    { id: string },
    object,
    {
      name: string;
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
    const userUpdate = await User.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      data,
      { new: true },
    );
    if (userUpdate) {
      res.status(200).send({
        message: "Update user successfully!",
        data: {
          user: userUpdate,
        },
      });
    } else {
      throw new Error("Not found user or deleted");
    }
  } catch (err: any) {
    next(err);
  }
};

/**
 * @route DELETE api/users/:id
 * @description Delete user by id
 */
export const deleteUser = async (
  req: Request<{ id: string }, object, object, object, Record<string, any>>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const userDelete = await User.findOneAndUpdate(
      {
        _id: id,
        isDeleted: false,
      },
      { isDeleted: true },
      { new: true },
    );

    if (userDelete) {
      delete userDelete.isDeleted;
      res.status(200).send({
        message: "Delete user successfully!",
        data: {
          user: userDelete,
        },
      });
    } else {
      throw new Error("Not found user or deleted");
    }
  } catch (err: any) {
    next(err);
  }
};
