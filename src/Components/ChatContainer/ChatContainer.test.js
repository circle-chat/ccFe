import React from "react";
import ChatContainer from "./ChatContainer";
import io from "socket.io-client";
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocketMock from 'socket.io-mock';
import { addNewCode, addRoomCode, addName } from './../../Actions';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';


const testStore = createStore(rootReducer);






function renderChatContainer() {
  return render(
    <Provider store={testStore}>
        <ChatContainer />
    </Provider>
  )
}

testStore.dispatch(addNewCode('test-code'))
testStore.dispatch(addRoomCode('test-room-code'))
testStore.dispatch(addName('test-name'))

describe("<ChatContainer />", () => {
  let socket
  beforeEach(() => {
    socket = new SocketMock();
    socket.socketClient.disconnect = jest.fn()
    io.connect = jest.fn().mockImplementation(() => socket.socketClient)
    window.HTMLElement.prototype.scrollIntoView = function() {};
  })

  it("User can join_group", () => {
    socket.on('join_group', function (message) {

      expect(message.name).toBe('test-name');
      expect(message.groupCode).toBe('test-code');
     });
  });

  it("User can send a chat", () => {
    const { getByText, getByPlaceholderText } = renderChatContainer()
    act(() => {
      socket.emit('join_room', 'test-room-code');
    });
    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')
    let result


    socket.on('message', function (message) {
      result = message.message
      expect(message.room).toBe('test-room-code');
     });

    fireEvent.change(messageInput, { target: { value: 'Test' } })
    fireEvent.click(messageSend)

    expect(result).toBe('Test');
  });

  it("Error shows up when input is blocked", () => {
    const { getByText } = renderChatContainer()
    act(() => {
      socket.emit('join_room', {user_two: 'karl'})
    });

    const messageSend = getByText('Send Message')

    fireEvent.click(messageSend)

    const errorMsg = getByText('message must contain text')

    expect(errorMsg).toBeInTheDocument()
  });

  it("Should be able to recive a message", () => {
    const { getByText, getByPlaceholderText } = renderChatContainer()
    act(() => {
      socket.emit('join_room', {user_two: 'karl'})
    });
    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')


    socket.on('message', function (message) {
      socket.emit('message', message)
     });

    fireEvent.change(messageInput, { target: { value: 'Test' } })
    fireEvent.click(messageSend)

    socket.on('received', function (received) {
        expect(received).toBe(true);
    });
    const message = getByText('Test')
    expect(message).toBeInTheDocument();

  });

  it("Should show waiting screen if not connected", () => {
    const { getByText } = renderChatContainer()
    const waitingMessage = getByText('Waiting to Connect')

    expect(waitingMessage).toBeInTheDocument()
  });
});
