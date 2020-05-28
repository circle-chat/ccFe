import React, { useState, useEffect, useLayoutEffect } from 'react';
import './ChatContainer.css';
import { Link } from 'react-router-dom';
import ChatForm from './../ChatForm/ChatForm.js'
import io from 'socket.io-client';   
import { connect } from 'react-redux';


const endPoint = "http://localhost:5000";  
const socket = io.connect(`${endPoint}`);

function ChatContainer({ groupCode }) {

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const getMessages = () => { 
    socket.on("message", msg => { 
      setMessages([...messages, msg]); 
    }); 
  };

  useEffect(() => {  getMessages() }, [messages.length]);

  useLayoutEffect(() => {
    socket.emit('join_group', groupCode)
  }, []) 


  return (
    <section className="ChatContainer">

      {error && <p>{error}</p>}
      <ChatForm setError={ setError } socket={ socket }/>
    </section>
  );
}

const mapStateToProps = state => ({
  groupCode: state.groupCode,
})


export default connect(mapStateToProps, null)(ChatContainer);
