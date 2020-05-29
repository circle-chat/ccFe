import React, { useState, useEffect, Component } from 'react';
import './ChatDisplay.css';

function Participant({ waiting, userTwo, group }) {

  const displayParticipant = ( message ) => {
    return (
      <section>
        <h3>{ group }</h3>
        <h3>{ message }</h3>
        <h3>{ userTwo }</h3>
      </section>
    )
  }

  const waitingMessage = 'Waiting to Connect'

  const connectedMessage = 'Connected With'

  return (
    <section className="Participant">
      { !waiting && displayParticipant( connectedMessage ) }
      { waiting && displayParticipant( waitingMessage ) }
    </section>
  );
}

export default Participant;
