import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareGithub } from "react-icons/fa6";

function Footer() {
  return (
      <div className="w-full p-3 mt-12 text-center text-white h-fit bg-slate-900">
         <div className="max-w-md mx-auto">
        <p className="">Know us on:</p>
        <div className="flex w-full px-20 pt-2 justify-evenly">
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
        <p className="p-4">&copy; 2024 RealEstate360. All rights reserved.</p>
      </div>
      )
}

export default Footer;
