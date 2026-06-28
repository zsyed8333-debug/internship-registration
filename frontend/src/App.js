import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API = "http://localhost:5000/api/users";

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    technology: "",
  });

  const [editId, setEditId] = useState(null);

  const getUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ name: "", email: "", technology: "" });
    getUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    getUsers();
  };

  const editUser = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      technology: user.technology,
    });
    setEditId(user._id);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      {/* LEFT PANEL */}
      <div className="panel left">
        <h2>Internship Dashboard</h2>
        <p>{editId ? "Update Candidate" : "Add New Candidate"}</p>

        <form onSubmit={submitForm}>
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
          <input name="technology" placeholder="Technology" value={form.technology} onChange={handleChange} />

          <button>{editId ? "Update" : "Register"}</button>
        </form>
      </div>

      {/* RIGHT PANEL */}
      <div className="panel right">
        <div className="top">
          <h2>Registered Interns</h2>

          <input
            placeholder="Search intern..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid">
          {filteredUsers.map((u) => (
            <div className="card" key={u._id}>
              <div>
                <h3>{u.name}</h3>
                <p>{u.email}</p>
                <span>{u.technology}</span>
              </div>

              <div className="actions">
                <button onClick={() => editUser(u)}>Edit</button>
                <button className="del" onClick={() => deleteUser(u._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;