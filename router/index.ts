import express from "express";
const router = express.Router();
import users from "../router/user.api";
import tasks from "../router/task.api";

router.use("/users", users);

router.use("/tasks", tasks);

export default router;
