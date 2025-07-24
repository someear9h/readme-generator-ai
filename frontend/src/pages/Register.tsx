import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form);
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded-xl space-y-4">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input" name="username" placeholder="Username" onChange={handleChange} />
        <input className="input" name="email" placeholder="Email" onChange={handleChange} />
        <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit" className="btn w-full">Create Account</button>
      </form>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
