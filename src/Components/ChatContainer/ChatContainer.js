import React, { useState, useEffect } from 'react';
import './ChatContainer.css';
import ChatForm from './../ChatForm/ChatForm.js'
import ChatDisplay from './../ChatDisplay/ChatDisplay.js'
import io from 'socket.io-client';   
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { addRoomCode } from '../../Actions/index.js'



const endPoint = "https://circle-jcg5wby7mq-uc.a.run.app";  

function ChatContainer({ groupCode, roomCode, name, addRoomCode }) {
  const socket = io.connect(`${endPoint}`);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [sid, setSid] = useState('');
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
      if (msg.id) {
        displayMessages(msg)
        socket.emit('received', true);
      } else {
        console.log(msg);
      }
    });

    scrollToBottom()
  },[messages.length]);

  useEffect(() => {
    socket.on("join_room",function(roomDetails) {  
      addRoomCode(roomDetails.room)
      setRoomDetails(roomDetails);
      socket.emit('received', true);
      // setSid(group.sid)
    });
  },[]);

  useEffect(() => {
    if (groupCode && !roomCode) {
      socket.emit('join_group', {'access_code': groupCode, 'name': name});
    }

    socket.on('connect', (stuff) => {
      console.log('Successfully connected!');
      setSid(socket.id)
      console.log(sid);
    });

    const leaveChat = () => {
      socket.disconnect();
    }

    return () => {
      socket.emit('leave_room')
      leaveChat()
    }
  }, []) 




  return (
    <section className="ChatContainer">
      <ChatDisplay
        ref={messagesEndRef}
        userTwo={ roomDetails.match }
        group={ groupCode }
        sid={sid}
        messages={ messages }
      />
      {error && <p className='error'>{ error }</p>}
      { roomDetails.match && <ChatForm
          name={name}
          sid={sid}
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
