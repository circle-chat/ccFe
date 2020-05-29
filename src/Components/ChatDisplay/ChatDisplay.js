import React, { useState, useEffect, Component } from 'react';
import './ChatDisplay.css';
import Participant from './../Participant/Participant.js'

function ChatDisplay({ messages, connected }) {

  const displayMessages = () => {
    return messages.map(message => {
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
    })
  }

  return (
    <ul className="ChatDisplay">
      { !connected && <Participant waiting={ true } /> }
      { connected && <Participant waiting={ false } /> }
      { connected && displayMessages() }


    </ul>
  );
}

export default ChatDisplay;
