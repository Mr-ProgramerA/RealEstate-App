import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  // deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  // signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/user/userSlice.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase.jsx";

function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setupdateSuccess] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [showListingError, setshowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [showListingVisibility, setShowListingVisibility] = useState(true);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      ...formData,
      username: currentUser.username,
      email: currentUser.email,
    });
  }, []);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => setFileUploadError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        // navigate("/sign-in");
        setupdateSuccess(false);
        return;
      }
      dispatch(updateUserSuccess(data));
      setupdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      // dispatch(deleteUserStart());
      setDeleting(true);
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        setDeleting(false);
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        setSigningOut(false);
        return;
      }
      dispatch(signOutSuccess());
      setSigningOut(false);
    } catch (error) {
      console.log(error);
      dispatch(signOutFailure(error));
      setSigningOut(false);
    }
  };

  const handleShowListing = async () => {
    try {
      setshowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) return setshowListingError(error);

      setShowListingVisibility(false);
      setUserListings(data);
    } catch (error) {
      setshowListingError(error);
    }
  };

  const handleListingDelete = async (listingId) => {
    const confirmDelete = confirm("Are you sure to delete this listing?");
    if (!confirmDelete) return;
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg px-3 mx-auto">
      <h1 className="mt-4 mb-2 text-3xl font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* firebase rules:-
      allow read
      allow write: if 
      request.resource.size < 2 * 1024 * 1024 && 
      request.resource.contentType.matches("image/.*")
*/}

        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          className="self-center object-cover w-24 h-24 mt-2 rounded-full cursor-pointer"
          src={formData.avatar || currentUser.avatar}
          alt="Your Image"
          onClick={() => fileRef.current.click()}
        />

        <p className="font-mono text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error in file upload! Image should be under 2 MB
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-blue-800">
              {`Image Uploading ... ${filePerc}%`}
            </span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          className="p-3 rounded-lg shadow-sm shadow-gray-500"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          className="p-3 border rounded-lg shadow-sm shadow-gray-500"
          defaultValue={currentUser.email}
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          className="p-3 border rounded-lg shadow-sm shadow-gray-500"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="p-3 text-white uppercase rounded-lg disabled:bg-gray-600 disabled:cursor-progress bg-slate-700 hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Updating Profile..." : "Update"}
        </button>
        <Link
          to="/create-listing"
          className="p-3 text-center text-white uppercase bg-green-700 rounded-lg hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5 font-medium">
        <span
          onClick={handleDelete}
          className="text-red-700 capitalize cursor-pointer"
        >
          {deleting ? "Deleting account..." : "Delete Account"}
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 capitalize cursor-pointer"
        >
          {signingOut ? "Sigining Out..." : "Sign Out"}
        </span>
      </div>
      <p className="mt-3 font-mono text-sm text-red-700">
        {error ? error : ""}
      </p>
      <p className="mt-3 font-mono text-sm text-green-700">
        {updateSuccess ? "User updated successfully" : ""}{" "}
      </p>
      <button
        disabled={!showListingVisibility}
        onClick={handleShowListing}
        className="w-full text-lg font-semibold text-center text-green-700 disabled:hidden"
      >
        <span className="hover:underline hover:opacity-90 active:text-green-950">
          View Listings
        </span>
      </button>
      {showListingError && (
        <p className="w-full p-3 font-mono text-justify text-red-700">
          {showListingError}
        </p>
      )}

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-center text-sky-800">
            Your Listings
          </h1>
          {userListings.map((listing) => {
            return (
              <div
                className="flex items-center justify-between gap-4 p-3 my-1 truncate border border-gray-400 rounded-lg"
                key={listing._id}
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                    className="object-contain w-16 h-16"
                  />
                </Link>

                <Link
                  className="flex-1 font-semibold truncate text-slate-700 hover:underline"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>

                <div className="flex flex-col items-center">
                  <button
                    className="text-red-700 uppercase"
                    onClick={() => handleListingDelete(listing._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-blue-700 uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
