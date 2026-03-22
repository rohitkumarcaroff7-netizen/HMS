import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[640px]  text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. Your room has been booked successfully.
      </p>
      <Link
        to="/"
        className="bg-blue-600 h-8 w-40 flex justify-center items-center text-white px-6 py-2 rounded hover:bg-slate-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};


export default Success