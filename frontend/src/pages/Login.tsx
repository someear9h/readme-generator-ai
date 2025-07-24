import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(creds.username, creds.password);
    localStorage.setItem("token", res.data.access_token);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded-xl space-y-4">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" name="username" placeholder="Username" onChange={e => setCreds({ ...creds, username: e.target.value })} />
        <input className="input" type="password" name="password" placeholder="Password" onChange={e => setCreds({ ...creds, password: e.target.value })} />
        <button type="submit" className="btn w-full">Login</button>
      </form>
    </div>
  );
}
