import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';

const ChatSidebar = ({ isOpen, onClose, taskId, studentID, profID }) => {
  const [newMessage, setNewMessage] = React.useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const ENDPOINT="http://localhost:4000";

  useEffect(() => {
    // const newSocket = socketIOClient('/chat', { path: '/socket.io' });
   
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    newSocket.emit('joinRoom', { taskId, studentID, profID });

    newSocket.on('pastMessages', (message) => {
      setMessages(prevMessages => [...prevMessages, { ...message}]);
    });
    newSocket.on('receiveMessage', (message) => {
      // setMessages(prevMessages => [...prevMessages, { ...message, isSender: false }]);
      setMessages(prevMessages => {
        // Check if the message is already in the state (i.e., it's a duplicated sender message)
        const isDuplicated = prevMessages.some(msg => msg.id === message.id);
        if (!isDuplicated) {
          // If it's not duplicated, add it to the state as a receiver message
          return [...prevMessages, { ...message, isSender: false }];
        }
        return prevMessages;
      });
    });

    return () => newSocket.close();
  }, [taskId, studentID, profID]);

  // const sendMessage = (messageContent) => {
  //   if (socket) {
  //     const message = { authorId: taskId, content: messageContent, taskId };
  //     socket.emit('sendMessage', messageContent, {taskId, studentID, profID });
  //     setNewMessage('');
  //   }
  // };

  const sendMessage = (messageContent) => {
    if (socket) {
      const message = {
        content: messageContent,
        isSender: true,
        id: Date.now(),
      };
      socket.emit('sendMessage', message, { taskId, studentID, profID });
      setMessages(prevMessages => [...prevMessages, message]); // Add the message to the local state
      setNewMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(newMessage);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed right-0 top-0 w-1/4 h-full bg-white p-4 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
      <button onClick={onClose} className="absolute top-0 right-0 m-2">
        ✕
      </button>
      <div className="mb-4">
        <h2 className="font-bold text-lg">Chat with {profID}</h2>
        {/* <div className="h-5/6 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="my-2 p-2 bg-gray-200 rounded">
              <p className="text-sm">{message}</p>
            </div>
          ))}
        </div> */}
        <div className="h-5/6 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={`${message.content}-${message.createdAt}`}
              className={`my-2 p-2 rounded ${
                !message.isSender ? 'bg-blue-100 ml-auto text-right' : 'bg-gray-200 mr-auto text-left'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-full mt-2">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatSidebar;
