import React, { useState, useEffect, Component } from 'react';
import './ChatDisplay.css';

function ChatDisplay({ messages }) {

  return (
    <ul className="ChatDisplay">
      { messages.map(message => {
        return (
          <li key={message.id}>
            <div>
              {message.senderName}
            </div>
            <div>
              {message.text}
            </div>
          </li>
        )
      })}
    </ul>
  );
}

export default ChatDisplay;
