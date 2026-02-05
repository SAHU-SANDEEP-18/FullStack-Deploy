import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [note, setNote] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState("");

  function fetchNotes() {
    axios.get("https://fullstack-deploy-foyq.onrender.com/api/notes").then((res) => {
      setNote(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios.post("https://fullstack-deploy-foyq.onrender.com/api/notes", {
      title: title.value,
      description: description.value,
    }).then(() => {
      fetchNotes();
      e.target.reset();
    });
  }

  function handleDeleteNote(id) {
    axios.delete("https://fullstack-deploy-foyq.onrender.com/api/notes/" + id).then(() => {
      fetchNotes();
    });
  }

  function handleUpdateNote(id) {
    axios
      .patch(`https://fullstack-deploy-foyq.onrender.com/api/notes/${id}`, {
        description: editDescription,
      })
      .then(() => {
        setEditId(null);
        setEditDescription("");
        fetchNotes();
      });
  }

  return (
    <div className="min-h-screen bg-gray-700 p-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-black p-6 rounded-xl shadow mb-10"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">
          Create Note
        </h2>

        <input
          name="title"
          type="text"
          placeholder="Enter title"
          className="w-full mb-3 p-2 border text-white rounded focus:outline-none"
        />

        <input
          name="description"
          type="text"
          placeholder="Enter description"
          className="w-full mb-4 p-2 border text-white rounded focus:outline-none"
        />

        <button className="w-40 text- border border-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Create Note
        </button>
      </form>

      {/* Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {note.map((note) => (
          <div
            key={note._id}
            className="bg-gray-500 p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h1 className="text-xl font-semibold text-white mb-2">
              {note.title}
            </h1>

            {editId === note._id ? (
              <>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleUpdateNote(note._id)}
                    className="flex-1 bg-green-600 text-white py-1 rounded hover:bg-green-700"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => setEditId(null)}
                    className="flex-1 bg-gray-400 text-white py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-white mb-4">
                  {note.description}
                </p>

                <button
                  onClick={() => {
                    setEditId(note._id);
                    setEditDescription(note.description);
                  }}
                  className="w-full bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 mb-2"
                >
                  Edit
                </button>
              </>
            )}

            <button
              onClick={() => handleDeleteNote(note._id)}
              className="w-full bg-red-600 text-white py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
