import React from 'react'
import { Link } from "react-router-dom";

const Failed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[640px]  text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p className="text-lg text-gray-700 mb-6">
        Unfortunately, your payment could not be processed.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 h-8 w-40 flex justify-center items-center hover:bg-slate-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Failed