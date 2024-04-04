import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) setShowMore(true);
      else setShowMore(false);
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "all":
      case "rent":
      case "sale":
        setSidebarData({ ...sidebarData, type: e.target.id });
        break;

      case "searchTerm":
        setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        break;

      case "parking":
      case "furnished":
      case "offer":
        // setSidebarData({
        //   ...sidebarData,
        //   [e.target.id]:
        //     e.target.checked || e.target.checked === "true" ? true : false,
        // });
        setSidebarData((previousState) => ({
          ...previousState,
          [e.target.id]:
            e.target.checked || e.target.checked === "true" ? true : false,
        }));
        break;

      case "sort_order":
        const sort = e.target.value.split("_")[0] || "createdAt";
        const order = e.target.value.split("_")[1] || "desc";

        setSidebarData({ ...sidebarData, sort, order });
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) setShowMore(false);
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row ">
      <div className="border-b-2 p-7 md:min-h-screen md:border-r-2 md:border-b-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <label className="font-medium min-[300px]:whitespace-nowrap">
              Search Term:
            </label>
            <input
              id="searchTerm"
              type="text"
              placeholder="Search..."
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="w-full max-w-md p-2 border rounded-lg"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="font-medium">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                checked={sidebarData.type === "all"}
                onChange={handleChange}
                className="w-5"
              />
              <span>Rent & Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                checked={sidebarData.type === "rent"}
                onChange={handleChange}
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                checked={sidebarData.type === "sale"}
                onChange={handleChange}
                className="w-5"
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                checked={sidebarData.offer}
                onChange={handleChange}
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="font-medium">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                checked={sidebarData.parking}
                onChange={handleChange}
                className="w-5"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                checked={sidebarData.furnished}
                onChange={handleChange}
                className="w-5"
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
              id="sort_order"
              className="p-2 border rounded-lg"
            >
              <option value={"regularPrice_desc"}>Price high to low</option>
              <option value={"regularPrice_asc"}>Price low to high</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
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
      <div className="flex flex-col flex-1 gap-4">
        <h1 className="w-full p-3 text-2xl font-semibold border-b md:mt-5 md:text-3xl text-slate-800">
          Listing Results:
        </h1>
        {loading ? (
          <div>
            <p className="text-xl text-center text-slate-700">Loading...</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 p-4">
            {!loading && listings.length === 0 && (
              <p className="w-full text-xl text-center md:p-3 text-slate-700">
                No Listings found
              </p>
            )}
            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            {showMore && (
              <button
                className="w-full text-center text-green-800 hover:underline p-7"
                onClick={onShowMoreClick}
              >
                Show More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
