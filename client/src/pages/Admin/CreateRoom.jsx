import React, { useEffect, useState } from 'react'
import "./createroom.css"
const CreateRoom = () => {
    const [room, setRoom] = useState({room_no:"",price:""})
    const [rooms, setRooms] = useState([])
    const [isLoadingRooms, setIsLoadingRooms] = useState(true)
    const handleChange =(e)=>{
        setRoom({...room, [e.target.name]:e.target.value})
    }
    const getRooms = async()=>{
        try {
            setIsLoadingRooms(true)
            const res = await fetch('http://localhost:3000/api/room/getAllRoom',{
                method:"GET"
            })
            const data = await res.json()
            setRooms(data.rooms || [])
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingRooms(false)
        }
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
            getRooms();
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
      getRooms()
    },[])

  return (
    <div className="create-room-page">
      <div className="create-room-layout">
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

        <div className="room-status-card">
          <div className="create-room-header room-status-header">
            <div>
              <h2>Created Rooms</h2>
              <p>Check which rooms are available or already booked.</p>
            </div>
            <div className="room-count">{rooms.length} rooms</div>
          </div>

          <div className="room-status-list">
            {isLoadingRooms ? (
              <p className="room-status-empty">Loading rooms...</p>
            ) : rooms.length === 0 ? (
              <p className="room-status-empty">No rooms created yet.</p>
            ) : (
              rooms.map((item) => (
                <div key={item._id} className="room-status-item">
                  <div>
                    <h3>Room {item.room_no}</h3>
                    <p>Price: Rs. {item.price}</p>
                    {!item.isAvailable && (
                      <p>Registration No: {item.stu_id?.regd_no || "N/A"}</p>
                    )}
                  </div>
                  <span
                    className={`room-badge ${item.isAvailable ? "available" : "booked"}`}
                  >
                    {item.isAvailable ? "Available" : "Booked"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRoom
