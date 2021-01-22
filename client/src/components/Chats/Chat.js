import {useState,useEffect} from 'react'

import queryString from "query-string"

import { getData } from '../../axios/apiCalls'
import { urls } from '../../config/urls'

const Chat=(props)=>{
const [id, setUserId] = useState(null)
const [rooms, setRooms] = useState([1, 2])

  const getRoomsList = async (id) => {
  const roomslist = await getData(urls.rooms.getUserRooms, { id: id });
    if(roomslist) {
    setRooms(roomslist)
    }
}
const openChats = (e, roomid) => {
  e.preventDefault()
  props.history.push(`/chat${props.location.search}&room=${roomid}`)
}
    useEffect(() => {
        const query=queryString.parse(location.search)
setUserId(query.id)
        }, [id, props.location.search])

    return (
        <div>
            {rooms.map(room => {
              return (
                <div key={room} onClick={e => openChats(e, room)}>
                {room}
                </div>
              )
            })}
        </div>
    )
}

export default Chat