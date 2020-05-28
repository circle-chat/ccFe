import React from 'react';
import './ChatContainer.css';
import { Link } from 'react-router-dom';
import ChatForm from './../ChatForm/ChatForm.js'
import io from 'socket.io-client';   

const endPoint = "http://localhost:5000";  
const socket = io.connect(`${endPoint}`);

function ChatContainer() {

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const getMessages = () => { 
    socket.on("message", msg => { 
      setMessages([...messages, msg]); 
    }); 
  };

  useEffect(() => {  getMessages() }, [messages.length]); 


  return (
    <section className="ChatContainer">
      <ChatDisplay messages={ messages }/>
      {error && <p>{error}</p>}
      <ChatForm setError={ setError } socket={ socket }/>
    </section>
  );
}

export default ChatContainer;
