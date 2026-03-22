import React, { useEffect, useState } from 'react'

const GetRoom = () => {
    const [, setRooms] = useState([])
    const getRooms = async()=>{
        try {
            const res = await fetch("http://localhost:3000/api/room/getAllRoom",{
                method:"GET"
            })
            const data = await res.json()
            console.log(data)
            setRooms(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getRooms()
    },[])

  return (
    <div className='h-[400px]'>GetRoom</div>
  )
}

export default GetRoom
