// import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import { Home } from "./pages/home/Home.jsx";
import { Notice } from "./pages/notice/FoodNotice.jsx";
import { StudentDetails } from "./pages/department/StudentDetails.jsx";
import { Gallery } from "./pages/gallery/Gallery.jsx";
import { Hostel_enroll } from "./pages/forms/Hostel_enroll.jsx";
import {FeeStructure} from "./pages/notice/FeeStructure.jsx";
import ForgotPassword from "./pages/forgotpassword/Forgot_password.jsx";
import { Navbar } from "./components/Navbar.jsx";
import Footer from "./components/footer/footer.jsx";
import Login from "./pages/login/Login.jsx";

import { Logout } from "./components/Logout.jsx";
import ContactPage from "./pages/contactUs/ContactUs.jsx";
import Hostels from "./pages/hostels/hostels.jsx";

import { ComplaintForm } from "./pages/forms/Complain.jsx";
import EventNoticePage from "./pages/notice/EventNoticePage.jsx";
import EligibleStudentList from "./pages/notice/EligibleStudentList.jsx";

import Success from "./pages/payment/Success.jsx";
import Failed from "./pages/payment/Failed.jsx";
import CreateRoom from "./pages/Admin/CreateRoom.jsx";
import GetRoom from "./pages/Admin/GetRoom.jsx";
import Room from "./pages/studentroom/Room.jsx";
import Signup from "./pages/signup/StudentRegistration.jsx";
import { useAuth } from "./store/auth.jsx";
import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import GetUser from "./pages/Admin/GetUser.jsx";
import GetContact from "./pages/Admin/GetComplain.jsx";
import GetSupport from "./pages/Admin/GetSupport.jsx";
import PaymentDetails from "./pages/Admin/PaymentDetails.jsx";
import EventsAdmin from "./pages/Admin/EventsAdmin.jsx";
import FoodMenuAdmin from "./pages/Admin/FoodMenuAdmin.jsx";
import FoodNoticeAdmin from "./pages/Admin/FoodNoticeAdmin.jsx";
import FeeTableAdmin from "./pages/Admin/FeeTableAdmin.jsx";
import EligibleStudentAdmin from "./pages/Admin/EligibleStudentAdmin.jsx";


const App = () => {
  const { role } = useAuth()

  return (
    <>
      <ToastContainer/>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={role==="admin" ? <AdminLayout/> : <Home />}>
            {role === "admin" && (
              <>
                <Route path="getuser" element={<GetUser />} />
                <Route path="getcontact" element={<GetContact />} />
                <Route path="support" element={<GetSupport />} />
                <Route path="createRoom" element={<CreateRoom />} />
                <Route path="payment_details" element={<PaymentDetails />} />
                <Route path="events" element={<EventsAdmin />} />
                <Route path="foodmenu" element={<FoodMenuAdmin />} />
                <Route path="foodnotice" element={<FoodNoticeAdmin />} />
                <Route path="fee_table" element={<FeeTableAdmin />} />
                <Route
                  path="eligible_student_list"
                  element={<EligibleStudentAdmin />}
                />
              </>
            )}
          </Route>
          <Route path="/notice" element={<Notice />} />
          <Route path="/student_details" element={<StudentDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/hostel_enroll"
            element={role === "admin" ? <Navigate to="/" /> : <Hostel_enroll />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={role === "admin" ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/hostels" element={<Hostels />} />
          <Route path="/feestructure" element={<FeeStructure />} />
          <Route
            path="/complain"
            element={role === "admin" ? <Navigate to="/" /> : <ComplaintForm />}
          />
          <Route path="/event_notice" element={<EventNoticePage />} />
          <Route
            path="/eligible-student-list"
            element={<EligibleStudentList />}
          />
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
          <Route path="/getAll" element={<GetRoom />} />
          <Route path="/getRoom" element={<Room />} />

        </Routes>
       <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
