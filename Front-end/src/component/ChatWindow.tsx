
import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface Contact {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'away' | 'offline';
    lastMessage: string;
    time: string;
    unreadCount: number;
}

interface Message {
    id: string;
    text: string;
    timestamp: string;
    type: 'sent' | 'received';
}

interface ChatWindowProps {
    contact?: Contact;
    messages: Message[];
    onSendMessage: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages, onSendMessage }) => {
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Simulate typing indicator when receiving messages
        if (messages.length > 0 && messages[messages.length - 1].type === 'sent') {
            setIsTyping(true);
            const timer = setTimeout(() => {
                setIsTyping(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [messages]);

    if (!contact) {
        return (
            <div className="chat-window">
                <div className="messages-container">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        flexDirection: 'column',
                        color: '#64748b'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                        <h2>Select a conversation</h2>
                        <p>Choose from your existing conversations or start a new one</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="avatar">
                    {contact.avatar}
                    <div className={`status-indicator status-${contact.status}`}></div>
                </div>
                <div className="chat-header-info">
                    <div className="chat-header-name">{contact.name}</div>
                    <div className={`chat-header-status ${isTyping ? 'typing-indicator' : ''}`}>
                        {isTyping ? 'Typing...' : contact.status === 'online' ? 'Online' : 'Last seen recently'}
                    </div>
                </div>
            </div>

            <div className="messages-container">
                {messages.map(message => (
                    <MessageBubble key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
};

export default ChatWindow;
