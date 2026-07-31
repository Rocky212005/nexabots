const Task = require("../models/task.model");

 const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user,
    });
    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");
    const io = req.app.get("io");
    io.to(task.board.toString()).emit("task-created", populatedTask);

    res.status(201).json({
      success: true,
      task,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

 const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      board: req.params.boardId,
    })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");

    res.json(tasks);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({
      message: err.message,
      
    });
  }
};

 const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");

    if (!task)
      return res.status(404).json({
        message: "Task not found",
      });

    res.json(task);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};



 const updateTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const io = req.app.get("io");

    io.to(task.board.toString()).emit(
      "task-updated",
      task
    );

    res.json(task);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports={createTask,getTasks,getTask,updateTask}