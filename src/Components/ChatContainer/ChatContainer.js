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
  const [messages, setMessages] = useState([{text: 'test1', id: 1, senderName: 'John' }, {text: 'test2', id: 2, senderName: 'Allen' }, {text: 'test3', id: 3, senderName: 'Alan' }]);
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
      socket.emit('received', true)
    }); 
  },[messages.length])

  useLayoutEffect(() => {
    socket.emit('join_group', groupCode)
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
