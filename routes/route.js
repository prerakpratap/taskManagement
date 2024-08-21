const express = require("express");
const router = express.Router();

const userController = require("../controllers/users");
const TaskController = require("../controllers/task");
const common = require("../common/verifyToken");

router.post("/api/login", userController.login);
router.post("/api/signup", userController.signup);
router.get("/api/getTask", common.verifyToken, TaskController.getTaskData);
router.post("/api/addTask", common.verifyToken, TaskController.addTask);
router.put(
  "/api/updateTask/:task_id",
  common.verifyToken,
  TaskController.updateTask
);
router.delete(
  "/api/deleteTask/:task_id",
  common.verifyToken,
  TaskController.deleteTask
);

module.exports = router;
