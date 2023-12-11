import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="z-20 p-3 border rounded-lg"
          id="username"
        />

        <input
          type="email"
          placeholder="Email"
          className="z-20 p-3 border rounded-lg"
          id="email"
        />

        <input
          type="password"
          placeholder="Password"
          className="z-20 p-3 border rounded-lg"
          id="password"
        />

        <button className="p-3 text-white uppercase rounded-lg hover:bg-slate-800 disabled:opacity-75 bg-slate-700">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Having an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-900">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
