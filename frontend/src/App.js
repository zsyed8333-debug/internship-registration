import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
const [form, setForm] = useState({
name: "",
email: "",
technology: "",
});

const [users, setUsers] = useState([]);

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const fetchUsers = async () => {
try {
const res = await axios.get("http://localhost:5000/api/users");
setUsers(res.data);
} catch (error) {
console.log(error);
}
};

const submitForm = async (e) => {
e.preventDefault();


try {
  await axios.post("http://localhost:5000/api/users", form);

  setForm({
    name: "",
    email: "",
    technology: "",
  });

  fetchUsers();
} catch (error) {
  console.log(error);
  alert("Something went wrong");
}


};

useEffect(() => {
fetchUsers();
}, []);

return ( <div className="container"> <div className="form-card"> <h1>Internship Registration Form</h1>


    <form onSubmit={submitForm}>
      <input
        type="text"
        name="name"
        placeholder="Enter Full Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="technology"
        placeholder="Enter Technology"
        value={form.technology}
        onChange={handleChange}
        required
      />

      <button type="submit">Register Now</button>
    </form>
  </div>

  <div className="users-section">
    <h2>Registered Candidates</h2>

    {users.map((user) => (
      <div className="user-card" key={user._id}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <span>{user.technology}</span>
      </div>
    ))}
  </div>
</div>


);
}

export default App;
