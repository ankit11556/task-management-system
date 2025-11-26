import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerApi } from "../api/AuthApi";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      const res = await registerApi({ name, email, password });
      toast.success(res.data.message);
      navigate("/login")
    } catch (error) {
      console.log("Error object:", error);
      const errorMessage =
        error?.response?.data?.error || "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl flex flex-col w-96 ">
      <h2 className="text-2xl font-bold py-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-500 rounded-lg px-4 py-3 "
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-500 rounded-lg px-4 py-3 "
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-500 rounded-lg px-4 py-3 "
        />
        <button
          type="submit"
          className="bg-slate-800 text-white py-2 rounded-lg"
        >
          Register
        </button>
        <p className="text-sm text-black">
          Don’t have an account yet?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline "
          >
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
