import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useSelector, useDispatch } from "react-redux";
import { SignUpSuccess } from "../redux/user/userSlice";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { error: reduxError } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      dispatch(SignUpSuccess());
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.error("Error parsing JSON:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="z-20 p-3 border rounded-lg shadow-sm shadow-gray-500"
          id="username"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          className="z-20 p-3 border rounded-lg shadow-sm shadow-gray-500"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="z-20 p-3 border rounded-lg shadow-sm shadow-gray-500"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="p-3 text-white uppercase rounded-lg disabled:cursor-progress active:bg-sky-800 active:border-double hover:bg-slate-800 disabled:opacity-75 bg-slate-700"
        >
          {loading ? "Creating an account..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Having an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-900">Sign In</span>
        </Link>
      </div>
      {error && <p className="mt-5 text-red-600">{error}</p>}
    </div>
  );
}

export default SignUp;
