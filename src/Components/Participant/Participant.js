import React, { useState, useEffect, Component } from 'react';
import './Participant.css';
import LoadingBalls from './../LoadingBalls/LoadingBalls.js'

function Participant({ waiting, userTwo, group }) {

  const displayParticipant = ( message ) => {
    return (
      <section>
        <h3>Circle Code: { group }</h3>
        { message }
        <h3>{ userTwo }</h3>
      </section>
    )
  }

  const waitingMessage = (
    <section className='waiting-message'>
      <h3>Waiting to Connect</h3>
      <LoadingBalls />
    </section>
  )

  const connectedMessage = <h3>Connected With</h3>

  return (
    <section className="Participant">
      { !waiting && displayParticipant( connectedMessage ) }
      { waiting && displayParticipant( waitingMessage ) }
    </section>
  );
}

export default Participant;
