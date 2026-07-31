import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTask = () => {
  const { id } = useParams(); // Board ID
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/task",
        {
          title,
          description,
          status,
          board: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created");

      navigate(`/board/${id}`);
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Failed to create task");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-xl w-[500px] space-y-5"
      >
        <h1 className="text-3xl text-white font-bold">
          Create Task
        </h1>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-3 rounded bg-zinc-800 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 rounded bg-zinc-800 text-white"
          rows="5"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <select
          className="w-full p-3 rounded bg-zinc-800 text-white"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;