import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardView from '../../view/dashboard/dashboard';

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
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hey there! How are you doing?', timestamp: '10:30 AM', type: 'received' },
        { id: '2', text: 'I\'m doing great! Thanks for asking. How about you?', timestamp: '10:32 AM', type: 'sent' },
        { id: '3', text: 'Pretty good! Just working on some exciting new projects.', timestamp: '10:33 AM', type: 'received' },
        { id: '4', text: 'That sounds awesome! Would love to hear more about it.', timestamp: '10:35 AM', type: 'sent' },
    ]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/all");
                const users = response.data;

                const formattedContacts: Contact[] = users.map((user: any) => {
                    const fullName = `${user.first_name} ${user.last_name}`;
                    const avatar = `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();

                    return {
                        id: user.id,
                        name: fullName,
                        avatar: avatar,
                        status: 'online', // tu peux rendre ça dynamique si tu veux
                        lastMessage: 'Hello!', // placeholder
                        time: 'Just now',      // placeholder
                        unreadCount: 0         // placeholder
                    };
                });

                setContacts(formattedContacts);
            } catch (error) {
                console.error('Erreur lors du chargement des contacts :', error);
            }
        };

        fetchContacts();
    }, []);

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'sent'
        };
        setMessages(prev => [...prev, newMessage]);

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
        <DashboardView
            contacts={contacts}
            selectedContact={selectedContact}
            onSelectContact={setSelectedContact}
            contact={currentContact}
            messages={messages}
            onSendMessage={handleSendMessage}
        />
    );
};

export default Dashboard;
