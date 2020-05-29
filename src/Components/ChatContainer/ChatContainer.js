import React, { useState, useEffect, useLayoutEffect } from 'react';
import './ChatContainer.css';
import ChatForm from './../ChatForm/ChatForm.js'
import ChatDisplay from './../ChatDisplay/ChatDisplay.js'
import io from 'socket.io-client';   
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


const endPoint = "http://localhost:5000";  

function ChatContainer({ groupCode, roomCode }) {
  const socket = io.connect(`${endPoint}`);
  const [messages, setMessages] = useState([]);
  const [groupDetails, setGroupDetails] = useState({});
  const [room, setRoom] = useState('');
  const [error, setError] = useState('');
  const [roomDetails, setRoomDetails] = useState( { user_two: null } );



  const getMessages = () => { 
    socket.on("message", msg => { 
      setMessages([...messages, JSON.parse(msg)]); 
    }); 
  };

  useEffect(() => {
    socket.on("message",function(msg) {  
      getMessages(msg); 
      socket.emit('recived', true)
    }); 

    socket.on("group_joined",function(groupDetails) {  
      formattedDetails = JSON.parse(groupDetails)
      setGroupDetails(formattedDetails)
    }); 

    socket.on("room_joined",function(roomCode) {  
      setRoom(roomCode)
    }); 

  },[messages.length, groupDetails])

  const leaveChat = () => {
    socket.emit('leave', room)
  }

  useLayoutEffect(() => {
    socket.emit('join_group', groupCode)

    return leaveChat
  }, []) 


  return (
    <section className="ChatContainer">
      <ChatDisplay userTwo={ roomDetails.user_two } group={ groupCode } messages={ messages } />
      {error && <p>{ error }</p>}
      { roomDetails.user_two && <ChatForm roomCode={ roomCode } setError={ setError } socket={ socket } /> }
      { !groupCode && <Redirect to='/' /> }
    </section>
  );
}

const mapStateToProps = state => ({
  groupCode: state.groupCode,
  roomCode: state.roomCode
})


export default connect(mapStateToProps, null)(ChatContainer);
