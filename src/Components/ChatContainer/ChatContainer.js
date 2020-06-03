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
  const [roomDetails, setRoomDetails] = useState( { match: null } );

  const messagesEndRef = React.createRef()

  const displayMessages = (msg) => {
    messages.push(msg)
    setMessages([...messages]); 
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {

    socket.on("message",function(msg) {  
      displayMessages(msg)
      socket.emit('received', true);
    });


    scrollToBottom()
  },[messages.length]);

  useEffect(() => {
    socket.on("join_room",function(roomDetails) {  
      addRoomCode(roomDetails.room)
      setRoomDetails(roomDetails);
      socket.emit('received', true);
    });
  },[]);

  useEffect(() => {
    socket.on('join_group', function(group) {
      console.log(group);
    });
  },[])


  useLayoutEffect(() => {
    if (groupCode && !roomCode) {
      socket.emit('join_group', {'access_code': groupCode, 'name': name});
      // console.log({'access_code': groupCode, 'user_name': name});
    }

    socket.on('connect', (stuff) => {
      console.log('Successfully connected!');
    });

    const leaveChat = () => {
      socket.disconnect();
    }

    return () => {
      leaveChat()
    }
  }, []) 




  return (
    <section className="ChatContainer">
      <ChatDisplay
        ref={messagesEndRef}
        userTwo={ roomDetails.match }
        group={ groupCode }
        messages={ messages }
      />
      {error && <p className='error'>{ error }</p>}
      { roomDetails.match && <ChatForm
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
