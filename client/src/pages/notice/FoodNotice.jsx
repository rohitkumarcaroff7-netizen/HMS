import "./notice.css";
import React, { useEffect, useState } from "react";
import HostelMenu from "../../components/foodmenu/Menu";

const API = "http://localhost:3000/api/foodnotice";

export const Notice = () => {
  const [title, setTitle] = useState("Food Notice");
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          return;
        }

        setTitle(data?.title || "Food Notice");
        setNotices(Array.isArray(data?.notices) ? data.notices : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotice();
  }, []);

  return (
    <div className="food-notice-page ">
      <div className="transparent-bg flex">
        <div className="flex justify-center  bg-amber-50  w-[50%] ">
          <div className="fn rounded-xl flex justify-center  bg-white h-80 w-[590px] hover:shadow-xl transition-shadow duration-300">
            <div className=" flex flex-col items-center">
              <br />
              <h2 className="text-xl font-bold text-gray-800">{title}</h2><br />
              <ul className="text-sm text-black list-disc list-inside">
                {notices.length === 0 ? (
                  <li>No food notices available right now.</li>
                ) : (
                  notices.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="right w-[50%] h-144 bg-amber-50 ">
          <div className="rightph rounded-xl flex justify-center items-center shadow-sm bg-white w-[640px] hover:shadow-xl transition-shadow duration-300">
            <div >
              <HostelMenu />
            </div>
          </div>
          <div >
          </div>
        </div>
      </div>
    </div>
  );
};


