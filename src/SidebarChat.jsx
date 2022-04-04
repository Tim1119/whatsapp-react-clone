import { Avatar } from "@material-ui/core";
import { React, useState, useEffect } from "react";
import "./SidebarChat.css"; 
import db from "../src/firebase";
import { Link } from "react-router-dom";

function SidebarChat({addNewChat, id, name}) {
  const [seed, setSeed] = useState("");
  const [messages,setMessages] = useState("")

  useEffect(() => {
    if (id){
      db.collection('rooms').doc(id)
      .collection('messages')
      .orderBy('timestamp','desc')
      .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => 
      doc.data()))
      )
    }
  },[id])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat =()=>{
    const roomName = prompt("Please enter name for the chat room");
    if (roomName){
      // add room to database
        db.collection('rooms').add({
          name: roomName,
        })      

    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h4>{name}</h4>
        <p>{messages[0]?.message  }</p>
      </div>
    </div>
    </Link>
  ): (
    <div onClick={createChat} className="sidebarChat">
        <h4>Add new Chat</h4>
    </div>
  )
}

export default SidebarChat;
