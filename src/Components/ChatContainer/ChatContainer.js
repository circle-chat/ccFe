import React, { useState, useEffect, useLayoutEffect } from 'react';
import './ChatContainer.css';
import ChatForm from './../ChatForm/ChatForm.js'
import ChatDisplay from './../ChatDisplay/ChatDisplay.js'
import io from 'socket.io-client';   
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { addRoomCode } from '../../Actions/index.js'



const endPoint = "http://localhost:8080";  

function ChatContainer({ groupCode, roomCode, name, addRoomCode }) {
  const socket = io.connect(`${endPoint}`);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [roomDetails, setRoomDetails] = useState( { user_two: null } );

  const messagesEndRef = React.createRef()

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    socket.on("message",function(msg) {  
      setMessages([...messages, msg]); 
      socket.emit('received', true)
    });
  },[messages.length])

  useEffect(() => {
    socket.on("join_room",function(room) {  
      setRoomDetails({user_two: 'test user'})
      addRoomCode(room)
      socket.emit('received', true)
    });
  },[roomDetails])

  const leaveChat = () => {
    socket.disconnect();
  }

  useLayoutEffect(() => {
    socket.emit('join_group', {access_code: groupCode, user_name: name})
    return leaveChat
  }, []) 



  return (
    <section className="ChatContainer">
      <ChatDisplay ref={messagesEndRef} userTwo={ roomDetails.user_two } group={ groupCode } messages={ messages } />
      {error && <p className='error'>{ error }</p>}
      { roomDetails.user_two && <ChatForm name={name}
      roomCode={ roomCode }
      setError={ setError } scrollToBottom={scrollToBottom}
      socket={ socket } /> }
      { !groupCode && <Redirect to='/' /> }
    </section>
  );
}

const mapStateToProps = state => ({
  groupCode: state.groupCode,
  roomCode: state.roomCode,
  name: state.name
})

const mapDispatchToProps = dispatch => ({
  addRoomCode: code => dispatch(addRoomCode(code)),
})


export default connect(mapStateToProps, null)(ChatContainer);
