import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        setLandLord(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landLord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landLord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message to the property owner/agent"
            className="w-full p-3 border rounded-lg"
          ></textarea>
          <Link
            className="w-full max-w-lg p-2 mx-auto text-center text-white uppercase rounded-lg bg-slate-700 hover:opacity-90"
            to={`mailto:${landLord.email}?subject=Regarging${listing.name}&body=${message}`}
            // ----- other method --------//
            //to={`mailto:${landLord.email}?subject=Regarding%20${encodeURIComponent(listing.name)}&body=${encodeURIComponent(message)}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
