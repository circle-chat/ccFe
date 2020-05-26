import React, { useState, useEffect } from 'react';
import './RoomForm.css';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';

function RoomForm() {
  const [ roomname, setRoomname ] = useState('')
  const [ rules, handleRules ] = useState([])
  const [ potentialRule, setRule ] = useState('')
  const roomID = uniqid()
  // useEffect()

  const addRule = e => {
    e.preventDefault()
    const formattedRule = {id: uniqid(), rule: potentialRule}
    handleRules([...rules, formattedRule])
    setRule('')
  }

  const removeRule = ruleID => {
    handleRules(rules.filter(rule => rule.id !== ruleID))
  }

  const handleEnter = (e) => {
    e.preventDefault()
    if (e.keycode === 13) {
      addRule(e)
    }
  }

  const createRules = () => {
    return rules.map(rule => {
      return (
        <div key={ rule.id }>
          <button type='button' id={ rule.id } onClick={ (e)=> { removeRule(e.target.id) } }>X</button>
          <h5>{ rule.rule }</h5>
        </div>
      )
    })
  }

  return (
    <section className="RoomForm">
      <form onSubmit={ (e) => {e.preventDefault()} }>
        <label htmlFor='room-input'>Roomname:
          <input
            id='room-input'
            type='text'
            placeholder='Name'
            value={ roomname }
            onChange={(e) => { setRoomname(e.target.value) }}
          />
        </label>
        <h5>Room Code: { roomID }</h5>
        <section>
          {createRules()}
        </section>
        <label>
          <input id='rule-input'
            type='text'
            placeholder='Rule'
            value={ potentialRule }
            onChange={ (e) => { setRule(e.target.value) } }
            onKeyUp={ (e) => { handleEnter(e) } }
          />
        <button type='button' onClick={(e) => { addRule(e) }}>+</button>
        </label>
        <Link to='/'>
          <button type='button'>
            Cancel
          </button>
        </Link>
        <Link to='/'>
          <button type='button'>
            Create Room
          </button>
        </Link>
      </form>
    </section>
  );
}

export default RoomForm;
