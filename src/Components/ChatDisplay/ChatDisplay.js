import React, { useState, useEffect, Component } from 'react';
import './ChatDisplay.css';
import Participant from './../Participant/Participant.js'

function ChatDisplay({ messages, group, userTwo }) {

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
      { !userTwo && <Participant group={ group } waiting={ true } /> }
      { userTwo && <Participant group={ group } userTwo={ userTwo } waiting={ false } /> }
      { userTwo && displayMessages() }


    </ul>
  );
}

export default ChatDisplay;
