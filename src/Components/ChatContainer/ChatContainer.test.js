import React from "react";
import ChatContainer from "./ChatContainer";
import io from "socket.io-client";
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocketMock from 'socket.io-mock';
import { addNewCode, addRoomCode } from './../../Actions';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';


const testStore = createStore(rootReducer);

 let socket = new SocketMock();




function renderChatContainer() {
  return render(
    <Provider store={testStore}>
        <ChatContainer />
    </Provider>
  )
}

testStore.dispatch(addNewCode('test-code'))
testStore.dispatch(addRoomCode('test-room-code'))

describe("<ChatContainer />", () => {
  io.connect = jest.fn().mockImplementation(() => socket.socketClient)

  it("User can send a chat", () => {
    const { getByText, getByPlaceholderText, debug } = renderChatContainer()

    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')
    let result


    socket.on('message', function (message) {
      result = message.message
      expect(message.room).toBe('test-room-code');
     });

    socket.on('join_group', function (groupCode) {
         expect(groupCode).toBe('test-code');
     });

    fireEvent.change(messageInput, { target: { value: 'Test' } })
    fireEvent.click(messageSend)

    expect(result).toBe('Test');
  });

  it("Error shows up when input is blocked", () => {
    const { getByText, getByPlaceholderText, debug } = renderChatContainer()

    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')

    fireEvent.click(messageSend)

    const errorMsg = getByText('message must contain text')

    expect(errorMsg).toBeInTheDocument()
  });

  it("Should be able to recive a message", () => {
    const { getByText, getByPlaceholderText, debug } = renderChatContainer()

    socket.on('received', function (received) {
        expect(received).toBe(true);
    });

    act(() => {
      socket.emit('message', 'Hello World')
    });
    debug()
  });
});
