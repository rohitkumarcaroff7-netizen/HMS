import { useEffect, useState } from "react";
import {
  calculateTotalAmount,
  defaultFeeStructure,
  FEE_STRUCTURE_API,
  normalizeFeeStructure,
} from "./feeStructureData";
import "./feecard2.css";

const FeeStructureTable = () => {
  const [feeStructure, setFeeStructure] = useState(defaultFeeStructure);
  const totalAmount = calculateTotalAmount(feeStructure);

  const asINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  useEffect(() => {
    const fetchFeeStructure = async () => {
      try {
        const res = await fetch(FEE_STRUCTURE_API);
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message || "Failed to load fee structure.");
        }

        setFeeStructure(normalizeFeeStructure(data));
      } catch (error) {
        console.log(error);
        setFeeStructure(defaultFeeStructure);
      }
    };

    fetchFeeStructure();
  }, []);

  return (
    <div className="fee-table-card">
      <div className="fee-table-intro">
        <div>
          <span className="fee-table-kicker">Hostel Charges</span>
          <h3>Hostel Fee Structure</h3>
          <p>Semester and one-time charges shown in Indian Rupees.</p>
        </div>
        <div className="fee-table-total-pill">
          <span>Total Payable</span>
          <strong>{asINR(totalAmount)}</strong>
        </div>
      </div>

      <div className="fee-table-wrap">
        <table className="fee-table">
          <thead>
            <tr>
              <th>
                Mess Advance
                <br />
                <span>(Per Sem)</span>
              </th>
              <th>Seat Rent</th>
              <th>Electricity</th>
              <th>
                Development
                <br />
                <span>(One Time)</span>
              </th>
              <th>
                Caution
                <br />
                <span>(Refundable)</span>
              </th>
              <th>Common Room</th>
              <th className="fee-table-total-heading">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{asINR(feeStructure.messadv)}</td>
              <td>{asINR(feeStructure.seatrent)}</td>
              <td>{asINR(feeStructure.electricityfee)}</td>
              <td>{asINR(feeStructure.devfee)}</td>
              <td>{asINR(feeStructure.cmoney)}</td>
              <td>{asINR(feeStructure.comcharge)}</td>
              <td className="fee-table-total-cell">
                <span className="fee-table-total-label">Grand Total</span>
                <strong>{asINR(totalAmount)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeStructureTable;
