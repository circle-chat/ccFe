import React, { useState } from 'react';
import './JoinForm.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewCode, addName } from './../../Actions';

function JoinForm({ codes, addNewCode, group = '', addName }) {
  const [ user, setUser ] = useState('')
  const [ groupCode, setGroupCode ] = useState(group)

  const saveMyCodes = () => {
    addName(user)
    addNewCode(groupCode)
    if ( !codes.includes(groupCode)) {
      window.localStorage.setItem('codes', JSON.stringify( [groupCode, ...codes] ))
    }
  }
  console.log(group);

  const createOptions = () => {
    return codes.map(code => (<option key={ code } value={ code }/>))
  }

    return (
        <form className="JoinForm">
          <section className='input-container'>
            <label htmlFor='name-input'>Name:
            </label>
            <input
            id='name-input'
            type='text'
            placeholder='Name'
            value={ user }
            onChange={(e) => { setUser(e.target.value) }}
            />
          </section>
          <section className='input-container'>
            <label htmlFor='code-input'>Group Code:
            </label>
            <input
            id='code-input'
            list='codes'
            placeholder='Group Code'
            value={ groupCode }
            onChange={(e) => { setGroupCode(e.target.value) }}
            />
          <datalist id='codes'>
            {createOptions()}
          </datalist>
          </section>
          <section className='button-box'>
            <Link to='/create'>
              <button>
              Create Group
              </button>
            </Link>
            <Link to='/chat'>
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
