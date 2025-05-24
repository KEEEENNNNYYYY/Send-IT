
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
    return (
        <div className={`message-bubble ${message.type}`}>
    <div className="message-content">
        {message.text}
        </div>
        <div className="message-time">
        {message.timestamp}
        </div>
        </div>
);
};

export default MessageBubble;
