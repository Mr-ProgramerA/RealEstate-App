import React from "react";

function CreateListing() {
  return (
    <main className="max-w-4xl p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-3 border rounded-lg focus:ring focus:ring-violet-400 focus:ring-1 focus:outline-none"
            id="name"
            minLength={10}
            maxLength={62}
            required
          />

          <textarea
            type="text"
            placeholder="Description"
            className="p-3 border rounded-lg focus:ring focus:ring-violet-400 focus:ring-1 focus:outline-none"
            id="description"
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="p-3 border rounded-lg focus:ring focus:ring-violet-400 focus:ring-1 focus:outline-none"
            id="address"
            required
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                className="p-1 my-1 border border-gray-300 rounded-lg focus:ring-violet-400 focus:ring-1 focus:outline-none"
                min={1}
                max={25}
                required
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                className="p-1 my-1 border border-gray-300 rounded-lg focus:ring-violet-400 focus:ring-1 focus:outline-none"
                min={1}
                max={50}
                required
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                className="p-1 my-1 border border-gray-300 rounded-lg focus:ring-violet-400 focus:ring-1 focus:outline-none"
                min={1}
                max={100000000}
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(&#x20B9; / Months)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                className="p-1 my-1 border border-gray-300 rounded-lg focus:ring-violet-400 focus:ring-1 focus:outline-none"
                required
                min={1}
                max={100000000}
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">(&#x20B9; / Months)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ms-2">
              First image will be the cover (Max: 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="w-full p-3 border border-gray-300 rounded"
              type="file"
              accept="images/*"
              multiple
            />
            <button className="p-2 text-green-800 uppercase border border-green-700 rounded-md disabled:hover:shadow-none disabled:active:bg-inherit active:text-white active:bg-green-700 hover:shadow-md hover:text-green-900 disabled:border-gray-400 disabled:cursor-not-allowed disabled:text-gray-400">
              Upload
            </button>
          </div>
        <button className="p-3 text-white uppercase rounded-lg hover:opacity-95 bg-slate-700">Create Listing</button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
