import React from "react";
import {Link} from "react-router-dom"
import {FaSearch} from 'react-icons/fa'

function Header() {
  return (
    <header className="w-screen shadow-md bg-slate-200">
      <div className="flex items-center justify-between max-w-6xl p-3 mx-auto ">
        <Link to ="/" > 
        <h1 className="flex flex-wrap font-bold me-2 ">
          <span className="py-0 my-0 text-red-500 text-md/4 sm:text-xl md:text-2xl lg:text-3xl ms-0 ">Real</span>
          <span className="py-0 my-0 text-md/4 sm:text-xl md:text-2xl lg:text-3xl ms-0 text-slate-600">Estate</span>
        </h1>
        </Link> 
        <form className="flex items-center w-24 px-2 py-0 rounded-lg sm:py-1 sm:w-64 md:p-3 bg-slate-50">
          <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none" />
        <FaSearch className="text-slate-500 hover:cursor-pointer active:text-black" />
        </form>
        <ul className="flex gap-4">
          <Link to ="/" ><li className="hidden font-semibold text-slate-700 hover:underline active:text-black sm:inline">Home</li></Link>
          <Link to ="/about" ><li className="hidden font-semibold text-slate-700 hover:underline active:text-black sm:inline">About</li></Link>
          <Link to ="/sign-in" ><li className="font-semibold text-slate-700 hover:underline active:text-black sm:inline">Sign in</li></Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
