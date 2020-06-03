import React, { useState, useEffect } from 'react';
import './JoinForm.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewCode, addName } from './../../Actions';

function JoinForm({ codes, addNewCode, group = '', addName }) {
  const [ user, setUser ] = useState('')
  const [ groupCode, setGroupCode ] = useState('')
  const [ errors, setErrors ] = useState([])

  const saveMyCodes = () => {
    addName(user)
    addNewCode(groupCode)
    if ( !codes.includes(groupCode)) {
      window.localStorage.setItem('codes', JSON.stringify( [groupCode, ...codes] ))
    }
  }

  const handleBlur = (e) => {
    let error = e.target.placeholder
    if (!e.target.value && !errors.includes(error)) {
      setErrors([...errors, error])
    } else {
      setErrors(errors.filter(err => err !== error))
    }
  }

  const createOptions = () => {
    return codes.map(code => (<option key={ code } value={ code }/>))
  }

  const handleEnter = (e) => {
    e.preventDefault()
    if (e.keyCode === 13 && user && groupCode) {
       window.location.pathname = '/group'
    }
  }

  useEffect(() => {
    setGroupCode(group)
  },[group])

    return (
        <form onSubmit={e => handleEnter(e)} className="JoinForm">
          <Link className='back-button' to='/about'>
            <span data-tooltip="Click to Learn About The Circle">
              ?
            </span>
          </Link>
          {errors.length > 1 && <p className='error'>{errors.join(', ')} are required fields</p>}
          {errors.length === 1 && <p className='error'>{errors.join(', ')} is a required field</p>}
          <section className='input-container'>
            <label htmlFor='name-input'>*Name:
            </label>
            <input
            id='name-input'
            type='text'
            placeholder='Name'
            value={ user }
            onKeyUp={ (e) => { handleEnter(e) } }
            onBlur={(e)=> handleBlur(e)}
            onChange={(e) => { setUser(e.target.value) }}
            />
          </section>
          <section className='input-container'>
            <label htmlFor='code-input'>*Group Code:
            </label>
            <input
            id='code-input'
            list='codes'
            placeholder='Group Code'
            value={ groupCode }
            onKeyUp={ (e) => { handleEnter(e) } }
            onBlur={(e)=> handleBlur(e)}
            onChange={(e) => { setGroupCode(e.target.value) }}
            />
          <datalist id='codes'>
            {createOptions()}
          </datalist>
          </section>
          <section className='button-box'>
            <Link to='/create'>
              <button type='button'>
              Create Group
              </button>
            </Link>
            <Link to='/group'>
              <button
                disabled={ !(user && groupCode)}
                onClick={saveMyCodes}
              >
              Chat!
              </button>
            </Link>
          </section>
        </form>
    );
}

const mapStateToProps = (state, ownProps) => ({
  codes: state.codes,
  group: state.groupCode || ownProps.groupCode,
})

const mapDispatchToProps = dispatch => ({
  addNewCode: code => dispatch(addNewCode(code)),
  addName: code => dispatch(addName(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinForm);
