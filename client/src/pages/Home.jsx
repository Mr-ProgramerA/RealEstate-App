import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import ListingItem from "../components/ListingItem";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* ================    top    ======================*/}

      {/* <div className="flex flex-col max-w-6xl gap-6 px-3 py-16 mx-auto md:py-20">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl text-slate-700">
          Find your <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-xs text-gray-500 sm:text-sm">
          RealEstate360 is the best place to find your next perfect place to
          live.
          <br />
          we have wide range of properties for younto choose from.
        </div>
        <Link
          className="text-xs font-bold text-blue-800 sm:text-sm hover:underline"
          to={"/search"}
        >
          Let's get started
        </Link>
      </div> */}
      <div className="flex flex-col w-full max-w-6xl gap-3 px-5 py-5 mx-auto md:px-12 md:gap-4 md:py-20">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-slate-700">
          Discover your <span className="text-rose-500">Dream Home</span>
          <br /> with Ease
        </h1>
        <div className="text-xs text-gray-600 sm:text-sm">
          <span className="italic font-medium">RealEstate360 </span>
          offers you the ultimate solution to finding your ideal living space
          effortlessly.
          <br />
          With a diverse range of properties, your perfect home is just a click
          away.
        </div>
        <Link
          className="text-xs font-bold text-blue-800 sm:text-sm hover:underline"
          to="/search"
        >
          Start Your Search Now...
        </Link>
      </div>

      {/* =================   swiper   ====================*/}

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => {
            return (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="md:h-[500px] h-[360px] text-fuchsia-600"
                ></div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* =========   listings results for offer, sale and rent  =========*/}

      <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="m-3">
              <h2 className="text-2xl font-semibold text-slate-700">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to="/search?offer=true"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 p-8 mx-auto lg:gap-10">
              {offerListings.map((listing) => {
                return <ListingItem listing={listing} key={listing._id} />;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto my-10">
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="m-3">
              <h2 className="text-2xl font-semibold text-slate-700">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to="/search?type=rent"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 p-8 mx-auto lg:gap-10">
              {rentListings.map((listing) => {
                return <ListingItem listing={listing} key={listing._id} />;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto my-10">
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="m-3">
              <h2 className="text-2xl font-semibold text-slate-700">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to="/search?type=sale"
              >
                Show more places for sell
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 p-8 mx-auto lg:gap-10">
              {saleListings.map((listing) => {
                return <ListingItem listing={listing} key={listing._id} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
