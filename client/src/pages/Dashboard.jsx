import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    getBoards();
  }, []);

  const getBoards = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/board",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBoards(response.data.boards);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const createBoard = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/board",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setShowModal(false);

      getBoards();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create board");
    }
  };

  if (loading) {
    return (
      <h1 className="mt-20 text-center text-3xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="mx-auto max-w-7xl p-8">

        <div className="mb-10 flex items-center justify-between">

          <h1 className="text-4xl font-bold">
            My Boards
          </h1>

          <button onClick={() => setShowModal(true)} className="rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700">
            + Create Board
          </button>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {boards.map((board) => (
            <div
              key={board._id}
              onClick={() => navigate(`/board/${board._id}`)}
              className="cursor-pointer rounded-xl border border-zinc-700 bg-zinc-900 p-6 transition hover:border-blue-500"
            >
              <h2 className="text-2xl font-semibold">{board.title}</h2>

              <p className="mt-3 text-zinc-400">
                {board.description}
              </p>
            </div>
          ))}


        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6">

              <h2 className="mb-6 text-2xl font-bold text-white">
                Create Board
              </h2>

              <form onSubmit={createBoard} className="space-y-4">

                <input
                  type="text"
                  placeholder="Board Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
                />

                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none"
                />

                <div className="flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-lg bg-zinc-700 px-4 py-2"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2"
                  >
                    Create
                  </button>

                </div>

              </form>

            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;