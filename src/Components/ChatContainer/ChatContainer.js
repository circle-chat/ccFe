import React, { useState, useEffect, useLayoutEffect } from 'react';
import './ChatContainer.css';
import ChatForm from './../ChatForm/ChatForm.js'
import ChatDisplay from './../ChatDisplay/ChatDisplay.js'
import io from 'socket.io-client';   
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


const endPoint = "http://localhost:5000";  

function ChatContainer({ groupCode, roomCode, name }) {
  const socket = io.connect(`${endPoint}`);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [roomDetails, setRoomDetails] = useState( { user_two: null } );



  useEffect(() => {
    socket.on("message",function(msg) {  
      setMessages([...messages, msg]); 
      socket.emit('recived', true)
    });
  },[messages.length])

  useEffect(() => {
    socket.on("join_room",function(data) {  
      setRoomDetails(data)
      socket.emit('recived', true)
    });
  },[roomDetails])

  const leaveChat = () => {
    socket.emit('leave', roomDetails)
  }

  useLayoutEffect(() => {
    socket.emit('join_group', {groupCode, name})

    return leaveChat
  }, []) 


  return (
    <section className="ChatContainer">
      <ChatDisplay userTwo={ roomDetails.user_two } group={ groupCode } messages={ messages } />
      {error && <p>{ error }</p>}
      { roomDetails.user_two && <ChatForm name={name} roomCode={ roomCode } setError={ setError } socket={ socket } /> }
      { !groupCode && <Redirect to='/' /> }
    </section>
  );
}

const mapStateToProps = state => ({
  groupCode: state.groupCode,
  roomCode: state.roomCode,
  name: state.name
})


export default connect(mapStateToProps, null)(ChatContainer);
