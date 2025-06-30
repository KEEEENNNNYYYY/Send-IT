
import React from 'react';

interface Message {
    id: string;
    text: string;
    timestamp: string;
    type: 'sent' | 'received';
}

interface MessageBubbleProps {
    message: Message;
}


const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    console.log(message.timestamp);
    
    const formattedTime = new Date(message.timestamp.split('.')[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    return (
        <div className={`message-bubble ${message.type}`}>
    <div className="message-content">
        {message.text}
        </div>
        <div className="message-time">
        {formattedTime}
        </div>
        </div>
);
};

export default MessageBubble;
