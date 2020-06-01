import React, { useState, useEffect, Component } from 'react';
import './ChatDisplay.css';
import Participant from './../Participant/Participant.js'

const ChatDisplay = React.forwardRef(({ messages, group, userTwo }, ref) => {
  console.log(ref);
  const displayMessages = () => {
    return messages.map(message => {
      return (
        <li key={message.id}>
          <div>
            {message.sender_name}
          </div>
          <div>
            {message.message}
          </div>
        </li>
      )
    })
  }

  return (
    <section className="ChatDisplay">
      { !userTwo && <Participant group={ group } waiting={ true } /> }
      { userTwo && <Participant group={ group } userTwo={ userTwo } waiting={ false } /> }
      { userTwo && <ul> {displayMessages()} </ul> }
      <div className='empty-space' ref={ref} />
    </section>
  );
})

export default ChatDisplay;
