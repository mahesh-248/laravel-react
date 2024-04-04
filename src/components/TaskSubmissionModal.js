import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar'

const TaskSubmissionModal = ({ task, onClose }) => {
    const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (newMessage) => {

    setMessages([...messages, newMessage]);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-1/2">
        <button onClick={onClose} className="float-right">✕</button>
        <h3 className="text-lg font-bold">{task.title} Submission</h3>
    
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs">
          Plagiarism Check
        </button>
        <button onClick={() => setShowChat(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
          Chat with Student
        </button>

        
        <ChatSidebar 
            isOpen={showChat} 
            onClose={() => setShowChat(false)} 
            taskId={1}
            studentID={2}
            profID={3}
            // faculty={{ name: task.facultyName }} 
            // messages={messages} 
            // onSendMessage={handleSendMessage} 
        />
      </div>
    </div>
  );
};

export default TaskSubmissionModal;
