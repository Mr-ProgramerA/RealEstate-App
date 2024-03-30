import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
function ListingItem({ listing }) {
  return (
    <div className="bg-white w-full min-[600px]:w-3/4 sm:w-80 flex flex-col gap-3 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="w-full h-[320px] sm:h-[220px] object-cover transition-all hover:scale-105 duration-300"
          src={
            listing.imageUrls[0] ||
            "https://png.pngtree.com/png-vector/20210914/ourmid/pngtree-real-estate-clipart-png-image_3917929.png"
          }
          alt="listing cover"
        />
      </Link>
      <div className="flex flex-col w-full gap-2 p-3">
        <p className="text-lg font-semibold truncate text-slate-800">
          {listing.name}
        </p>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="w-4 h-4 text-green-700" />
          <p className="text-sm text-gray-700 truncate">{listing.address}</p>
        </div>
        <p className="text-sm text-gray-950 line-clamp-2">
          {listing.description}
        </p>
        <p className="mt-1 text-lg font-semibold text-slate-600">
          <span className="text-sm font-normal">
            {"for " + listing.type + "  "}
          </span>
          &#8377;
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-in")
            : listing.regularPrice.toLocaleString("en-in")}
          {listing.type === "rent" && " / months"}
        </p>
        <div className="flex gap-4 font-medium text-slate-800">
          <div>
            {listing.bedrooms > 1
              ? listing.bedrooms + " beds"
              : listing.bedrooms + " bed"}
          </div>
          <div>
            {listing.bathrooms > 1
              ? listing.bathrooms + " baths"
              : listing.bathrooms + " bath"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingItem;
