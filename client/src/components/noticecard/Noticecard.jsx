import React from "react";
import "./noticecard.css";
const NoticeCard = ({
  Topic = "Rules and Regulations",
  //  Points ="- No smoking or drinking in the hostel premises.- Maintain silence after 10 PM. \n - Keep your room clean and tidy. \n - Guests are not allowed in the hostel rooms without prior permission."
  
}) => {
  return (
    <div id="outerdiv" className=" rounded-2xl flex justify-center shadow-lg bg-white h-70 w-[460px] hover:shadow-xl transition-shadow duration-300 ">
      <div className="mb-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800">{Topic}</h2>
        <p className="text-sm text-gray-700">- No smoking or drinking in the hostel premises
        Guests are not allowed in the hostel rooms without prior permission.
        </p>
      </div>

      
    </div>
  );
};

export default NoticeCard;
