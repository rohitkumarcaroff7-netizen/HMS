import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img
              src="./imitlogo.png"
              alt="imit logo"
              height="50px"
              width="80px"
              id="imitlogo"
            />
            <div className=" w-[80%] ">
              <h1 id="hs" className="text-xl tracking-wide ">
                Institute of Management and Information Technology
              </h1>
              <h2 id="hs" className="text">
                Tulasipur , Cuttack ( A constituent college of BPUT , Govt. of
                Odisha )
              </h2>
            </div>

            <div className="btns">
              {isLoggedIn ? (
                <>
                  <button
                    className="btn"
                    id="lout"
                    onClick={() => navigate("/logout")}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn h-7"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="btn h-7"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
          {/* <div className="navdiv fixed w-[97%] bg-white"> */}
          <div className="navdiv">
            <div className="navleft">
              <div className="ticker">
                <h2 className="hostelname text-white">
                  Welcome to I.M.I.T Hostel Management Website || Place : Matha Sahi ,
                  Tulasipur , Cuttack
                </h2>
              </div>
            </div>
            <div className="navright ">
              <nav>
                <ul className="navul ">
                  <li>
                    <NavLink to="/" className="flex items-center gap-1">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <div className="dropdown">
                      <NavLink to="#" className="dropbtn">
                        Notice
                      </NavLink>
                      <div className="dropdown-content rounded-xs">
                        <NavLink to="/feestructure" className="dropbtn">
                          Fee structure
                        </NavLink>
                        <NavLink to="/eligible-student-list" className="dropbtn">
                          Eligible student list
                        </NavLink>
                        <NavLink to="/event_notice" className="dropbtn">
                          Event Notice
                        </NavLink>
                        <NavLink to="/notice" className="dropbtn">
                          Food notice
                        </NavLink>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown">
                      <NavLink to="#" className="dropbtn">
                        Department
                      </NavLink>
                      <div className="dropdown-content rounded-xs">
                        <NavLink to="/student_details" className="dropbtn">
                          Student Details
                        </NavLink>
                        {/* <NavLink to="#" className="dropbtn">
                          Payment Status
                        </NavLink> */}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown ">
                      <NavLink to="#" className="dropbtn">
                        Forms
                      </NavLink>
                      <div className="dropdown-content rounded-xs">
                        <NavLink to="/hostel_enroll" className="dropbtn">
                          Hostel Enroll
                        </NavLink>
                        <NavLink to="/complain" className="dropbtn">
                          Complain/Request
                        </NavLink>
                       
                      </div>
                    </div>
                  </li>
                  <li>
                    <NavLink to="/gallery">Gallery</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
