import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { RiExternalLinkFill } from "react-icons/ri";
import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";
import { LuParkingCircle, LuParkingCircleOff } from "react-icons/lu";
import { MdChair } from "react-icons/md";
import { BiHomeAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingID}`);
        const data = await res.json();
        if (data.success === false) {
          setListing(data.message);
          setLoading(false);
          setError(data.message);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchListing();
  }, []);
  return (
    <main>
      {loading && <p className="text-2xl text-center my-7"> Loading...</p>}
      {error && (
        <p className="text-2xl text-center my-7">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[32vh] sm:h-[50vh]"
                  style={{
                    background: `url(${url}) no-repeat`,
                    backgroundPosition: "50% 70%",
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-20 md:top-24 right-4 z-10 bg-white opacity-70 hover:opacity-95 hover:cursor-pointer rounded-full flex w-[30px] p-1 h-[30px]">
            <RiExternalLinkFill
              className="z-20 justify-center flex-1 text-center align-middle h-max w-max"
              onClick={() => {
                setCopied(true);
                navigator.clipboard.writeText(window.location.href);
                setTimeout(() => {
                  setCopied(false);
                }, 2500);
              }}
            />
          </div>
          {copied && (
            <p className="absolute z-10 px-1 font-thin bg-white rounded-lg bg-opacity-90 right-4 top-16 md:top-20">
              Link copied
            </p>
          )}
          <div className="flex flex-col max-w-4xl p-3 mx-auto my-7">
            <h1 className="text-2xl font-semibold">
              {listing.name} - &#x20B9;
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </h1>
            <p className="flex items-center gap-2 mt-6 text-grey-500">
              <FaMapMarkerAlt className="text-green-700" /> {listing.address}
            </p>
            <div className="flex gap-3 px-3 mt-3">
              <p className="text-lg p-1 font-semibold h-fit text-indigo-200 rounded-full bg-indigo-900 w-full max-w-[200px] text-center">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="text-lg p-1  font-semibold h-fit text-green-200 rounded-full bg-green-900 w-full max-w-[200px] text-center">
                  &#x20B9;{+listing.regularPrice - +listing.discountPrice}{" "}
                  discount
                </p>
              )}
            </div>
            <p className="my-4 text-justify">
              <span className="text-lg font-medium text-black">
                Description:
              </span>
              {" " + listing.description}
            </p>
            <ul className="flex flex-wrap items-center gap-4 p-1 mb-4 font-semibold sm:gap-6">
              <li className="flex items-center gap-1 text-emerald-700 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 text-emerald-700 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              {listing.parking ? (
                <li className="flex items-center gap-1 whitespace-nowrap text-emerald-700">
                  <LuParkingCircle className="text-lg" />
                  <span>Parking spot</span>
                </li>
              ) : (
                <li className="flex items-center gap-1 whitespace-nowrap text-amber-600">
                  <LuParkingCircleOff className="text-lg" />
                  <span>No Parking</span>
                </li>
              )}
              {listing.furnished ? (
                <li className="flex items-center gap-1 whitespace-nowrap text-emerald-700">
                  <MdChair className="text-lg" />
                  <span>Furnished</span>
                </li>
              ) : (
                <li className="flex items-center gap-1 whitespace-nowrap text-amber-600">
                  <BiHomeAlt2 className="text-lg" />
                  <span>Unfurnished</span>
                </li>
              )}
            </ul>
            {currentUser && currentUser._id !== listing.userRef && !contact && (
              <button
                onClick={() => setContact(true)}
                className="w-full max-w-lg p-2 mx-auto text-white uppercase rounded-lg hover:opacity-90 bg-slate-700"
              >
                Contact Landlord
              </button>              
            )}
            {contact && <Contact listing = {listing}/>}
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
