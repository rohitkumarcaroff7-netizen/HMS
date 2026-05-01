import { useEffect, useState } from "react";
import "./feecard2.css";

const FeeStructureTable2 = () => {
  const [mca, setMca] = useState(0);
  const [mba, setMba] = useState(0);
  const [mtech, setMtech] = useState(0);

  const getData1 = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/allMCA");
      const data = await res.json();
      setMca(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getData2 = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/allMBA");
      const data = await res.json();
      setMba(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getData3 = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/allMTECH");
      const data = await res.json();
      setMtech(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData1();
    getData2();
    getData3();
  }, []);

  return (
    <div className="allocation-card">
      <div className="allocation-card-header">
        <h3>Student Allocation Status</h3>
        <p>Current occupied seats across the hostel programs.</p>
      </div>

      <div className="allocation-table-wrap">
        <table className="allocation-table">
          <thead>
            <tr>
              <th>M.C.A</th>
              <th>M.B.A</th>
              <th>M.Tech</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{mca} out of 40</td>
              <td>{mba} out of 40</td>
              <td>{mtech} out of 10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeStructureTable2;
