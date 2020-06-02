import React from "react";
import ChatForm from "./ChatForm";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocketMock from 'socket.io-mock';
import uniqid from 'uniqid';

jest.mock('uniqid')



 let socket = new SocketMock();

 const mockSetError = jest.fn()



function renderChatForm() {
  return render(
        <ChatForm
          socket={socket}
          roomCode={'test-code'} setError={mockSetError}
          name={'alan'}
        />
  )
}

describe("<ChatForm />", () => {
  socket.emit = jest.fn()
  uniqid.mockReturnValue('12345id')
  it("User can send a chat", () => {
    const { getByText, getByPlaceholderText } = renderChatForm()

    const messageInput = getByPlaceholderText('Type a message here...')
    const messageSend = getByText('Send Message')

    fireEvent.change(messageInput, { target: { value: 'Test' } })
    fireEvent.click(messageSend)

    expect(socket.emit).toHaveBeenCalled()
    expect(socket.emit).toHaveBeenCalledWith('message', {message:'Test', sender_name: "alan", room:'test-code', "id": "12345id"})
  });

  it("Error is set on blocked input", () => {
    const { getByText } = renderChatForm()

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
