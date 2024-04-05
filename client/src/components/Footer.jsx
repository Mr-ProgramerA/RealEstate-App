import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="flex max-[550px]:flex-col items-center w-full p-5 mt-12 text-center text-white justify-evenly h-max bg-slate-900">
      <div>
        <div>
          <p className="whitespace-nowrap ">Know us on:</p>
          <div className="flex gap-2 p-6 pt-2 justify-evenly">
            <a href="https://www.linkedin.com/in/dev-pankaj">
              <FaLinkedin className="w-8 h-8" />
            </a>
            <a href="https://twitter.com/MrPankajDev">
              <FaSquareXTwitter className="w-8 h-8" />
            </a>
            <a href="https://github.com/Mr-ProgramerA">
              <FaSquareGithub className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
      <div className="flex-1 p-1 sm:p-3">
        <p className="p-4">
          <Link to="/">
            <span>&copy; 2024 RealEstate360. All rights reserved.</span>
          </Link>
        </p>
      </div>
      <div className="p-1 sm:p-3">
        <Link className="hover:underline" to="/about">
          About RealEstate360
        </Link>
      </div>
    </div>
  );
}

export default Footer;
