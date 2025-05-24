
import React, { useState, useRef, KeyboardEvent } from 'react';

interface MessageInputProps {
    onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
        }
    };

    const handleSubmit = () => {
        if (message.trim()) {
            onSendMessage(message.trim());
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        adjustTextareaHeight();
    };

    return (
        <div className="message-input-container">
            <div className="message-input-wrapper">
        <textarea
            ref={textareaRef}
            className="message-input"
            placeholder="Type a message..."
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
        />
                <button
                    className="send-button"
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                >
                    ➤
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
