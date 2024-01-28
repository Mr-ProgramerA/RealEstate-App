import React, { useState } from "react";
import { useSelector } from "react-redux";
import app from "../firebase.jsx";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 1000,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  // console.log(formData);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [perMonth, setPerMonth] = useState(true);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed");
          setUploading(false);
        });
    } else {
      setImageUploadError("There must be between 1 and 6 images.");
      setUploading(false);
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            resolve(downloadURL)
          );
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  // ----------------------------------------------------------------------------------------
  // const handleChange = (e) => {
  //   if (e.target.id === "sale" || e.target.id === "rent")
  //     setFormData({ ...formData, type: e.target.id });

  //   if (
  //     e.target.id === "parking" ||
  //     e.target.id === "furnished" ||
  //     e.target.id === "offer"
  //   )
  //     setFormData({ ...formData, [e.target.id]: e.target.checked });

  //   if (e.target.type === "text" || e.target.type === "textarea")
  //     setFormData({ ...formData, [e.target.id]: e.target.value });

  //   if (e.target.type === "number")
  //     setFormData({ ...formData, [e.target.id]: parseInt(e.target.value) });
  // };
  // ----------------------------------------------------------------------------------------

  // const handleChange = (e) => {
  //   switch (e.target.id) {
  //     case "sale":
  //     case "rent":
  //       setFormData({ ...formData, type: e.target.id });
  //       break;

  //     case "parking":
  //     case "furnished":
  //     case "offer":
  //       setFormData({ ...formData, [e.target.id]: e.target.checked });
  //       break;

  //     default:
  //       if (e.target.type === "text" || e.target.type === "textarea") {
  //         setFormData({ ...formData, [e.target.id]: e.target.value });
  //       } else if (e.target.type === "number") {
  //         setFormData({ ...formData, [e.target.id]: parseInt(e.target.value) });
  //       }
  //   }
  // };
  // ----------------------------------------------------------------------------------------

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      switch (e.target.id) {
        case "sale":
          setPerMonth(false);
          return { ...prevFormData, type: e.target.id };
        case "rent":
          setPerMonth(true);
          return { ...prevFormData, type: e.target.id };

        case "parking":
        case "furnished":
        case "offer":
          return { ...prevFormData, [e.target.id]: e.target.checked };

        default:
          if (e.target.type === "text" || e.target.type === "textarea") {
            return { ...prevFormData, [e.target.id]: e.target.value };
          } else if (e.target.type === "number") {
            if (e.target.value === "")
              return { ...prevFormData, [e.target.id]: 0 };
            return { ...prevFormData, [e.target.id]: parseInt(e.target.value) };
          }

          return prevFormData;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload atleast 1 image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discounted price must be less than Regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      // console.log(data);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-3 border rounded-lg focus:ring focus:ring-violet-400 focus:ring-1 focus:outline-none"
            id="name"
            minLength={10}
            maxLength={62}
            required
            onChange={handleChange}
            value={formData.name}
          />

          <textarea
            type="text"
            placeholder="Description"
            className="p-3 border rounded-lg focus:ring focus:ring-violet-400 focus:ring-1 focus:outline-none"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />

          <input
            type="text"
            placeholder="Address"
            className="p-3 border rounded-lg focus:ring focus:ring-violet-400 focus:ring-1 focus:outline-none"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={formData.type === "sale"}
                id="sale"
                className="w-5"
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={formData.type === "rent"}
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={formData.parking}
                id="parking"
                className="w-5"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={formData.furnished}
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleChange}
                checked={formData.offer}
                id="offer"
                className="w-5"
              />
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
                onChange={handleChange}
                value={formData.bedrooms}
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
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                className="p-1 my-1 border border-gray-300 rounded-lg focus:ring-violet-400 focus:ring-1 focus:outline-none"
                min={200}
                max={100000000}
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                {perMonth && (
                  <span className="text-xs">(&#x20B9; / Months)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  className="p-1 my-1 border border-gray-300 rounded-lg focus:ring-violet-400 focus:ring-1 focus:outline-none"
                  required
                  min={0}
                  max={100000000}
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  {perMonth && (
                    <span className="text-xs">(&#x20B9; / Months)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ms-2">
              The initial image serves as the cover, and there is a maximum of 6
              images allowed, each with a file size not exceeding 2 MB.
            </span>
          </p>

          <div className="flex gap-4">
            <input
              className="w-full p-3 border border-gray-300 rounded"
              type="file"
              accept="images/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              onClick={handleImageSubmit}
              disabled={uploading}
              className="p-2 text-green-800 uppercase border border-green-700 rounded-md disabled:hover:shadow-none disabled:active:bg-inherit active:text-white active:bg-green-700 hover:shadow-md hover:text-green-900 disabled:border-gray-500 disabled:cursor-not-allowed disabled:text-gray-500"
              type="button"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="font-mono text-sm text-orange-700 ps-2">
            {imageUploadError && imageUploadError}
          </p>
          <div className="flex flex-col flex-wrap justify-between gap-3 sm:justify-start lg:justify-between md:flex-row">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => {
                return (
                  <div
                    key={url}
                    className="flex items-center justify-between max-w-full gap-1 p-1 border border-gray-300 rounded-lg lg:gap-3 sm:p-3"
                  >
                    <img
                      className="object-contain w-16 h-16 rounded-lg lg:w-20 lg:h-20"
                      src={url}
                      alt="listing image"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-3 text-sm text-red-700 uppercase md:text-base hover:opacity-80"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="p-3 text-white uppercase rounded-lg active:bg-slate-900 disabled:hover:opacity-100 disabled:bg-gray-500 disabled:cursor-wait hover:opacity-95 bg-slate-700"
          >
            {loading ? "Creating...." : "Create Listing"}
          </button>
          {error && <p className="text-red-700 font-this">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
