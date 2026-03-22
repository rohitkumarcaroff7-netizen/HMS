import React, { useState } from 'react'
import "./createroom.css"
const CreateRoom = () => {
    const [room, setRoom] = useState({room_no:"",price:""})
    const handleChange =(e)=>{
        setRoom({...room, [e.target.name]:e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/room/create',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(room)
            })
            console.log(res)
            const data = await res.json()
            console.log(data)
            alert("Room created successsfully.");
            setRoom({room_no:"",price:""});
        } catch (error) {
            console.log(error)
            
        }
    }      
  return (
    <div className="create-room-page">
      <div className="create-room-card">
        <div className="create-room-header">
          <h1>Create Room</h1>
          <p>Add a new room and set its price.</p>
        </div>
        <form className="create-room-form" onSubmit={handleSubmit}>
          <div className="create-room-field">
            <label htmlFor="room_no">Room Number</label>
            <input
              type="number"
              name="room_no"
              id="room_no"
              value={room.room_no}
              placeholder="101"
              onChange={handleChange}
              required
            />
          </div>
          <div className="create-room-field">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={room.price}
              placeholder="3000"
              onChange={handleChange}
              required
            />
          </div>
          <button className="createroombtn" type="submit">Add Room</button>
        </form>
      </div>
    </div>
  )
}

export default CreateRoom
