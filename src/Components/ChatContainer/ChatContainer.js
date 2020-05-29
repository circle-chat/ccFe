import React, { useState, useEffect, useLayoutEffect } from 'react';
import './ChatContainer.css';
import ChatForm from './../ChatForm/ChatForm.js'
import ChatDisplay from './../ChatDisplay/ChatDisplay.js'
import io from 'socket.io-client';   
import { connect } from 'react-redux';


const endPoint = "http://localhost:5000";  

function ChatContainer({ groupCode, roomCode }) {
  const socket = io.connect(`${endPoint}`);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const getMessages = (msg) => { 
    setMessages([...messages, msg]); 
  };

  useEffect(() => {
    socket.on("message",function(msg) {  
      getMessages(msg); 
      socket.emit('recived', true)
    }); 
  },[messages.length])

  useLayoutEffect(() => {
    socket.emit('join_group', groupCode)
  }, []) 


  return (
    <section className="ChatContainer">

      {error && <p>{error}</p>}
      <ChatForm roomCode={roomCode} setError={ setError } socket={ socket }/>
    </section>
  );
}

const mapStateToProps = state => ({
  groupCode: state.groupCode,
  roomCode: state.roomCode
})


export default connect(mapStateToProps, null)(ChatContainer);
