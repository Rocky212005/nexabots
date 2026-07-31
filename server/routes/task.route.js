
const express=require("express")
const taskrouter = express.Router();
const authMiddleware=require("../middlewares/auth.middleware")
const taskController=require( "../controllers/task.controller.js");


const router = express.Router();

taskrouter.use(authMiddleware); 

taskrouter.post("/", taskController.createTask);

taskrouter.get("/board/:boardId", taskController.getTasks);

taskrouter.get("/:id", taskController.getTask);

taskrouter.put("/:id", taskController.updateTask);

// taskrouter.delete("/:id", taskController.deleteTask);

module.exports= taskrouter;