import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import socket from "../socket";

const BoardDetails = () => {
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [board, setBoard] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getBoard();
    getTasks();

    // Join Socket Room
    socket.emit("join-board", id);

    // New Task
    socket.on("task-created", (task) => {
      setTasks((prev) => [...prev, task]);
    });

    // Updated Task
    socket.on("task-updated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    });

    // Deleted Task
    socket.on("task-deleted", (taskId) => {
      setTasks((prev) =>
        prev.filter((task) => task._id !== taskId)
      );
    });

    return () => {
      socket.off("task-created");
      socket.off("task-updated");
      socket.off("task-deleted");
    };
  }, [id]);

  // ----------------------------
  // Get Board
  // ----------------------------
  const getBoard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/board/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBoard(res.data);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  // ----------------------------
  // Get Tasks
  // ----------------------------
  const getTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/task/board/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  };

  if (!board) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white text-xl">
        Loading...
      </div>
    );
  }

  const todo = tasks.filter((task) => task.status === "Todo");
  const progress = tasks.filter(
    (task) => task.status === "In Progress"
  );
  const done = tasks.filter((task) => task.status === "Done");

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-white">

      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {board.title}
          </h1>

          <p className="mt-2 text-zinc-400">
            {board.description}
          </p>
        </div>

        <Link
          to={`/board/${id}/create-task`}
          className="rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700"
        >
          + Create Task
        </Link>
      </div>

      {/* Columns */}

      <div className="grid gap-6 md:grid-cols-3">

        <Column
          title="Todo"
          tasks={todo}
        />

        <Column
          title="In Progress"
          tasks={progress}
        />

        <Column
          title="Done"
          tasks={done}
        />

      </div>
    </div>
  );
};

function Column({ title, tasks }) {
  return (
    <div className="rounded-xl bg-zinc-900 p-5">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <span className="rounded bg-zinc-800 px-2 py-1 text-xs">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4">

        {tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-700 p-6 text-center text-zinc-500">
            No Tasks
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="rounded-lg bg-zinc-800 p-4 transition hover:bg-zinc-700"
            >
              <h3 className="font-semibold">
                {task.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                {task.description}
              </p>

              {task.assignedTo && (
                <div className="mt-4 text-xs text-blue-400">
                  Assigned : {task.assignedTo.name}
                </div>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default BoardDetails;