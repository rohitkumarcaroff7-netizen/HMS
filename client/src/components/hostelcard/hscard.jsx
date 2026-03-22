import React from "react";

const HostelCard = ({
  name = "I.M.I.T Hostel",
  location = "Cuttack , Odisha",
  type = "Boys",
  beds = 50,
  price = "₹3,500/month",
  contact = "9876543210",
}) => {
  return (
    <div className=" rounded-2xl flex justify-center items-center shadow-lg bg-white h-23 w-[500px] hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{location}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
        <div>
          <span className="font-medium">Type:</span> {type}
        </div>
        <div>
          <span className="font-medium">Beds:</span> {beds}
        </div>
        <div>
          <span className="font-medium">Price:</span> {price}
        </div>
        <div>
          <span className="font-medium">Contact:</span> {contact}
        </div>
      </div>

      <button className=" bg-green-400 text-white   hover:bg-green-700 transition">
        View Details
      </button>
    </div>
  );
};

export default HostelCard;
