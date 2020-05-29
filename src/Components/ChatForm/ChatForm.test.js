import React from "react";
import ChatForm from "./ChatForm";
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

 const mockSetError = jest.fn()



function renderChatForm() {
  return render(
        <ChatForm socket={socket} roomCode={'test-code'} setError={mockSetError} />
  )
}

describe("<ChatForm />", () => {
  socket.emit = jest.fn()

  it("User can send a chat", () => {
    const { getByText, getByPlaceholderText } = renderChatForm()

    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')

    fireEvent.change(messageInput, { target: { value: 'Test' } })
    fireEvent.click(messageSend)

    expect(socket.emit).toHaveBeenCalled()
    expect(socket.emit).toHaveBeenCalledWith('message', {message:'Test', room:'test-code'})
  });

  it("Error is set on blocked input", () => {
    const { getByText, getByPlaceholderText } = renderChatForm()

    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')

    fireEvent.click(messageSend)

    expect(mockSetError).toHaveBeenCalled()
    expect(mockSetError).toHaveBeenCalledWith('message must contain text')
  });

  it("Error is cleared on valid input", () => {
    const { getByText, getByPlaceholderText } = renderChatForm()

    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')

    fireEvent.click(messageSend)

    expect(mockSetError).toHaveBeenCalled()

    fireEvent.change(messageInput, { target: { value: 'Test' } })
    fireEvent.click(messageSend)

    expect(mockSetError).toHaveBeenCalledWith('')
  });

});
