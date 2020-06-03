import React, { useState, useEffect, Component } from 'react';
import './ChatDisplay.css';
import Participant from './../Participant/Participant.js'

function ChatDisplay({ messages, group, userTwo, setFilterStatus, filterOn }) {

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
      { userTwo && <label>
        <input type='checkbox' checked={filterOn} onChange={()=>{setFilterStatus(!filterOn)}}/>
      </label> }
      { userTwo && <ul> {displayMessages()} </ul> }
    </section>
  );
}

export default ChatDisplay;
