import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  Mic,
  SearchOutlined,
  InsertEmoticon,
  MoreVert,
} from "@material-ui/icons";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "../src/firebase";
import { useStateValue } from "./StateProvider";
import firebase from 'firebase/compat/app';

// import firebase from "firebase"; ///// error given
// import firebase

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
        setRoomName(snapshot.data().name);
    });
      db.collection("rooms")
          .doc(roomId)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => doc.data()))
          
      );
    }
  },[roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
      // error to be derived timestamp
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h5>{roomName}</h5>
            <p>{new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message,index) => (
          <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`} key={index}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp ">
            {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            value={input}
            id="namef"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Text a message"
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
