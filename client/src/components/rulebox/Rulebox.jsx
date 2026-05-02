import React from "react";
import "./RuleBox.css";

const items = [
  {
    id: 1,
    title: "Hostel Timings",
    lines: [
      "Boys Hostel Open: 5.00 AM - 10.00 PM",
      "Girls Hostel Open: 5.00 AM - 7.00 PM",
    ],
    photo:
      "https://img.freepik.com/free-vector/open-closed-signs_78370-3074.jpg",
  },
  {
    id: 2,
    title: "Meal Schedule",
    lines: [
      "Morning Breakfast: 8.30 AM - 10.00 AM",
      "Lunch: 1.00 PM - 2.00 PM",
      "Dinner: 9.00 PM - 10.00 PM",
    ],
    photo:
      "https://img.freepik.com/free-vector/lunch-time-concept-illustration_114360-8331.jpg?semt=ais_hybrid&w=740",
  },
  {
    id: 3,
    title: "Electrical Appliances",
    lines: [
      "Electronic devices need permission before use.",
      "Unauthorized appliances like heaters or stoves are banned.",
      "Allowed devices include essentials like laptops and mobile chargers.",
    ],
    photo:
      "https://t3.ftcdn.net/jpg/05/25/73/42/360_F_525734229_Lo2fB6B7wRPYKzvQMCJRv8ZIjRmNEI26.jpg",
  },
  {
    id: 4,
    title: "Visitors Policy",
    lines: [
      "No outsiders are allowed to enter hostel rooms.",
      "Visitors must register at the front desk.",
      "Meet only in designated areas.",
    ],
    photo:
      "https://static.wixstatic.com/media/a73a57_cd6e8a07584a4733b612b0aec93cdace~mv2.png/v1/fill/w_480,h_480,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/a73a57_cd6e8a07584a4733b612b0aec93cdace~mv2.png",
  },
  {
    id: 5,
    title: "Dining Rules",
    lines: ["Meals must be eaten in the dining areas only."],
    photo:
      "https://media.istockphoto.com/id/938649404/vector/people-in-cafe.jpg?s=612x612&w=0&k=20&c=qo1bHQtaEJ-txWgyQ9JGO0_7Ix3GrXkACm3mjc6D3J0=",
  },
  {
    id: 6,
    title: "Restricted Activities",
    lines: ["No smoking or drinking is allowed inside the hostel premises."],
    photo:
      "https://thumbs.dreamstime.com/b/prohibition-signs-smoking-drinking-no-drinking-no-smoking-sign-doodle-icon-vector-illustration-prohibition-signs-smoking-255914343.jpg",
  },
  {
    id: 7,
    title: "Property Care",
    lines: [
      "Any damage to hostel property must be reported.",
      "Compensation may be required for damages caused.",
    ],
    photo:
      "https://media.istockphoto.com/id/536312161/vector/broken-house.jpg?s=612x612&w=0&k=20&c=kWnFpHmqhNbYfSRZUnNjYef9fkxoIyfEEVLnFvDUq2w=",
  },
  {
    id: 8,
    title: "Respect and Conduct",
    lines: ["Respect staff, wardens, and fellow hostel mates at all times."],
    photo:
      "https://miro.medium.com/v2/resize:fit:1000/1*ATucesmFpyP1nycHtU1MIA.jpeg",
  },
  {
    id: 9,
    title: "Zero Tolerance",
    lines: [
      "Any kind of harassment or violence leads to strict action, including expulsion.",
    ],
    photo: "https://www.jnujaipur.ac.in/images/anti-1.svg",
  },
  {
    id: 10,
    title: "Safety Reporting",
    lines: ["Inform the warden immediately in case of suspicious activity."],
    photo:
      "https://cdn2.vectorstock.com/i/1000x1000/74/41/inform-rubber-stamp-vector-13677441.jpg",
  },
  {
    id: 11,
    title: "Leave Application",
    lines: ["Prior approval from the warden is required for staying out overnight."],
    photo: "https://static.thenounproject.com/png/2569060-200.png",
  },
  {
    id: 12,
    title: "Wi-Fi Usage",
    lines: ["Use hostel Wi-Fi responsibly and avoid prohibited sites."],
    photo:
      "https://assets.f-secure.com/i/opengraph/articles/what-is-cyber-security.jpg",
  },
];

const RuleBox = () => {
  return (
    <section className="rulebox-card">
      <div className="rulebox-header">
        <span className="rulebox-kicker">Hostel Guide</span>
        <h1>Rules and Time Table</h1>
        <p>Important timings and guidelines for a safe and smooth hostel stay.</p>
      </div>

      <ul className="rulebox-list">
        {items.map((item) => (
          <li key={item.id} className="rulebox-item">
            <img src={item.photo} alt={item.title} className="rulebox-image" />

            <div className="rulebox-content">
              <div className="rulebox-item-top">
                <span className="rulebox-number">
                  {String(item.id).padStart(2, "0")}
                </span>
                <h2>{item.title}</h2>
              </div>

              <div className="rulebox-lines">
                {item.lines.map((line, index) => (
                  <p key={`${item.id}-${index}`}>{line}</p>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RuleBox;
