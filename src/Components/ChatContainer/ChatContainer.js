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

  useEffect(() => {
    socket.on("message",function(msg) {  
      setMessages([...messages, msg]); 
      socket.emit('received', true);
    });

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToBottom()
  },[messages, messages.length, messagesEndRef, socket]);

  useEffect(() => {
    socket.on("join_room",function(room) {  
      addRoomCode(room)
      setRoomDetails({user_two: 'test user'});
      socket.emit('received', true);
    });
  });



  useLayoutEffect(() => {
    socket.emit('join_group', {access_code: groupCode, user_name: name});

    const leaveChat = () => {
      socket.disconnect();
    }

    return leaveChat;
  }, [groupCode, name, socket]) 



  return (
    <section className="ChatContainer">
      <ChatDisplay ref={messagesEndRef} userTwo={ roomDetails.user_two } group={ groupCode } messages={ messages } />
      {error && <p className='error'>{ error }</p>}
      { roomDetails.user_two && <ChatForm
          name={name}
          roomCode={ roomCode }
          setError={ setError }
          socket={ socket }
        />
      }
      { !groupCode && <Redirect to='/' /> }
    </section>
  );
}

const mapStateToProps = state => ({
  groupCode: state.groupCode,
  roomCode: state.roomCode,
  name: state.name
});

const mapDispatchToProps = dispatch => ({
  addRoomCode: code => dispatch(addRoomCode(code)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
