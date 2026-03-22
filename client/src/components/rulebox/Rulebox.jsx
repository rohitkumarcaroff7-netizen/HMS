import React from 'react'
import './RuleBox.css' // Import the CSS file for styling

const RuleBox = () => {


    const items = [
      {
        "id": 1,
        
        "name": "Boys Hostel Open [ 5.00 AM - 10.00 PM ] ",
        "name1": "Girls Hostel Open [5.00 AM - 7.00 PM]",
        
        "photo": "https://img.freepik.com/free-vector/open-closed-signs_78370-3074.jpg"
      },
      {
        "id": 2,
        "name": "Morning Breakfast - [ 8.30 AM - 10 AM ] ",
        "name1": "Lunch - [ 1.00 PM - 2 PM ]",
        "name3": "Dinner - [ 9.00 PM - 10 PM ]",
        "photo": "https://img.freepik.com/free-vector/lunch-time-concept-illustration_114360-8331.jpg?semt=ais_hybrid&w=740"
      },
      {
        "id": 3,
       "name": "Electronic device not allowed , Need permission. Unauthorized appliances like heaters or stoves are banned.",
       "name1": "Only allowed devices (like laptops, mobile chargers) are permitted.",
       
    
        "photo": "https://t3.ftcdn.net/jpg/05/25/73/42/360_F_525734229_Lo2fB6B7wRPYKzvQMCJRv8ZIjRmNEI26.jpg"
      },
      {
        "id": 4,
        "name": "No outsiders allowed to enter the hostel rooms.",
        "name1":"Visitors must register at the front desk and meet only in designated areas.",
        "photo": "https://static.wixstatic.com/media/a73a57_cd6e8a07584a4733b612b0aec93cdace~mv2.png/v1/fill/w_480,h_480,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/a73a57_cd6e8a07584a4733b612b0aec93cdace~mv2.png"
      },
      {
        "id": 5,
        "name": "Meals must be eaten in dining areas.",
        
        "photo": "https://media.istockphoto.com/id/938649404/vector/people-in-cafe.jpg?s=612x612&w=0&k=20&c=qo1bHQtaEJ-txWgyQ9JGO0_7Ix3GrXkACm3mjc6D3J0="
      },
      {
        "id": 6,
        "name": "No smoking or drinking in the hostel premises.",
        "photo": "https://thumbs.dreamstime.com/b/prohibition-signs-smoking-drinking-no-drinking-no-smoking-sign-doodle-icon-vector-illustration-prohibition-signs-smoking-255914343.jpg"
      },
      {
        "id": 7,
        "name": "Any damage to hostel property must be reported and compensated for.",
        
        "photo": "https://media.istockphoto.com/id/536312161/vector/broken-house.jpg?s=612x612&w=0&k=20&c=kWnFpHmqhNbYfSRZUnNjYef9fkxoIyfEEVLnFvDUq2w="
      },
      {
        "id": 8,
        "name": "Respect staff, wardens, and fellow hostel mates.",
        
        "photo": "https://miro.medium.com/v2/resize:fit:1000/1*ATucesmFpyP1nycHtU1MIA.jpeg"
      },
      {
        "id": 9,
        "name": "Any kind of harassment or violence leads to strict action, including expulsion.",
        
        "photo": "https://www.jnujaipur.ac.in/images/anti-1.svg"
      },
      {
        "id": 10,
        "name": "Inform the warden in case of any suspicious activity.",

        "photo": "https://cdn2.vectorstock.com/i/1000x1000/74/41/inform-rubber-stamp-vector-13677441.jpg"
      },
      {
        "id": 11,
        "name": " • Leave Application",
        "name1":"Prior approval needed from the warden for staying out overnight.",
        "photo": "https://static.thenounproject.com/png/2569060-200.png"
      }
      ,
      {
        "id": 12,
        "name": " • Wifi",
        "name1":"Use hostel Wi-Fi responsibly; avoid visiting prohibited sites.",
        "photo": "https://assets.f-secure.com/i/opengraph/articles/what-is-cyber-security.jpg"
      }
    ]
  
    return (
      <div className="h-60 w-110">
        <h1 className="text-x  text-center text-white bg-blue-900 ">Rules and time tables</h1>
        <ul className=" eventUl h-120 overflow-y-auto border rounded-b-lg space-y-2 bg-amber-100 shadow-xl">
          {items.map((id, index) => (

            <li key={index} className="eventLi  bg- rounded flex  text-black text-xs ">

               <img src={id.photo} alt={id.name} className="w-20 h-20  rounded" />
               <div className="desci"> {id.name}
               <br /> {id.name1} <br /> {id.name3}
              </div>
                
             
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
 
export default RuleBox