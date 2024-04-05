import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareGithub } from "react-icons/fa6";

function About() {
  return (
    <div className="max-w-6xl px-12 pt-8 mx-auto text-center sm:px-20">
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        About RealEstate360
      </h1>
      <div className="py-5 text-justify">
        <p className="mb-3 text-slate-700">
          Welcome to RealEstate360, your premier destination for immersive
          property presentation. RealEstate360 is a cutting-edge web project
          meticulously crafted to provide users with an engaging experience as
          they explore a diverse range of properties.
        </p>
        <p className="mb-3 text-slate-700">
          Within my platform, users can navigate through a seamless 360-degree
          view of properties (or listings), allowing them to visualize spaces
          with unparalleled detail and realism. Whether you're searching for
          your dream home, envisioning your next investment property, or simply
          exploring the possibilities, RealEstate360 offers a dynamic and
          interactive experience.
        </p>
        <p className="mb-3 text-slate-700">
          It's important to clarify that RealEstate360 is not a real estate
          marketplace; rather, it's a presentation project developed to showcase
          the capabilities of modern web development. While the properties
          featured on my platform are carefully curated for visual appeal, they
          are not real listings available for sale or transactions.
        </p>
        <p className="mb-3 text-slate-700">
          I'm committed to professionalism and innovation in digital property
          presentation. RealEstate360 represents the culmination of advanced web
          development techniques, providing users with a glimpse into the future
          of real estate browsing.
        </p>
        <p className="mb-3 text-slate-700">
          Thank you for choosing RealEstate360 as your virtual property
          exploration companion. I invite you to immerse yourself in my platform
          and discover the endless possibilities that await.
        </p>
      </div>

      <div className="flex flex-col w-full gap-5 max-auto">
        <p className="text-neutral-700">Contact Developer:</p>
        <div className="flex w-full gap-1 px-20 justify-evenly">
          <a href="https://www.linkedin.com/in/dev-pankaj">
            <FaLinkedin className="w-11 h-11 text-zinc-800" />
          </a>
          <a href="https://twitter.com/MrPankajDev">
            <FaSquareXTwitter className="w-11 h-11 text-zinc-800" />
          </a>
          <a href="https://github.com/Mr-ProgramerA">
            <FaSquareGithub className="w-11 h-11 text-zinc-800" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
