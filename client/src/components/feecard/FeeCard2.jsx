import { useEffect, useState } from "react";
import "./feecard2.css"
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
    <div className="FC mx-auto mt-5 w-full max-w-3xl rounded-lg border border-slate-200 bg-white shadow-sm">
      <h1 className="rounded-t-lg bg-slate-700 px-5 py-3 text-center text-x font-semibold text-white">
        Student Allocation Status
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-[420px] w-full text-sm text-slate-800">
          <thead className="bg-green-200 p-5">
            <tr className="">
              <th className="border border-slate-400 px-4 py-2 text-center font-medium">M.C.A</th>
              <th className="border border-slate-400 px-4 py-2 text-center font-medium">M.B.A</th>
              <th className="border border-slate-400 px-4 py-2 text-center font-medium">M.Tech</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center hover:bg-slate-50">
              <td className="border border-slate-200 px-4 py-3">{mca} out of 40</td>
              <td className="border border-slate-200 px-4 py-3">{mba} out of 40</td>
              <td className="border border-slate-200 px-4 py-3">{mtech} out of 10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeStructureTable2;
