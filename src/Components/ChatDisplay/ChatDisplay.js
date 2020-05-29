import React, { useState, useEffect, Component } from 'react';
import './../ChatContainer/ChatContainer.css';
import { Link } from 'react-router-dom';
import ChatContainer from './../ChatContainer/ChatContainer.js'
import io from 'socket.io-client';   

const endPoint = "http://localhost:5000";  
const socket = io.connect(`${endPoint}`);

class ChatDisplay extends React.Component {
  render() {
    return (
      <ul className="ChatDisplay">
        {this.props.messages.map(message => {
          return (
            <li key={message.id}>
              <div>
                {message.senderId}
              </div>
              <div>
                {message.text}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default ChatDisplay;
