const FeeStructureTable = () => {
  const feeDetails = [
    {
      messadv: 15000,
      seatrent: 8000,
      electricityfee: 3600,
      devfee: 2000,
      cmoney: 1000,
      comcharge: 200,
      tamount: 29800,
    },
  ];

  const asINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm h-20 w-full max-w-3xl mx-auto mt-5">
      <h1 className="rounded-t-lg bg-blue-900 px-4 py-3 text-center text-base font-semibold text-white">
        Fee Structure
      </h1>

      <table className="w-full table-fixed text-[11px] text-slate-800 md:text-xs">
        <thead className="bg-blue-50">
          <tr>
            <th className="border border-slate-200 px-1 py-3 align-top font-medium leading-snug">
              Mess Advance
              <br />
              <span className="text-[10px] text-slate-600">(Per Sem)</span>
            </th>
            <th className="border border-slate-200 px-1 py-3 align-top font-medium leading-snug">
              Seat Rent
            </th>
            <th className="border border-slate-200 px-1 py-3 align-top font-medium leading-snug">
              Electricity
            </th>
            <th className="border border-slate-200 px-1 py-3 align-top font-medium leading-snug">
              Development
              <br />
              <span className="text-[10px] text-slate-600">(One Time)</span>
            </th>
            <th className="border border-slate-200 px-1 py-3 align-top font-medium leading-snug">
              Caution
              <br />
              <span className="text-[10px] text-slate-600">(Refundable)</span>
            </th>
            <th className="border border-slate-200 px-1 py-3 align-top font-medium leading-snug">
              Common Room
            </th>
            <th className="border border-slate-200 bg-amber-100 px-1 py-3 align-top font-medium leading-snug">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {feeDetails.map((item, index) => (
            <tr key={index} className="text-center hover:bg-slate-50">
              <td className="border border-slate-200 px-1 py-3">{asINR(item.messadv)}</td>
              <td className="border border-slate-200 px-1 py-3">{asINR(item.seatrent)}</td>
              <td className="border border-slate-200 px-1 py-3">{asINR(item.electricityfee)}</td>
              <td className="border border-slate-200 px-1 py-3">{asINR(item.devfee)}</td>
              <td className="border border-slate-200 px-1 py-3">{asINR(item.cmoney)}</td>
              <td className="border border-slate-200 px-1 py-3">{asINR(item.comcharge)}</td>
              <td className="border border-slate-200 bg-amber-50 px-1 py-3 font-semibold">
                {asINR(item.tamount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeeStructureTable;
