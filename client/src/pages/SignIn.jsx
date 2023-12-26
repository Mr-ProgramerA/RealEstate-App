import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {loading, error} = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // setLoading(true);
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        // setError(data.message);
        // setLoading(false);
        return;
      }
      dispatch(signInSuccess(data))
      // setError(null);
      // setLoading(false);
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message))
      // setLoading(false);
      // setError(error.message);
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
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="z-20 p-3 border rounded-lg"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="z-20 p-3 border rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="p-3 text-white uppercase rounded-lg disabled:cursor-progress active:bg-sky-800 active:border-double hover:bg-slate-800 disabled:opacity-75 bg-slate-700"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Not having an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-900">Sign Up</span>
        </Link>
      </div>
      {error && <p className="mt-5 text-red-600">{error}</p>}
    </div>
  );
}

export default SignIn;
