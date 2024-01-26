import React, { useEffect, useState } from "react";
import app from "../firebase.jsx";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
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

          <button className="p-3 text-white uppercase rounded-lg hover:opacity-95 bg-slate-700">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
