import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "harun@gmail.com",
    password: "123456",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await login(formData);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md items-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70"
      >
        <h1 className="text-3xl font-black text-slate-950">Welcome back</h1>
        <p className="mt-2 text-slate-500">Login to continue shopping.</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-bold text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-950"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-950"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          Login
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <Link to="/register" className="font-bold text-slate-950">
            Create account
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;