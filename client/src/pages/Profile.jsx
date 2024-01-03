import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
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
  const [updateSuccess, setupdateSuccess] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(formData);
  // console.log(currentUser);
  // console.log(filePerc);
  // console.log(fileUploadError);
  // console.log(formData);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData);
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
        return;
      }
      dispatch(updateUserSuccess(data));
      setupdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
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
      </form>
      <div className="flex justify-between mt-5 font-medium">
        <span className="text-red-700 capitalize cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 capitalize cursor-pointer">Sign Out</span>
      </div>
      <p className="mt-3 font-mono text-sm text-red-700"> {error? error: ""} </p>
      <p className="mt-3 font-mono text-sm text-green-700"> {updateSuccess? "User updated successfully" : ""} </p>
    </div>
  );
}

export default Profile;
