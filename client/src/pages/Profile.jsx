import React from "react";
import { useSelector } from "react-redux";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="self-center object-cover w-24 h-24 mt-2 rounded-full cursor-pointer"
          src={currentUser.avatar}
          alt="Your Image"
        />
        <input
          type="text"
          className="p-3 rounded-lg shadow-sm shadow-gray-500"
          placeholder="username"
          id="username"
        />
        <input
          type="email"
          className="p-3 border rounded-lg shadow-sm shadow-gray-500"
          placeholder="email"
          id="email"
        />
        <input
          type="text"
          className="p-3 border rounded-lg shadow-sm shadow-gray-500"
          placeholder="password"
          id="password"
        />
        <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-90 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5 font-medium">
        <span className="text-red-700 capitalize">Delete Account</span>
        <span className="text-red-700 capitalize">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
