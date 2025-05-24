import { useState } from 'react';
import './dashboard.css';
import Sidebar from '../../component/Sidebar';
import ChatWindow from '../../component/ChatWindow';

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

const Dashboard = () => {
    const [selectedContact, setSelectedContact] = useState<string>('1');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hey there! How are you doing?', timestamp: '10:30 AM', type: 'received' },
        { id: '2', text: 'I\'m doing great! Thanks for asking. How about you?', timestamp: '10:32 AM', type: 'sent' },
        { id: '3', text: 'Pretty good! Just working on some exciting new projects.', timestamp: '10:33 AM', type: 'received' },
        { id: '4', text: 'That sounds awesome! Would love to hear more about it.', timestamp: '10:35 AM', type: 'sent' },
    ]);

    const [contacts] = useState<Contact[]>([
        { id: '1', name: 'Sarah Johnson', avatar: 'SJ', status: 'online', lastMessage: 'Pretty good! Just working on some...', time: '10:33 AM', unreadCount: 0 },
        { id: '2', name: 'Mike Chen', avatar: 'MC', status: 'online', lastMessage: 'Sure, let\'s schedule that for tomorrow', time: '9:45 AM', unreadCount: 2 },
        { id: '3', name: 'Emma Wilson', avatar: 'EW', status: 'away', lastMessage: 'Thanks for the update!', time: 'Yesterday', unreadCount: 0 },
        { id: '4', name: 'Alex Rodriguez', avatar: 'AR', status: 'offline', lastMessage: 'Perfect, talk soon', time: 'Yesterday', unreadCount: 1 },
        { id: '5', name: 'Lisa Zhang', avatar: 'LZ', status: 'online', lastMessage: 'The presentation went really well', time: '2 days ago', unreadCount: 0 },
    ]);

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'sent'
        };
        setMessages(prev => [...prev, newMessage]);

        // Simulate received message after 2 seconds
        setTimeout(() => {
            const responses = [
                'That\'s really interesting!',
                'I completely agree with you.',
                'Thanks for sharing that.',
                'Let me think about it.',
                'Sounds like a great plan!',
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const responseMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'received'
            };
            setMessages(prev => [...prev, responseMessage]);
        }, 2000);
    };

    const currentContact = contacts.find(contact => contact.id === selectedContact);

    return (
        <div className="messaging-app">
            <Sidebar
                contacts={contacts}
                selectedContact={selectedContact}
                onSelectContact={setSelectedContact}
            />
            <ChatWindow
                contact={currentContact}
                messages={messages}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default Dashboard;