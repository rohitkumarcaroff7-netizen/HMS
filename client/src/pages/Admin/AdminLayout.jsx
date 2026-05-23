import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./adminlayout.css";

const AdminLayout = () => {
  const isDark = false;

  return (
    <div className={`admin-layout ${isDark ? "is-dark" : ""}`}>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-badge">Admin Panel</span>
          <h1>Dashboard</h1>
          <p>Manage hostel data and student access.</p>
        </div>

        <nav className="admin-nav">
          <NavLink
            to="getuser"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Users
          </NavLink>
          <NavLink
            to="getcontact"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Complaints
          </NavLink>
          <NavLink
            to="support"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Support
          </NavLink>
          <NavLink
            to="createroom"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Create Room
          </NavLink>
          <NavLink
            to="payment_details"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Payment Details
          </NavLink>
          <NavLink
            to="events"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Events
          </NavLink>
          <NavLink
            to="carousel"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Home Carousel
          </NavLink>
          <NavLink
            to="foodmenu"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Food Menu
          </NavLink>
          <NavLink
            to="foodnotice"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Food Notice
          </NavLink>
          <NavLink
            to="fee_table"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Fee Table
          </NavLink>
          <NavLink
            to="eligible_student_list"
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            Add Student List
          </NavLink>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
