import React, { useEffect, useState } from 'react'
import "./createroom.css"
const CreateRoom = () => {
    const [room, setRoom] = useState({room_no:"",price:""})
    const [rooms, setRooms] = useState([])
    const [isLoadingRooms, setIsLoadingRooms] = useState(true)
    const [selectedRoom, setSelectedRoom] = useState(null)
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
            const fetchedRooms = data.rooms || []
            setRooms(fetchedRooms)
            setSelectedRoom((currentSelectedRoom) => {
                if (!currentSelectedRoom) {
                    return null
                }

                return (
                    fetchedRooms.find((item) => item._id === currentSelectedRoom._id) || null
                )
            })
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

          <div className="booked-student-panel">
            <div className="booked-student-header">
              <h2>Booked Student Details</h2>
              <p>Click a booked room from the list to view the student details here.</p>
            </div>

            {!selectedRoom ? (
              <p className="room-status-empty">Select a booked room to see student details.</p>
            ) : selectedRoom.isAvailable ? (
              <p className="room-status-empty">This room is currently available and has no student assigned.</p>
            ) : (
              <div className="booked-student-card">
                <div className="booked-student-top">
                  <img
                    src={selectedRoom.stu_id?.photoUrl}
                    alt={selectedRoom.stu_id?.username}
                    className="booked-student-avatar"
                  />
                  <div>
                    <h3>{selectedRoom.stu_id?.username || "N/A"}</h3>
                    <p>Room {selectedRoom.room_no}</p>
                  </div>
                </div>

                <div className="booked-student-grid">
                  <p><strong>Registration No:</strong> {selectedRoom.stu_id?.regd_no || "N/A"}</p>
                  <p><strong>Email:</strong> {selectedRoom.stu_id?.email || "N/A"}</p>
                  <p><strong>Phone:</strong> {selectedRoom.stu_id?.phone || "N/A"}</p>
                  <p><strong>Course:</strong> {selectedRoom.stu_id?.course || "N/A"}</p>
                  <p><strong>Year:</strong> {selectedRoom.stu_id?.st_yr || "N/A"}</p>
                  <p><strong>Gender:</strong> {selectedRoom.stu_id?.gender || "N/A"}</p>
                  <p className="booked-student-address"><strong>Address:</strong> {selectedRoom.stu_id?.address || "N/A"}</p>
                </div>
              </div>
            )}
          </div>
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
                <button
                  key={item._id}
                  type="button"
                  className={`room-status-item ${selectedRoom?._id === item._id ? "active" : ""}`}
                  onClick={() => setSelectedRoom(item)}
                >
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
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRoom
