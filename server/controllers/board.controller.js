const Board = require("../models/board.model");

 const createBoard = async (req, res) => {
  try {
    const { title, description } = req.body;

    const board = await Board.create({
      title,
      description,
      owner: req.user,
      members: [req.user],
    });

    res.status(201).json({
      success: true,
      board,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all boards of logged-in user
 const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      members: req.user,
    }).populate("owner", "name email");

    res.json({
      success: true,
      boards,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get one board
 const getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate("owner", "name email")
      .populate("members", "name email");

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update board
 const updateBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.json(board);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete board
 const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    res.json({
      message: "Board deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports={createBoard,getBoard,getBoards,updateBoard,deleteBoard}