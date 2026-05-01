import FeeStructureTable from "../../components/feecard/FeeCard";
import FeeStructureTable2 from "../../components/feecard/FeeCard2";
import { useNavigate } from "react-router-dom";

import "./feestructure.css";

export const FeeStructure = () => {
  const navigate = useNavigate();

  const applicationSteps = [
    "Students who want hostel admission should apply during college admission.",
    "Selection is made according to entrance rank and the hostel eligibility list published by the college.",
    "Newly admitted students should read all hostel instructions carefully before applying or checking in.",
    "Any doubt should be clarified with the warden before the process is completed.",
    "Violation of hostel rules on the grounds of ignorance will not be accepted and may attract disciplinary action.",
  ];

  return (
    <div className="fee-structure-page">
      <div className="fee-structure-shell">
        <section className="fee-hero">
          <div className="fee-hero-copy">
            <span className="fee-hero-kicker">Hostel Admissions</span>
            <h1>Transparent hostel fees with a clearer admission path.</h1>
            <p>
              The campus hostel accommodates up to 100 students and offers
              Wi-Fi, maintained rooms, mess facilities, and day-to-day student
              support. Admissions are prioritized based on entrance rank and
              distance from the institute, so the summary below helps applicants
              plan before booking.
            </p>

            <div className="fee-hero-points">
              <div className="fee-hero-point">
                <strong>100 Seats</strong>
                <span>In-campus student capacity</span>
              </div>
              <div className="fee-hero-point">
                <strong>3 Programs</strong>
                <span>MCA, MBA and M.Tech allocation</span>
              </div>
              <div className="fee-hero-point">
                <strong>Merit Based</strong>
                <span>Admission depends on eligibility and rank</span>
              </div>
            </div>
          </div>

          <div className="fee-hero-card">
            <div className="fee-hero-card-header">
              <span>Fee Snapshot</span>
              <strong>Current Session</strong>
            </div>
            <FeeStructureTable />
          </div>
        </section>

        <section className="fee-status-section">
          <div className="fee-section-heading">
            <span className="fee-section-kicker">Live Availability</span>
            <h2>Seat allocation at a glance</h2>
            <p>
              Check how many seats are already occupied in each program before
              continuing with room booking.
            </p>
          </div>
          <FeeStructureTable2 />
        </section>

        <section className="fee-application-section">
          <div className="fee-application-copy">
            <span className="fee-section-kicker">How To Apply</span>
            <h2>Read these points before you book a room.</h2>
            <p>
              Only students listed in the confirmed hostel eligibility list
              should proceed with registration and room booking.
            </p>
          </div>

          <div className="fee-application-grid">
            {applicationSteps.map((step, index) => (
              <div key={step} className="fee-step-card">
                <span className="fee-step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{step}</p>
              </div>
            ))}
          </div>

          <div className="fee-cta-panel">
            <div>
              <strong>Ready to continue?</strong>
              <p>
                Proceed only if your name appears in the hostel eligible
                student list.
              </p>
            </div>
            <button onClick={() => navigate("/getroom")} className="applybtnr">
              Book Room
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
