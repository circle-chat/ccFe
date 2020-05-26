import React from 'react';
import './ChatContainer.css';
import { Link } from 'react-router-dom';
import ChatForm from './../ChatForm/ChatForm.js'

function ChatContainer() {

  return (
    <section className="ChatContainer">
      <ChatForm />
    </section>
  );
}

export default ChatContainer;
