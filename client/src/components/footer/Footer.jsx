import Map from "../map/GoogleMap.jsx";

const Footer = () => {
  return (
    <div className="footcontainer">
      <div className="footer-main h-[260px] flex bg-blue-900">
        <div className="footerleft flex  justify-center items-center  w-[50%]">
          <div className="add h-60 w-[60%]  ">
            <h1 className="text-amber-400 text-xl font-bold">Reach Us : </h1>
            <h2 className="text-white text-xl">
              Institute of Management and Information Technology , Hostel
            </h2>
            <br />
            <p className="text-white text-sm">
              Location : Matha sahi , Post- Tulsipur
            </p>
            <p className="text-white text-sm">
              {" "}
              Dist- Cuttack , Odisha , India{" "}
            </p>
            <p className="text-white text-sm">Pin : 753008</p>
            <p className="text-white text-sm">Contact-No : +91-671-2506711</p>
            <p className="text-white text-sm">
              Mail : imitcuttack@rediffmail.com
            </p>
            <p className="text-white text-sm">
              Website : www.imithostelmanagementofficial.in
            </p>
          </div>
        </div>
        <div className="footerright flex justify-center items-center w-[50%]">
          <h1 className="text-amber-400 text-xl font-bold">
            Google Map Location :{" "}
          </h1>
          <Map />
        </div>
      </div>
      <div className="copyright h-7 bg-amber-400 text-sm flex justify-center items-center">
<h1>(c) 2025 Institute of Management and Information Technology - All Rights Reserved.</h1>

      </div>
    </div>
  );
};
export default Footer;
