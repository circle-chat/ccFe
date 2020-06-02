import React from "react";
import ChatDisplay from "./ChatDisplay";
import ChatForm from './../ChatForm/ChatForm.js';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import { MemoryRouter as Router } from 'react-router-dom';
// import { postGroup } from './../../APICalls.js'
import uniqid from 'uniqid';
import { handleClick } from './../ChatForm/ChatForm.js';
import { addNewCode, addRoomCode } from './../../Actions';
// import SocketMock from 'socket.io-mock';

// jest.mock('./../../APICalls.js')
// jest.mock('uniqid')

const createMessage = (message) => {
  return { 'message': message, 'sender_name': 'joe', 'id': uniqid() }
}

// let socket = new SocketMock();

function renderChatDisplay() {
  return render(
    <ChatDisplay
            userTwo={ 'name string' }
            group={ 'code string' }
            messages={ [ createMessage('Test-Message1'), createMessage('Test-Message2'), createMessage('Test-Message3') ] }
          />
  )
}

describe("<ChatDisplay />", () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};

  it('can display a message', () => {
      const { getByText, debug } = renderChatDisplay()

      const message1 = getByText('Test-Message1')
      const message2 = getByText('Test-Message2')
      const message3 = getByText('Test-Message3')

      expect(message1).toBeInTheDocument
      expect(message2).toBeInTheDocument
      expect(message3).toBeInTheDocument
  })

});
