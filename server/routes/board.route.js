const express=require("express")
const router = express.Router();
const boardController=require("../controllers/board.controller")
const authMiddleware=require("../middlewares/auth.middleware")

router.post("/",authMiddleware,boardController.createBoard);

router.get("/", authMiddleware,boardController.getBoards);

router.get("/:id", authMiddleware,boardController.getBoard);

router.put("/:id",authMiddleware,boardController.updateBoard);

router.delete("/:id", authMiddleware,boardController.deleteBoard);

module.exports=router