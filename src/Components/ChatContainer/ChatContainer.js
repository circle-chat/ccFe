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

  const getMessages = msg => {
    messages.push(msg)
    setMessages([...messages])
  }

  useEffect(() => {
    socket.on("message",function(msg) {  
      getMessages(msg); 
      socket.emit('received', true)
    }); 
  },[messages.length])

  useEffect(() => {
    socket.on("join_room",function(data) {  
      setRoomDetails(data)
      socket.emit('received', true)
    });
  },[roomDetails])

  const leaveChat = () => {
    socket.disconnect()
  }

  useLayoutEffect(() => {
    socket.emit('join_group', {groupCode, name})
    setTimeout(setRoomDetails, 3000, { user_two: 'kyle' })
    return leaveChat
  }, []) 


  return (
    <section className="ChatContainer">
      <ChatDisplay userTwo={ roomDetails.user_two } group={ groupCode } messages={ messages } />
      {error && <p className='error'>{ error }</p>}
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
