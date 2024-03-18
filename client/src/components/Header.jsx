import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);
  return (
    <header className="w-screen shadow-md bg-slate-200">
      <div className="flex items-center justify-between max-w-6xl p-3 mx-auto ">
        <Link to="/">
          <h1 className="flex flex-wrap font-bold me-2 ">
            <span className="py-0 my-0 text-red-500 text-md/4 sm:text-xl md:text-2xl lg:text-3xl ms-0 ">
              Real
            </span>
            <span className="py-0 my-0 text-md/4 sm:text-xl md:text-2xl lg:text-3xl ms-0 text-slate-600">
              Estate
            </span>
          </h1>
        </Link>
        <form
          className="flex items-center w-1/3 px-2 py-1 rounded-lg sm:py-1 sm:w-64 md:p-3 bg-slate-50"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-500 hover:cursor-pointer active:text-black" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden font-semibold text-slate-700 hover:underline active:text-black sm:inline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden font-semibold text-slate-700 hover:underline active:text-black sm:inline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="object-cover rounded-full w-7 h-7"
              />
            ) : (
              <li className="font-semibold text-slate-700 hover:underline active:text-black sm:inline">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
