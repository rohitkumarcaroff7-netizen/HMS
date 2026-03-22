import "./studentcard.css"
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentCard = () => {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    axios.get("http://localhost:3000/api/getStudents/students")
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading students...</p>;
  
}


  return (
        <div >
    {students.map((student) => (
 <div key={student._id} className="flex items-center bg-white shadow-lg rounded-lg p-4 w-[330px] h-24">
      <img
        className="prf w-20 h-20 rounded-xs object-cover shadow"
        src="./profile1.jpg"
        alt="Profile"
      />
      <div className="ri flex-1">
        <h2 className="text-base font-semibold text-gray-800">
        {student.name}
        </h2>
        <p className="text-sm text-gray-500">{student.course} | {student.year} Year</p>
        <p className="text-sm text-gray-700 font-medium mt-1">
          Regd No: {student.regd_no}
        </p>
      </div>
    </div>))}
        
   </div>
  );
};

export default StudentCard;
