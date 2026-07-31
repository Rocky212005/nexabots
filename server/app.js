const  express = require("express");
const authRoutes=require("./routes/auth.route")
const boardRoutes=require("./routes/board.route")
const taskRoutes=require("./routes/task.route")
// import cors from "cors";
const cors =require("cors")
// import cookieParser from "cookie-parser";
const cookieParser =require("cookie-parser")

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());


//auth routes

app.use("/api/auth",authRoutes);
app.use("/api/board",boardRoutes);
app.use("/api/task",taskRoutes)



app.get("/", (req, res) => {
  res.json({
    message: "API Running Successfully 🚀",
  });
});

module.exports= app