import React, { useState, useEffect } from 'react';
import './ChatContainer.css';
import ChatForm from './../ChatForm/ChatForm.js'
import ChatDisplay from './../ChatDisplay/ChatDisplay.js'
import io from 'socket.io-client';   
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { addRoomCode, leaveChat } from '../../Actions/index.js'
import uniqid from 'uniqid'
import Filter from 'bad-words';




function ChatContainer({ groupCode, roomCode, name, addRoomCode, leaveChatRoom }) {
  const socket = io.connect(process.env.REACT_APP_BACKEND);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [sid, setSid] = useState('');
  const [roomDetails, setRoomDetails] = useState( { match: null } );
  const [url, setUrl] = useState(window.location.pathname)
  const [filterStatus, setFilterStatus] = useState( true )
  const [filter, setFilter] = useState(new Filter({ placeHolder: '🤬' }))

  useEffect(()=>{
    if (!filterStatus) {
      setFilter(new Filter({ emptyList:true }))
    } else {
      setFilter(new Filter({ placeHolder: '🤬' }))
    }
  }, [filterStatus])

  const messagesEndRef = React.createRef()

  const displayMessages = (msg) => {
    messages.push(msg)
    setMessages([...messages]); 
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  const leaveChat = () => {
    socket.emit('leave_room')
    socket.disconnect(true);
  }

  const handleLeave = (e) => {
    if (url === window.location.pathname) {
      setUrl('/')
      e.target.dataset.tooltip = 'Click Again to Confirm Leave'
    } else {
      socket.emit('message', {message:`${name} left the chat`, sid, id: uniqid(), room: roomCode, sender_name: name});
      leaveChat()
      leaveChatRoom()
    }
  }

  const handleStay = (e) => {
    if (e.target.id !== 'leave-chat') {
      setUrl(window.location.pathname)
      const leaveBtn = document.getElementById('leave-chat')
      leaveBtn.dataset.tooltip = 'Click to Leave'
    }
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
// eslint-disable-next-line
  },[messages.length]);

  useEffect(() => {
    socket.on("join_room",function(roomDetails) {  
      addRoomCode(roomDetails.room)
      setRoomDetails(roomDetails);

      socket.emit('received', true);
    });
// eslint-disable-next-line
  },[]);



  useEffect(() => {
    if (groupCode && !roomCode) {
      socket.emit('join_group', {'access_code': groupCode, 'name': name});
    }

    socket.on('connect', (stuff) => {
      console.log('Successfully connected!');
      setSid(socket.id)
    });
    window.addEventListener('click', handleStay)

    return () => {
      window.removeEventListener('click', handleStay)
      leaveChat()
    }
// eslint-disable-next-line
  }, []) 




  return (
    <section className="ChatContainer">
      <Link className='back-button' to={url}>
        <button id='leave-chat' onClick={(e) => {handleLeave(e)}}data-tooltip="Click to leave">
          ＜
        </button>
      </Link>
      <ChatDisplay
        ref={messagesEndRef}
        userTwo={ roomDetails.match }
        group={ groupCode }
        sid={sid}
        messages={ messages }
        filter={ filter }
        filterOn={ filterStatus }
        setFilterStatus={ setFilterStatus }
      />
      {error && <p className='error'>{ error }</p>}
      { roomDetails.match && <ChatForm
          name={name}
          sid={sid}
          roomCode={ roomCode }
          setError={ setError }
          socket={ socket }
          filter={ filter }
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
  leaveChatRoom: () => dispatch(leaveChat()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
