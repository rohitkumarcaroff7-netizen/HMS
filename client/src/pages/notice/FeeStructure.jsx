import FeeStructureTable from "../../components/feecard/FeeCard"
import FeeStructureTable2 from "../../components/feecard/FeeCard2"
import { useNavigate } from "react-router-dom";

import "./feestructure.css"
export const FeeStructure = () => {

const navigate = useNavigate();

  return (
    <div className="fee-structure-page h-[1100px] bg-gradient-to-r from-blue-50 to-blue-200">
        <div className="fcontainer flex  items-center justify-evenly gap-1 h-[420px] bg-blue-100 w-[100%]">
                <div className="str w-[42%]">
          <h1 className="text-xl font-semi-bold">Hostel Fee Structure</h1> <br />
        <p className='text-sm'>The college has one in-campus hostel with capacity of 100 inmates equiped with Wi-Fi facilities. The rooms are spacious, well-furnished and duly maintained. Mess facility is provided for students. Hygienic vegetarian and non-vegetarian foods are provided to the students at a nominal rate. Hostel is provided with first aid kits and medicines to take care of simple illness. The hostel is a three stair building. Presently a limited numbers of seats are available for upcoming new batch students. Admissions are fully based on OJEE ranks and applicants permanent resident distance from the institute.</p></div>
        
        <div className="fee w-[49.3%]">
<FeeStructureTable />

        </div>
        
        </div>
       <div className="FB">< FeeStructureTable2/></div> 

        <h1 className="apply text-center text-s">[ How to apply ]</h1>
        <h2 className="text-center text-sm">Read carefully before applying.</h2>
<div className="hta flex justify-items-center flex-col text-s">

<p className="">• The students those who want to take admission in the hostel are required to apply during the time of admission into the college.<br/>
• The selection will be made as per the rank obtained in the entrance exam and the same will be notified in the college website.<br/>
• The newly admitted students should read all the points carefully, before applying / check-in to Hostel .<br/> • In case of any doubt, get them clarified from Warden.<br/> • Violation of any of the rules stating ignorance will not be accepted and will attract disciplinary action.<br/>
<br/>
• Reminder -[ Only the confirmed / listed hostel eligibile students should register and book here. ]
<br/>
• Click the below button to apply for hostel.</p>
<div className="">
  <button   onClick={() => navigate("/getroom")} className="applybtnr bg-blue-800 text-sm rounded-sm text-white">Book Room</button>
</div>
</div>
       

    </div>
  )
}

