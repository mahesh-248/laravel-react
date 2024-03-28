import React from 'react';

const ChatSidebar = ({ isOpen, onClose, faculty, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(newMessage);
    setNewMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed right-0 top-0 w-1/4 h-full bg-white p-4 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
      <button onClick={onClose} className="absolute top-0 right-0 m-2">
        ✕
      </button>
      <div className="mb-4">
        <h2 className="font-bold text-lg">Chat with {faculty.name}</h2>
        <div className="h-5/6 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="my-2 p-2 bg-gray-200 rounded">
              <p className="text-sm">{message}</p>
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
