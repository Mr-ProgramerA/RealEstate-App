import React from "react";

function Search() {
  return (
    <div className="flex flex-col md:flex-row ">
      <div className="border-b-2 p-7 md:min-h-screen md:border-r-2 md:border-b-0">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-medium whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="font-medium">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-medium">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium">Sort:</label>
            <select className="p-2 border rounded-lg" id="sort_order">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button
            className="w-full max-w-md p-3 mx-auto text-white uppercase rounded-lg bg-slate-700 hover:opacity-90"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div>
        <h1 className="w-full p-3 text-2xl font-semibold border-b md:mt-5 md:text-3xl text-slate-800">
          Listing Results:
        </h1>
      </div>
    </div>
  );
}

export default Search;
